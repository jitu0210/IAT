import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Interns() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch interns from backend
  const fetchInterns = async () => {
    try {
      const response = await axios.get("https://your-backend-api.com/interns");
      setInterns(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch interns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <Header />

      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6">
          Our Interns
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
          Meet the talented interns who are contributing to Aartech Solonics Limited.
        </p>

        {loading ? (
          <p className="text-gray-400">Loading interns...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : interns.length === 0 ? (
          <p className="text-gray-400">No interns found.</p>
        ) : (
          <div className="max-w-7xl mx-auto px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {interns.map((intern) => (
              <div
                key={intern.id}
                className="bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-800 hover:shadow-blue-500/30 transition"
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-2">{intern.name}</h3>
                <p className="text-gray-300 mb-1">
                  <span className="font-semibold">Email:</span> {intern.email}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Branch:</span> {intern.branch}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}