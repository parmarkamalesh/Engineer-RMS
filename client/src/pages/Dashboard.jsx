export default function Dashboard() {
  const role = localStorage.getItem("role");
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome to Engineering RMS</h1>
      <p className="text-lg">
        Logged in as <strong>{role}</strong>
      </p>
    </div>
  );
}
