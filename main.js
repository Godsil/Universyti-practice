document.addEventListener("DOMContentLoaded", () => {
  const tasksList = document.getElementById("tasks");
  const form = document.getElementById("taskForm");
  const descriptionInput = document.getElementById("description");

  function loadTasks() {
    fetch("/tasks")
      .then((res) => res.json())
      .then((tasks) => {
        // \hello world
        tasksList.innerHTML = "";
        tasks.forEach((task) => {
          const li = document.createElement("li");
          li.textContent = task.description;
          tasksList.appendChild(li);
        });
      });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = descriptionInput.value.trim();
    if (!description) return;

    fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    }).then((res) => {
      if (res.ok) {
        descriptionInput.value = "";
        loadTasks();
      } else {
        alert("������ ��� ���������� ������");
      }
    });
  });

  loadTasks();
});
