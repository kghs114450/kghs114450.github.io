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

const rooms = [
    {
        name: "📚 數學讀書會",
        todos: 2,
        events: 1
    },
    {
        name: "📖 英文檢定",
        todos: 1,
        events: 2
    },
    {
        name: "🧪 科展小組",
        todos: 3,
        events: 0
    }
];

const days = document.querySelectorAll(".day");

const modal = document.getElementById("eventModal");
const modalTitle = document.getElementById("modalTitle");
const modalDetail = document.getElementById("modalDetail");
const closeModal = document.getElementById("closeModal");

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

        const firstEvent = events[dayNumber][0];

        modalTitle.textContent = firstEvent.title;
        modalDetail.textContent = firstEvent.detail;

        modal.style.display = "block";

    });

});

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});

renderCalendar();

