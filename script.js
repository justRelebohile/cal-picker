const filtereddate = document.getElementById("filtereddate");
const links = document.querySelectorAll("#date-selector a");
const selectedfromdropdown = document.getElementById("selectedfromdropdown");
const calendarDays = document.getElementById("from-calendar-days");
const monthYear = document.getElementById("from-month-year");
//const activeLink = document.querySelector('#date-selector a.active');



const today = new Date();
const formattedDate = today.getFullYear() + '-' 
                      + String(today.getMonth() + 1).padStart(2, '0') + '-' 
                      + String(today.getDate()).padStart(2, '0');



filtereddate.value = `${formattedDate}`;






function makeActiveLink(element) {
  // Remove "active" class from all links
  
  links.forEach(link => link.classList.remove('active'));

  // Add "active" class to the clicked link
  element.classList.add('active');
}




function selectDateByValue(dateString) {
  const calendarDays = document.getElementById("calendar");

  // Clear any previous highlights
  clearHighlights(calendarDays);

  // Find the cell with the matching data-date attribute
  const targetCell = calendarDays.querySelector(`[data-date="${dateString}"]`);
  if (targetCell) {
      targetCell.classList.add("selected-day"); // Highlight the target date
  } else {
      console.log("Date not found in the current calendar view");
  }
}



function selectDay(element, offset = 0) {

  makeActiveLink(element);

  //fromDate.setMonth(fromDate.getMonth())
  //alert(fromDate);

  const today = new Date();
  today.setDate(today.getDate() + offset);

  monthfromDate.setMonth(today.getMonth());
  monthfromDate.setFullYear(today.getFullYear());

  //fromDate.setMonth(fromDate.getMonth() + direction)

  //setFilteredDate(today);
  const formattedDate = today.getFullYear() + '-' 
                      + String(today.getMonth() + 1).padStart(2, '0') + '-' 
                      + String(today.getDate()).padStart(2, '0');

 
  filtereddate.value = `${formattedDate}`;
  //selectedfromdropdown.innerHTML = "";
  selectedfromdropdown.innerHTML = `${formattedDate}`;


 renderFromCalendar('from');

 highlightDay(today.getDate());

 const calendarDivs = document.getElementsByClassName('calendar');
 calendarDivs[1].style.display = 'none';

}


function setDaysForMonth(today){

const year = today.getFullYear();
const month = today.getMonth();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

if(monthYear.textContent !== `${monthNames[month]} ${year}`){
  monthYear.textContent = `${monthNames[month]} ${year}`;
  fromDate.setMonth(today.getMonth());
  fromDate.setFullYear(today.getFullYear());

  //setCurrentMonth(year, month);
  calendarDays.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add empty cells for days before the start of the month
  for (let i = 0; i < firstDay; i++) calendarDays.appendChild(document.createElement("div"));

  // Create cells for each day in the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.textContent = day;
    dayCell.classList.add("calendar-day");
  // alert(day);
  calendarDays.appendChild(dayCell);
  }

}



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
  //alert(monthfromDate.getMonth());

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - dayOfWeek));


  setFilteredDate(startOfWeek, endOfWeek);



  //setDaysForMonth(today);
  renderFromCalendar('from');





highlightRange(startOfWeek, endOfWeek);

const calendarDivs = document.getElementsByClassName('calendar');
calendarDivs[1].style.display = 'none';



//calendarDays.appendChild(dayCell);


}

function selectMonth(element) {
  makeActiveLink(element);
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  monthfromDate.setMonth(today.getMonth());
  monthfromDate.setFullYear(today.getFullYear());

  setFilteredDate(startOfMonth, endOfMonth);
  //setDaysForMonth(today);
  renderFromCalendar('from');
  highlightRange(startOfMonth, endOfMonth);

  const calendarDivs = document.getElementsByClassName('calendar');
  calendarDivs[1].style.display = 'none';
}

function setFilteredDate(start, end = start) {
  const format = (date) => 
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  filtereddate.value = end ? `${format(start)} - ${format(end)}` : format(start);
  selectedfromdropdown.innerHTML = end ? `${format(start)} - ${format(end)}` : format(start);;

}

function highlightDay(day) {
  const calendarDays = document.getElementById("from-calendar-days");
  clearCalendarSelection(calendarDays);
  calendarDays.querySelectorAll(".calendar-day").forEach(d => {
      if (Number(d.textContent) === day) d.classList.add("selected-day");
  });
}


