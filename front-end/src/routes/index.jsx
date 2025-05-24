import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-4">Bem-vindo</h1>
      <p className="text-lg text-gray-400 mb-6 text-center max-w-xl">
        Crie as suas próprias Tarefas e regule o seu dia a dia de forma mais eficiente
      </p>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg shadow-md">
          Login
        </Link>
      </div>
    </div>
  );
}
