
const template = `
  <div style="position: relative; display: inline-block;">
  <button class="dropdown-button-cal" onclick="datetoggleDropdown()"><span id="selectedfromdropdown">yyyy/mm/dd</span><span class="calendar-icon-cal"></span></button>
      
    <div id="dropdown-content-cal" class="dropdown-content-cal">
      <div class="dropdown-row-cal">
        <div class="dropdown-column-cal">
          <ul  id="date-selector" class="calendar-dropdown-links-cal ul-cal">
            
              <li><a href="#" class="active" onclick="selectDay(this)">Today</a></li>
              <li><a href="#"  onclick="selectYesterday(this)">Yesterday</a></li>
              <li><a href="#"  onclick="selectWeek(this)">This Week</a></li>
          
              <li><a href="#"  onclick="selectMonth(this)">This Month</a></li>
              <li><p style="font-size: 20px;">Customize(Range)</p></li>
              <li><a href="#"  onclick="withinMonth(this)">In a Month</a></li>
              <li><a href="#"  onclick="selectCustom(this)">Between Months</a></li>
          </ul>
        </div>
        <div class="dropdown-column-cal">
              <div class="calendar-cal">
                  <div class="calendar-header-cal">
                  <span class="calendar-nav-cal" onclick="changeMonth(-1, 'from', 1)">&#10094;</span>
                  <h2 id="from-month-year" class="monthyear"></h2>
                  <span class="calendar-nav-cal" id="from-next-nav" onclick="changeMonth(1, 'from', -1)">&#10095;</span>
                  </div>
                  <div class="calendar-weekdays-cal" >
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  </div>
                  <div class="calendar-days-cal" id="from-calendar-days"></div>
              </div>

          </div>
          <div class="dropdown-column-cal">
              
              <div class="calendar-cal" style="display: none;">
                  <div class="calendar-header-cal">
                  <span class="calendar-nav-cal" id="to-previous-nav" onclick="changeMonth(-1, 'to', -1)">&#10094;</span>
                  <h2 id="to-month-year" class="monthyear"></h2>
                  <span class="calendar-nav-cal" onclick="changeMonth(1, 'to', 1)">&#10095;</span>
                  </div>
                  <div class="calendar-weekdays-cal">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  </div>
                  <div class="calendar-days-cal" id="to-calendar-days"></div>
              </div>
          </div>
        </div>
      
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 15px;">
          <input type="text" id="filtereddate" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" class="input-text-cal">
          <a href="#" class="submitcancel_links" onclick="closeDropdown()">Cancel</a>
          <a href="#" class="submitcancel_links" onclick="applyButton()">Apply</a>
        </div>
      
      </div>
      
    </div>
  </div>


  `;

  document.addEventListener("DOMContentLoaded", () => {
  
    initializeCalendar() 

  });


  function initializeCalendar() {
    // Check for elements with the "appointment" class
    const appointmentDivs = document.querySelectorAll(".cal-picker");

    if (appointmentDivs.length > 0) {
        appointmentDivs.forEach(div => {
            div.innerHTML = template; // Populate with template
            renderCalendar('from');  // Render the default calendar
        });
    } else {
        console.log("No elements with the 'appointment' class found. Template not rendered.");
    }

    // Initialize default date range and variables
    defaultRange();

    monthdate = new Date();
    fromDate = new Date();
    toDate = new Date(fromDate);
    toDate.setMonth(fromDate.getMonth() + 1);
}

  let monthfromDate = new Date();
  let monthtoDate = null;

  let dateFrom = new Date();
  let dateTo = new Date();
  dateTo.setMonth(dateFrom.getMonth() + 1);


  function defaultRange(){
  
    const filtereddate = get_filtered_input();
  
    const today = new Date();
    const formattedDate = today.getFullYear() + '-' 
                          + String(today.getMonth() + 1).padStart(2, '0') + '-' 
                          + String(today.getDate()).padStart(2, '0');
    
    filtereddate.value = `${formattedDate}`;  


  }

  function get_filtered_input(){
     return document.getElementById("filtereddate");
  }

  function get_from_next_nav() {
    return document.getElementById("from-next-nav");
  }

  function get_to_previous_nav() {
    return document.getElementById("to-previous-nav");
  }

  function getLinks() {
    return document.querySelectorAll("#date-selector a");
  }

  function getselectedfromdropdown() {
    return document.getElementById("selectedfromdropdown");
  }

  function getmonthYear() {
    return document.getElementById("from-month-year");
  }

  function getfromcalendarDays() {
    return document.getElementById("from-calendar-days");
  }

  function gettocalendarDays() {
    return document.getElementById("to-calendar-days");
  }

  function gettomonthYear() {
    return document.getElementById("to-month-year");
  }
  

  function makeActiveLink(element) {

    const links = getLinks();

    links.forEach(link => link.classList.remove('active'));
    element.classList.add('active');
    

  }




