const backBtn = document.querySelector('.back');
backBtn.addEventListener("click",()=>{
    location.replace("index.html");
})

function pop_up(){
    
    const package  = document.querySelector('.package');
    const iconClose = document.querySelector('.close_icon');
    const btnPopup = document.querySelector('#calendar-container');
    btnPopup.addEventListener("click",()=>{
        console.log("its works!")
        package.classList.add('active-popup');
    });
    iconClose.addEventListener("click",()=>{
        package.classList.remove('active-popup');
    });
}

function generateCalendar() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const calendarContainer = document.querySelector('#calendar-container');
    const daysInMonth = lastDayOfMonth.getDate();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonthName = monthNames[currentMonth];
    const monthname = document.querySelector(".MonthName");
    monthname.textContent = `${currentMonthName}`;

    let calendarHTML = '<table>';
    calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
    let dayCounter = 1;
 
    for (let i = 0; i < 6; i++) {
        calendarHTML += '<tr>';

        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDayOfMonth.getDay()) || dayCounter > daysInMonth) {
                calendarHTML += '<td></td>';
            } else {
                const day = dayCounter++;
                calendarHTML += `<td><button class="btn">${day}</button></td>`;
            }
        }

        calendarHTML += '</tr>';
    }    

    calendarHTML += '</table>';
    calendarContainer.innerHTML = calendarHTML;
}
generateCalendar();
pop_up();

const addwork  = document.querySelector('.addbtn');
addwork.addEventListener("click", ()=> {
    console.log("its works!")
    const input = document.querySelector('.taskInput');
    const taskList = document.querySelector('.taskList');

    if (input.value.trim() !== '') {
        const task = document.createElement('li');
        task.innerHTML = `<div class="rows">
            <td id="items"><span id="list-item">${input.value}</span></td>
            <td><button onclick="completeTask(this)">Complete</button></td>
            <td><button onclick="deleteTask(this)">Delete</button></td>
            </div>
        `;
        // taskList.appendChild(task);
        taskList.insertAdjacentHTML('beforeend', task.outerHTML);
        input.value = '';
    }
})

function completeTask(button) {
    const task = button.parentElement;
    task.classList.toggle('completed');
}

function deleteTask(button) {
    const task = button.parentElement.parentElement;
    task.remove();
}
