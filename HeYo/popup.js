var checkAlarm = document.getElementById("alarm");
checkAlarm.addEventListener('click', function(){
  if(checkAlarm.checked==true){
    console.log("체크했음");
    chrome.storage.sync.set({alarm:true}, function() {
      console.log("저장되었습니다~");
    });
  }
  else{
    console.log("체크안함");
    chrome.storage.sync.set({alarm:false}, function() {
      console.log("저장되었습니다~");
    });
  }
})

window.onload=function(){
    let keys=["fairy_name", "fairy_bmi", "fairy_current_clothes", "fairy_closet", "alarm"]
    var fairyname, body_value, currentclothes, fairyclothes;
    chrome.storage.sync.get(keys, function(result) {
        let fairyname = result.fairy_name;
        document.getElementById('fairyname').value=result.fairy_name;
        let body_value = result.fairy_bmi;
        let currentclothes = result.fairy_current_clothes;
        //let fairyclothes = result.fairy_closet;
        let alarm = result.alarm;
        if(result.fairy_name==null){setDefault();}
        else{setInfo(fairyname, body_value, currentclothes, alarm);}
      });
}

function setInfo(fairy_name, body_value, fairy_current_clothes, alarm){

  let body_level=0;
  if(body_value>=0&&body_value<=25) body_level=1;
  else if(body_value>=26&&body_value<=50) {body_level=2;}
  else if(body_value>=51&&body_value<=75) {body_level=3;}
  else if(body_value>=76&&body_value<=100) {body_level=4;}
  else {
    alert("요정 비만도 로드에 오류가 발생했습니다.");
    return -1;
  }

  var src=null;
  if(fairy_current_clothes==null){src="/images/fairy_lv"+body_level+".png";}
  else{src="/images/fairy_lv"+body_level+"_"+fairy_current_clothes+".png";}
  //if(fairyLevel==1){src="/images/fairy_lv"+body_level+"_"+fairy_current_clothes+".png";}
  //else{src="/images/fairy_lv"+fairyLevel+".png";}

  document.getElementById('fairyname').value=fairy_name;
  var ImgArea = document.getElementById('fairy');
  var img = document.createElement('img');

  img.setAttribute("src", src);
  img.setAttribute("width", "150");
  img.setAttribute("alt", "설정");

  ImgArea.appendChild(img);

  checkAlarm.checked=alarm;
}

function setDefault(){
  //document.getElementById('fairyname').value=fairy_name;
  var ImgArea = document.getElementById('fairy');
  var img = document.createElement('img');

  let src="/images/fairy_basic.png";
  img.setAttribute("src", src);
  img.setAttribute("width", "150");
  img.setAttribute("alt", "설정");

  ImgArea.appendChild(img);
}