import { useState, useEffect } from "react";
import axios from "axios";

export default function Assignments() {
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    engineer: "",
    project: "",
    hoursAllocated: "",
  });

  const fetchAll = async () => {
    try {
      const [engRes, projRes, assignRes] = await Promise.all([
        axios.get("http://localhost:5000/api/engineers"),
        axios.get("http://localhost:5000/api/projects"),
        axios.get("http://localhost:5000/api/assignments"),
      ]);

      setEngineers(engRes.data);
      setProjects(projRes.data);
      setAssignments(assignRes.data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/assignments", form);
      setForm({ engineer: "", project: "", hoursAllocated: "" });
      fetchAll();
    } catch (err) {
      console.error("Assignment creation failed", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assignments</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-2 mb-6 bg-white p-4 shadow rounded"
      >
        <select
          className="border p-2 w-full"
          value={form.engineer}
          onChange={(e) => setForm({ ...form, engineer: e.target.value })}
          required
        >
          <option value="">Select Engineer</option>
          {engineers.map((eng) => (
            <option key={eng._id} value={eng._id}>
              {eng.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 w-full"
          value={form.project}
          onChange={(e) => setForm({ ...form, project: e.target.value })}
          required
        >
          <option value="">Select Project</option>
          {projects.map((proj) => (
            <option key={proj._id} value={proj._id}>
              {proj.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Hours Allocated"
          value={form.hoursAllocated}
          onChange={(e) => setForm({ ...form, hoursAllocated: e.target.value })}
          required
        />

        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Assign
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Assignment List</h3>
      <ul className="space-y-2">
        {assignments.map((a) => (
          <li key={a._id} className="border p-3 rounded bg-gray-50 shadow">
            <strong>{a.engineer?.name || "Unknown Engineer"}</strong> assigned
            to <strong>{a.project?.name || "Unknown Project"}</strong> for{" "}
            {a.hoursAllocated} hrs
          </li>
        ))}
      </ul>
    </div>
  );
}