function setCurrentMonth(year, month){

calendarDays.innerHTML = "";

const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();

// Add empty cells for days before the start of the month
for (let i = 0; i < firstDay; i++) calendarDays.appendChild(document.createElement("div"));

// Create cells for each day in the month
for (let day = 1; day <= daysInMonth; day++) {
  const dayCell = document.createElement("div");
  dayCell.textContent = day;
  dayCell.classList.add("calendar-day");
// alert(day);
calendarDays.appendChild(dayCell);
}


}

function toggleDropdown() {
  const content = document.getElementById("dropdown-content");
  content.style.display = content.style.display === "block" ? "none" : "block";


 const activeLink = document.querySelector('#date-selector a.active');

      if (activeLink) {
          const index = Array.from(links).indexOf(activeLink);
          if (index === 0) { 
           highlightDay(today.getDate());
          }
      }
}

function closeDropdown() {
  const content = document.getElementById("dropdown-content");
  content.style.display =  "none";
  
}

function highlightRange(start, end) {
  const calendarDays = document.getElementById("from-calendar-days");
  clearCalendarSelection(calendarDays);
  calendarDays.querySelectorAll(".calendar-day").forEach(day => {
      const dayNumber = Number(day.textContent);
      const cellDate = new Date(start);
      cellDate.setDate(dayNumber);
      if (cellDate >= start && cellDate <= end) day.classList.add("selected-day");
  });
}





function withinMonth(element) {
  makeActiveLink(element);
  //clearHighlights(calendarDays);
  const calendarDivs = document.getElementsByClassName('calendar');
  calendarDivs[1].style.display = 'none';
 
  renderFromCalendar('from');

}

function selectCustom(element) {

  makeActiveLink(element);
  displayDateRange();

  const calendarDivs = document.getElementsByClassName('calendar');


  calendarDivs[1].style.display = 'block';
  //renderFromCalendar('from');

  //renderToCalendar('to');

  renderCalendars('from');
  renderCalendars('to');


  
  

  

}


function clearHighlights(calendarDays) {
  const selectedDays = calendarDays.querySelectorAll(".selected-day");
  selectedDays.forEach((cell) => cell.classList.remove("selected-day"));
  const highlightedDays = calendarDays.querySelectorAll(".highlighted-day");
  highlightedDays.forEach((cell) => cell.classList.remove("highlighted-day"));
}


let monthfromDate = new Date();
let monthtoDate = null;



monthdate = new Date();
fromDate = new Date();  // Set fromDate to the current date
toDate = new Date(fromDate);  // Copy fromDate to toDate
toDate.setMonth(fromDate.getMonth() + 1);  // Move toDate one month forward






