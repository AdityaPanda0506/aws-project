export default function ResultCard({ report }) {
  if (!report) return null;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      <h2>Dataset Summary</h2>

      <p>
        <b>Filename:</b> {report.filename}
      </p>

      <p>
        <b>Quality Score:</b> {report.quality_score}
      </p>

      <p>
        <b>Status:</b> {report.status}
      </p>

      <p>
        <b>Rows:</b> {report.dataset_summary.rows}
      </p>

      <p>
        <b>Columns:</b> {report.dataset_summary.columns}
      </p>

      <h3>Recommendations</h3>

      <ul>
        {report.recommendations.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}