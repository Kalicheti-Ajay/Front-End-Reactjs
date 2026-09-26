import { useState } from "react";
import "./App.css";

const roles = {
  frontend: { name: "Frontend Developer", rate: 800 },
  backend: { name: "Backend Developer", rate: 900 },
  tester: { name: "Tester", rate: 600 },
};

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function createEmptyTask() {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    name: "",
    roleId: "frontend",
    hours: "",
  };
}

function formatWorkingTime(hours) {
  const total = Math.max(0, Math.floor(hours));
  const months = Math.floor(total / 160);
  const weeks = Math.floor((total % 160) / 40);
  const days = Math.floor((total % 40) / 8);
  const remainingHours = total % 8;
  const parts = [];

  if (months) parts.push(`${months} ${months === 1 ? "month" : "months"}`);
  if (weeks) parts.push(`${weeks} ${weeks === 1 ? "week" : "weeks"}`);
  if (days) parts.push(`${days} ${days === 1 ? "day" : "days"}`);
  if (remainingHours || parts.length === 0) {
    parts.push(`${remainingHours} ${remainingHours === 1 ? "hour" : "hours"}`);
  }

  return `${parts.join(", ")} (${total.toLocaleString("en-IN")} hours)`;
}

function App() {
  const [tasks, setTasks] = useState([]);

  function handleTaskChange(id, field, value) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, [field]: value } : task)),
    );
  }

  const totalHours = tasks.reduce((sum, task) => sum + (Number(task.hours) || 0), 0);
  const totalCost = tasks.reduce((sum, task) => {
    return sum + (Number(task.hours) || 0) * roles[task.roleId].rate;
  }, 0);

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Project planner</p>
        <h1>Cost estimation</h1>
        <p className="page-description">
          Add tasks and adjust roles or hours to see your estimate update instantly.
        </p>
      </header>

      <section className="estimator-card" aria-labelledby="tasks-heading">
        <div className="section-heading">
          <div>
            <h2 id="tasks-heading">Tasks</h2>
            <p>Each role has an hourly rate that contributes to the total.</p>
          </div>
          <button className="add-button" onClick={() => setTasks((current) => [...current, createEmptyTask()])}>
            <span aria-hidden="true">+</span> Add task
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">SmartEstimate</span>
            <h3>No tasks yet</h3>
            <p>Add a task to start building your project estimate.</p>
          </div>
        ) : (
          <>
            <div className="task-list">
              {tasks.map((task, index) => {
                const hours = Number(task.hours) || 0;
                const cost = hours * roles[task.roleId].rate;

                return (
                  <article className="task-row" key={task.id}>
                    <div className="task-index">{String(index + 1).padStart(2, "0")}</div>
                    <label className="field task-name-field">
                      <span>Task name</span>
                      <input
                        type="text"
                        placeholder="e.g. Design the dashboard"
                        value={task.name}
                        onChange={(event) => handleTaskChange(task.id, "name", event.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>Role</span>
                      <select
                        value={task.roleId}
                        onChange={(event) => handleTaskChange(task.id, "roleId", event.target.value)}
                      >
                        {Object.entries(roles).map(([id, role]) => (
                          <option key={id} value={id}>{role.name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="field hours-field">
                      <span>Time</span>
                      <div className="hours-input">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          placeholder="0"
                          value={task.hours}
                          onChange={(event) => handleTaskChange(task.id, "hours", event.target.value)}
                        />
                        <span>hrs</span>
                      </div>
                    </label>
                    <div className="task-cost">
                      <span>Estimate</span>
                      <strong>{hours > 0 ? inr.format(cost) : "—"}</strong>
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => setTasks((current) => current.filter((item) => item.id !== task.id))}
                      aria-label={`Delete ${task.name || `task ${index + 1}`}`}
                      title="Delete task"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </article>
                );
              })}
            </div>

            <section className="summary" aria-label="Project estimate summary">
              <div className="summary-item">
                <span>Total tasks</span>
                <strong>{tasks.length}</strong>
              </div>
              <div className="summary-item summary-time">
                <span>Total time</span>
                <strong>{formatWorkingTime(totalHours)}</strong>
              </div>
              <div className="summary-item summary-total">
                <span>Estimated cost</span>
                <strong>{inr.format(totalCost)}</strong>
              </div>
            </section>
          </>
        )}
      </section>
      <p className="rate-note">Rates: Frontend Developer ₹800/hr · Backend Developer ₹900/hr · Tester ₹600/hr</p>
    </main>
  );
}

export default App;
