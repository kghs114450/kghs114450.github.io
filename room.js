const roomId = localStorage.getItem("currentRoom");

let rooms = JSON.parse(
    localStorage.getItem("studynestRooms")
) || [];

let room = rooms.find(r => r.id == roomId);

if (!room) {
    alert("找不到房間");
    location.href = "index.html";
}

room.tasks = room.tasks || [];
room.events = room.events || [];

/* 刪除過期事件 */

const today = new Date();
today.setHours(0, 0, 0, 0);

room.events = room.events.filter(event => {
    const d = new Date(event.date);
    d.setHours(0, 0, 0, 0);
    return d >= today;
});

saveData();

/* 標題 */

const titleElement = document.getElementById("roomTitle");

if (titleElement) {
    titleElement.textContent = room.name;
}

/* 儲存 */

function saveData() {
    const index = rooms.findIndex(
        r => r.id == room.id
    );

    if (index !== -1) {
        rooms[index] = room;
    }

    localStorage.setItem(
        "studynestRooms",
        JSON.stringify(rooms)
    );
}

/* 回首頁 */

function goHome() {
    location.href = "index.html";
}

/* 統計 */

function updateStats() {

    const taskCount =
        document.getElementById("taskCount");

    const eventCount =
        document.getElementById("eventCount");

    if (taskCount) {
        taskCount.textContent =
            room.tasks.length + " 個待辦";
    }

    if (eventCount) {
        eventCount.textContent =
            room.events.length + " 個事件";
    }
}

/* Modal */

function openTaskModal() {
    const modal =
        document.getElementById("taskModal");

    if (modal) {
        modal.style.display = "flex";
    }
}

function closeTaskModal() {
    const modal =
        document.getElementById("taskModal");

    if (modal) {
        modal.style.display = "none";
    }
}

function openEventModal() {
    const modal =
        document.getElementById("eventModal");

    if (modal) {
        modal.style.display = "flex";
    }
}

function closeEventModal() {
    const modal =
        document.getElementById("eventModal");

    if (modal) {
        modal.style.display = "none";
    }
}

/* 待辦 */

function addTask() {

    const input =
        document.getElementById("taskInput");

    if (!input) return;

    const text = input.value.trim();

    if (!text) {
        alert("請輸入待辦名稱");
        return;
    }

    room.tasks.push({
        text: text,
        done: false
    });

    input.value = "";

    saveData();
    closeTaskModal();

    renderTasks();
    updateStats();
}

function toggleTask(index) {

    room.tasks[index].done =
        !room.tasks[index].done;

    saveData();
    renderTasks();
}

function deleteTask(index) {

    room.tasks.splice(index, 1);

    saveData();
    renderTasks();
    updateStats();
}

function renderTasks() {

    const list =
        document.getElementById("taskList");

    if (!list) return;

    list.innerHTML = "";

    const sortedTasks = [
        ...room.tasks.filter(task => !task.done),
        ...room.tasks.filter(task => task.done)
    ];

    sortedTasks.forEach(task => {

        const originalIndex =
            room.tasks.indexOf(task);

        const div =
            document.createElement("div");

        div.className = "task-item";

        div.innerHTML = `
            <div>
                <input
                    type="checkbox"
                    ${task.done ? "checked" : ""}
                    onchange="toggleTask(${originalIndex})"
                >

                <span class="${task.done ? "completed" : ""}">
                    ${task.text}
                </span>
            </div>

            <button
                class="delete-btn"
                onclick="deleteTask(${originalIndex})"
            >
                刪除
            </button>
        `;

        list.appendChild(div);
    });
}

/* 事件 */

function addEvent() {

    const titleInput =
        document.getElementById("eventTitle");

    const dateInput =
        document.getElementById("eventDate");

    if (!titleInput || !dateInput) return;

    const title =
        titleInput.value.trim();

    const date =
        dateInput.value;

    if (!title || !date) {
        alert("請填寫完整資訊");
        return;
    }

    room.events.push({
        title: title,
        date: date
    });

    titleInput.value = "";
    dateInput.value = "";

    saveData();
    closeEventModal();

    renderEvents();
    updateStats();
}

function deleteEvent(index) {

    room.events.splice(index, 1);

    saveData();
    renderEvents();
    updateStats();
}

function getCountdown(date) {

    const today = new Date();
    const target = new Date(date);

    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diff =
        target - today;

    const days =
        Math.floor(
            diff /
            (1000 * 60 * 60 * 24)
        );

    if (days === 0) {
        return "今天";
    }

    if (days === 1) {
        return "明天";
    }

    return `${days} 天後`;
}

function renderEvents() {

    const list =
        document.getElementById("eventList");

    if (!list) return;

    list.innerHTML = "";

    room.events.sort(
        (a, b) =>
            new Date(a.date) -
            new Date(b.date)
    );

    room.events.forEach(
        (event, index) => {

            const div =
                document.createElement("div");

            div.className =
                "event-item";

            div.innerHTML = `
                <div>
                    <strong>
                        ${event.title}
                    </strong>
                    <br>
                    ${event.date}
                    (${getCountdown(event.date)})
                </div>

                <button
                    class="delete-btn"
                    onclick="deleteEvent(${index})"
                >
                    刪除
                </button>
            `;

            list.appendChild(div);
        }
    );
}

/* 初始化 */

