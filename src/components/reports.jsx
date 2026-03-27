/*export default function Reports() {
  const reports = [
    {
      city: "Mumbai",
      message: "Heavy waterlogging near Bandra.",
      risk: "High",
    },
    {
      city: "Chennai",
      message: "River overflow, nearby areas on alert.",
      risk: "Medium",
    },
    {
      city: "Patna",
      message: "Water levels rising fast.",
      risk: "High",
    },
  ];

  return (
    <div className="bg-white p-5 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Recent Flood Reports</h3>

      {reports.map((report, index) => (
        <div key={index} className="mb-4 border-b pb-2">
          <h4 className="font-bold">{report.city}</h4>
          <p>{report.message}</p>
          <span
            className={`px-2 py-1 text-white text-sm rounded ${
              report.risk === "High"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          >
            {report.risk}
          </span>
        </div>
      ))}
    </div>
  );
}
*/
export default function Reports({ reports }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Flood Reports</h2>
      {reports.map((report, index) => (
        <div key={index} className="mb-2 p-3 bg-black-50 rounded-xl">
          <strong>{report.location}</strong>
          <p>{report.description}</p>
        </div>
      ))}
    </div>
  );
}