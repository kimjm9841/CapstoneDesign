function getDate(date) {
  return date.toLocaleDateString().replace(/\./g, "").split(" ");
}

const pad = (str) => str > 9 ? str : '0' + str;

window.onload = function() {
  const ToDay = new Date();
  const nowMonth = ToDay.getMonth();
  const [y, m] = getDate(new Date(ToDay.setMonth(nowMonth)));
  const lastDay = getDate(new Date(y, m, 0)).pop() * 1;
  const day = new Date([y, m, 1].join("-")).getDay() * 1;
  const maxDay = Math.ceil((day + lastDay) / 7) * 7;

  let html = '';

  for (let i = 1; i <= maxDay; i++) {
    const diff = i - day;
    const d = diff <= lastDay && i > day ? diff : '';
    const tmpClass = !d ? 'background' : '';

    html += `<div class="dateSel ${tmpClass}">${d}</div>`;
  }

  document.querySelector('.dateSel').innerHTML = html;
  document.querySelector('.date_text').innerText = `${y}년 ${pad(m)}월`;
}


document.getElementById("form").addEventListener("click", changeSelect);

function changeSelect() {
  var select = document.getElementById("form");
  // select element에서 선택된 option의 value가 저장된다.
  var selectValue = select.options[select.selectedIndex].value;

  if (selectValue == "month") {
    document.getElementById("calender").style.display = "block";
    document.getElementById("checklist").style.display = "none";
  } else if (selectValue == "day") {
    document.getElementById("calender").style.display = "none";
    document.getElementById("checklist").style.display = "block";
  }
}
