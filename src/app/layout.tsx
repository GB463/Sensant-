import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "SénSanté",
  description: "Assistant de santé communautaire avec IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 bg-gray-50 p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