function selectDateByValue(dateString) {
  const calendarDays = getfromcalendarDays();

  // Clear any previous highlights
  clearHighlights(calendarDays);

  // Find the cell with the matching data-date attribute
  const targetCell = calendarDays.querySelector(`[data-date="${dateString}"]`);
  if (targetCell) {
      targetCell.classList.add("selected-day-cal"); // Highlight the target date
  } else {
      console.log("Date not found in the current calendar view");
  }

}



function selectDay(element, offset = 0) {

  makeActiveLink(element);

  const today = new Date();
  today.setDate(today.getDate() + offset);

  monthfromDate.setMonth(today.getMonth());
  monthfromDate.setFullYear(today.getFullYear());

  const formattedDate = today.getFullYear() + '-' 
                      + String(today.getMonth() + 1).padStart(2, '0') + '-' 
                      + String(today.getDate()).padStart(2, '0');

 
  get_filtered_input().value = `${formattedDate}`;

  //getselectedfromdropdown().innerHTML = `${formattedDate}`;
  

  

 renderCalendar('from');

 highlightDay(today.getDate());

 const calendarDivs = document.getElementsByClassName('calendar-cal');
 calendarDivs[1].style.display = 'none';

}



function selectYesterday(element) {
  selectDay(element, -1);
}


function selectWeek(element) {
  makeActiveLink(element);
  const today = new Date();
  const dayOfWeek = today.getDay();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);

  monthfromDate.setMonth(today.getMonth());
  monthfromDate.setFullYear(today.getFullYear());

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - dayOfWeek));


  setFilteredDate(startOfWeek, endOfWeek);

  renderCalendar('from');





highlightRange(startOfWeek, endOfWeek);

const calendarDivs = document.getElementsByClassName('calendar-cal');
calendarDivs[1].style.display = 'none';

}


function selectMonth(element) {
  makeActiveLink(element);
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  monthfromDate.setMonth(today.getMonth());
  monthfromDate.setFullYear(today.getFullYear());

  setFilteredDate(startOfMonth, endOfMonth);
  renderCalendar('from');
  highlightRange(startOfMonth, endOfMonth);

  const calendarDivs = document.getElementsByClassName('calendar-cal');
  calendarDivs[1].style.display = 'none';
}

function setFilteredDate(start, end = start) {
  const format = (date) => 
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  get_filtered_input().value = end ? `${format(start)} - ${format(end)}` : format(start);
  //getselectedfromdropdown().innerHTML = end ? `${format(start)} - ${format(end)}` : format(start);;

}


function applyButton(){

  getselectedfromdropdown().innerHTML = get_filtered_input().value;

  const content = document.getElementById("dropdown-content-cal");
  const event = new CustomEvent('applyClicked', {
    detail: { selectedDate: get_filtered_input().value }  // Pass the selected value in the event
    
  });

  document.dispatchEvent(event);

  content.classList.remove("show");
  content.style.left = '';  // Reset position
  content.style.right = '';
  //closeDropdown();
  
  
}


function highlightDay(day) {
  const calendarDays = getfromcalendarDays();
  clearCalendarSelection(calendarDays);
  calendarDays.querySelectorAll(".calendar-day-cal").forEach(d => {
      if (Number(d.textContent) === day) d.classList.add("selected-day-cal");
  });
}





