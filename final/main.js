const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';

    const prevMonthLastDate = new Date(currentYear, currentMonth, 0);
    
    for (let i = firstDayIndex; i > 0; i--) {
        datesHTML += `<div class="date inactive">${prevMonthLastDate.getDate() - i + 1}</div>`;
    }

    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        // 초기 로딩 시 오늘 날짜만 active, 클릭 시 변경되는 것은 아래 이벤트 리스너에서 처리
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
        datesHTML += `<div class="date ${activeClass}">${i}</div>`;
    }

    for (let i = 1; i <= 6 - lastDayIndex; i++) {
        datesHTML += `<div class="date inactive">${i}</div>`;
    }

    datesElement.innerHTML = datesHTML;
}

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

// ▼▼▼ [새로 추가된 부분] 날짜 클릭 기능 ▼▼▼
datesElement.addEventListener('click', (e) => {
    const target = e.target;

    // 1. 클릭한 요소가 날짜(.date)이고, 비활성화된 날짜(.inactive)가 아닌지 확인
    if (target.classList.contains('date') && !target.classList.contains('inactive')) {
        
        // 2. 현재 'active' 클래스가 있는 날짜를 찾아서 제거
        const activeDate = document.querySelector('.date.active');
        if (activeDate) {
            activeDate.classList.remove('active');
        }

        // 3. 방금 클릭한 날짜에 'active' 클래스 추가
        target.classList.add('active');
    }
});
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

updateCalendar();