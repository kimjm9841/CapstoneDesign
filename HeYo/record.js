let achivement_absolute = new Array(6);
let time_absolute = new Array(6);
let achivement_relative = new Array(6);
let time_relative = new Array(6);
let user_id = 0;

chrome.storage.sync.get("id", function(result) {
  user_id = result.id;
  if (user_id) {
    console.log('User ID is  ', user_id);
  }
});

function getData() {
  $.ajax({
    url: "http://34.127.80.4/getProcess.php",
    type: "POST",
    data: {
      user_id: user_id
    }
  }).done(function(data) {
    data = JSON.parse(data);

    for (var i=0; i<6; i++) {
      achivement_absolute[i] = data[i].achieve_absolute;
      time_absolute[i] = data[i].time_absolute;
      achivement_relative[i] = data[i].achieve_relative;
      time_relative[i] = data[i].time_relative;
    }
  });
}

getData()


new Chart(document.getElementById("achivementChart"), {
  type: 'bar',
  data: {
    labels: ['6주 전','5주 전','4주 전','3주 전','2주 전','1주 전'],
    datasets: [{
        data: achivement_absolute,
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
          data: time_absolute,
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
          data: achivement_relative
        }, {
          label: "운동량",
          backgroundColor: "#c45850",
          data: time_relative
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
