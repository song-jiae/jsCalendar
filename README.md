# 🌟 **날짜별 메모 및 일정 관리 동적 달력** 🌟

## **📋 프로젝트 개요**
이 프로젝트는 날짜별로 메모를 추가하고 관리할 수 있는 **동적 달력**을 구현한 웹 애플리케이션입니다.  
사용자는 날짜를 선택하여 이벤트를 추가하거나 삭제할 수 있으며, 등록된 이벤트를 효율적으로 관리할 수 있습니다.  
💡 **직관적인 인터페이스**와 **깔끔한 디자인**으로 달력 기능을 제공합니다.
---

## **🖼️ 데모 미리보기**
![numbergame](https://github.com/user-attachments/assets/f4aa32df-65e0-4092-8133-cfeff1ac9147)<!-- 이미지 경로는 GitHub 업로드 후 경로 삽입 -->

👉 **[데모 사이트 바로가기]()**  
데모 사이트에서 직접 기능을 체험해 보세요!

---
---

## **🛠️ 구성 요소**

### **1. 주요 기능**
1. 📅 **달력 렌더링**
   - 현재 연도와 월을 기준으로 동적으로 달력을 생성합니다.
   - 이전 달, 현재 달, 다음 달 날짜를 구분하여 표시합니다.
   - 오늘 날짜를 강조하여 직관적인 사용자 경험을 제공합니다.

2. 📝 **이벤트 등록 및 관리**
   - 날짜를 클릭하여 이벤트를 등록할 수 있습니다.
   - 등록된 이벤트는 날짜별로 리스트화되어 표시됩니다.
   - 사용자는 개별 이벤트 삭제, 선택 삭제, 또는 모든 이벤트 삭제 기능을 사용할 수 있습니다.

3. 💬 **팝업 기능**
   - 날짜 클릭 시 이벤트를 입력할 수 있는 팝업이 표시됩니다.
   - 팝업에서 이벤트를 저장하거나 닫을 수 있습니다.

4. 🔄 **내비게이션**
   - 이전 달과 다음 달로 이동할 수 있는 버튼을 제공합니다.
   - 월 이동 시 동적으로 달력을 새로 렌더링합니다.

---

### **2. 주요 기술**
- **HTML5**: 웹 페이지 구조와 콘텐츠 작성.
- **CSS3**: 스타일링과 반응형 레이아웃 구현.
- **JavaScript**: DOM 조작, 이벤트 핸들링, 동적 데이터 관리.

---

## **⚙️ 설정 및 실행 방법**

### **1. 프로젝트 파일 구성**
프로젝트 폴더/ ├── index.html # 메인 HTML 파일 ├── 날짜별메모일정관리동적달력.css # 스타일 파일 ├── 날짜별메모일정관리동적달력.js # JavaScript 파일 └── README.md # 프로젝트 설명 파일
### **2. 실행 방법**
1. 프로젝트 폴더를 로컬 환경에 다운로드합니다.  
2. 브라우저에서 `index.html` 파일을 열어 실행합니다.

---

## **🚀 사용 방법**

### **1. 달력 탐색**
- 페이지 상단의 `<` 또는 `>` 버튼을 클릭하여 **이전 달**과 **다음 달**로 이동합니다.

### **2. 이벤트 추가**
1. 달력에서 날짜를 클릭하면 **팝업 창**이 표시됩니다.
2. 팝업에서 이벤트 내용을 입력한 후 `저장` 버튼을 클릭합니다.
3. 입력한 이벤트가 해당 날짜에 저장되며, **오른쪽 이벤트 리스트**에 표시됩니다.

### **3. 이벤트 관리**
- ✅ **개별 삭제**: 이벤트 리스트의 `삭제` 버튼을 클릭하여 특정 이벤트를 삭제합니다.
- ✅ **선택 삭제**: 체크박스를 선택한 후 `선택 삭제` 버튼을 클릭합니다.
- ✅ **전체 삭제**: `전체 삭제` 버튼을 클릭하여 모든 이벤트를 삭제합니다.
- ✅ **전체 선택/해제**: `전체 선택/해제` 버튼을 사용하여 모든 이벤트를 선택하거나 선택을 해제할 수 있습니다.

---

## **💻 코드 설명**

### **1. 달력 렌더링 함수**
```javascript
function renderCalendar(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  calendarTitle.textContent = `${year}년 ${month + 1}월`;

  let firstDay = new Date(year, month, 1).getDay();
  let lastDay = new Date(year, month + 1, 0).getDate();
  calendarBody.innerHTML = '';

  let row = document.createElement('tr');
  for (let i = 0; i < firstDay; i++) {
    let cell = document.createElement('td');
    cell.textContent = prevLastDate - firstDay + i + 1;
    cell.classList.add('prev-month-date');
    row.appendChild(cell);
  }

  for (let day = 1; day <= lastDay; day++) {
    if (row.children.length === 7) {
      calendarBody.appendChild(row);
      row = document.createElement('tr');
    }
    const cell = document.createElement('td');
    cell.textContent = day;

    let today = new Date();
    if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
      cell.classList.add('today-date');
    }

    cell.addEventListener('click', () => {
      selectedDate = `${year}-${month + 1}-${day}`;
      popupDate.textContent = `선택된 날짜: ${selectedDate}`;
      eventPopup.classList.remove('hidden');
    });
    row.appendChild(cell);
  }

  let nextMonthDay = 1;
  while (row.children.length < 7) {
    let cell = document.createElement('td');
    cell.textContent = nextMonthDay++;
    cell.classList.add('next-month-date');
    row.appendChild(cell);
  }
  calendarBody.appendChild(row);
}
```

## 2. 이벤트 저장
```
saveEventButton.addEventListener('click', () => {
  let eventText = popupEventInput.value;
  if (!eventText || !selectedDate) return;

  if (!events[selectedDate]) events[selectedDate] = [];
  events[selectedDate].push(eventText);

  popupEventInput.value = '';
  eventPopup.classList.add('hidden');
  renderEventList();
});
```

## 3. 이벤트 리스트 렌더링
```
function renderEventList() {
  eventList.innerHTML = '';
  for (let date in events) {
    events[date].forEach((event, index) => {
      let item = document.createElement('div');
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('event-checkbox');

      let text = document.createElement('span');
      text.textContent = `${date} : ${event}`;

      let deleteButton = document.createElement('button');
      deleteButton.textContent = '삭제';
      deleteButton.addEventListener('click', () => {
        events[date].splice(index, 1);
        if (events[date].length === 0) delete events[date];
        renderEventList();
      });

      item.appendChild(checkbox);
      item.appendChild(text);
      item.appendChild(deleteButton);
      eventList.appendChild(item);
    });
  }
}
```

---

## css주요 스타일 
### css변수

```
:root {
  --background: #F7F7F7; /* 밝은 그레이 배경 */
  --primary-green: #5D7C81; /* 짙은 카키 그린 */
  --primary-orange: #FF6F61; /* 산뜻한 살구 오렌지 */
  --primary-violet: #4E4A8D; /* 짙은 퍼플 */
  --primary-gray: #BDBDBD; /* 중간 회색 */
  --border-gray: #E0E0E0; /* 얇은 테두리용 */
  --text-dark: #333333; /* 기본 텍스트 색상 */
  --text-light: #FFFFFF; /* 밝은 텍스트 색상 */
}
```
## **📱 반응형 설계**
- **기본 레이아웃**:  
  데스크톱 화면에서는 **달력**과 **이벤트 관리 창**이 나란히 배치됩니다.
- **모바일 레이아웃**:  
  600px 이하 화면에서는 **세로로 배치**되어 공간을 효율적으로 활용합니다.

---

## **📌 향후 개선 사항**
- ✏️ **이벤트 수정 기능 추가**:  
  등록된 이벤트의 내용을 수정할 수 있는 기능을 제공합니다.
- 💾 **데이터 저장**:  
  `LocalStorage`를 활용하여 새로고침 후에도 데이터가 유지되도록 개선합니다.
- 🔍 **검색 기능**:  
  특정 날짜 또는 이벤트를 검색할 수 있는 기능을 추가합니다.
- 🔔 **알림 기능**:  
  등록된 이벤트에 알림 설정 기능을 추가하여 사용자 편의성을 높입니다.
