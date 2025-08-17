import React, { useEffect, useState, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA"];

const DEFAULT_INTERNS = [
  { name: "Mechanical", value: 0 },
  { name: "Electrical", value: 0 },
  { name: "Electronics", value: 0 },
  { name: "CSE", value: 0 },
  { name: "MBA", value: 0 },
];

const DEFAULT_PROJECTS = [
  { id: 1, name: "Project A", description: "Demo description A", progress: 0, deadline: "2025-09-01" },
  { id: 2, name: "Project B", description: "Demo description B", progress: 0, deadline: "2025-09-10" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    interns: 0,
    projects: 0,
    startDate: "-",
    status: "-",
  });

  const [internsData, setInternsData] = useState(DEFAULT_INTERNS);
  const [projectsData, setProjectsData] = useState(DEFAULT_PROJECTS);

  const [newProject, setNewProject] = useState({ name: "", description: "", deadline: "" });

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback((_, index) => setActiveIndex(index), []);

  useEffect(() => {
    // Interns by department
    axios
      .get("") // interns-by-department endpoint
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length) setInternsData(res.data);
      })
      .catch(() => {
        setInternsData([
          { name: "Mechanical", value: 10 },
          { name: "Electrical", value: 15 },
          { name: "Electronics", value: 12 },
          { name: "CSE", value: 20 },
          { name: "MBA", value: 8 },
        ]);
      });

    // Projects
    axios
      .get("") // 🔗 projects-progress endpoint
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length) setProjectsData(res.data);
      })
      .catch(() => {
        setProjectsData(DEFAULT_PROJECTS);
      });

    // Top stats
    axios
      .get("") // 🔗 top-stats endpoint
      .then((res) => {
        if (res?.data) setStats(res.data);
      })
      .catch(() => {
        setStats({ interns: 65, projects: 16, startDate: "11 Aug", status: "Ongoing" });
      });
  }, []);

  // --- Delete project ---
  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(``); // 🔗 delete project endpoint
      setProjectsData((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // --- Add project ---
  const handleAddProject = async () => {
    if (!newProject.name || !newProject.deadline) return;
    try {
      const res = await axios.post("", newProject); // 🔗 add project endpoint
      const added = res.data || { ...newProject, id: Date.now(), progress: 0 };
      setProjectsData((prev) => [...prev, added]);
      setNewProject({ name: "", description: "", deadline: "" });
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Pie
          dataKey="value"
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          fill={fill}
          data={[{ value: 1 }]}
          isAnimationActive={false}
        />
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold">Internship Dashboard</h1>
          <button
            onClick={() => navigate("/interns-form")}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Fill Intern Activity Form
          </button>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <button onClick={() => navigate("/interns")} className="group rounded-xl bg-[#111A2E] border border-blue-900/30 p-4 text-left hover:border-blue-500/40 transition">
            <div className="text-sm text-gray-400">Total Interns</div>
            <div className="mt-1 text-3xl font-bold text-blue-400 group-hover:text-blue-300">{stats.interns}</div>
          </button>

          <button onClick={() => navigate("/projects")} className="group rounded-xl bg-[#111A2E] border border-blue-900/30 p-4 text-left hover:border-blue-500/40 transition">
            <div className="text-sm text-gray-400">Total Projects</div>
            <div className="mt-1 text-3xl font-bold text-blue-400 group-hover:text-blue-300">{stats.projects}</div>
          </button>

          <button onClick={() => navigate("/groups")} className="group rounded-xl bg-[#111A2E] border border-blue-900/30 p-4 text-left hover:border-blue-500/40 transition">
            <div className="text-sm text-gray-400">Groups</div>
            <div className="mt-1 text-3xl font-bold text-blue-400">{internsData.length}</div>
          </button>

          <div className="rounded-xl bg-[#111A2E] border border-blue-900/30 p-4">
            <div className="text-sm text-gray-400">Start Date</div>
            <div className="mt-1 text-3xl font-bold text-amber-400">{stats.startDate || "-"}</div>
          </div>

          <div className="rounded-xl bg-[#111A2E] border border-blue-900/30 p-4">
            <div className="text-sm text-gray-400">Status</div>
            <div className="mt-1 text-3xl font-bold text-indigo-300">{stats.status || "-"}</div>
          </div>
        </div>

        {/* Charts */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie */}
          <div className="rounded-xl bg-[#111A2E] border border-blue-900/30 p-4">
            <h2 className="text-lg font-semibold mb-4">Interns by Department</h2>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={internsData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={2}
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={() => setActiveIndex(0)}
                  >
                    {internsData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                    <LabelList dataKey="value" position="outside" fill="#ffffff" />
                  </Pie>
                  <Tooltip
                    cursor={false}
                    contentStyle={{ background: "#0F172A", border: "1px solid #1E3A8A" }}
                    labelStyle={{ color: "#E5E7EB" }}
                    itemStyle={{ color: "#FFFFFF" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar */}
          <div className="rounded-xl bg-[#111A2E] border border-blue-900/30 p-4">
            <h2 className="text-lg font-semibold mb-4">Projects Progress</h2>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectsData} barSize={38}>
                  <XAxis dataKey="name" tick={{ fill: "#9CA3AF", fontSize: 12 }} interval={0} height={60} angle={-10} textAnchor="end" />
                  <YAxis tick={{ fill: "#9CA3AF" }} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} />
                  <Tooltip
                    cursor={{ fill: "rgba(59,130,246,0.08)" }}
                    contentStyle={{ background: "#0F172A", border: "1px solid #1E3A8A" }}
                    labelStyle={{ color: "#E5E7EB" }}
                    itemStyle={{ color: "#FFFFFF" }}
                  />
                  <Bar dataKey="progress" fill="#3B82F6" radius={[6, 6, 0, 0]} onClick={() => navigate("/projects")} className="cursor-pointer">
                    <LabelList dataKey="progress" position="top" fill="#FFFFFF" formatter={(v) => `${v}%`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="mt-8 rounded-xl bg-[#111A2E] border border-blue-900/30 p-4">
          <h2 className="text-lg font-semibold mb-4">Projects Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead className="bg-[#1E293B] text-gray-200">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Deadline</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projectsData.map((p) => (
                  <tr key={p.id} className="border-b border-blue-900/30">
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.description}</td>
                    <td className="px-4 py-2">{p.deadline}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => handleDeleteProject(p.id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Project */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <input type="text" placeholder="Project Name" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} className="flex-1 rounded bg-[#0F172A] border border-blue-900/30 px-3 py-2" />
            <input type="text" placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} className="flex-1 rounded bg-[#0F172A] border border-blue-900/30 px-3 py-2" />
            <input type="date" value={newProject.deadline} onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })} className="rounded bg-[#0F172A] border border-blue-900/30 px-3 py-2" />
            <button onClick={handleAddProject} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold">Add</button>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-10 rounded-xl bg-[#111A2E] border border-blue-900/30 p-6">
          <h2 className="text-lg font-semibold mb-4">Company Achievements</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Reached 100+ successful projects</li>
            <li>50+ interns hired full-time</li>
            <li>Expanded operations across multiple industries</li>
          </ul>
          <button
      onClick={() => navigate("/achievements")}
      className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold"
    >
      See More Achievements
    </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
