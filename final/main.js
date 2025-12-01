const monthYearElement = document.getElementById('monthYear'); // getElementsById -> getElementById 수정
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // 이번 달의 첫 번째 날짜 (1일)
    const firstDay = new Date(currentYear, currentMonth, 1);
    // 이번 달의 마지막 날짜 (다음 달의 0일 = 이번 달 말일)
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    const totalDays = lastDay.getDate(); // 이번 달 총 일수
    const firstDayIndex = firstDay.getDay(); // 이번 달 1일의 요일 인덱스 (0:일 ~ 6:토)
    const lastDayIndex = lastDay.getDay(); // 이번 달 마지막 날의 요일 인덱스

    // 월/년도 표시
    const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';

    // 1. 지난 달 날짜 채우기 (빈칸)
    // 지난 달의 마지막 날짜를 구함
    const prevMonthLastDate = new Date(currentYear, currentMonth, 0);
    
    for (let i = firstDayIndex; i > 0; i--) { // 1 > 0 오타 수정 -> i > 0
        // 백틱(`) 사용으로 수정
        datesHTML += `<div class="date inactive">${prevMonthLastDate.getDate() - i + 1}</div>`; 
    }

    // 2. 이번 달 날짜 채우기
    for (let i = 1; i <= totalDays; i++) { // let i = i 오타 수정 -> let i = 1
        const date = new Date(currentYear, currentMonth, i);
        // 오늘 날짜인지 확인하여 active 클래스 추가
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
        // 백틱(`) 사용으로 수정
        datesHTML += `<div class="date ${activeClass}">${i}</div>`;
    }

    // 3. 다음 달 날짜 채우기 (남은 칸)
    // 7 - lastDayIndex - 1 (토요일(6)이면 0개, 일요일(0)이면 6개 등등 계산 필요)
    // 보통 그리드 꽉 채우기 위해 단순화하거나 계산식을 조정합니다. 
    // 여기서는 기존 의도대로 마지막 날 요일 기준으로 남은 칸만 채웁니다.
    for (let i = 1; i <= 6 - lastDayIndex; i++) { // 7 -> 6으로 조정 (0부터 시작하므로) 혹은 grid-style에 따라 다름
        datesHTML += `<div class="date inactive">${i}</div>`;
    }

    datesElement.innerHTML = datesHTML;
}

// 이전 달 버튼
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

// 다음 달 버튼 (변수명 prevBtn -> nextBtn 수정)
nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

updateCalendar();