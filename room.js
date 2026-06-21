const roomId = localStorage.getItem("currentRoom");

let rooms = JSON.parse(
    localStorage.getItem("studynestRooms")
) || [];

let room = rooms.find(
    r => r.id == roomId
);

if (!room) {

    alert("找不到房間");

    location.href = "index.html";

}

room.tasks = room.tasks || [];
room.events = room.events || [];

/* =========================
   自動刪除過期事件
========================= */

const today = new Date();

today.setHours(0, 0, 0, 0);

room.events = room.events.filter(event => {

    const target = new Date(event.date);

    target.setHours(0, 0, 0, 0);

    return target >= today;

});

document.getElementById(
    "roomTitle"
).textContent = room.name;

/* =========================
   儲存資料
========================= */

function saveData() {

    const index = rooms.findIndex(
        r => r.id === room.id
    );

    if (index !== -1) {

        rooms[index] = room;

    }

    localStorage.setItem(
        "studynestRooms",
        JSON.stringify(rooms)
    );

}

/* 先儲存一次過濾後的事件 */

saveData();

/* =========================
   回首頁
========================= */

function goHome() {

    location.href = "index.html";

}

/* =========================
   統計
========================= */

function updateStats() {

    document.getElementById(
        "taskCount"
    ).textContent =
        room.tasks.length + " 個待辦";

    document.getElementById(
        "eventCount"
    ).textContent =
        room.events.length + " 個事件";

}

/* =========================
   表單開關
========================= */

function toggleTaskForm() {

    document
        .getElementById("taskForm")
        .classList
        .toggle("hidden");

}

function toggleEventForm() {

    document
        .getElementById("eventForm")
        .classList
        .toggle("hidden");

}

/* =========================
   待辦事項
========================= */

function addTask() {

    const input =
        document.getElementById(
            "taskInput"
        );

    const text =
        input.value.trim();

    if (!text) {

        alert("請輸入待辦事項");

        return;

    }

    room.tasks.push({

        text: text,

        done: false

    });

    input.value = "";

    saveData();

    renderTasks();

    updateStats();

    document
        .getElementById("taskForm")
        .classList.add("hidden");

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

    const taskList =
        document.getElementById(
            "taskList"
        );

    taskList.innerHTML = "";

    const activeTasks =
        room.tasks.filter(
            task => !task.done
        );

    const completedTasks =
        room.tasks.filter(
            task => task.done
        );

    const sortedTasks = [

        ...activeTasks,

        ...completedTasks

    ];

    if (sortedTasks.length === 0) {

        taskList.innerHTML = `

        <div class="empty">

            尚無待辦事項

        </div>

        `;

        return;

    }

    sortedTasks.forEach(task => {

        const realIndex =
            room.tasks.indexOf(task);

        taskList.innerHTML += `

        <div class="task-item">

            <div class="task-left">

                <input
                    type="checkbox"
                    ${task.done ? "checked" : ""}
                    onchange="
                        toggleTask(${realIndex})
                    "
                >

                <span class="
                    ${task.done ? "completed" : ""}
                ">
                    ${task.text}
                </span>

            </div>

            <button
                class="delete-btn"
                onclick="
                    deleteTask(${realIndex})
                "
            >
                刪除
            </button>

        </div>

        `;

    });

}

/* =========================
   事件
========================= */

function addEvent() {

    const title =
        document.getElementById(
            "eventTitle"
        ).value.trim();

    const date =
        document.getElementById(
            "eventDate"
        ).value;

    if (!title || !date) {

        alert("請填寫完整事件資料");

        return;

    }

    room.events.push({

        title: title,

        date: date

    });

    document.getElementById(
        "eventTitle"
    ).value = "";

    document.getElementById(
        "eventDate"
    ).value = "";

    saveData();

    renderEvents();

    updateStats();

    document
        .getElementById("eventForm")
        .classList.add("hidden");

}

function deleteEvent(index) {

    room.events.splice(index, 1);

    saveData();

    renderEvents();

    updateStats();

}

function getCountdown(dateString) {

    const today =
        new Date();

    const target =
        new Date(dateString);

    today.setHours(0,0,0,0);
    target.setHours(0,0,0,0);

    const diff = Math.ceil(

        (target - today)

        /

        (1000 * 60 * 60 * 24)

    );

    if (diff === 0) {

        return "今天";

    }

    if (diff > 0) {

        return `剩餘 ${diff} 天`;

    }

    return "已過期";

}

function renderEvents() {

    const eventList =
        document.getElementById(
            "eventList"
        );

    eventList.innerHTML = "";

    room.events.sort(

        (a, b) =>

        new Date(a.date)

        -

        new Date(b.date)

    );

    if (room.events.length === 0) {

        eventList.innerHTML = `

        <div class="empty">

            尚無事件

        </div>

        `;

        return;

    }

    room.events.forEach((event, index) => {

        eventList.innerHTML += `

        <div class="event-item">

            <div class="event-name">

                ${event.title}

            </div>

            <div class="event-date">

                ${event.date}

            </div>

            <div class="event-countdown">

                ${getCountdown(event.date)}

            </div>

            <br>

            <button
                class="delete-btn"
                onclick="
                    deleteEvent(${index})
                "
            >
                刪除
            </button>

        </div>

        `;

    });

}

/* =========================
   初始化
========================= */

renderTasks();

renderEvents();

updateStats();
