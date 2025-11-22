const modal = document.getElementById("taskModal");
const taskInput = document.getElementById("taskInput");

document.getElementById("addTaskBtn").addEventListener("click", () => {
    modal.style.display = "block";
    taskInput.value = "";
    taskInput.focus();
});


document.getElementById("modalAdd").addEventListener("click", () => {
    let text = taskInput.value.trim();
    if (text === "") return;

    const task = createTask(text);
    document.querySelector('[data-status="todo"] .taskList').appendChild(task);

    modal.style.display = "none";
});

document.getElementById("modalCancel").addEventListener("click", () => {
    modal.style.display = "none";
});


function createTask(text) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = text;

    task.draggable = true;

    task.addEventListener("dragstart", () => {
        task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
    });

    return task;
}


document.querySelectorAll(".taskList").forEach(list => {
    list.addEventListener("dragover", e => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        if (dragging) list.appendChild(dragging);
    });
});


const clearModal = document.getElementById("clearModal");

document.getElementById("clearBoardBtn").addEventListener("click", () => {
    clearModal.style.display = "block";
});


document.getElementById("clearYes").addEventListener("click", () => {
    document.querySelectorAll(".taskList").forEach(list => list.innerHTML = "");
    clearModal.style.display = "none";
});


document.getElementById("clearNo").addEventListener("click", () => {
    clearModal.style.display = "none";
});


window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
    if (e.target === clearModal) clearModal.style.display = "none";
});

document.getElementById("saveBoardBtn").addEventListener("click", () => {
   
    const element = document.querySelector(".board");
    const options = {
        margin: [10, 10, 10, 10], 
        filename: 'kanban_ploca.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
});