function datetoggleDropdown() {

  const content = document.getElementById("dropdown-content-cal");

  // Toggle the dropdown display using a class
  if (content.classList.contains("show")) {
    content.classList.remove("show");
    content.style.left = '';  // Reset position
    content.style.right = '';
  } else {
    content.classList.add("show");

    // Calculate and adjust the position
    const rect = content.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    if (rect.right > viewportWidth) {
      // If dropdown overflows to the right, align to the right
      content.style.left = 'auto';
      content.style.right = '0'; // Align to the right edge of the container
    } else if (rect.left < 0) {
      // If dropdown overflows to the left, align to the left
      content.style.left = '0';
      content.style.right = 'auto';
    } else {
      // Default: Align to the left
      content.style.left = '0';
      content.style.right = 'auto';
    }
  }

  // Handle links logic
  const links = getLinks(); // Assuming this returns an array or NodeList
  const activeLink = document.querySelector('#date-selector a.active');

  if (activeLink && links.length) {
    const linkArray = Array.from(links);
    const index = linkArray.indexOf(activeLink);

    if (index === 0) {
      // Assuming 'today' and 'highlightDay' are defined
      //highlightDay(today.getDate());
      highlightDay(new Date().getDate());

    }
  }
}





function closeDropdown() {
  const content = document.getElementById("dropdown-content-cal");
  //content.style.display =  "none";
  //const content = document.getElementById("dropdown-content-cal");
  content.classList.remove("show");
  content.style.left = '';  // Reset position
  content.style.right = '';

   
  
  


}




function highlightRange(start, end) {
  const calendarDays = getfromcalendarDays();
  clearCalendarSelection(calendarDays);
  calendarDays.querySelectorAll(".calendar-day-cal").forEach(day => {
      const dayNumber = Number(day.textContent);
      const cellDate = new Date(start);
      cellDate.setDate(dayNumber);
      if (cellDate >= start && cellDate <= end) day.classList.add("selected-day-cal");
  });
}


function withinMonth(element) {
  makeActiveLink(element);
  const calendarDivs = document.getElementsByClassName('calendar-cal');
  calendarDivs[1].style.display = 'none';
 
  renderCalendar('from');
  rangeFormatted(monthfromDate, monthtoDate, get_filtered_input());
}




function selectCustom(element) {
  makeActiveLink(element);
  
  displayDateRange();
  
  const calendarDivs = document.getElementsByClassName('calendar-cal');
  

  calendarDivs[1].style.display = 'block';
  get_from_next_nav().style.visibility = 'hidden'; 
  get_to_previous_nav().style.visibility = 'hidden';

  renderFrommCalendar('from');
  
  renderToCalendar();

}



function clearHighlights(calendarDays) {
  const selectedDays = calendarDays.querySelectorAll(".selected-day-cal");
  selectedDays.forEach((cell) => cell.classList.remove("selected-day-cal"));
  const highlightedDays = calendarDays.querySelectorAll(".highlighted-day-cal");
  highlightedDays.forEach((cell) => cell.classList.remove("highlighted-day-cal"));
}





