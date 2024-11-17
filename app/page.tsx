import Form from "@/components/Form";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          STRIVE Tech Challenge <hr />
          GitHub Code Quality Analyzer
        </h1>
        <p className="text-gray-700 mt-2 text-center">
          Enter a GitHub repository and file SHA to analyze the code quality
          using AI.
        </p>
      </header>
      <Form />
      <footer className="mt-8 text-gray-600 text-sm">
        Built using Next.js, LangChain, and Tailwind CSS for the STRIVE Tech
        Challenge.
      </footer>
    </main>
  );
}
