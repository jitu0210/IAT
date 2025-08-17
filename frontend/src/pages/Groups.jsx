import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch groups from backend
  const fetchGroups = async () => {
    try {
      const response = await axios.get("https://your-backend-api.com/groups");
      setGroups(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch groups");
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // Create a new group
  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("https://your-backend-api.com/groups", {
        name: groupName,
      });
      setGroups([...groups, response.data]); // Add new group to state
      setGroupName(""); // Clear input
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  // Delete a group
  const handleDeleteGroup = async (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      await axios.delete(`https://your-backend-api.com/groups/${id}`);
      setGroups(groups.filter((g) => g.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete group");
    }
  };

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <Header />

      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6">
          Interns Group
        </h1>

        {/* Create Group Input */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={handleCreateGroup}
            disabled={loading}
            className="px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded font-semibold transition"
          >
            {loading ? "Creating..." : "Create Group"}
          </button>
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Groups List */}
        <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-gray-900 rounded-xl p-6 flex justify-between items-center border border-gray-800 shadow-md hover:shadow-blue-500/30 transition"
            >
              <h3 className="text-lg font-bold text-blue-400">{group.name}</h3>
              <button
                onClick={() => handleDeleteGroup(group.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded font-medium transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
