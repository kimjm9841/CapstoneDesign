//import {algo} from './test2_back.js'; //import하고 아래에서 사용하면 됩니다!
//혹시 test2_back.js가 아니고 다른 파일에서 구현중이었으면 여기에 './(이 부분 수정).js'하시고
//test2_input.html에서 <script src="./test2_back.js" type="module"></script> 여기서 "./(이 부분 수정).js"하시면 될 것 같습니다!
const USERINFO = [];
var exList = [];

var height;
var weight;
var mbti;
var pre;
var equi;
var pain;

window.onload=function(){

    height = localStorage.getItem('height');
    weight = localStorage.getItem('weight');
    mbti = localStorage.getItem('mbti');
    var pre_tmp = localStorage.getItem('pre');
    var equi_tmp = localStorage.getItem('equi');
    var pain_tmp = localStorage.getItem('pain');
    console.log(height, weight, mbti, pre, equi, pain_tmp, typeof(pain_tmp));
    
    pre = pre_tmp.split(',');
    equi = equi_tmp.split(',');
    pain = pain_tmp.split(',');
    console.log(pre, equi, pain, typeof(pre[0]));

    for(let i=0; i<pre.length; i++){
        pre[i]=parseInt(pre[i]);
    }
    for(let i=0; i<pain.length; i++){
        pain[i]=parseInt(pain[i]);
    }
    for(let i=0; i<equi.length; i++){
        equi[i]=parseInt(equi[i]);
    }
    console.log(pre[0], typeof(pre[0]));

    USERINFO[0] = "user_name";
    USERINFO[1] = 1;
    USERINFO[2] = pain;
    USERINFO[3] = pre;
    USERINFO[4] = equi;
    USERINFO[5] = mbti;

    var resultArea = document.querySelector('.resultDesc'); 
    var result_title;
    var result_desc = document.createElement("p");
    var mbti_id=0;
    var bmi_id=0;
    if(mbti[0]=='isfp' || mbti[0]=='infp' || mbti[0]=='esfp' || mbti[0]=='enfp') mbti_id=0;
    else if(mbti[0]=='isfj' || mbti[0]=='infj' || mbti[0]=='esfj' || mbti[0]=='enfj') mbti_id=1;
    else if(mbti[0]=='istp' || mbti[0]=='intp' || mbti[0]=='estp' || mbti[0]=='entp') mbti_id=2;
    else if(mbti[0]=='istj' || mbti[0]=='intj' || mbti[0]=='estj' || mbti[0]=='entj') mbti_id=3;
    console.log(mbti_result[mbti_id]);

    let keys = ["exList", "user_name"];
    chrome.storage.sync.get(keys, function(result) {
        let exList = result.exList
        setInfo(exList);
        console.log('Value currently is ',weight, height, exList, result.user_name);
        console.log(USERINFO[0] , USERINFO[2] ,USERINFO[3] ,USERINFO[4] ,USERINFO[5][2],USERINFO[5][3],USERINFO[6])
        resultArea.innerHTML= result.user_name+mbti_result[mbti_id].desc+'&nbsp;';
    });

    //resultArea.innerHTML= mbti_result[mbti_id].desc+'&nbsp;';

    var height=height*0.1;
    var height_2=height*height;
    var bmi=weight/height_2;
    console.log(bmi);
    if(bmi>=30){
        resultArea.innerHTML= mbti_result[mbti_id].desc+'&nbsp;'+bmi_result[0].desc;
        USERINFO[6] = 1;
    }
    else{
        USERINFO[6] = 0;
    }
    console.log(USERINFO[6]);

    //compare();
    //테스트
}

//document.getElementById("ok_btnR").addEventListener('click', compare);
document.getElementById("ok_btnR").addEventListener('click', function(){
    let isChecked = false;
    let checkArr = document.getElementsByName("rec[]");
    //let exList = new Array();
    let ex_id = new Array();
    for(var i=0;i<checkArr.length;i++){
        if(checkArr[i].checked == true) {
            ex_id.push(checkArr[i].id);
        }
    }
    console.log('선택된 id', ex_id);
    let count=0;
    for(let j=0; j<ex_id.length; j++){
        for(let i=0; i<exercise.length; i++){
            if(exercise[i]['id']==ex_id[j]) exList.push({"name":exer_where[exercise[i]['exercise']].desc+exer_tool[exercise[i]['tool']].desc+exer_fat[exercise[i]['BMI']].desc, "link":exercise[i]['link']});
        }
    }
    console.log("!확인!");
    console.log(exList);

    if (confirm("추천 운동을 등록하시겠습니까?") == true){    //확인
        chrome.storage.sync.set({exList}, function() {
            console.log('Value is set to ', exList);
            console.log("저장되었습니다~");
        });
        location.replace("/list.html"); //운동목록 페이지로 이동
    }else{   //취소
        console.log("등록 안함.");
    }

});

