const events = {
    12: ["📚 數學讀書會"],
    15: ["🧪 科展會議"],
    20: ["📖 英檢模考"]
};

const days = document.querySelectorAll(".day");

function renderCalendar() {

    days.forEach(day => {

        const dayNumber = parseInt(day.dataset.day);

        let html = `<div>${dayNumber}</div>`;

        if(events[dayNumber]){

            events[dayNumber].forEach(event => {

                html += `
                    <div class="event">
                        ${event}
                    </div>
                `;

            });

        }

        day.innerHTML = html;

    });

}

days.forEach(day => {

    const dayNumber = parseInt(day.textContent);

    day.dataset.day = dayNumber;

    day.addEventListener("click", () => {

        const title = prompt("請輸入事件名稱");

        if(!title) return;

        if(!events[dayNumber]){
            events[dayNumber] = [];
        }

        events[dayNumber].push(title);
        console.log(days);
        renderCalendar();

    });

});

renderCalendar();
