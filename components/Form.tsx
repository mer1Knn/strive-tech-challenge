"use client";

import { useState } from "react";

type Result = {
  score?: string;
  reasoning?: string;
  error?: string;
} | null;

const Form = () => {
  const [repo, setRepo] = useState("");
  const [filePath, setFilePath] = useState("");
  const [sha, setSha] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchSha = async () => {
    if (!repo || !filePath) {
      alert("Please enter the repository URL and file path.");
      return;
    }

    try {
      const response = await fetch("/api/github/getSha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo, filePath }),
      });
      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      setSha(data.sha);
      alert("SHA fetched successfully!");
    } catch (error) {
      console.error("Error fetching SHA:", error);
      alert("Failed to fetch SHA. Please check your inputs.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/llm/analyzeCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo, sha }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing code:", error);
      setResult({ error: "Failed to analyze the code" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-2">GitHub Repository URL</label>
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="e.g., https://github.com/user/repo"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-bold mb-2">File Path</label>
          <input
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="e.g., src/index.js"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-bold mb-2">File SHA (Optional)</label>
          <input
            type="text"
            value={sha}
            onChange={(e) => setSha(e.target.value)}
            placeholder="Auto-fetch or enter manually"
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="button"
          onClick={handleFetchSha}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Fetch SHA
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Submit"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 border rounded">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <div>
              <h3 className="font-bold">Quality Score and reasoning</h3>
              <p>{result.reasoning}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Form;
