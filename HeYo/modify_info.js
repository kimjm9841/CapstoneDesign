function setInfo(pain, equi, weight, height, mbti){
  console.log(pain, equi, weight, height, mbti);
  console.log(equi.length, equi);
  for(let i=0;i<pain.length;i++){
    let num=pain[i]+1;
    document.getElementById("q3_"+num).checked = true;
  } 
  for(let i=0;i<equi.length;i++){
    let num=equi[i]+1;
    document.getElementById("q4_"+num).checked = true;
  } 
  document.getElementById("weight").value=weight;
  document.getElementById("height").value=height;
  var Smbti = document.getElementById("mbti");
  for(let i=0;i<Smbti.length;i++){
    if(Smbti[i].value==mbti){
      Smbti[i].selected=true;
    }
  }
}

let keys = ["pain", "equi", "weight", "height", "mbti"]
chrome.storage.sync.get(keys, function(result) {
    let value1 = result.pain;
    let value2 = result.equi;
    let value3 = result.weight;
    let value4 = result.height;
    let value5 = result.mbti;

    console.log('Value currently is ',value1,value2,value3,value4,value5);
    setInfo(value1,value2,value3,value4,value5);
  });

  
var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener('click', function(){
  let pain=[];
  let equi=[];
  let weight, height, mbti = null;
  for(let i=0;i<6;i++){
    let num=i+1;
    console.log(document.getElementById("q3_"+num).checked);
    if(document.getElementById("q3_"+num).checked == true) 
      pain.push(i);
  }
  for(let i=0;i<6;i++){
    let num=i+1;
    if(document.getElementById("q4_"+num).checked == true) 
      equi.push(i);
  }
  weight=document.getElementById("weight").value;
  height=document.getElementById("height").value;
  mbti=document.getElementById("mbti").value;

  chrome.storage.sync.set({pain:pain, equi:equi, weight:weight, height:height, mbti:mbti}, function() {
    console.log('Value is set to ', pain, equi, weight, height, mbti);
    console.log("저장되었습니다~!");
    window.alert("저장되었습니다.");
  });
});

/*
  "type": "object",
  "properties": {
      "user_name":{"type":"string"},
      "pain":{"type":"array"},
      "pre":{"type":"array"},
      "equi":{"type":"array"},
      "mbti":{"type":"string"},
      "height":{"type":"number"},
      "weight":{"type":"number"},
      "fairy_name":{"type":"string"},
      "fairy_bmi":{"type":"number"},
      "fairy_current_clothes":{"type":"number"},
      "fairy_closet":{"type":"object"}
  }*/