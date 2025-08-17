import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Form({ userId = "user123" }) {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    activities: "",
    date: new Date(),
    userId,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  // Check if user already submitted within 24 hrs
  useEffect(() => {
    const lastSubmit = localStorage.getItem("lastSubmit_" + userId);
    if (lastSubmit) {
      const diff = Date.now() - parseInt(lastSubmit);
      if (diff < 24 * 60 * 60 * 1000) {
        setIsBlocked(true);
        setSubmitted(true);
      }
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) return;

    try {
      await axios.post("http://localhost:5000/api/interns", formData);
      setSubmitted(true);
      localStorage.setItem("lastSubmit_" + userId, Date.now().toString());
      setIsBlocked(true);
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed, check backend");
    }
  };

  // After Submission Page
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f1f7]">
        <div className="bg-white max-w-xl w-full p-10 rounded-lg shadow-md border-t-[10px] border-purple-700 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Your response has been recorded.
          </h2>
          <p className="text-gray-600">
            You can submit again after{" "}
            <span className="font-semibold">24 hours</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ede6f9] flex justify-center py-10 px-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="bg-white rounded-t-lg shadow-md border-t-[12px] border-purple-700 p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Intern Activity Tracker
          </h1>
          <p className="text-gray-600">
            This form helps to track daily activities of an intern.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white mt-2 rounded-b-lg shadow-md p-8 space-y-8"
        >
          {/* Name */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-400 focus:border-purple-600 outline-none p-2 text-gray-700"
              placeholder="Short answer text"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Branch <span className="text-red-500">*</span>
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-400 focus:border-purple-600 outline-none p-2 bg-white text-gray-700"
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
              <option value="Electronics">Electronics</option>
              <option value="MBA">MBA</option>
            </select>
          </div>

          {/* Activities */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Activities <span className="text-red-500">*</span>
            </label>
            <textarea
              name="activities"
              rows="4"
              value={formData.activities}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-400 focus:border-purple-600 outline-none p-2 resize-none text-gray-700"
              placeholder="Paragraph text"
            />
          </div>

          {/* Date Picker (Fixed for Mobile) */}
          <div className="relative">
            <label className="block text-lg font-medium mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DatePicker
                selected={formData.date}
                onChange={(date) => setFormData({ ...formData, date })}
                dateFormat="dd/MM/yyyy"
                className="w-full border-b border-gray-400 focus:border-purple-600 outline-none p-2 bg-white text-gray-700"
                wrapperClassName="w-full"
                popperPlacement="bottom-start"
                popperModifiers={[
                  {
                    name: "preventOverflow",
                    options: {
                      boundary: "viewport",
                    },
                  },
                ]}
              />
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isBlocked}
              className={`px-6 py-2 rounded font-semibold transition w-full sm:w-auto
                ${
                  isBlocked
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-700 hover:bg-purple-800 text-white"
                }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
