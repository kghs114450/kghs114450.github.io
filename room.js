const roomId =
    localStorage.getItem("currentRoom");

let rooms = JSON.parse(
    localStorage.getItem("studynestRooms")
) || [];

let room =
    rooms.find(
        r => r.id == roomId
    );

if (!room) {

    alert("找不到房間");

    location.href = "index.html";

}

room.tasks = room.tasks || [];
room.events = room.events || [];

document.getElementById(
    "roomTitle"
).textContent = room.name;

/* 儲存資料 */

function saveData() {

    const index =
        rooms.findIndex(
            r => r.id == room.id
        );

    if(index !== -1){

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

    if(text === ""){

        alert("請輸入待辦事項");

        return;

    }

    room.tasks.push({

        text:text,

        done:false

    });

    input.value = "";

    saveData();

    renderTasks();

}

function toggleTask(index){

    room.tasks[index].done =
        !room.tasks[index].done;

    saveData();

    renderTasks();

}

function deleteTask(index){

    room.tasks.splice(index,1);

    saveData();

    renderTasks();

}

function renderTasks(){

    const taskList =
        document.getElementById(
            "taskList"
        );

    taskList.innerHTML = "";

    room.tasks.forEach((task,index)=>{

        taskList.innerHTML += `

        <div class="task-item">

            <div class="task-left">

                <input
                    type="checkbox"
                    ${task.done ? "checked" : ""}
                    onchange="
                        toggleTask(${index})
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
                    deleteTask(${index})
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

function addEvent(){

    const title =
        document.getElementById(
            "eventTitle"
        ).value.trim();

    const date =
        document.getElementById(
            "eventDate"
        ).value;

    if(title === "" || date === ""){

        alert("請填寫完整事件資料");

        return;

    }

    room.events.push({

        title:title,

        date:date

    });

    document.getElementById(
        "eventTitle"
    ).value = "";

    document.getElementById(
        "eventDate"
    ).value = "";

    saveData();

    renderEvents();

}

function deleteEvent(index){

    room.events.splice(index,1);

    saveData();

    renderEvents();

}

function getCountdown(dateString){

    const today =
        new Date();

    const target =
        new Date(dateString);

    today.setHours(0,0,0,0);
    target.setHours(0,0,0,0);

    const diff =
        Math.ceil(
            (target - today)
            /
            (1000*60*60*24)
        );

    if(diff > 0){

        return `剩餘 ${diff} 天`;

    }

    if(diff === 0){

        return "今天";

    }

    return `已過 ${Math.abs(diff)} 天`;

}

function renderEvents(){

    const eventList =
        document.getElementById(
            "eventList"
        );

    eventList.innerHTML = "";

    room.events.sort((a,b)=>
        new Date(a.date)
        -
        new Date(b.date)
    );

    room.events.forEach((event,index)=>{

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
