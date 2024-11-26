// 달력 제목과 본문 영역, 팝업 및 이벤트 관련 DOM 요소 가져오기
let calendarTitle = document.getElementById('calendar-title'); // 현재 달력을 표시하는 제목
let calendarBody = document.getElementById('calendar-body'); // 달력의 날짜들이 들어갈 본문 영역
let popup = document.getElementById('event-popup'); // 이벤트 추가 팝업
let popupDate = document.getElementById('popup-date'); // 팝업에 표시되는 선택된 날짜
let popupEventInput = document.getElementById('popup-event-input'); // 팝업 내 이벤트 입력창
let saveEventButton = document.getElementById('save-event-button'); // 이벤트 저장 버튼
let closePopupButton = document.getElementById('close-popup-button'); // 팝업 닫기 버튼
let eventList = document.getElementById('event-list'); // 이벤트 리스트가 표시되는 영역
let deleteSelectedButton = document.getElementById('delete-selected-button'); // 선택된 이벤트 삭제 버튼
let deleteAllButton = document.getElementById('delete-all-button'); // 모든 이벤트 삭제 버튼

// 현재 날짜 및 선택된 날짜, 이벤트 데이터를 저장할 변수
let currentDate = new Date(); // 현재 날짜
let selectedDate = null; // 사용자가 클릭한 선택된 날짜
let events = {}; // 이벤트 데이터를 저장하는 객체 (키: 날짜, 값: 이벤트 배열)

// **달력 렌더링 함수**
function renderCalendar(date) {
  const year = date.getFullYear(); // 현재 년도
  const month = date.getMonth(); // 현재 월 (0부터 시작하므로 1을 더해서 사용)

  // 달력 제목 업데이트
  calendarTitle.textContent = `${year}년 ${month + 1}월`;

  // 달력에 필요한 날짜 계산
  const firstDay = new Date(year, month, 1).getDay(); // 현재 달 첫째 날의 요일
  const lastDate = new Date(year, month + 1, 0).getDate(); // 현재 달 마지막 날짜
  const prevLastDate = new Date(year, month, 0).getDate(); // 이전 달 마지막 날짜

  calendarBody.innerHTML = ''; // 달력 본문 초기화
  let row = document.createElement('tr'); // 첫 번째 행 생성

  // 이전 달 날짜 채우기
  for (let i = 0; i < firstDay; i++) {
    const cell = document.createElement('td');
    cell.textContent = prevLastDate - firstDay + i + 1; // 이전 달의 날짜 계산
    cell.classList.add('prev-month-date'); // 스타일 추가
    row.appendChild(cell); // 현재 행에 추가
  }

  // 현재 달 날짜 채우기
  for (let day = 1; day <= lastDate; day++) {
    // 행이 가득 차면 새 행 추가
    if (row.children.length === 7) {
      calendarBody.appendChild(row);
      row = document.createElement('tr');
    }

    const cell = document.createElement('td'); 
    cell.textContent = day; 

    // 오늘 날짜 강조 표시
    const today = new Date();
    if (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    ) {
      cell.classList.add('today-date'); // 오늘 날짜 강조 스타일 적용
    }

    // 날짜 클릭 시 팝업 표시
    cell.addEventListener('click', () => {
      selectedDate = `${year}-${month + 1}-${day}`; // 선택된 날짜 저장
      popupDate.textContent = `선택된 날짜: ${selectedDate}`; // 팝업에 날짜 표시
      popup.classList.remove('hidden'); // 팝업 보이기
    });

    row.appendChild(cell); // 현재 행에 추가
  }

  // 다음 달 날짜 채우기
  let nextMonthDay = 1;
  while (row.children.length < 7) {
    const cell = document.createElement('td');
    cell.textContent = nextMonthDay++; // 다음 달 날짜 설정
    cell.classList.add('next-month-date'); // 다음 달 날짜 스타일 적용
    row.appendChild(cell);
  }

  calendarBody.appendChild(row); // 마지막 행 추가
}

// **이벤트 저장**
saveEventButton.addEventListener('click', () => {
  const eventText = popupEventInput.value.trim(); // 입력된 이벤트 내용 가져오기
  if (!eventText || !selectedDate) return; // 이벤트 내용 또는 선택된 날짜가 없으면 실행 안 함

  if (!events[selectedDate]) events[selectedDate] = []; // 해당 날짜에 이벤트 데이터가 없으면 초기화
  events[selectedDate].push(eventText); // 이벤트 추가

  popupEventInput.value = ''; // 입력창 초기화
  popup.classList.add('hidden'); // 팝업 숨기기
  renderEventList(); // 이벤트 리스트 렌더링
});

// **이벤트 리스트 렌더링**
function renderEventList() {
  eventList.innerHTML = ''; // 기존 리스트 초기화

  for (const date in events) {
    events[date].forEach((event, index) => {
      const item = document.createElement('div'); // 이벤트 항목 생성
      item.style.marginBottom = '10px';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('event-checkbox');

      const text = document.createElement('span'); // 이벤트 텍스트
      text.textContent = `${date}: ${event}`;
      text.style.marginLeft = '10px';

      const deleteButton = document.createElement('button'); // 개별 삭제 버튼
      deleteButton.textContent = '삭제';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
        events[date].splice(index, 1); // 이벤트 배열에서 해당 이벤트 삭제
        if (events[date].length === 0) delete events[date]; // 날짜 데이터가 비었으면 삭제
        renderEventList(); // 이벤트 리스트 재렌더링
      });

      item.appendChild(checkbox); // 체크박스 추가
      item.appendChild(text); // 텍스트 추가
      item.appendChild(deleteButton); // 삭제 버튼 추가
      eventList.appendChild(item); // 리스트에 추가
    });
  }
}

// **선택된 이벤트 삭제**
deleteSelectedButton.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.event-checkbox');
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const parentDiv = checkbox.parentElement; // 이벤트 항목의 부모 요소
      const dateText = parentDiv.querySelector('span').textContent; // 이벤트 텍스트
      const [date, eventText] = dateText.split(': ');

      const eventIndex = events[date].indexOf(eventText.trim()); // 이벤트 인덱스 확인
      if (eventIndex > -1) {
        events[date].splice(eventIndex, 1); // 이벤트 배열에서 삭제
        if (events[date].length === 0) delete events[date]; // 날짜 데이터가 비었으면 삭제
      }
    }
  });
  renderEventList(); // 이벤트 리스트 재렌더링
});

// **모든 이벤트 삭제**
deleteAllButton.addEventListener('click', () => {
  events = {}; // 모든 이벤트 데이터 초기화
  renderEventList();
});

// **팝업 닫기**
closePopupButton.addEventListener('click', () => {
  popup.classList.add('hidden');
});

// **이전 달로 이동**
document.getElementById('prev-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1); // 현재 달을 한 달 전으로 변경
  renderCalendar(currentDate); // 달력 재렌더링
});

// **다음 달로 이동**
document.getElementById('next-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1); // 현재 달을 한 달 뒤로 변경
  renderCalendar(currentDate); // 달력 재렌더링
});

// **전체 선택/해제**
document.getElementById('select-all-button').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.event-checkbox');
  const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked); // 모두 선택 여부 확인

  checkboxes.forEach((checkbox) => {
    checkbox.checked = !allChecked; // 모두 선택된 상태라면 해제, 아니면 선택
  });
});

// **초기화**
renderCalendar(currentDate); // 초기 달력 렌더링
renderEventList(); // 초기 이벤트 리스트 렌더링
