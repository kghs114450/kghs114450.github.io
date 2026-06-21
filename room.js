let room = JSON.parse(
    localStorage.getItem("currentRoom")
);

if (!room) {
    alert("找不到房間資料");
    location.href = "index.html";
}

document.getElementById(
    "roomTitle"
).textContent = room.name;

function saveRoom() {

    let rooms = JSON.parse(
        localStorage.getItem("studynestRooms")
    ) || [];

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

    localStorage.setItem(
        "currentRoom",
        JSON.stringify(room)
    );

}

function goBack() {

    location.href = "index.html";

}

function addTask() {

    const input =
        document.getElementById(
            "taskInput"
        );

    const title =
        input.value.trim();

    if (title === "") {

        alert("請輸入待辦事項");

        return;

    }

    room.tasks.push({

        id: Date.now(),

        title: title

    });

    input.value = "";

    saveRoom();

    renderTasks();

}

function deleteTask(taskId) {

    room.tasks =
        room.tasks.filter(
            task => task.id !== taskId
        );

    saveRoom();

    renderTasks();

}

function renderTasks() {

    const list =
        document.getElementById(
            "taskList"
        );

    list.innerHTML = "";

    room.tasks.forEach(task => {

        list.innerHTML += `

        <li>

            ${task.title}

            <button onclick="
                deleteTask(${task.id})
            ">
                刪除
            </button>

        </li>

        `;

    });

}

function addEvent() {

    const titleInput =
        document.getElementById(
            "eventTitle"
        );

    const dateInput =
        document.getElementById(
            "eventDate"
        );

    const title =
        titleInput.value.trim();

    const date =
        parseInt(dateInput.value);

    if (title === "") {

        alert("請輸入事件名稱");

        return;

    }

    if (!date || date < 1 || date > 30) {

        alert("日期請輸入1~30");

        return;

    }

    room.events.push({

        id: Date.now(),

        title: title,

        date: date

    });

    titleInput.value = "";

    dateInput.value = "";

    saveRoom();

    renderEvents();

}

function deleteEvent(eventId) {

    room.events =
        room.events.filter(
            event => event.id !== eventId
        );

    saveRoom();

    renderEvents();

}

function renderEvents() {

    const container =
        document.getElementById(
            "eventList"
        );

    container.innerHTML = "";

    const today =
        new Date().getDate();

    room.events.forEach(event => {

        const countdown =
            event.date - today;

        container.innerHTML += `

        <div class="room">

            <h3>
                ${event.title}
            </h3>

            <p>
                日期：
                ${event.date} 號
            </p>

            <p>
                ⏳ 倒數：
                ${countdown} 天
            </p>

            <button onclick="
                deleteEvent(${event.id})
            ">
                刪除事件
            </button>

        </div>

        `;

    });

}

renderTasks();

renderEvents();
