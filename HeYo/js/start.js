document.getElementById("startButton").addEventListener("click", begin);

const main=document.querySelector("#main");
const qna=document.querySelector("#qna");
const result=document.querySelector("#result");
const endPoint=6;
const select1 = [];
const select2 = [];
const select = Array(Array());


function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.WebkitAnimation = "fadeOut 1s";
    setTimeout(()=>{
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.WebkitAnimation = "fadeIn 1s";
        setTimeout(()=>{
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)
    }, 450)

    console.log(select);
    console.log(select[4]);
}
function addCheckAnswer(answerText, qIdx, idx){
    var a=document.querySelector('.answerBox');
    var answer = document.createElement('input');
    answer.type = 'checkbox';
    answer.id = idx;
    answer.autocomplete='off';
    answer.id = "btn-check-2-outlined";
    /*answer.classList.add('btn btn-primary');*/
    var text = document.createTextNode(answerText);
    text.label='class=\"btn btn-outline-secondary\" for=\"btn-check-2-outlined\"'
    /*answer.innerHTML='class="btn btn-primary" for="btn-check"'*/
    
    /*var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');*/

    a.appendChild(answer);
    a.appendChild(text);
    //answer.innerHTML=answerText;
}

function addAnswer(answerText, qIdx, idx){
    var a=document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer);
    answer.innerHTML=answerText;

    answer.addEventListener("click", function(){
        var children=document.querySelectorAll('.answerList');
        for(let i=0; i<children.length; i++){
            children[i].disabled=true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
        }
        setTimeout(()=>{
            select[qIdx]=idx;
            for(let i=0; i<children.length; i++){
                children[i].style.display='none';
            }
            goNext(++qIdx);
        }, 450)
    }, false)
}
function addTextAnswer(answerText, qIdx, idx){
    var a=document.querySelector('.answerBox');
    var answer = document.createElement('textArea');
    answer.id=idx;
    answer.classList.add('answerText');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    answer.classList.add('placeholder'); //회색글씨 추가
    answer.innerHTML=answerText
    a.appendChild(answer);
}
function addOKButton(qIdx, idx){
    var a=document.querySelector('.answerBox');
    var btn=document.createElement('button');
    btn.classList.add('answerText');
    btn.classList.add('my-3');
    btn.classList.add('py-3');
    btn.classList.add('mx-auto');
    btn.classList.add('fadeIn');
    btn.innerHTML="확인";
    a.appendChild(btn);
    
    btn.addEventListener("click", function(){
        var children=document.querySelectorAll('.answerText');
        console.log("children 길이"+children.length);
        for(let i=0; i<children.length; i++){
            children[i].disabled=true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
        }
        setTimeout(()=>{ // 이차원 배열에 입력하는 거부터 다시하기
            for(let i in idx){
                var buf = document.getElementById(i).value;
                //select[qIdx].push(buf);
            }

            for(let i=0; i<children.length; i++){
                children[i].style.display='none';
            }
            goNext(++qIdx);
        }, 450)
    }, false)

}

function goNext(qIdx){
    if(qIdx+1 === endPoint){
        goResult();
        return;
    }
    var q=document.querySelector('.qBox');
    q.innerHTML=qnaList[qIdx].q;
    let i;
    for(i in qnaList[qIdx].a){
        console.log(qIdx);
        if(qIdx==0||qIdx==4) {addTextAnswer(qnaList[qIdx].a[i].answer, qIdx, i);}
        else if(qIdx==3) {
            addCheckAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
        }
        else{addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);}
    }
    if(qIdx==0||qIdx==4) addOKButton(qIdx, i);
    var status = document.querySelector('.statusBar')
    status.style.width = (100/endPoint) * (qIdx + 1) + '%';
}

function begin(){ //시작하기 버튼
    //main.style.display = "none";
    //qna.style.display = "block";
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.WebkitAnimation = "fadeOut 1s";
    setTimeout(()=>{
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.WebkitAnimation = "fadeIn 1s";
        setTimeout(()=>{
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);

}