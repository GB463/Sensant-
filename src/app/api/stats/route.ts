import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("TOKEN:", JSON.stringify(token));

  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const totalPatients = await prisma.patient.count();
  const totalConsultations = await prisma.consultation.count();
  const consultationsTerminees = await prisma.consultation.count({
    where: { statut: "termine" },
  });
  const alertesUrgentes = await prisma.consultation.count({
    where: {
      statut: "termine",
      confiance: { gte: 60 },
      diagnosticIa: { not: null },
    },
  });

  const parRegion = await prisma.patient.groupBy({
    by: ["region"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
  });

  const sixMoisAgo = new Date();
  sixMoisAgo.setMonth(sixMoisAgo.getMonth() - 6);
  const consultationsRecentes = await prisma.consultation.findMany({
    where: { date: { gte: sixMoisAgo } },
    select: { date: true },
  });

  const parMois: Record<string, number> = {};
  const moisNoms = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  consultationsRecentes.forEach((c) => {
    const d = new Date(c.date);
    const key = `${moisNoms[d.getMonth()]} ${d.getFullYear()}`;
    parMois[key] = (parMois[key] || 0) + 1;
  });

  const dernieresAlertes = await prisma.consultation.findMany({
    where: { statut: "termine", diagnosticIa: { not: null } },
    include: { patient: true },
    orderBy: { date: "desc" },
    take: 5,
  });

  return NextResponse.json({
    kpi: { totalPatients, totalConsultations, consultationsTerminees, alertesUrgentes },
    parRegion: parRegion.map((r) => ({ region: r.region, total: r._count.id })),
    parMois: Object.entries(parMois).map(([mois, total]) => ({ mois, total })),
    dernieresAlertes: dernieresAlertes.map((a) => ({
      id: a.id,
      patient: `${a.patient.prenom} ${a.patient.nom}`,
      region: a.patient.region,
      diagnostic: a.diagnosticIa,
      confiance: a.confiance,
      date: a.date,
    })),
  });
}