function renderCalendar(calendarType) {

get_from_next_nav().style.visibility = 'visible'; 

const calendarDays = getfromcalendarDays();

const date = calendarType === 'from' ? monthfromDate || new Date() : monthtoDate || new Date();

const year = date.getFullYear();
const month = date.getMonth();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

getmonthYear().textContent = `${monthNames[month]} ${year}`;


// Clear previous cells
calendarDays.innerHTML = "";


const links = getLinks();


const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();

// Add empty cells for days before the start of the month
for (let i = 0; i < firstDay; i++) calendarDays.appendChild(document.createElement("div"));

// Create cells for each day in the month
for (let day = 1; day <= daysInMonth; day++) {
  const dayCell = document.createElement("div");
  dayCell.textContent = day;
  dayCell.classList.add("calendar-day-cal");

  // Highlight selected day if it matches fromDate or toDate
  if ((monthfromDate && day === monthfromDate.getDate() && month === monthfromDate.getMonth() && year === monthfromDate.getFullYear()) ||
      (monthtoDate && day === monthtoDate.getDate() && month === monthtoDate.getMonth() && year === monthtoDate.getFullYear())) {
    dayCell.classList.add("selected-day-cal");
  }

 //dayCell.classList.add("selected-day-cal");


  // Add click event to select a day
  dayCell.onclick = function () {
    const selectedDate = new Date(year, month, day);
    selectedDate.setFullYear(year, month, day);  // Ensure correct date assignment without timezone shift

    //dayCell.classList.add("selected-day-cal");
 
    const activeLink = document.querySelector('#date-selector a.active');

      // Check if there is an active link and if it's the third one
      if (activeLink) {
          const index = Array.from(links).indexOf(activeLink); // Get the index of the active link
          if (index !== 4) {  // Check if the active link is the third one (index 2)
           
            links[4].classList.add('active');
            links[index].classList.remove('active');
            monthfromDate = null;
            monthtoDate = null;
            //alert(monthfromDate);
            //alert(monthtoDate);
          }
      }
   
    // If both dates are set, reset and start with the first date
    if (monthfromDate && monthtoDate) {
      monthfromDate = selectedDate;
      monthtoDate = null;
    } else if (!monthfromDate) {
      monthfromDate = selectedDate;
    } else {
      monthtoDate = selectedDate < monthfromDate ? monthfromDate : selectedDate;
      monthfromDate = selectedDate < monthfromDate ? selectedDate : monthfromDate;
    }

    renderCalendar('from');
  
    const formattedFromDate = `${monthfromDate.getFullYear()}-${String(monthfromDate.getMonth() + 1).padStart(2, '0')}-${String(monthfromDate.getDate()).padStart(2, '0')}`;
  
    filtereddate.value  = formattedFromDate;

    if (monthfromDate && monthtoDate) {
          const formattedToDate = `${monthtoDate.getFullYear()}-${String(monthtoDate.getMonth() + 1).padStart(2, '0')}-${String(monthtoDate.getDate()).padStart(2, '0')}`;

          filtereddate.value = monthfromDate <= monthtoDate 
          ? `${formattedFromDate} - ${formattedToDate}` 
          : `${formattedToDate} - ${formattedFromDate}`;
      } 
    
  };

  calendarDays.appendChild(dayCell);
}

}




