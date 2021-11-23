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


new Chart(document.getElementById("achivementChart"), {
  type: 'bar',
  data: {
    labels: ['6주 전','5주 전','4주 전','3주 전','2주 전','1주 전'],
    datasets: [{
        data: [46,14,26,36,57,11],
        label: "달성도(%)",
        backgroundColor: "#3e95cd",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: '수행한 운동 수 / 계획한 운동 수'
    }
  }
});


new Chart(document.getElementById("exerciseChart"), {
  type: 'line',
  data: {
    labels: ['6주 전','5주 전','4주 전','3주 전','2주 전','1주 전'],
    datasets: [{
          data: [1106,1123,1162,1092,1177,1126],
          label: "운동량(분)",
          backgroundColor: "#c45850",
          borderColor: "#c45850",
          fill: false
        }
    ]
  },
  options: {
    title: {
      display: true,
      text: '일주일간 수행한 총 운동시간'
    }
  }
});


new Chart(document.getElementById("percentageChart"), {
  type: 'bar',
    data: {
      labels: ['6주 전','5주 전','4주 전','3주 전','2주 전','1주 전'],
      datasets: [
        {
          label: "달성도",
          backgroundColor: "#3e95cd",
          data: [33,21,83,78,11,45]
        }, {
          label: "운동량",
          backgroundColor: "#c45850",
          data: [8,47,75,34,66,92]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: '상대평가 (백분위 75 = 상위 25%)'
      }
    }
});


// combo box가 바뀔 때마다 화면 변경
document.getElementById("form").addEventListener("click", changeSelect);

function changeSelect() {
  var select = document.getElementById("form");
  // select element에서 선택된 option의 value가 저장된다.
  var selectValue = select.options[select.selectedIndex].value;

  if (selectValue == "month") {
    document.getElementById("calender").style.display = "block";
    document.getElementById("statistics").style.display = "none";
  } else if (selectValue == "statistics") {
    document.getElementById("calender").style.display = "none";
    document.getElementById("statistics").style.display = "block";
  }
}
