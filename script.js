let rooms = JSON.parse(
    localStorage.getItem("studynestRooms")
) || [];

/* 修復舊資料 */
rooms = rooms.map(room => ({
    id: room.id,
    name: room.name || "未命名房間",
    tasks: room.tasks || [],
    events: room.events || []
}));

saveData();

function saveData() {

    localStorage.setItem(
        "studynestRooms",
        JSON.stringify(rooms)
    );

}

function addRoom() {

    const input =
        document.getElementById(
            "roomNameInput"
        );

    const name =
        input.value.trim();

    if (name === "") {

        alert("請輸入房間名稱");

        return;
    }

    rooms.push({

        id: Date.now(),

        name: name,

        tasks: [],

        events: []

    });

    input.value = "";

    saveData();

    renderRooms();

    renderCalendar();

}

function deleteRoom(roomId) {

    if (!confirm("確定刪除房間？")) {
        return;
    }

    rooms = rooms.filter(
        room => room.id !== roomId
    );

    saveData();

    renderRooms();

    renderCalendar();

}

function openRoom(roomId) {

    const room =
        rooms.find(
            r => r.id === roomId
        );

    if (!room) return;

    localStorage.setItem(
        "currentRoom",
        JSON.stringify(room)
    );

    location.href =
        "room.html";

}

function renderRooms() {

    const container =
        document.getElementById(
            "roomContainer"
        );

    if (!container) return;

    container.innerHTML = "";

    if (rooms.length === 0) {

        container.innerHTML = `
            <p>尚未建立房間</p>
        `;

        return;
    }

    rooms.forEach(room => {

        container.innerHTML += `

        <div class="room">

            <h4>${room.name}</h4>

            <p>
                📋 ${(room.tasks || []).length} 個待辦
            </p>

            <p>
                📅 ${(room.events || []).length} 個事件
            </p>

            <button onclick="openRoom(${room.id})">
                進入房間
            </button>

            <button onclick="deleteRoom(${room.id})">
                刪除房間
            </button>

        </div>

        `;

    });

}

function renderCalendar() {

    const grid =
        document.getElementById(
            "calendarGrid"
        );

    if (!grid) return;

    grid.innerHTML = "";

    for (let day = 1; day <= 30; day++) {

        let html = `
        <div class="day">
            <div>${day}</div>
        `;

        rooms.forEach(room => {

            const events =
                room.events || [];

            events.forEach(event => {

                if (Number(event.date) === day) {

                    html += `
                    <div class="event">
                        ${event.title}
                    </div>
                    `;

                }

            });

        });

        html += `
        </div>
        `;

        grid.innerHTML += html;

    }

}

renderRooms();

renderCalendar();
