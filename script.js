 
//Old one above
//New one below
document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar').querySelector('tbody');
    const monthYear = document.getElementById('monthYear');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentDate = new Date();

    // Hardcoded events for specific dates
    const events = {
        '2024-09-30': 'SBA',
        '2024-10-10': 'Huduma Day',
        '2024-10-18': 'Exam Day',
        '2024-10-20': 'Mashujaa Day',
        '2024-10-21': 'Holiday',
        '2024-10-22': 'Exam Day',
        '2024-10-23': 'Exam Day',
        '2024-10-24': 'Exam Day<br>Closing Day',
        // Add more events as needed
    };

    // Helper function to get the number of days in a month
    function daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    // Helper function to format date in YYYY-MM-DD
    function formatDate(year, month, day) {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }

    // Helper function to generate the calendar for a specific month/year
    function generateCalendar(month, year) {
        calendar.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay(); // First day of the month (0 = Sunday)
        const totalDays = daysInMonth(month, year);

        let date = 1;
        monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    // Empty cells before the start of the month
                    cell.textContent = '';
                } else if (date > totalDays) {
                    // No more days to display
                    break;
                } else {
                    // Fill in the days of the month
                    const day = date;
                    cell.innerHTML = `<div class="day">${day}</div>`;
                    
                    // Check if there is an event for this date
                    const formattedDate = formatDate(year, month, day);
                    if (events[formattedDate]) {
                        // Add event below the day
                        cell.innerHTML += `<div class="event">${events[formattedDate]}</div>`;
                    }

                    // Highlight current day
                    if (date === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                        cell.classList.add('current-day');
                    }

                    date++;
                }
                row.appendChild(cell);
            }
            calendar.appendChild(row);
        }
    }

    // Event listeners for the next and previous buttons
    prevButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });

    nextButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });

    // Generate the initial calendar
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
});
