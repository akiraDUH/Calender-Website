const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const currMonthElement = document.querySelector('.curr-month');
const calendarElement = document.querySelector('.calendar');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const todayButton = document.querySelector('#today');
const eventModal = document.querySelector('#event-modal');
const closeModal = document.querySelector('.close');
const addEventButton = document.querySelector('#add-event');

function renderCalendar() {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevLastDate = new Date(currentYear, currentMonth, 0).getDate();

  const calendarBody = document.createElement('tbody');
  let count=0;
  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    count=0;
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDay) {
        const prevDate = prevLastDate - firstDay + j + 1;
        cell.textContent = prevDate;
        cell.classList.add('other-month');
        count++;
      } else if (date > lastDate) {
        const nextDate = date - lastDate;
        cell.textContent = nextDate;
        cell.classList.add('other-month');
        count++;
        date++;
      } else {
        cell.textContent = date;
        if (date === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
          cell.classList.add('today');
        }
        cell.classList.add('curr-month');
        cell.addEventListener('click', showEventModal);
        date++;
      }
      row.appendChild(cell);
    }
    if(count===7){
      break;
    }
    else{
      calendarBody.appendChild(row);
    }
    
  }

  calendarElement.innerHTML = '';
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  for (const weekday of weekdays) {
    const th = document.createElement('th');
    th.textContent = weekday;
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  calendarElement.appendChild(thead);
  calendarElement.appendChild(calendarBody);

  currMonthElement.textContent = `${months[currentMonth]} ${currentYear}`;
}

function showEventModal(event) {
  const cell = event.target;
  const date = cell.textContent;
  const modalDate = document.querySelector('#modal-date');

  if (!cell.classList.contains('other-month')) {
    eventModal.style.display = 'block';
    modalDate.textContent = `${months[currentMonth]} ${date}, ${currentYear}`;
  }
}

function closeEventModal() {
  eventModal.style.display = 'none';
  document.querySelector('#start-time').value = '';
  document.querySelector('#end-time').value = '';
  document.querySelector('#description').value = '';
}

prevButton.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextButton.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

todayButton.addEventListener('click', () => {
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  renderCalendar();
});

closeModal.addEventListener('click', closeEventModal);
addEventButton.addEventListener('click', closeEventModal);
window.addEventListener('click', (event) => {
  if (event.target === eventModal) {
    closeEventModal();
  }
});

renderCalendar();