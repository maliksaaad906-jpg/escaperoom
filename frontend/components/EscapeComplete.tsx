"use client";

export default function EscapeComplete() {
  return (
    <div className="escape-complete text-center">
      <h3>🎉 Congratulations!</h3>
      <p>You’ve successfully escaped the coding room!</p>
      <p className="text-secondary">All your results have been saved.</p>
      <button
        className="btn btn-success mt-3"
        onClick={() => window.location.reload()}
      >
        Play Again 🔁
      </button>
    </div>
  );
}
