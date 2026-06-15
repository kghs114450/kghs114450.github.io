let rooms = JSON.parse(
    localStorage.getItem("studynestRooms")
) || [];

function saveData(){

    localStorage.setItem(
        "studynestRooms",
        JSON.stringify(rooms)
    );

}

function addRoom(){

    const input =
        document.getElementById("roomNameInput");

    const name = input.value.trim();

    if(name===""){
        alert("請輸入房間名稱");
        return;
    }

    rooms.push({
        id:Date.now(),
        name:name,
        tasks:[]
    });

    input.value="";

    saveData();

    renderRooms();

    renderCalendar();
}

function deleteRoom(roomId){

    rooms = rooms.filter(
        room => room.id !== roomId
    );

    saveData();

    renderRooms();

    renderCalendar();
}

function addTask(roomId){

    const titleInput =
        document.getElementById(
            `taskTitle-${roomId}`
        );

    const dateInput =
        document.getElementById(
            `taskDate-${roomId}`
        );

    const title =
        titleInput.value.trim();

    const date =
        parseInt(dateInput.value);

    if(title===""){

        alert("請輸入任務名稱");

        return;
    }

    if(!date || date<1 || date>30){

        alert("日期請輸入1~30");

        return;
    }

    const room =
        rooms.find(r => r.id===roomId);

    room.tasks.push({

        id:Date.now(),

        title:title,

        date:date

    });

    titleInput.value="";
    dateInput.value="";

    saveData();

    renderRooms();

    renderCalendar();
}

function deleteTask(roomId,taskId){

    const room =
        rooms.find(r=>r.id===roomId);

    room.tasks =
        room.tasks.filter(
            task=>task.id!==taskId
        );

    saveData();

    renderRooms();

    renderCalendar();
}

function renderRooms(){

    const container =
        document.getElementById(
            "roomContainer"
        );

    container.innerHTML="";

    rooms.forEach(room=>{

        let taskHTML="";

        room.tasks.forEach(task=>{

            taskHTML += `
            <li>
                ${task.title}
                ( ${task.date}號 )

                <button onclick="
                deleteTask(
                ${room.id},
                ${task.id}
                )">
                刪除
                </button>

            </li>
            `;

        });

        container.innerHTML += `
        <div class="room">

            <h3>
                ${room.name}
            </h3>

            <button onclick="
            deleteRoom(${room.id})
            ">
            刪除房間
            </button>

            <hr>

            <input
            id="taskTitle-${room.id}"
            placeholder="任務名稱">

            <input
            id="taskDate-${room.id}"
            type="number"
            min="1"
            max="30"
            placeholder="日期">

            <button onclick="
            addTask(${room.id})
            ">
            新增任務
            </button>

            <ul>

                ${taskHTML}

            </ul>

        </div>
        `;
    });
}

function renderCalendar(){

    const grid =
        document.getElementById(
            "calendarGrid"
        );

    grid.innerHTML="";

    for(let day=1; day<=30; day++){

        let html =
        `<div class="day">
            ${day}
        `;

        rooms.forEach(room=>{

            room.tasks.forEach(task=>{

                if(task.date===day){

                    html += `
                    <div class="event">

                        ${task.title}

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
