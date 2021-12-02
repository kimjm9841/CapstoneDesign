var hw=document.getElementById('hw');
hw.addEventListener('click', function(){
    bmi_grades(175, 52)});

function bmi_grades(height, weight){
    var bmi_value = weight/(height**2); // (몸무게)/{(키)^2}
    var bmi; //1:저체중, 2:정상, 3:과체중, 4:비만, 5:고도비만
   
    //bmi 계산
    if(bmi_value<18.5){ bmi=1; } 
        else if(18.5<=bmi_value&&bmi_value<=22.9){ bmi=2; }
        else if(23<=bmi_value&&bmi_value<=24.9){ bmi=3; }
        else if(25<=bmi_value&&bmi_value<=29.9){ bmi=4; } 
        else{ bmi=5; }

    mbti_rec(bmi);

    return;
}

function mbti_rec(bmi){
    var mbti="ISFP"; //나중에 지우기
    var tfpj=mbti.substr(2,2);
    var type;

    if(tfpj=="TP"){type=1;}
    else if(tfpj=="TJ"){type=2;}
    else if(tfpj=="FP"){type=3;}
    else if(tfpj=="FJ"){type=4;}
    //window.alert("bmi는?"+ String(bmi) + " mbti는?"+ String(type));
    chrome.history.search({text: '', maxResults: 1}, function(data) {
        data.forEach(function(page) {
            console.log(page.url);
        });
    });   
    
    window.alert("bmi는?"+ String(bmi) + " mbti는?"+ String(type));

    classify(bmi, type);
    return;
}

function classify(bmi, type){
    /*
    운동기구, 아픈부위, bmi 강도, mbti 추천 운동을 가지고 분류
    1: +운동기구 -아픈부위
    2: +운동기구
    3: -아픈부위
    4: +맨손 -아픈부위
    */

    return;
}

function frequency(){
    var mbti="ISFP"; //나중에 지우기
    var eisn=mbti.substr(2,2);
    var num;

    if(eisn=="ES"){num=5;}
    else if(eisn=="IN"){num=3;}
    else{num=4;}

    return;
}

/* 어차피 순서대로 진행되는거라 절차지향처럼 가도 괜찮을 것 같아요. */