"use client";

import { useState } from "react";

export default function Home() {
  const [num1, setNum1] = useState<number | "">("");
  const [num2, setNum2] = useState<number | "">("");
  const [sum, setSum] = useState<number | null>(null);
  const [apiHits, setApiHits] = useState<number>(0);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (num1 === "" || num2 === "") {
      setError("Both numbers are required");
      return;
    }

    setError(null);

    try {
      const res = await fetch("/api/sum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num1: Number(num1), num2: Number(num2) }),
      });

      const data = await res.json();
      setStatus(res.status);

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setSum(data.sum);
      setApiHits(data.apiHits);
      setApiResponse(JSON.stringify(data, null, 2));
    } catch {
      setError("Error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Add Two Numbers</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <input
          type="number"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) =>
            setNum1(e.target.value ? Number(e.target.value) : "")
          }
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) =>
            setNum2(e.target.value ? Number(e.target.value) : "")
          }
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Calculate Sum
        </button>
      </form>
      {sum !== null && <p className="mt-4 text-lg font-semibold">Sum: {sum}</p>}
      {status !== null && (
        <p className="mt-2 text-gray-700">Status: {status}</p>
      )}
      {apiHits > 0 && <p className="mt-2 text-blue-500">API Hits: {apiHits}</p>}
      {apiResponse && (
        <pre className="mt-4 p-2 bg-gray-200 rounded text-sm">
          {apiResponse}
        </pre>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
