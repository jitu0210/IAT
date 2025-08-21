import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState({
    name: "",
    description: "",
    progress: 0,
    deadline: "",
    links: []
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch specific project from backend
  const fetchProject = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/projects/${id}`);
      setProject(response.data);
      setEditedProject({
        name: response.data.name,
        description: response.data.description,
        progress: response.data.progress,
        deadline: response.data.deadline ? new Date(response.data.deadline).toISOString().split('T')[0] : "",
        links: response.data.links || []
      });
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch project details");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject({ ...editedProject, [name]: value });
  };

  // Handle link changes
  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...editedProject.links];
    updatedLinks[index][field] = value;
    setEditedProject({ ...editedProject, links: updatedLinks });
  };

  // Add new link field
  const handleAddLink = () => {
    setEditedProject({
      ...editedProject,
      links: [...editedProject.links, { title: "", url: "" }]
    });
  };

  // Remove link field
  const handleRemoveLink = (index) => {
    const updatedLinks = editedProject.links.filter((_, i) => i !== index);
    setEditedProject({ ...editedProject, links: updatedLinks });
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!editedProject.name.trim()) errors.name = "Project name is required";
    if (!editedProject.description.trim()) errors.description = "Description is required";
    if (editedProject.progress < 0 || editedProject.progress > 100) errors.progress = "Invalid progress value";
    
    // Validate links
    editedProject.links.forEach((link, index) => {
      if (link.url && !link.title) {
        errors[`linkTitle${index}`] = "Link title is required when URL is provided";
      }
      if (link.title && !link.url) {
        errors[`linkUrl${index}`] = "URL is required when title is provided";
      }
      if (link.url && !isValidUrl(link.url)) {
        errors[`linkUrl${index}`] = "Please enter a valid URL";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // URL validation helper
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Submit updated project
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // Prepare the project data for submission
      const projectToSubmit = {
        name: editedProject.name,
        description: editedProject.description,
        progress: Number(editedProject.progress),
        deadline: editedProject.deadline ? new Date(editedProject.deadline).toISOString() : null,
        links: editedProject.links
          .filter(link => link.title && link.url) // Remove empty links
          .map(link => ({
            title: link.title,
            url: link.url.startsWith('http') ? link.url : `https://${link.url}` // Ensure URL has protocol
          }))
      };

      const response = await axios.put(
        `http://localhost:8000/api/v1/projects/${id}`,
        projectToSubmit,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setProject(response.data);
        setEditMode(false);
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.error || 
               err.response?.data?.message || 
               "Failed to update project. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:8000/api/v1/projects/${id}`);
        navigate("/projects");
      } catch (err) {
        console.error("Delete error:", err);
        setError("Failed to delete project");
        setLoading(false);
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining until deadline
  const daysRemaining = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black text-gray-200 min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400 mb-4"></div>
            <p className="text-gray-400">Loading project details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-gray-200 min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 bg-red-900/30 inline-block px-4 py-2 rounded-lg mb-4">{error}</p>
            <Link to="/projects" className="text-blue-400 hover:text-blue-300">
              ← Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-black text-gray-200 min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 mb-4">Project not found</p>
            <Link to="/projects" className="text-blue-400 hover:text-blue-300">
              ← Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <Header />

      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
        <Link 
          to="/projects" 
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* Project Detail Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-grow w-full">
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-blue-900/30">
          {editMode ? (
            // Edit Form
            <>
              <h2 className="text-2xl font-bold text-blue-400 mb-6">Edit Project</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6">
                  {/* Project Name */}
                  <div>
                    <label className="block text-gray-300 mb-2">Project Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={editedProject.name}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-800 border ${formErrors.name ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none`}
                      required
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-gray-300 mb-2">Description*</label>
                    <textarea
                      name="description"
                      value={editedProject.description}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-800 border ${formErrors.description ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none`}
                      rows="5"
                      required
                    />
                    {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Progress */}
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Progress ({editedProject.progress}%)*
                      </label>
                      <input
                        type="range"
                        name="progress"
                        min="0"
                        max="100"
                        value={editedProject.progress}
                        onChange={handleInputChange}
                        className={`w-full ${formErrors.progress ? "border-red-500" : ""}`}
                      />
                      {formErrors.progress && <p className="text-red-500 text-sm mt-1">{formErrors.progress}</p>}
                    </div>

                    {/* Deadline */}
                    <div>
                      <label className="block text-gray-300 mb-2">Deadline</label>
                      <input
                        type="date"
                        name="deadline"
                        value={editedProject.deadline}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Project Links */}
                  <div>
                    <label className="block text-gray-300 mb-2">Project Links</label>
                    {editedProject.links.map((link, index) => (
                      <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Link Title"
                            value={link.title}
                            onChange={(e) => handleLinkChange(index, "title", e.target.value)}
                            className={`w-full bg-gray-800 border ${formErrors[`linkTitle${index}`] ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none`}
                          />
                          {formErrors[`linkTitle${index}`] && <p className="text-red-500 text-sm mt-1">{formErrors[`linkTitle${index}`]}</p>}
                        </div>
                        <div className="flex-1">
                          <input
                            type="url"
                            placeholder="https://example.com"
                            value={link.url}
                            onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                            className={`w-full bg-gray-800 border ${formErrors[`linkUrl${index}`] ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none`}
                          />
                          {formErrors[`linkUrl${index}`] && <p className="text-red-500 text-sm mt-1">{formErrors[`linkUrl${index}`]}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(index)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 rounded-lg self-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mt-2"
                    >
                      Add Another Link
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition flex-1"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setEditedProject({
                        name: project.name,
                        description: project.description,
                        progress: project.progress,
                        deadline: project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : "",
                        links: project.links || []
                      });
                      setFormErrors({});
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition flex-1"
                  >
                    Delete Project
                  </button>
                </div>
              </form>
            </>
          ) : (
            // Display Mode
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-400 mb-4 md:mb-0">{project.name}</h1>
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Edit Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-300 mb-4">Description</h2>
                  <p className="text-gray-300 mb-8 whitespace-pre-line">{project.description}</p>

                  {/* Progress Section */}
                  <h2 className="text-xl font-semibold text-gray-300 mb-4">Progress</h2>
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Completion Status</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3 mb-4">
                      <div
                        className={`h-3 rounded-full ${
                          project.progress < 30
                            ? "bg-red-500"
                            : project.progress < 70
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Links Section */}
                  {project.links && project.links.length > 0 && (
                    <>
                      <h2 className="text-xl font-semibold text-gray-300 mb-4">Project Links</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {project.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-4 transition-colors group"
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-900/50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-blue-400 group-hover:text-blue-300 transition-colors">{link.title}</h3>
                                <p className="text-xs text-gray-400 truncate">{link.url}</p>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Sidebar */}
                <div className="md:col-span-1">
                  <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-300 mb-4">Project Details</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm text-gray-400">Status</h3>
                        <p className="text-white">
                          {project.progress === 0 
                            ? "Not Started" 
                            : project.progress === 100 
                            ? "Completed" 
                            : "In Progress"}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-400">Created On</h3>
                        <p className="text-white">{formatDate(project.createdAt)}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-400">Deadline</h3>
                        <p className="text-white">{formatDate(project.deadline)}</p>
                        {project.deadline && project.progress < 100 && (
                          <p className={`text-sm mt-1 ${
                            daysRemaining(project.deadline) < 0 
                              ? "text-red-400" 
                              : daysRemaining(project.deadline) < 7 
                              ? "text-yellow-400" 
                              : "text-green-400"
                          }`}>
                            {daysRemaining(project.deadline) < 0 
                              ? `Overdue by ${Math.abs(daysRemaining(project.deadline))} days` 
                              : `${daysRemaining(project.deadline)} days remaining`}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}