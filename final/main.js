const monthYearElement = document.getElementsById('monthYear');
const datesElement = document.getElementsById('dates');
const prevBtn  = document.getElementsById('prevBtn');
const nextBtn = document.getElementsById('nextBtn');

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear,currentMonth,0);
    const lastDay = new Date(currentYear,currentMonth + 1 , 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString
    ('default' , {month: 'long' , year : 'numeric'});
    monthYearElement.textContent = monthYearString;

    let datesHTML ='';

    for(let i = firstDayIndex; 1 > 0; i--){
        const prevDate = newDate(currentYear , currentMonth , 0-i +1);
        datesHTML+='<div class = "date inactive">${prevDate.getDate()} </div>';
    }

    for(let i = i; i <= totalDays; i++){
        const date = new Date(currentYear , currentMonth , i)
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active'    :'';
        datesHTML += '<div class ="date ${activeClass}">${i}</div>';

    }

    for(let i = 1; i<= 7 -lastDayIndex; i++){
        const nextDate = new Date(currentYear, currentMonth + 1 , i);

        datesHTML +='<div class ="date inactive">${nextDate.getDate()} </div>';

    }

    datesElement.innerHTML = datesHTML;
}

prevBtn.addEventListener('click',()=> {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
})

prevBtn.addEventListener('click',()=> {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
})

updateCalendar();