import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    activities: "",
    date: new Date(),
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8000/api/v1/form/submit-form",
        formData
      );
      setSubmitted(true); // Google Forms-style submission success
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f1f7]">
        <div className="bg-white max-w-xl w-full p-10 rounded-lg shadow-md border-t-[10px] border-purple-700 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            You have already submitted your response
          </h2>
          <p className="text-gray-600">
            Thank you for your submission! You can submit again after 12 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ede6f9] flex justify-center py-10 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-t-lg shadow-md border-t-[12px] border-purple-700 p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Intern Activity Tracker
          </h1>
          <p className="text-gray-600">Track daily activities of interns.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white mt-2 rounded-b-lg shadow-md p-8 space-y-8"
        >
          <div>
            <label className="block text-lg font-medium mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-400 focus:border-purple-600 outline-none p-2"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Branch *
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-400 focus:border-purple-600 outline-none p-2"
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
              <option value="Electronics">Electronics</option>
              <option value="MBA">MBA</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Activities *
            </label>
            <textarea
              name="activities"
              rows="4"
              value={formData.activities}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-400 focus:border-purple-600 outline-none p-2 resize-none"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Date *
            </label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              dateFormat="dd/MM/yyyy"
              className="w-full border-b border-gray-400 focus:border-purple-600 outline-none p-2"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded font-semibold transition w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
