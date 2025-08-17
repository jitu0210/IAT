import Header from "../components/Header";
import Footer from "../components/Footer";

const branches = [
  {
    name: "Mechanical Engineering",
    description:
      "Interns will focus on design, thermal systems, manufacturing processes, and innovative solutions for energy systems.",
  },
  {
    name: "Electrical Engineering",
    description:
      "Interns will gain expertise in power systems, circuit design, smart grids, and industrial electrical solutions.",
  },
  {
    name: "Electronics Engineering",
    description:
      "Interns will explore embedded systems, IoT, VLSI design, and advanced electronic applications.",
  },
  {
    name: "Computer Science & Engineering",
    description:
      "Interns will work on AI, machine learning, full-stack development, and automation in industrial systems.",
  },
  {
    name: "MBA (Management)",
    description:
      "Interns will learn corporate strategies, project management, business development, and organizational leadership.",
  },
];

export default function About() {
  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-blue-400 mb-6">
            About Our Internship Program
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
            Aartech Solonics Limited welcomes passionate interns from diverse engineering
            and management branches. This internship begins on{" "}
            <span className="font-semibold text-blue-300">11 August</span> and aims to
            provide industry-ready skills, mentorship, and innovation opportunities.
          </p>
        </div>
      </section>

      {/* Branch Cards */}
      <section className="flex-grow bg-black py-16">
        <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-blue-950 rounded-2xl shadow-lg p-6 border border-blue-700 hover:scale-105 transition transform"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-3">{branch.name}</h3>
              <p className="text-gray-300">{branch.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Note */}
      <section className="bg-gradient-to-r from-blue-900 to-black py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Building the Future, Together
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            This program is designed not only to give technical exposure but also to
            empower interns with professional skills, teamwork, and innovative thinking.
            Join us in creating a smarter, sustainable tomorrow.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}