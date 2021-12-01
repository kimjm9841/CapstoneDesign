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
    USERINFO[2] = pain[0];
    USERINFO[3] = pre[0];
    USERINFO[4] = equi[0];
    USERINFO[5] = mbti[0];

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
        console.log('Value currently is ', exList, result.user_name);
        resultArea.innerHTML= result.user_name+mbti_result[mbti_id].desc+'&nbsp;';
    });

    //resultArea.innerHTML= mbti_result[mbti_id].desc+'&nbsp;';

    var height=height*0.01;
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

    //테스트
    compare();

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


var exercise = [{"id":1, "link":"https://www.youtube.com/watch?v=IS5OA7GeBJc&list=PLPPetu1spkealPT-BShcUFyWM0it3n2ql&index=4", "hurt":5, "exercise":0, "tool":1, "MBTI":"tp","MBTI2":"fp", "BMI":1},
 {"id":2, "link":"https://www.youtube.com/watch?v=87uwSVdvPY8&t=909s", "hurt":5, "exercise":0, "tool":1, "MBTI":"tj","MBTI2":"", "BMI":1},
 {"id":3, "link":"https://www.youtube.com/watch?v=WKtEJon-85s", "hurt":5, "exercise":0, "tool":0, "MBTI":"fj","MBTI2":"fp", "BMI":1},
 {"id":4, "link":"https://www.youtube.com/watch?v=QA5jS0dPa6w", "hurt":5, "exercise":0, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":1},
 {"id":5, "link":"https://www.youtube.com/watch?v=x26mdeGnxyo", "hurt":5, "exercise":2, "tool":0, "MBTI":"fj","MBTI2":"tj", "BMI":1},
 {"id":6, "link":"https://www.youtube.com/watch?v=wCOgq8U2IOk", "hurt":5, "exercise":2, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":1},
 {"id":7, "link":"https://www.youtube.com/watch?v=NDsjmxTROEo", "hurt":5, "exercise":2, "tool":1, "MBTI":"fp","MBTI2":"", "BMI":1},
 {"id":8, "link":"https://www.youtube.com/watch?v=Bt1wr94FmGQ", "hurt":5, "exercise":2, "tool":1, "MBTI":"tp","MBTI2":"tj", "BMI":1},
 {"id":9, "link":"https://www.youtube.com/watch?v=8lvmFgsQt8U", "hurt":5, "exercise":1, "tool":1, "MBTI":"tj","MBTI2":"", "BMI":1},
 {"id":10, "link":"https://www.youtube.com/watch?v=hJuO1AUqLUc", "hurt":5, "exercise":1, "tool":1, "MBTI":"tp","MBTI2":"tj", "BMI":1},
 {"id":11, "link":"https://www.youtube.com/watch?v=DoQGWdX9l1Y", "hurt":5, "exercise":1, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":1},
 {"id":12, "link":"https://www.youtube.com/watch?v=W1ZUyg8Ju8w", "hurt":5, "exercise":1, "tool":0, "MBTI":"fj","MBTI2":"tj", "BMI":1},
 {"id":13, "link":"https://www.youtube.com/watch?v=6pr9nYOJW3o", "hurt":5, "exercise":3, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":1},
 {"id":14, "link":"https://www.youtube.com/watch?v=b0bz8En15YU", "hurt":5, "exercise":3, "tool":0, "MBTI":"fj","MBTI2":"fp", "BMI":1},
 {"id":15, "link":"https://www.youtube.com/watch?v=gMaB-fG4u4g", "hurt":5, "exercise":3, "tool":1, "MBTI":"fp","MBTI2":"", "BMI":1},
 {"id":16, "link":"https://www.youtube.com/watch?v=Wcdz6n18lR4&list=RDCMUCpg89Ys3E4BaLGgEEWVmI9g&start_radio=1&rv=Wcdz6n18lR4&t=12", "hurt":5, "exercise":3, "tool":1, "MBTI":"tp","MBTI2":"fp", "BMI":1},
 {"id":17, "link":"https://www.youtube.com/watch?v=54tTYO-vU2E", "hurt":5, "exercise":0, "tool":1, "MBTI":"fp","MBTI2":"", "BMI":0},
 {"id":18, "link":"https://www.youtube.com/watch?v=2swcod5RYvU", "hurt":5, "exercise":0, "tool":1, "MBTI":"tp","MBTI2":"fp", "BMI":0},
 {"id":19, "link":"https://www.youtube.com/watch?v=xoWKLNwNva0", "hurt":5, "exercise":0, "tool":0, "MBTI":"fj","MBTI2":"tj", "BMI":0},
 {"id":20, "link":"https://www.youtube.com/watch?v=hgqSlNH_NYo", "hurt":5, "exercise":0, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":0},
 {"id":21, "link":"https://www.youtube.com/watch?v=4qqBQ0Xs4nc", "hurt":5, "exercise":2, "tool":0, "MBTI":"fj","MBTI2":"fp", "BMI":0},
 {"id":22, "link":"https://www.youtube.com/watch?v=g5RfB0D61m8", "hurt":5, "exercise":2, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":0},
 {"id":23, "link":"https://www.youtube.com/watch?v=ieGVQp_eRFs", "hurt":5, "exercise":2, "tool":1, "MBTI":"tj","MBTI2":"", "BMI":0},
 {"id":24, "link":"https://www.youtube.com/watch?v=DWYDL-WxF1U", "hurt":5, "exercise":2, "tool":1, "MBTI":"tp","MBTI2":"fp", "BMI":0},
 {"id":25, "link":"https://www.youtube.com/watch?v=kETh8T3it4k", "hurt":5, "exercise":1, "tool":1, "MBTI":"tj","MBTI2":"", "BMI":0},
 {"id":26, "link":"https://www.youtube.com/watch?v=7TLk7pscICk", "hurt":5, "exercise":1, "tool":1, "MBTI":"tp","MBTI2":"fp", "BMI":0},
 {"id":27, "link":"https://www.youtube.com/watch?v=DoQGWdX9l1Y&t=10s", "hurt":5, "exercise":1, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":0},
 {"id":28, "link":"https://www.youtube.com/watch?v=W1ZUyg8Ju8w&t=339s", "hurt":5, "exercise":1, "tool":0, "MBTI":"fj","MBTI2":"tj", "BMI":0},
 {"id":29, "link":"https://www.youtube.com/watch?v=hJ4_prZ9kB4&t=515s", "hurt":5, "exercise":3, "tool":0, "MBTI":"fj","MBTI2":"tj", "BMI":0},
 {"id":30, "link":"https://www.youtube.com/watch?v=lkSweEq292o", "hurt":5, "exercise":3, "tool":0, "MBTI":"fj","MBTI2":"tp", "BMI":0},
 {"id":31, "link":"https://www.youtube.com/watch?v=zSJYAyoojdw", "hurt":5, "exercise":3, "tool":1, "MBTI":"tp","MBTI2":"tj", "BMI":0},
 {"id":32, "link":"https://www.youtube.com/watch?v=s14NQ6Cz4QE", "hurt":5, "exercise":3, "tool":1, "MBTI":"","MBTI2":"fp", "BMI":0}
]



var exerciseArea = document.querySelector('.exerciseList'); 

function autoservice(){
    alert(pain[0]);
}



function compare(){

    var point_list = [];

    if(USERINFO[2] == 1){
        autoservice();
    }
    for(var i = 0 ; i < 32 ;i++){ //추후 32 >> exercise 길이만큼 받자
        var point = 10;
        console.log(exercise[i]['hurt']);
        //아픈부위 (상체/코어/하체) >> 이외는 모두 제거
        if(USERINFO[2] == 3){
            point+=10
        }//아픈부위가 없다면 전 영상
        else if(USERINFO[2] != exercise[i]['hurt']){
            point+=7
        }//아픈부위관련없는 운동이면 (하체가 아픔 >> 상체운동)
        else{
            point+=0
        }//관련 운동이면
            
        
        //운동부위 (상체/코어/하체) >> 이외는 모두 제거 
        if(USERINFO[3] == 3){        
            point+=10
        }//선호하는 운동부위가 없다면 전 영상
        else if(exercise[i]['exercise'] == 3){
            point+=7
        }//선호하는 부위가 있을 때 전신운동
        else if(USERINFO[3] == exercise[i]['exercise']){
            point+=10
        }//해당 부위관련 운동
        else{
            point+=5
        }//다른 부위관련운동
        

        //운동기구 (덤벨) >> 이외는 모두 제거
        if(USERINFO[4] == 1){
            if(exercise[i]['tool'] == 5){
                point+=10
            }
        }//덤벨 없다면 기구없이 하는 영상 
        else if(USERINFO[4] == exercise[i]['tool']){
            point+=10
        }//덤벨이 있을 때 기구사용 운동
        else{
            point+=7
        }//기구 미사용 운동
    

        //MBTI
        if(USERINFO[5][2] == exercise[i]['MBTI'][0] && USERINFO[5][3] == exercise[i]['MBTI'][1]){
            point*=1.5
        }//뒤 두자리가 같을 때 (성격과 맞는 운동일 때)
        else if(USERINFO[5][2] == exercise[i]['MBTI2'][0] && USERINFO[5][3] == exercise[i]['MBTI2'][1]){
            point*=1.5
        }//뒤 두자리가 같을 때 (성격과 맞는 운동일 때)
        else{
            point*=0.6
        }

        //BMI
        if(USERINFO[6] == 0){
            if(exercise[i]['BMI'] == 1){
                point*=0.8
            }
        }//유저가 비만이 아닐 때 전 운동
        else if(USERINFO[6] == exercise[i]['BMI']){
            point*=1.2
        }//비만일 때 다이어트 관련 운동
        else{
            point*=0.6
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

    console.log(img_list);


    var exerciseArea = document.querySelector('.exerciseList');
    var elem = ""
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
            break;
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