renderTasks();
renderEvents();
updateStats();const roomId = localStorage.getItem("currentRoom");

let rooms = JSON.parse(
    localStorage.getItem("studynestRooms")
) || [];

let room = rooms.find(r => r.id == roomId);

if (!room) {
    alert("找不到房間");
    location.href = "index.html";
}

room.tasks = room.tasks || [];
room.events = room.events || [];

/* 刪除過期事件 */

const today = new Date();
today.setHours(0, 0, 0, 0);

room.events = room.events.filter(event => {
    const d = new Date(event.date);
    d.setHours(0, 0, 0, 0);
    return d >= today;
});

saveData();

/* 標題 */

const titleElement = document.getElementById("roomTitle");

if (titleElement) {
    titleElement.textContent = room.name;
}

/* 儲存 */

function saveData() {
    const index = rooms.findIndex(
        r => r.id == room.id
    );

    if (index !== -1) {
        rooms[index] = room;
    }

    localStorage.setItem(
        "studynestRooms",
        JSON.stringify(rooms)
    );
}

/* 回首頁 */

function goHome() {
    location.href = "index.html";
}

/* 統計 */

function updateStats() {

    const taskCount =
        document.getElementById("taskCount");

    const eventCount =
        document.getElementById("eventCount");

    if (taskCount) {
        taskCount.textContent =
            room.tasks.length + " 個待辦";
    }

    if (eventCount) {
        eventCount.textContent =
            room.events.length + " 個事件";
    }
}

/* Modal */

function openTaskModal() {
    const modal =
        document.getElementById("taskModal");

    if (modal) {
        modal.style.display = "flex";
    }
}

function closeTaskModal() {
    const modal =
        document.getElementById("taskModal");

    if (modal) {
        modal.style.display = "none";
    }
}

function openEventModal() {
    const modal =
        document.getElementById("eventModal");

    if (modal) {
        modal.style.display = "flex";
    }
}

function closeEventModal() {
    const modal =
        document.getElementById("eventModal");

    if (modal) {
        modal.style.display = "none";
    }
}

/* 待辦 */

function addTask() {

    const input =
        document.getElementById("taskInput");

    if (!input) return;

    const text = input.value.trim();

    if (!text) {
        alert("請輸入待辦名稱");
        return;
    }

    room.tasks.push({
        text: text,
        done: false
    });

    input.value = "";

    saveData();
    closeTaskModal();

    renderTasks();
    updateStats();
}

function toggleTask(index) {

    room.tasks[index].done =
        !room.tasks[index].done;

    saveData();
    renderTasks();
}

function deleteTask(index) {

    room.tasks.splice(index, 1);

    saveData();
    renderTasks();
    updateStats();
}

function renderTasks() {

    const list =
        document.getElementById("taskList");

    if (!list) return;

    list.innerHTML = "";

    const sortedTasks = [
        ...room.tasks.filter(task => !task.done),
        ...room.tasks.filter(task => task.done)
    ];

    sortedTasks.forEach(task => {

        const originalIndex =
            room.tasks.indexOf(task);

        const div =
            document.createElement("div");

        div.className = "task-item";

        div.innerHTML = `
            <div>
                <input
                    type="checkbox"
                    ${task.done ? "checked" : ""}
                    onchange="toggleTask(${originalIndex})"
                >

                <span class="${task.done ? "completed" : ""}">
                    ${task.text}
                </span>
            </div>

            <button
                class="delete-btn"
                onclick="deleteTask(${originalIndex})"
            >
                刪除
            </button>
        `;

        list.appendChild(div);
    });
}

/* 事件 */

function addEvent() {

    const titleInput =
        document.getElementById("eventTitle");

    const dateInput =
        document.getElementById("eventDate");

    if (!titleInput || !dateInput) return;

    const title =
        titleInput.value.trim();

    const date =
        dateInput.value;

    if (!title || !date) {
        alert("請填寫完整資訊");
        return;
    }

    room.events.push({
        title: title,
        date: date
    });

    titleInput.value = "";
    dateInput.value = "";

    saveData();
    closeEventModal();

    renderEvents();
    updateStats();
}

function deleteEvent(index) {

    room.events.splice(index, 1);

    saveData();
    renderEvents();
    updateStats();
}

function getCountdown(date) {

    const today = new Date();
    const target = new Date(date);

    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diff =
        target - today;

    const days =
        Math.floor(
            diff /
            (1000 * 60 * 60 * 24)
        );

    if (days === 0) {
        return "今天";
    }

    if (days === 1) {
        return "明天";
    }

    return `${days} 天後`;
}

function renderEvents() {

    const list =
        document.getElementById("eventList");

    if (!list) return;

    list.innerHTML = "";

    room.events.sort(
        (a, b) =>
            new Date(a.date) -
            new Date(b.date)
    );

    room.events.forEach(
        (event, index) => {

            const div =
                document.createElement("div");

            div.className =
                "event-item";

            div.innerHTML = `
                <div>
                    <strong>
                        ${event.title}
                    </strong>
                    <br>
                    ${event.date}
                    (${getCountdown(event.date)})
                </div>

                <button
                    class="delete-btn"
                    onclick="deleteEvent(${index})"
                >
                    刪除
                </button>
            `;

            list.appendChild(div);
        }
    );
}

/* 初始化 */

renderTasks();
renderEvents();
updateStats();
