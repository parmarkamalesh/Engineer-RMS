import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [engineers, setEngineers] = useState([]);
  const [form, setForm] = useState({ name: "", skills: "", capacity: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchEngineers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/engineers");
      setEngineers(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchEngineers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      skills: form.skills.split(",").map((s) => s.trim()),
      capacity: parseInt(form.capacity),
    };

    try {
      if (editingId) {
        // Update
        await axios.put(
          `http://localhost:5000/api/engineers/${editingId}`,
          payload
        );
      } else {
        // Create
        await axios.post("http://localhost:5000/api/engineers", payload);
      }

      setForm({ name: "", skills: "", capacity: "" });
      setEditingId(null);
      fetchEngineers();
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  const handleEdit = (eng) => {
    setForm({
      name: eng.name,
      skills: eng.skills.join(","),
      capacity: eng.capacity.toString(),
    });
    setEditingId(eng._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/engineers/${id}`);
      fetchEngineers();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleCancel = () => {
    setForm({ name: "", skills: "", capacity: "" });
    setEditingId(null);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Engineer Resource Manager</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-6 bg-white shadow p-4 rounded"
      >
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Skills (comma-separated)"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Capacity (e.g., 40)"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          required
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update Engineer" : "Add Engineer"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-2">Engineer List</h2>
      <ul>
        {engineers.map((eng) => (
          <li
            key={eng._id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <strong>{eng.name}</strong> | Skills: {eng.skills.join(", ")} |
              Capacity: {eng.capacity} hrs/week
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(eng)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(eng._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
