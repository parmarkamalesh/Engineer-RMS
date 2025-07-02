import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="space-x-4">
        <Link to="/">Dashboard</Link>
        <Link to="/engineers">Engineers</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/assignments">Assignments</Link>
      </div>
      <button onClick={logout} className="bg-red-600 px-4 py-1 rounded">
        Logout
      </button>
    </nav>
  );
}
