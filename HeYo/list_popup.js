var ex_name;
var ex_link;
var ex_date = [false, false,false,false,false,false,false];
var ex_time;

//window.onload=function(){
    if(localStorage.getItem('btnName')){
        var lastData = localStorage.getItem('btnName');
        var titleArea = document.getElementById("title");
        var title = document.createElement('h1');
        if(lastData=='add'){
            title.innerHTML="운동 추가"
            titleArea.appendChild(title);
        }
        else if(lastData=='modify'){
            title.innerHTML="수정"
            titleArea.appendChild(title);
        }
    }

    document.getElementById("cancle_btn").addEventListener('click', function(){window.close();});
    document.getElementById("ok_btn").addEventListener('click', function(){
        console.log(1);
        ex_name=document.getElementById("ex_name").value;
        ex_time=document.getElementById("ex_time").value;
        ex_link=document.getElementById("ex_url").value;
        for(var i=0;i<7;i++){
            ex_date[i]=document.getElementById(i).checked;
        }
        console.log(ex_date);
        var inputArea = document.querySelector(".input");
        inputArea.innerHTML=ex_name+" "+ex_time+" "+ex_link+" "+ex_date;
        //window.alert(ex_name, ex_time, ex_link);
        //window.close();
    });
//}