function renderFromCalendar(calendarType) {


  //alert("renderfromcalender");
 
 //monthYear = document.getElementById("from-month-year");
//const calendarDays = document.getElementById("from-calendar-days");

//const date =  new Date();  // Default to current date if fromDate is not set
const date = calendarType === 'from' ? monthfromDate || new Date() : monthtoDate || new Date();

const year = date.getFullYear();
const month = date.getMonth();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
monthYear.textContent = `${monthNames[month]} ${year}`;

// Clear previous cells
calendarDays.innerHTML = "";


const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();

// Add empty cells for days before the start of the month
for (let i = 0; i < firstDay; i++) calendarDays.appendChild(document.createElement("div"));

// Create cells for each day in the month
for (let day = 1; day <= daysInMonth; day++) {
  const dayCell = document.createElement("div");
  dayCell.textContent = day;
  dayCell.classList.add("calendar-day");

  // Highlight selected day if it matches fromDate or toDate
  if ((monthfromDate && day === monthfromDate.getDate() && month === monthfromDate.getMonth() && year === monthfromDate.getFullYear()) ||
      (monthtoDate && day === monthtoDate.getDate() && month === monthtoDate.getMonth() && year === monthtoDate.getFullYear())) {
    dayCell.classList.add("selected-day");
  }

 //dayCell.classList.add("selected-day");


  // Add click event to select a day
  dayCell.onclick = function () {
    const selectedDate = new Date(year, month, day);
    selectedDate.setFullYear(year, month, day);  // Ensure correct date assignment without timezone shift

    //dayCell.classList.add("selected-day");
 
    const activeLink = document.querySelector('#date-selector a.active');

      // Check if there is an active link and if it's the third one
      if (activeLink) {
          const index = Array.from(links).indexOf(activeLink); // Get the index of the active link
          if (index !== 4) {  // Check if the active link is the third one (index 2)
           
            links[4].classList.add('active');
            links[index].classList.remove('active');
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

    renderFromCalendar('from');
  
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







function renderCalendars(calendarType) {

  //alert('calenders');
  const monthYear = document.getElementById(`${calendarType}-month-year`);
  const calendarDays = document.getElementById(`${calendarType}-calendar-days`);
  const date = calendarType === 'from' ? fromDate || new Date() : toDate || new Date();

  

  const calendarDivs = document.getElementsByClassName('calendar');
  const monthyearlabel = document.getElementsByClassName('monthyear');


  //selectedfromdropdown.innerHTML = `${filtereddate.value}`;

  //calendarDivs[1].style.display = 'none';

  //alert(toDate);

  if(calendarDivs[1].style.display === 'none'){

    from_next_nav.style.visibility = 'visible'; 

  } else{

    from_next_nav.style.visibility = 'hidden'; 
    to_previous_nav.style.visibility = 'hidden';
    
  }

  

  //let monthDifference = toDate.getMonth() - fromDate.getMonth() + (12 * (toDate.getFullYear() - fromDate.getFullYear()))
  //alert(toDate.getFullYear());

// Adjust if `toDate` is not yet a full month ahead of `fromDate`


  const year = date.getFullYear();
  const month = date.getMonth();
  const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];
  monthYear.textContent = `${monthNames[month]} ${year}`;
  

  //alert(`${monthNames[month]} ${year}`);
  //alert(monthyearlabel[0].innerHTML);
  //alert(monthyearlabel[1].innerHTML);


  let [frommonth, fromyear] = monthyearlabel[0].innerHTML.split(" ");
  let [tomonth, toyear] = monthyearlabel[1].innerHTML.split(" ");

  
  const monthDifference =  (toyear - fromyear) * 12 + (monthNames.indexOf(tomonth) - monthNames.indexOf(frommonth));


 
  alert(monthDifference);


  //alert(monthDifference);

  // Update navigation visibility based on month 
  if (calendarDivs[1].style.display === "block"){
  if (monthDifference >= 2) {
    from_next_nav.style.visibility = 'visible'; // Show next navigation if difference is 2 months or more
    to_previous_nav.style.visibility = 'visible';
  } else {
    from_next_nav.style.visibility = 'hidden'; // Hide otherwise
    to_previous_nav.style.visibility = 'hidden';
  }
  } else{
    from_next_nav.style.visibility = 'visible'; 
  }
  

  //alert(date);




  //alert(fromDate);
  //toDate = new Date(fromDate);  // Copy fromDate to toDate
  //toDate.setMonth(fromDate.getMonth() + 1);  // Move toDate one month forward


  // Clear previous cells
  calendarDays.innerHTML = "";

  //toDate.setMonth(fromDate.getMonth() + 1);

  // Get first day of the month and days in the month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add empty cells for days before the start of the month
  for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("div");
      calendarDays.appendChild(emptyCell);
  }

  // Create cells for each day in the month
  for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement("div");
      dayCell.textContent = day;
      dayCell.classList.add("calendar-day");

      // Highlight selected day if it matches the fromDate or toDate
      /**if (
          (calendarType === 'from' && fromDate && day === fromDate.getDate() && month === fromDate.getMonth() && year === fromDate.getFullYear()) ||
          (calendarType === 'to' && toDate && day === toDate.getDate() && month === toDate.getMonth() && year === toDate.getFullYear())
      ) {
          dayCell.classList.add("selected-day");
      }**/

      if (
            (calendarType === 'from' && fromDate &&
            day === fromDate.getDate() &&
            month === fromDate.getMonth() &&
            year === fromDate.getFullYear()) ||
            (calendarType === 'to' && toDate &&
            day === toDate.getDate() &&
            month === toDate.getMonth() &&
            year === toDate.getFullYear())
        ) {
            dayCell.classList.add("selected-day");
        }

      //displayDateRange();
      //selectedfromdropdown.innerHTML = `${filtereddate.value}`;
      // Add click event to select a day
      dayCell.onclick = function () {
       
          const selectedDate = new Date(year, month, day);
          if (calendarType === 'from') {
              fromDate = selectedDate;
             
          } else {
              toDate = selectedDate;
          }

          

          // Re-render both calendars to reflect any changes in date selection
          renderCalendars('from');
          renderCalendars('to');

    /**const formattedFromDate = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, '0')}-${String(fromDate.getDate()).padStart(2, '0')}`;
  
    filtereddate.value  = formattedFromDate;

    if (fromDate && toDate) {
          const formattedToDate = `${toDate.getFullYear()}-${String(toDate.getMonth() + 1).padStart(2, '0')}-${String(toDate.getDate()).padStart(2, '0')}`;

          filtereddate.value = fromDate <= toDate 
          ? `${formattedFromDate} - ${formattedToDate}` 
          : `${formattedToDate} - ${formattedFromDate}`;
      } **/

          // Display formatted date range in input
        displayDateRange();

         
          
      };

      calendarDays.appendChild(dayCell);
  }
}


function displayDateRange() {
  const formattedFromDate = formatDate(fromDate);
  const formattedToDate = formatDate(toDate);
  

  if (fromDate && toDate) {
      filtereddate.value = fromDate <= toDate 
          ? `${formattedFromDate} - ${formattedToDate}` 
          : `${formattedToDate} - ${formattedFromDate}`;

     //selectedfromdropdown.innerHTML = `${filtereddate.value}`;
  } else if (fromDate) {
      filtereddate.value = formattedFromDate;
    // selectedfromdropdown.innerHTML = `${filtereddate.value}`;
  }
}

function formatDate(date) {
  return date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : '';
}



// Utility function to clear previous selection on a specific calendar
function clearCalendarSelection(calendarDays) {
  const selectedDays = calendarDays.getElementsByClassName("selected-day");
  while (selectedDays.length > 0) {
      selectedDays[0].classList.remove("selected-day");
  }
}


renderFromCalendar('from');

const from_next_nav = document.getElementById("from-next-nav");
const to_previous_nav = document.getElementById("to-previous-nav");


// Function to calculate month difference
function monthDiff(dateFrom, dateTo) {
  let months = (dateTo.getFullYear() - dateFrom.getFullYear()) * 12 + (dateTo.getMonth() - dateFrom.getMonth());
  return months;
 
}



function monthDiff2(dateFrom, dateTo) {
  // Calculate the year and month difference
  let years = dateTo.getFullYear() - dateFrom.getFullYear();
  let months = dateTo.getMonth() - dateFrom.getMonth();

  // Combine years and months to get the total difference in months
  let totalMonths = years * 12 + months;

  // Return the absolute month difference
  return Math.abs(totalMonths);
}

function diff_months(dt1, dt2) {
  // Calculate the year difference and month difference
  let years = dt2.getFullYear() - dt1.getFullYear();
  let months = dt2.getMonth() - dt1.getMonth();

  // Combine years and months to get the total difference in months
  let totalMonths = years * 12 + months;

  // Adjust if dt2's day is earlier in the month than dt1's day
  if (dt2.getDate() < dt1.getDate()) {
      totalMonths -= 1;
  }

  return Math.abs(totalMonths); // Ensure positive difference
}


// Function to change the month (next/previous) based on direction and calendarType
function changeMonth(direction, calendarType) {
  const calendarDivs = document.getElementsByClassName('calendar');

  // Calculate the month difference
  const monthDifference = monthDiff2(new Date(2024, 11), new Date(2025, 1));
  //const Difference = monthDiff(new Date(fromDate.getFullYear(), fromDate.getMonth()), new Date(toDate.getFullYear(), toDate.getMonth()));
  //alert(monthDifference);
  //alert(Difference);

  let fromDate1 = new Date(2024, 9, 14); // December 14, 2023
  let toDate1 = new Date(2025, 2, 14); 


  let dt1 = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
  let dt2 = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
  //alert(diff_months(dt1, dt2));
  



  // If the second calendar is visible, adjust the navigation visibility based on month difference
  if (calendarDivs[1].style.display === "block") {
      if (monthDifference >= 2) {
          from_next_nav.style.visibility = 'visible'; // Show next navigation if difference is 2 months or more
          to_previous_nav.style.visibility = 'visible';
      } else {
          from_next_nav.style.visibility = 'hidden'; // Hide otherwise
          to_previous_nav.style.visibility = 'hidden';
      }
  } else {
      from_next_nav.style.visibility = 'visible'; // Always show if the second calendar is not visible
  }

  // Adjust the "from" or "to" date based on the calendarType and direction
  if (calendarType === 'from') {
      if (calendarDivs[1].style.display === "block") {
          fromDate.setMonth(fromDate.getMonth() + direction); // Adjust "from" date
          toDate.setMonth(fromDate.getMonth() + 1); // Adjust "to" date one month forward based on "from"
          
          renderCalendars('from'); // Re-render the "from" calendar
      } else {
          monthfromDate.setMonth(monthfromDate.getMonth() + direction); // Adjust "monthfromDate" if second calendar is not visible
          renderFromCalendar('from');
      }
  } else {
      toDate.setMonth(toDate.getMonth() + direction); // Adjust "to" 
     
      renderCalendars('to'); // Re-render the "to" calendar
  }
}





