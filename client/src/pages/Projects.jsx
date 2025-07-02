import { useState, useEffect } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", deadline: "" });

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5000/api/projects");
    setProjects(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/projects", form);
    setForm({ name: "", description: "", deadline: "" });
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          className="border p-2 w-full"
          placeholder="Project Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          type="date"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />
        <button className="bg-green-600 text-white px-4 py-2" type="submit">
          Add Project
        </button>
      </form>
      <ul className="space-y-2">
        {projects.map((proj) => (
          <li key={proj._id} className="border p-2">
            <strong>{proj.name}</strong> - {proj.description} | Deadline:{" "}
            {new Date(proj.deadline).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
