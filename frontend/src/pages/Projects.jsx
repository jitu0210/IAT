import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/projects");
      setProjects(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-5 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6">
          Our Projects
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
          Explore the ongoing and completed projects by Aartech Solonics Limited.
        </p>
      </section>

      {/* Projects List */}
      <section className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-gray-400">Loading projects...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : projects.length === 0 ? (
            <p className="text-gray-400">No projects found.</p>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-800 hover:shadow-blue-500/30 transition"
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-2">{project.name}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>

                {/* Progress bar */}
                <div className="w-full bg-gray-800 rounded-full h-4">
                  <div
                    className="bg-blue-400 h-4 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="text-gray-300 text-sm mt-1">{project.progress}% Completed</p>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}