function setInfo(exList_t){
    exList=exList_t;
    console.log(exList);
}

let exercise = [];
function getData() {
    $.ajax({
      url: "http://34.127.80.4/getVideo.php",
      type: "POST",
      data: {}
    }).done(function(data) {
      exercise = JSON.parse(data);
      console.log(exercise);
      compare();
    });
  };
  
  getData();


var exerciseArea = document.querySelector('.exerciseList'); 

function autoservice(){
    alert(pain[0]);
}

function compare(){
    console.log("===================")
    console.log(USERINFO[0], USERINFO[1], USERINFO[2], USERINFO[2].length, USERINFO[3], USERINFO[4], USERINFO[5]);//[0], USERINFO[2][1], USERINFO[2][3]);

    var point_list = [];
    console.log(exercise.length);
    for(var i = 0 ; i < exercise.length ;i++){ //추후 32 >> exercise 길이만큼 받자
        var point = 50;
        
        var temppoint = false;
        console.log(i)

        console.log(USERINFO[2].length);
        for(var j = 0 ; j < USERINFO[2].length ; j++){
            if(USERINFO[2][j] == 3){
                point+=10;
                console.log("아픔X 전부위")
                break;
            }//아픈부위가 없다면 전 영상 추천
            else if(USERINFO[2][j] == exercise[i]['hurt']){
                point-=20;
                temppoint = false;
                console.log("아픔 아픔")
                break;
            }//아픈부위관련 운동이면
            else{
                temppoint = true;
                console.log("아픔 다른아픔")
            }//아픈부위관련 없는 운동이면
        } 
        if(temppoint = true){
            point += 5;
        }//반복문을 돌리기 때문에 점수가 중첩될수 있다. 
         //user = {0,1} exercise = {1}이라면 처음루틴에서 else문을 한번 더 들어가기 때문
        temppoint = false;

        for(var j = 0 ; j < USERINFO[3].length ; j++){
            if(USERINFO[3][j] == 3){   
                point += 10;     
                console.log("운동부위X 전영상")
                break;
            }//선호하는 운동부위가 없다면 전 영상 추천
            else if(exercise[i]['exercise'] == 3){
                point += 5;
                console.log("운동부위 전신")
                break;
            }//선호하는 부위가 있을 때 전신운동 추천
             //전신운동에는 선호하는 부위도 작용이 되기 때문
            else if(USERINFO[3][j] == exercise[i]['exercise']){
                point+=20
                temppoint = false;
                console.log("운동부위 운동부위")
                break;
            }//선호하는부위관련 운동
            else{
              temppoint = true;
              console.log("운동부위 운동부위X")
            }//선호하는부위관련 없는운동
        }
        if(temppoint = true){
            point -= 10;
        }
        temppoint = false;


        for(var j = 0 ; j < USERINFO[4].length ; j++){
            // 1이 기구가 없을 때다
            if(USERINFO[4][j] == 3){
                if(exercise[i]['tool'] == 3){
                    console.log("기구X 맨몸")
                    break;
                }//유저가 기구가 없을때 맨몸운동 추천
                else{
                    point-=20
                    console.log("기구X 기구")
                    break;
                }//유저가 기구가 없을때 기구운동 비추천
            }    
            else if(exercise[i]['tool'] == 3){
                temppoint = false;
                console.log("기구 맨몸")
                break;
            }//유저가 기구가 있지만 맨몸운동
            else if(USERINFO[4][j] == exercise[i]['tool']){
                point+=20;
                temppoint = false;
                console.log("기구 기구")
                break;
            }//유저가 기구가 있고   관련 기구 운동
            
            else{
                temppoint = true;
                console.log("기구 다른기구")
            }//유저가 기구가 있지만 다른 기구 운동
        }
        if(temppoint = true){
            point -= 20;
        }


        //MBTI
        if(USERINFO[5][2] == exercise[i]['MBTI'][0] && USERINFO[5][3] == exercise[i]['MBTI'][1]){
            point*=1.1            
        }//뒤 두자리가 같을 때 (성격과 맞는 운동일 때)
        else if(USERINFO[5][2] == exercise[i]['MBTI2'][0] && USERINFO[5][3] == exercise[i]['MBTI2'][1]){
            point*=1.1
        }//뒤 두자리가 같을 때 (성격과 맞는 운동일 때)
        else{
            point*=0.9
        }

        //BMI
        if(USERINFO[6] == 0){
            if(exercise[i]['BMI'] == 1){
                point*=0.9
            }
        }//유저가 비만이 아닐 때 다이어트 운동
        else if(USERINFO[6] == exercise[i]['BMI']){
            point*=1.1
        }//비만일 때 다이어트 관련 운동
        else{
            point*=0.9
        }//다이어트 관련없는 운동

        point_list.push(point);
        exercise[i]['point'] = point;
    }

    console.log(point_list)

    exercise.sort(function(a,b){
        return b.point - a.point;
    });
    console.log(exercise)


    var img_url1 = 'https://img.youtube.com/vi/';
    var img_url2 = '/2.jpg';

    var img_list = [];
    var vidurl;
    var r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    for(var i = 0; i < exercise.length ; i++){
        vidurl = exercise[i]['link'];
        r = vidurl.match(rx);
        img_list[i] = r[1];
    }

    var exerciseArea = document.querySelector('.exerciseList');
    var elem = ""
    var count = 0;
    console.log("Recommend for "+ USERINFO[0] + " is")
    for(var i = 0; i<exercise.length ; i++){
        console.log(i, exercise[i]['id'], exercise[i]['link'], exer_where[exercise[i]['exercise']].desc+exer_tool[exercise[i]['tool']].desc+exer_fat[exercise[i]['BMI']].desc);
        setRecList(i+1, exercise[i]['id'], exercise[i]['link'], img_list[i],
         exer_where[exercise[i]['exercise']].desc+exer_tool[exercise[i]['tool']].desc+exer_fat[exercise[i]['BMI']].desc);

         //exerciseArea.innerHTML += "<img src='" + img_url1 + img_list[i] + img_url2 +"' width='200'>";
        //exerciseArea.innerHTML += "<a href=" + exercise[i]['link'] + " target='_blank'>"
        //+ exer_where[exercise[i]['exercise']].desc+exer_tool[exercise[i]['tool']].desc+exer_fat[exercise[i]['BMI']].desc
        //+ "</a> <br>";

        if(exercise[i]['point'] != exercise[i+1]['point']){
            
            if(count > 5){
                break;
            }
            count += (exercise[i]['point'] - exercise[i+1]['point'])
        }
    
    }
}