function rangeFormatted(fromDate, toDate, input){

  const formattedFromDate = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, '0')}-${String(fromDate.getDate()).padStart(2, '0')}`;
  const formattedToDate = `${toDate.getFullYear()}-${String(toDate.getMonth() + 1).padStart(2, '0')}-${String(toDate.getDate()).padStart(2, '0')}`;

  input.value = fromDate <= toDate 
  ? `${formattedFromDate} - ${formattedToDate}` 
  : `${formattedToDate} - ${formattedFromDate}`;

}


function renderToCalendar() {
  const calendarDays = gettocalendarDays();
  //const date = calendarType === 'to' ? monthfromDate || new Date() : monthtoDate || new Date();
  const date =  dateTo || new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  gettomonthYear().textContent = `${monthNames[month]} ${year}`;

  // Clear previous cells
  calendarDays.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add empty cells for days before the start of the month
  for (let i = 0; i < firstDay; i++) {
      calendarDays.appendChild(document.createElement("div"));
  }

  // Create cells for each day in the month
  for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement("div");
      dayCell.textContent = day;
      dayCell.classList.add("calendar-day-cal");

      // Highlight the selected day if it matches monthfromDate or monthtoDate
      if ((dateTo && day === dateTo.getDate() && month === dateTo.getMonth() && year === dateTo.getFullYear())) {
          dayCell.classList.add("selected-day-cal");
      }

      // Add click event to select a day
      dayCell.onclick = function () {
          const selectedDate = new Date(year, month, day);

          // Reset all dates and select only the new one
          //monthfromDate = null;
          dateTo = selectedDate;

          // Format and display the selected date
          //const formattedToDate = `${dateTo.getFullYear()}-${String(dateTo.getMonth() + 1).padStart(2, '0')}-${String(dateTo.getDate()).padStart(2, '0')}`;
          //filtereddate.value = formattedToDate;

          rangeFormatted(dateFrom, dateTo, filtereddate);

          // Re-render the calendar to reflect the selection
          renderToCalendar('to');
      };

      calendarDays.appendChild(dayCell);
  }
}


function renderFrommCalendar() {
  const calendarDays = getfromcalendarDays();
  const date = dateFrom || new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  getmonthYear().textContent = `${monthNames[month]} ${year}`;

  // Clear previous cells
  calendarDays.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add empty cells for days before the start of the month
  for (let i = 0; i < firstDay; i++) {
      calendarDays.appendChild(document.createElement("div"));
  }

  // Create cells for each day in the month
  for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement("div");
      dayCell.textContent = day;
      dayCell.classList.add("calendar-day-cal");

      // Highlight the selected day if it matches monthfromDate
      if (
        dateFrom &&
          day === dateFrom.getDate() &&
          month === dateFrom.getMonth() &&
          year === dateFrom.getFullYear()
      ) {
          dayCell.classList.add("selected-day-cal");
      }

      // Add click event to select a day
      dayCell.onclick = function () {
          const selectedDate = new Date(year, month, day);

          // Set the selected date to monthfromDate and clear monthtoDate
          dateFrom = selectedDate;
          //monthtoDate = null; // Optional: Reset the "to" date for single selection

          // Format and display the selected date
          //const formattedFromDate = `${dateFrom.getFullYear()}-${String(dateFrom.getMonth() + 1).padStart(2, '0')}-${String(dateFrom.getDate()).padStart(2, '0')}`;
          //filtereddate.value = formattedFromDate;

          rangeFormatted(dateFrom, dateTo, filtereddate);

          // Re-render the calendar to reflect the selection
          renderFrommCalendar('from');
      };

      calendarDays.appendChild(dayCell);
  }
}


function displayDateRange() {
  const formattedFromDate = formatDate(dateFrom);
  const formattedToDate = formatDate(dateTo);
  

  if (fromDate && toDate) {
      filtereddate.value = fromDate <= toDate 
          ? `${formattedFromDate} - ${formattedToDate}` 
          : `${formattedToDate} - ${formattedFromDate}`;

  } else if (fromDate) {
      filtereddate.value = formattedFromDate;
  }
}



function formatDate(date) {
  return date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : '';
}



// Utility function to clear previous selection on a specific calendar
function clearCalendarSelection(calendarDays) {
  const selectedDays = calendarDays.getElementsByClassName("selected-day-cal");
  while (selectedDays.length > 0) {
      selectedDays[0].classList.remove("selected-day-cal");
  }
}


let currentCount = 1;
function updateCount(monthDiffCount) {
  //alert("updateCount called with:" + monthDiffCount); // Debug
  currentCount += monthDiffCount;
  //alert("currentCount is now:" + currentCount); // Debug
  return currentCount;
}


function changeMonth(direction, calendarType, monthDiffCount) {

  //alert(monthDiffCount);
  //alert(updateCount(monthDiffCount));
  const calendarDivs = document.getElementsByClassName('calendar-cal');
 
  if (calendarDivs[1].style.display === "block") {
      
      if (updateCount(monthDiffCount) > 1) {
          get_from_next_nav().style.visibility = 'visible'; // Show next navigation if difference is 2 months or more
          get_to_previous_nav().style.visibility = 'visible';
          
      } else {
        get_from_next_nav().style.visibility = 'hidden'; // Hide otherwise
        get_to_previous_nav().style.visibility = 'hidden';
      }
      
  } else {
    get_from_next_nav().visibility = 'visible'; // Always show if the second calendar is not visible
  }
  

  if (calendarType === 'from') {
      
      if (calendarDivs[1].style.display === "block") {
          
          dateFrom.setMonth(dateFrom.getMonth() + direction); // Adjust "from" date
          //toDate.setMonth(fromDate.getMonth() + 1); // Adjust "to" date one month forward based on "from"
          
          renderFrommCalendar(); // Re-render the "from" calendar
      } else {
          monthfromDate.setMonth(monthfromDate.getMonth() + direction); // Adjust "monthfromDate" if second calendar is not visible
          renderCalendar('from');
          
      }
  } else {
      dateTo.setMonth(dateTo.getMonth() + direction); // Adjust "to"  
      renderToCalendar(); // Re-render the "to" calendar
  }

  

}









