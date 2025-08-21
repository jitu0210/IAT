import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ratingModal, setRatingModal] = useState({ open: false, group: null });
  const [ratings, setRatings] = useState({
    communication: 0,
    presentation: 0,
    content: 0,
    helpfulForCompany: 0,
    helpfulForInterns: 0,
    participants: 0
  });
  const [comments, setComments] = useState("");

  // Fetch groups from backend
  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/groups");
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
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/v1/groups",
        { name: groupName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setGroups([...groups, response.data]);
      setGroupName("");
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
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/v1/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGroups(groups.filter((g) => g._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete group");
    }
  };

  // Submit rating
  const handleSubmitRating = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      setError("");
      
      const response = await axios.post(
        `http://localhost:8000/api/v1/ratings/${ratingModal.group._id}`,
        { ratings, comments },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update groups to reflect new rating
      fetchGroups();
      setRatingModal({ open: false, group: null });
      setRatings({
        communication: 0,
        presentation: 0,
        content: 0,
        helpfulForCompany: 0,
        helpfulForInterns: 0,
        participants: 0
      });
      setComments("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total score
  const calculateTotal = () => {
    return Object.values(ratings).reduce((sum, val) => sum + val, 0);
  };

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <Header />

      <section className="py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6">
          Interns Groups
        </h1>

        {/* Create Group Input */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400 flex-grow w-full"
          />
          <button
            onClick={handleCreateGroup}
            disabled={loading}
            className="px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded font-semibold transition w-full md:w-auto"
          >
            {loading ? "Creating..." : "Create Group"}
          </button>
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Groups List */}
        <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group._id}
              className="bg-gray-900 rounded-xl p-6 flex flex-col border border-gray-800 shadow-md hover:shadow-blue-500/30 transition"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-blue-400">{group.name}</h3>
                <div className="text-yellow-400">
                  {group.averageRating ? group.averageRating.toFixed(1) : "N/A"} / 40
                </div>
              </div>
              
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => setRatingModal({ open: true, group })}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded font-medium transition"
                >
                  Rate
                </button>
                <button
                  onClick={() => handleDeleteGroup(group._id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rating Modal */}
      {ratingModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              Rate {ratingModal.group.name}
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label>Communication (0-10):</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={ratings.communication}
                  onChange={(e) => setRatings({...ratings, communication: parseInt(e.target.value) || 0})}
                  className="w-16 px-2 py-1 bg-gray-700 rounded"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <label>Presentation (0-10):</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={ratings.presentation}
                  onChange={(e) => setRatings({...ratings, presentation: parseInt(e.target.value) || 0})}
                  className="w-16 px-2 py-1 bg-gray-700 rounded"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <label>Content (0-10):</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={ratings.content}
                  onChange={(e) => setRatings({...ratings, content: parseInt(e.target.value) || 0})}
                  className="w-16 px-2 py-1 bg-gray-700 rounded"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <label>Helpful for Company (0-5):</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={ratings.helpfulForCompany}
                  onChange={(e) => setRatings({...ratings, helpfulForCompany: parseInt(e.target.value) || 0})}
                  className="w-16 px-2 py-1 bg-gray-700 rounded"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <label>Helpful for Interns (0-5):</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={ratings.helpfulForInterns}
                  onChange={(e) => setRatings({...ratings, helpfulForInterns: parseInt(e.target.value) || 0})}
                  className="w-16 px-2 py-1 bg-gray-700 rounded"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <label>Participants (0-5):</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={ratings.participants}
                  onChange={(e) => setRatings({...ratings, participants: parseInt(e.target.value) || 0})}
                  className="w-16 px-2 py-1 bg-gray-700 rounded"
                />
              </div>
              
              <div className="pt-2 border-t border-gray-700">
                <p className="font-bold">Total: {calculateTotal()} / 40</p>
              </div>
              
              <div>
                <label className="block mb-1">Comments:</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded"
                  rows="3"
                  maxLength="500"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setRatingModal({ open: false, group: null })}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRating}
                disabled={loading || calculateTotal() === 0}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Rating"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}