import {exerciseList} from './js/getData.js';

document.getElementById("addBtn").addEventListener('click', function(){
    console.log("add");
    localStorage.setItem('btnName', 'add');
    window.open("list_popup.html", "a", "width=600, height=600, left=500, top=300");
});

window.onload=function(){
    var length=exerciseList.length;
    console.log(length);
    console.log(exerciseList);

    var listArea = document.querySelector('.lists');
    console.log(listArea);
    //var listEntry;

    for(var i=0;i<length;i++)
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
            confirmModal(this.id);
        });

        modify_btn.classList.add('listBtn');
        modify_btn.classList.add('my-3');
        modify_btn.classList.add('py-3');
        //modify_btn.classList.add('mx-auto');
        modify_btn.setAttribute("id", "mBtn"+i);
        modify_btn.innerHTML='<img src="/images/edit-button.png" width="40">';
        modify_btn.addEventListener("click", function(){
            window.open("list_popup.html", "a", "width=600, height=600, left=500, top=300");
            localStorage.setItem('btnName', 'modify');
        });



        listArea.appendChild(listEntry);
        listArea.appendChild(modify_btn);
        listArea.appendChild(delete_btn);
        listEntry.innerHTML=exerciseList[i].name;

        //버튼 리스너 누르면 새로운 팝업 띄우기.
        //팝업 안에서 정보 수정 가능.
        //여기 같은 줄에 수정, 삭제 버튼 만들기.
    }

}
function confirmModal(id) {
    console.log("뭐가 눌렸지? "+id);

    if (window.confirm("정말 삭제하시겠습니까?")) {
      //document.body.style.background = "#1abc9c";
      exerciseList.splice(id); //데이터 업로드(이 상태에선 안됨..)
      location.reload(); //새로고침
    } else {
      console.log("취소. 변화 없음");
    }
  }