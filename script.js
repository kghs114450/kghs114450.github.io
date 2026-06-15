const events = {
    12: [
        {
            title: "📚 數學讀書會",
            detail: "第三章微積分討論"
        }
    ],

    15: [
        {
            title: "🧪 科展會議",
            detail: "討論實驗設計"
        }
    ],

    20: [
        {
            title: "📖 英檢模考",
            detail: "模擬測驗與錯題檢討"
        }
    ]
};

const days = document.querySelectorAll(".day");

function renderCalendar() {

    days.forEach(day => {

        const dayNumber = parseInt(day.dataset.day);

        let html = `<div>${dayNumber}</div>`;

        if (events[dayNumber]) {

            events[dayNumber].forEach(event => {

                html += `
                    <div class="event">
                        ${event.title}
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

        if (!events[dayNumber]) {
            alert("這一天沒有事件");
            return;
        }

        let message = `📅 ${dayNumber} 號\n\n`;

        events[dayNumber].forEach(event => {

            message += `${event.title}\n`;
            message += `${event.detail}\n\n`;

        });

        alert(message);

    });

});

renderCalendar();

