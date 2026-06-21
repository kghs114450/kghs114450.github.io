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

/* 🔥 刪除過期事件 */

const today = new Date();
today.setHours(0,0,0,0);

room.events = room.events.filter(event=>{
    const d = new Date(event.date);
    d.setHours(0,0,0,0);
    return d >= today;
});

saveData();

document.getElementById("roomTitle").textContent = room.name;

/* 儲存 */

function saveData(){
    const i = rooms.findIndex(r=>r.id==room.id);
    rooms[i] = room;
    localStorage.setItem("studynestRooms", JSON.stringify(rooms));
}

/* 回首頁 */

function goHome(){
    location.href = "index.html";
}

/* 統計 */

function updateStats(){
    document.getElementById("taskCount").textContent =
        room.tasks.length + " 個待辦";

    document.getElementById("eventCount").textContent =
        room.events.length + " 個事件";
}

/* Modal 控制 */

function openTaskModal(){
    document.getElementById("taskModal").style.display="block";
}

function closeTaskModal(){
    document.getElementById("taskModal").style.display="none";
}

function openEventModal(){
    document.getElementById("eventModal").style.display="block";
}

function closeEventModal(){
    document.getElementById("eventModal").style.display="none";
}

/* 待辦 */

function addTask(){

    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if(!text){
        alert("請輸入待辦");
        return;
    }

    room.tasks.push({
        text:text,
        done:false
    });

    input.value="";

    closeTaskModal();

    saveData();

    renderTasks();
    updateStats();
}

function toggleTask(i){
    room.tasks[i].done = !room.tasks[i].done;
    saveData();
    renderTasks();
}

function deleteTask(i){
    room.tasks.splice(i,1);
    saveData();
    renderTasks();
    updateStats();
}

function renderTasks(){

    const list = document.getElementById("taskList");
    list.innerHTML="";

    const sorted = [
        ...room.tasks.filter(t=>!t.done),
        ...room.tasks.filter(t=>t.done)
    ];

    sorted.forEach(task=>{
        const i = room.tasks.indexOf(task);

        list.innerHTML += `
        <div class="task-item">
            <div>
                <input type="checkbox"
                ${task.done?"checked":""}
                onchange="toggleTask(${i})">

                <span class="${task.done?"completed":""}">
                    ${task.text}
                </span>
            </div>

            <button class="delete-btn"
            onclick="deleteTask(${i})">刪除</button>
        </div>
        `;
    });
}

/* 事件 */

function addEvent(){

    const title = document.getElementById("eventTitle").value.trim();
    const date = document.getElementById("eventDate").value;

    if(!title || !date){
        alert("請填完整");
        return;
    }

    room.events.push({title,date});

    document.getElementById("eventTitle").value="";
    document.getElementById("eventDate").value="";

    closeEventModal();

    saveData();

    renderEvents();
    updateStats();
}

function deleteEvent(i){
    room.events.splice(i,1);
    saveData();
    renderEvents();
    updateStats();
}

function getCountdown(date){
    const t = new Date();
    const d = new Date(date);

    t.setHours(0,0,0,0);
    d.setHours(0,0,0,0);

    const diff = Math.ceil((d-t)/(1000*60*60*24));

    if(diff==0) return "今天";
    if(diff>0) return `剩餘 ${diff} 天`;
    return "已過期";
}

