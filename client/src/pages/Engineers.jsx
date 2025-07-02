import { useState, useEffect } from "react";
import axios from "axios";

export default function Engineers() {
  const [engineers, setEngineers] = useState([]);
  const [form, setForm] = useState({ name: "", skills: "", capacity: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/engineers");
    setEngineers(res.data);
  };

  const startEdit = (eng) => {
    setEditingId(eng._id);
    setForm({
      name: eng.name,
      skills: eng.skills.join(","),
      capacity: eng.capacity,
    });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/api/engineers/${editingId}`, {
      name: form.name,
      skills: form.skills.split(","),
      capacity: parseInt(form.capacity),
    });
    setEditingId(null);
    setForm({ name: "", skills: "", capacity: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/engineers/${id}`);
      fetchData(); // refresh list
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/engineers", {
      name: form.name,
      skills: form.skills.split(","),
      capacity: parseInt(form.capacity),
    });
    setForm({ name: "", skills: "", capacity: "" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Engineers</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Skills (comma-separated)"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />
        {editingId ? (
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2"
          >
            Update Engineer
          </button>
        ) : (
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">
            Add Engineer
          </button>
        )}
      </form>
      <ul className="space-y-2">
        {engineers.map((eng) => (
          <li
            key={eng._id}
            className="border p-2 flex justify-between items-center"
          >
            <span>
              <strong>{eng.name}</strong> | Skills: {eng.skills.join(", ")} |
              Capacity: {eng.capacity} hrs/week
            </span>

            <button
              onClick={() => handleDelete(eng._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>

            <button
              onClick={() => startEdit(eng)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
