export default function Home() {
  return (
    <main className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          🏥 SénSanté
        </h1>
        <p className="text-xl text-green-700 mb-6">
          Assistant de santé communautaire avec IA
        </p>
        <p className="text-gray-600 mb-8">
          Plateforme de suivi des patients pour les agents de santé
          au Sénégal — Dakar, Thiès, Saint-Louis...
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="font-bold text-green-700">👥 Patients</h2>
            <p className="text-sm text-gray-500">Gérer les dossiers</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="font-bold text-green-700">🩺 Consultations</h2>
            <p className="text-sm text-gray-500">Suivre les visites</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="font-bold text-green-700">🤖 IA Groq</h2>
            <p className="text-sm text-gray-500">Assistant médical</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="font-bold text-green-700">📊 Dashboard</h2>
            <p className="text-sm text-gray-500">Statistiques</p>
          </div>
        </div>
      </div>
    </main>
  )
}