function setRecList(idx ,id, link, imgId, ex_title){
    console.log("link의 id", id);
    var recArea = document.querySelector('.resultRec');
    var recEntry = document.createElement("input");
    recEntry.setAttribute('type', 'checkbox');
    recEntry.setAttribute('id', id);
    recEntry.setAttribute('name', "rec[]");
    //recEntry.setAttribute('class', 'btn-check');
    recEntry.classList.add('btn-check');
    recEntry.setAttribute('autocomplete', 'off');

    var recLabel = document.createElement("label");
    recLabel.setAttribute('class', 'btn btn-outline-primary');
    recLabel.setAttribute('for', id);
    recLabel.innerHTML = "추천"+idx;         

    var buf = document.createElement("label");
    buf.innerHTML='&nbsp;&nbsp;';
    var buf1 = document.createElement("label");
    buf1.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;';
    var buf2 = document.createElement("p");
    buf2.innerHTML='<br>';
    var buf3 = document.createElement("label");
    buf3.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;';

    var recImg = document.createElement("img");
    recImg.setAttribute('src', 'https://img.youtube.com/vi/'+imgId+'/2.jpg');//'/mqdefault.jpg');
    recImg.setAttribute('alt', '썸네일');
    recImg.setAttribute('width', '180');
    recImg.setAttribute('style', 'vertical-align:top;');

    var recTitle = document.createElement("textarea");
    //recTitle.setAttribute('class', 'mx-auto my-auto');
    //recTitle.setAttribute('cols', '135');
    recTitle.setAttribute('style', 'width: 60%; height: 78px; border: 0px; resize: none;')
    recTitle.setAttribute('disabled', '');
    recTitle.setAttribute('id', id);
    recTitle.setAttribute('name', ex_title);
    fetch(`https://noembed.com/embed?dataType=json&url=${link}`)
    .then(res => res.json())
    .then(data => recTitle.innerHTML='['+ex_title+']\n'+data.title)

    var recPlay = document.createElement("a");
    recPlay.setAttribute('href', link);
    recPlay.setAttribute('target', '_blank');
    recPlay.innerHTML = '<img src="/images/next.png" width="16" alt="링크연결">';

    var buf_hr = document.createElement("hr");
    recArea.appendChild(buf2);
    recArea.appendChild(recEntry);
    recArea.appendChild(recLabel); 
    recArea.appendChild(buf);
    recArea.appendChild(recImg);
    recArea.appendChild(buf1);
    recArea.appendChild(recTitle);
    recArea.appendChild(buf3);
    recArea.appendChild(recPlay);
    recArea.appendChild(buf_hr);
}

//      <a href="options.html" target="_blank"><img src="/images/gear-option.png" width="16" alt="설정"></a>
