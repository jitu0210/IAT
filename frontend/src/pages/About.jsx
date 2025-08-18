import Header from "../components/Header";
import Footer from "../components/Footer";

const branches = [
  {
    name: "Mechanical Engineering",
    description:
      "Interns focus on design, thermal systems, manufacturing processes, and innovative solutions for energy systems.",
    symbol: "⚙️",
  },
  {
    name: "Electrical Engineering",
    description:
      "Gain expertise in power systems, circuit design, smart grids, and industrial electrical solutions.",
    symbol: "⚡",
  },
  {
    name: "Electronics Engineering",
    description:
      "Explore embedded systems, IoT, VLSI design, and advanced electronic applications.",
    symbol: "🔌",
  },
  {
    name: "Computer Science & Engineering",
    description:
      "Work on AI, machine learning, full-stack development, and automation in industrial systems.",
    symbol: "💻",
  },
  {
    name: "MBA (Management)",
    description:
      "Learn corporate strategies, project management, business development, and organizational leadership.",
    symbol: "📊",
  },
];

export default function About() {
  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-black py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-6">
            About Our Internship Program
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
            Aartech Solonics Limited welcomes passionate interns from diverse
            engineering and management branches. This internship begins on{" "}
            <span className="font-semibold text-blue-300">11 August</span> and
            aims to provide{" "}
            <span className="text-white font-semibold">
              industry-ready skills, mentorship, and innovation opportunities.
            </span>
          </p>
        </div>
      </section>

      {/* Branch Cards */}
      <section className="flex-grow bg-black py-10">
        <div className="max-w-7xl mx-auto px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="flex flex-col justify-start bg-gray-900 rounded-2xl shadow-md p-6 border border-gray-800 hover:border-blue-500 transition-all duration-300"
            >
              <div className="text-4xl mb-3 text-blue-400">{branch.symbol}</div>
              <h3 className="text-2xl font-bold text-blue-400 mb-3">
                {branch.name}
              </h3>
              <p className="text-gray-300 leading-relaxed">{branch.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Note */}
      <section className="bg-black py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Building the Future, Together
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            This program is designed to give technical exposure while empowering
            interns with professional skills, teamwork, and innovative thinking.
            Join us in creating a smarter, sustainable tomorrow.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