function renderEvents(){

    const list = document.getElementById("eventList");
    list.innerHTML="";

    room.events.sort((a,b)=>new Date(a.date)-new Date(b.date));

    room.events.forEach((e,i)=>{
        list.innerHTML += `
        <div class="event-item">
            <div class="event-name">${e.title}</div>
            <div>${e.date}</div>
            <div class="event-countdown">${getCountdown(e.date)}</div>
            <button class="delete-btn"
            onclick="deleteEvent(${i})">刪除</button>
        </div>
        `;
    });
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

/* 🔥 刪除過期事件 */

const today = new Date();
today.setHours(0,0,0,0);

room.events = room.events.filter(event=>{
    const d = new Date(event.date);
    d.setHours(0,0,0,0);
    return d >= today;
});

saveData();

document.getElementById("roomTitle").textContent = room.name;

/* 儲存 */

function saveData(){
    const i = rooms.findIndex(r=>r.id==room.id);
    rooms[i] = room;
    localStorage.setItem("studynestRooms", JSON.stringify(rooms));
}

/* 回首頁 */

function goHome(){
    location.href = "index.html";
}

/* 統計 */

function updateStats(){
    document.getElementById("taskCount").textContent =
        room.tasks.length + " 個待辦";

    document.getElementById("eventCount").textContent =
        room.events.length + " 個事件";
}

/* Modal 控制 */

function openTaskModal(){
    document.getElementById("taskModal").style.display="block";
}

function closeTaskModal(){
    document.getElementById("taskModal").style.display="none";
}

function openEventModal(){
    document.getElementById("eventModal").style.display="block";
}

function closeEventModal(){
    document.getElementById("eventModal").style.display="none";
}

/* 待辦 */

function addTask(){

    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if(!text){
        alert("請輸入待辦");
        return;
    }

    room.tasks.push({
        text:text,
        done:false
    });

    input.value="";

    closeTaskModal();

    saveData();

    renderTasks();
    updateStats();
}

function toggleTask(i){
    room.tasks[i].done = !room.tasks[i].done;
    saveData();
    renderTasks();
}

function deleteTask(i){
    room.tasks.splice(i,1);
    saveData();
    renderTasks();
    updateStats();
}

function renderTasks(){

    const list = document.getElementById("taskList");
    list.innerHTML="";

    const sorted = [
        ...room.tasks.filter(t=>!t.done),
        ...room.tasks.filter(t=>t.done)
    ];

    sorted.forEach(task=>{
        const i = room.tasks.indexOf(task);

        list.innerHTML += `
        <div class="task-item">
            <div>
                <input type="checkbox"
                ${task.done?"checked":""}
                onchange="toggleTask(${i})">

                <span class="${task.done?"completed":""}">
                    ${task.text}
                </span>
            </div>

            <button class="delete-btn"
            onclick="deleteTask(${i})">刪除</button>
        </div>
        `;
    });
}

/* 事件 */

function addEvent(){

    const title = document.getElementById("eventTitle").value.trim();
    const date = document.getElementById("eventDate").value;

    if(!title || !date){
        alert("請填完整");
        return;
    }

    room.events.push({title,date});

    document.getElementById("eventTitle").value="";
    document.getElementById("eventDate").value="";

    closeEventModal();

    saveData();

    renderEvents();
    updateStats();
}

function deleteEvent(i){
    room.events.splice(i,1);
    saveData();
    renderEvents();
    updateStats();
}

function getCountdown(date){
    const t = new Date();
    const d = new Date(date);

    t.setHours(0,0,0,0);
    d.setHours(0,0,0,0);

    const diff = Math.ceil((d-t)/(1000*60*60*24));

    if(diff==0) return "今天";
    if(diff>0) return `剩餘 ${diff} 天`;
    return "已過期";
}

function renderEvents(){

    const list = document.getElementById("eventList");
    list.innerHTML="";

    room.events.sort((a,b)=>new Date(a.date)-new Date(b.date));

    room.events.forEach((e,i)=>{
        list.innerHTML += `
        <div class="event-item">
            <div class="event-name">${e.title}</div>
            <div>${e.date}</div>
            <div class="event-countdown">${getCountdown(e.date)}</div>
            <button class="delete-btn"
            onclick="deleteEvent(${i})">刪除</button>
        </div>
        `;
    });
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

/* 🔥 刪除過期事件 */

const today = new Date();
today.setHours(0,0,0,0);

room.events = room.events.filter(event=>{
    const d = new Date(event.date);
    d.setHours(0,0,0,0);
    return d >= today;
});

saveData();

document.getElementById("roomTitle").textContent = room.name;

/* 儲存 */

function saveData(){
    const i = rooms.findIndex(r=>r.id==room.id);
    rooms[i] = room;
    localStorage.setItem("studynestRooms", JSON.stringify(rooms));
}

/* 回首頁 */

function goHome(){
    location.href = "index.html";
}

/* 統計 */

function updateStats(){
    document.getElementById("taskCount").textContent =
        room.tasks.length + " 個待辦";

    document.getElementById("eventCount").textContent =
        room.events.length + " 個事件";
}

/* Modal 控制 */

function openTaskModal(){
    document.getElementById("taskModal").style.display="block";
}

function closeTaskModal(){
    document.getElementById("taskModal").style.display="none";
}

function openEventModal(){
    document.getElementById("eventModal").style.display="block";
}

function closeEventModal(){
    document.getElementById("eventModal").style.display="none";
}

/* 待辦 */

function addTask(){

    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if(!text){
        alert("請輸入待辦");
        return;
    }

    room.tasks.push({
        text:text,
        done:false
    });

    input.value="";

    closeTaskModal();

    saveData();

    renderTasks();
    updateStats();
}

function toggleTask(i){
    room.tasks[i].done = !room.tasks[i].done;
    saveData();
    renderTasks();
}

function deleteTask(i){
    room.tasks.splice(i,1);
    saveData();
    renderTasks();
    updateStats();
}

function renderTasks(){

    const list = document.getElementById("taskList");
    list.innerHTML="";

    const sorted = [
        ...room.tasks.filter(t=>!t.done),
        ...room.tasks.filter(t=>t.done)
    ];

    sorted.forEach(task=>{
        const i = room.tasks.indexOf(task);

        list.innerHTML += `
        <div class="task-item">
            <div>
                <input type="checkbox"
                ${task.done?"checked":""}
                onchange="toggleTask(${i})">

                <span class="${task.done?"completed":""}">
                    ${task.text}
                </span>
            </div>

            <button class="delete-btn"
            onclick="deleteTask(${i})">刪除</button>
        </div>
        `;
    });
}

/* 事件 */

function addEvent(){

    const title = document.getElementById("eventTitle").value.trim();
    const date = document.getElementById("eventDate").value;

    if(!title || !date){
        alert("請填完整");
        return;
    }

    room.events.push({title,date});

    document.getElementById("eventTitle").value="";
    document.getElementById("eventDate").value="";

    closeEventModal();

    saveData();

    renderEvents();
    updateStats();
}

function deleteEvent(i){
    room.events.splice(i,1);
    saveData();
    renderEvents();
    updateStats();
}

function getCountdown(date){
    const t = new Date();
    const d = new Date(date);

    t.setHours(0,0,0,0);
    d.setHours(0,0,0,0);

    const diff = Math.ceil((d-t)/(1000*60*60*24));

    if(diff==0) return "今天";
    if(diff>0) return `剩餘 ${diff} 天`;
    return "已過期";
}

function renderEvents(){

    const list = document.getElementById("eventList");
    list.innerHTML="";

    room.events.sort((a,b)=>new Date(a.date)-new Date(b.date));

    room.events.forEach((e,i)=>{
        list.innerHTML += `
        <div class="event-item">
            <div class="event-name">${e.title}</div>
            <div>${e.date}</div>
            <div class="event-countdown">${getCountdown(e.date)}</div>
            <button class="delete-btn"
            onclick="deleteEvent(${i})">刪除</button>
        </div>
        `;
    });
}

/* 初始化 */

renderTasks();
renderEvents();
updateStats();
