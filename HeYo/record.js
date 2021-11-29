function getData() {
  $.ajax({
    url: "http://34.127.80.4/getStatsWeek.php",
    type: "POST",
    data: {
      user_id: 1000
    }
  }).done(function(data) {
    //$('#result') = data;
    console.log(data);
    //console.log($('#result'));
  });
}

getData()


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


document.getElementById('achiv_next').onclick = function(){
  document.getElementById('achivement').style.display = 'none';
  document.getElementById('exercise').style.display = 'block';
}

document.getElementById('exer_previous').onclick = function(){
  document.getElementById('exercise').style.display = 'none';
  document.getElementById('achivement').style.display = 'block';
}

document.getElementById('exer_next').onclick = function(){
  document.getElementById('exercise').style.display = 'none';
  document.getElementById('percentage').style.display = 'block';
}

document.getElementById('per_previous').onclick = function(){
  document.getElementById('percentage').style.display = 'none';
  document.getElementById('exercise').style.display = 'block';
}

document.getElementById('home').addEventListener("click", function(){
  console.log("home");
  history.back();
});
