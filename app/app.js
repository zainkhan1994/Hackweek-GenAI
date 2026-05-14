const defaultTasks = [
  {
    id: "branch",
    label: "Created my-first-branch",
    detail: "Started work on an isolated branch.",
    done: true,
  },
  {
    id: "profile",
    label: "Added PROFILE.md",
    detail: "Committed the profile introduction file.",
    done: true,
  },
  {
    id: "pull-request",
    label: "Opened a pull request",
    detail: "Shared progress for collaboration.",
    done: true,
  },
  {
    id: "merge",
    label: "Merged the pull request",
    detail: "Closed the loop on the workflow.",
    done: true,
  },
];

let tasks = defaultTasks.map((task) => ({ ...task }));

const taskList = document.getElementById("task-list");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const progressMessage = document.getElementById("progress-message");
const progressBar = document.querySelector(".progress-bar");
const markAllButton = document.getElementById("mark-all");
const resetButton = document.getElementById("reset");

const progressMessages = [
  "Kickstart the journey by completing your first step.",
  "Nice momentum—keep building confidence.",
  "Great progress. You're more than halfway there.",
  "Almost there! Finalize the last milestone.",
  "All milestones complete. Showcase ready.",
];

const renderTasks = () => {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const label = document.createElement("label");
    label.className = "task-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", task.label);

    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      updateProgress();
      renderTasks();
    });

    const title = document.createElement("span");
    title.textContent = task.label;

    label.appendChild(checkbox);
    label.appendChild(title);

    const status = document.createElement("span");
    status.className = "task-status";
    status.textContent = task.detail;

    listItem.appendChild(label);
    listItem.appendChild(status);

    if (task.done) {
      listItem.classList.add("complete");
      status.classList.add("complete");
      status.textContent = "Completed";
    }

    taskList.appendChild(listItem);
  });
};

const updateProgress = () => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.done).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  progressText.textContent = `${completed} of ${total} complete`;
  progressFill.style.width = `${percentage}%`;
  progressBar.setAttribute("aria-valuenow", percentage.toString());

  const messageIndex = Math.min(
    progressMessages.length - 1,
    Math.round((percentage / 100) * (progressMessages.length - 1))
  );
  progressMessage.textContent = progressMessages[messageIndex];
};

const setAllTasks = (value) => {
  tasks = tasks.map((task) => ({ ...task, done: value }));
  updateProgress();
  renderTasks();
};

markAllButton.addEventListener("click", () => setAllTasks(true));
resetButton.addEventListener("click", () => setAllTasks(false));

updateProgress();
renderTasks();
