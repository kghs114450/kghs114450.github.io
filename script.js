const events = {
    12: "📚 數學讀書會",
    15: "🧪 科展會議",
    20: "📖 英檢模考"
};

const days = document.querySelectorAll(".day");

days.forEach(day => {

    const dayNumber = parseInt(day.textContent);

    if(events[dayNumber]){

        day.innerHTML = `
            <div>${dayNumber}</div>
            <div class="event">
                ${events[dayNumber]}
            </div>
        `;

    }

});
