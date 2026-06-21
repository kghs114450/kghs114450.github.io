let rooms = JSON.parse(
    localStorage.getItem("studynestRooms")
) || [];

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

}

function deleteRoom(roomId) {

    rooms = rooms.filter(
        room => room.id !== roomId
    );

    saveData();

    renderRooms();

}

function openRoom(roomId) {

    const room =
        rooms.find(
            r => r.id === roomId
        );

    localStorage.setItem(
        "currentRoom",
        JSON.stringify(room)
    );

    location.href = "room.html";

}

function renderRooms() {

    const container =
        document.getElementById(
            "roomContainer"
        );

    container.innerHTML = "";

    rooms.forEach(room => {

        container.innerHTML += `

        <div class="room">

            <h3>${room.name}</h3>

            <p>
                📋 待辦數量：
                ${room.tasks.length}
            </p>

            <p>
                📅 事件數量：
                ${room.events.length}
            </p>

            <button onclick="
                openRoom(${room.id})
            ">
                進入房間
            </button>

            <button onclick="
                deleteRoom(${room.id})
            ">
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

            if (!room.events) return;

            room.events.forEach(event => {

                if (event.date == day) {

                    html += `
                    <div class="event">
                        ${event.title}
                    </div>
                    `;

                }

            });

        });

        html += `</div>`;

        grid.innerHTML += html;

    }

}

renderRooms();

renderCalendar();
