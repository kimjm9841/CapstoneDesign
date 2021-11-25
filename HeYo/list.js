//import {exerciseList} from './js/getData.js';
var exList = [];

document.getElementById("addBtn").addEventListener('click', function(){
    console.log("add");
    localStorage.setItem('btnName', 'add');
    window.open("list_popup.html", "a", "width=600, height=600, left=500, top=300");
});


window.onload=function(){
    chrome.storage.sync.get("exList", function(result) {
        //let exList = result.exList
        setInfo(result.exList);
        console.log('Value currently is ', result.exList);
    });

    //getInfo();
    console.log("받은거 확인용"); console.log(exList);

    var length=exList.length;
    console.log("length: ",length);
}

function confirmModal(id) {
    console.log("뭐가 눌렸지? "+id);

    if (window.confirm("정말 삭제하시겠습니까?")) {
      //document.body.style.background = "#1abc9c";
      //exerciseList.splice(id); //데이터 업로드(이 상태에선 안됨..)
      location.reload(); //새로고침
    } else {
      console.log("취소. 변화 없음");
    }
  }

function setInfo(exList_t){
    exList=exList_t;
    if(exList==null) console.log("없어");
    console.log("1", exList);//, "length= "+exList.length);
    var listArea = document.querySelector('.lists');

    if(exList!=null){
        for(var i=0;i<exList.length;i++)
        {
            var listEntry = document.createElement('button');
            listEntry.classList.add('listEntry');
            listEntry.classList.add('my-3');
            listEntry.classList.add('py-3');
            //listEntry.classList.add('mx-auto');
            listEntry.setAttribute("disabled", "");
            listEntry.setAttribute("style", "text-align: center;")
            listEntry.setAttribute("id", "exList"+i);

            var delete_btn = document.createElement('button');
            var modify_btn = document.createElement('button');
            delete_btn.classList.add('listBtn');
            delete_btn.classList.add('my-3');
            delete_btn.classList.add('py-3');
            //delete_btn.classList.add('mx-auto');
            delete_btn.setAttribute("id", i);
            delete_btn.innerHTML='<img src="/images/trash-can.png" width="40">'
            delete_btn.addEventListener("click", function(){
                //confirmModal(this.id);
                //exList.splice(i, 1);
                delete_entry(this.id);
                location.reload();
            }); 

            modify_btn.classList.add('listBtn');
            modify_btn.classList.add('my-3');
            modify_btn.classList.add('py-3');
            //modify_btn.classList.add('mx-auto');
            modify_btn.setAttribute("id", "m"+i);
            modify_btn.innerHTML='<img src="/images/edit-button.png" width="40">';
            modify_btn.addEventListener("click", function(){
                window.open("list_popup.html", "a", "width=600, height=600, left=500, top=300");
                localStorage.setItem('btnName', 'modify');
                console.log(this.id);
                localStorage.setItem('exId', this.id);
            });



            listArea.appendChild(listEntry);
            listArea.appendChild(modify_btn);
            listArea.appendChild(delete_btn);
            listEntry.innerHTML=exList[i].name;

            //버튼 리스너 누르면 새로운 팝업 띄우기.
            //팝업 안에서 정보 수정 가능.
            //여기 같은 줄에 수정, 삭제 버튼 만들기.
        }
    }
}

function delete_entry(id){
    console.log("id", id, exList, typeof(exList), typeof(exList[0]), exList[0]);
    let filtered = exList.filter((element) => element.id != id);
    for(let i=0;i<filtered.length;i++){
        filtered[i].id=i;
    }
    console.log("filtered", filtered);

    exList=filtered;
    console.log(exList);
    /*for (var i = 0; i < exList.length; i++) {
        console.log(exList[i].id);
        if (exList[i].id == id) { // 값이 같은 배열 인덱스 확인
            exList.splice(i, 1);
        }
    }
    console.log(exList);*/
    chrome.storage.sync.set({exList}, function() {
        console.log('Value is set to ', exList);
        console.log("저장되었습니다~");
    });
}