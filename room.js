const roomId = localStorage.getItem("currentRoom");

let rooms = JSON.parse(localStorage.getItem("studynest_rooms")) || [];

let room = rooms.find(r => r.id == roomId);

if (!room) {
    alert("找不到房間");
    location.href = "index.html";
}

room.tasks = room.tasks || [];
room.events = room.events || [];

document.getElementById("roomTitle").textContent = room.name;

function saveData() {

    const index = rooms.findIndex(r => r.id == room.id);

    rooms[index] = room;

    localStorage.setItem(
        "studynest_rooms",
        JSON.stringify(rooms)
    );
}

function goHome() {
    location.href = "index.html";
}

function renderTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    room.tasks.forEach((task,index)=>{

        const div =
            document.createElement("div");

        div.className = "task-item";

        div.innerHTML = `
            <div class="task-left">
                <input
                    type="checkbox"
                    ${task.done ? "checked" : ""}
                    onchange="toggleTask(${index})"
                >

                <span class="${task.done ? "completed" : ""}">
                    ${task.text}
                </span>
            </div>

            <button
                class="delete-btn"
                onclick="deleteTask(${index})"
            >
                刪除
            </button>
        `;

        taskList.appendChild(div);

    });

}

function addTask(){

    const input =
        document.getElementById("taskInput");

    const text = input.value.trim();

    if(text==="") return;

    room.tasks.push({
        text:text,
        done:false
    });

    saveData();

    renderTasks();

    input.value="";
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

function getCountdown(dateString){

    const today = new Date();

    const target = new Date(dateString);

    today.setHours(0,0,0,0);
    target.setHours(0,0,0,0);

    const diff =
        Math.ceil(
            (target - today)
            / (1000*60*60*24)
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
        document.getElementById("eventList");

    eventList.innerHTML = "";

    room.events.sort((a,b)=>
        new Date(a.date)-new Date(b.date)
    );

    room.events.forEach((event,index)=>{

        const div =
            document.createElement("div");

        div.className = "event-item";

        div.innerHTML = `
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
                onclick="deleteEvent(${index})"
                style="margin-top:10px"
            >
                刪除
            </button>
        `;

        eventList.appendChild(div);

    });

}

function addEvent(){

    const title =
        document.getElementById("eventTitle")
        .value.trim();

    const date =
        document.getElementById("eventDate")
        .value;

    if(title==="" || date===""){
        return;
    }

    room.events.push({
        title,
        date
    });

    saveData();

    renderEvents();

    document.getElementById("eventTitle").value="";
    document.getElementById("eventDate").value="";
}

function deleteEvent(index){

    room.events.splice(index,1);

    saveData();

    renderEvents();
}

renderTasks();
renderEvents();
