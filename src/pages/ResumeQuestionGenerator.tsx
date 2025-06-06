import React, { useState } from "react";

const ResumeQuestionGenerator: React.FC = () => {
  const [status, setStatus] = useState("");
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = document.getElementById("resumeFile") as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) return;

    setStatus("Processing resume...");
    setLoading(true);
    setQuestions("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("Interview questions generated!");
        setQuestions(data.questions);
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      setStatus("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Resume Interview Question Generator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            id="resumeFile"
            accept=".pdf"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Questions"}
          </button>
        </form>

        {status && <div className="mt-4 text-gray-600 text-sm">{status}</div>}

        {questions && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Generated Questions</h2>
            <pre className="bg-gray-50 p-4 rounded border border-gray-200 text-gray-800 whitespace-pre-wrap">
              {questions}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeQuestionGenerator;
