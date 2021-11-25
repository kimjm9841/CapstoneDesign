var ex_name;
var ex_link;
var ex_date = [false, false,false,false,false,false,false];
var ex_time;
var ex_id;
var exList = []; //이 파일 내에서 임시로 사용하는 배열
document.getElementById("cancle_btn").addEventListener('click', function(){window.close();});

window.onload=function(){
    if(localStorage.getItem('btnName')){
        var lastData = localStorage.getItem('btnName');
        var titleArea = document.getElementById("title");
        var title = document.createElement('h1');
        if(lastData=='add'){
            title.innerHTML="운동 추가"
            titleArea.appendChild(title);

            chrome.storage.sync.get("exList", function(result) {
                let exList = result.exList
                setInfo(exList);
                if(exList!=null) ex_id=exList.length;
                console.log('Value currently is ', exList, "id", ex_id);
            });
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
                    //ex_id=getExId();
                console.log("저장 직전 id", ex_id);
                if(exList==null){ exList=new Array({"id":0, "name":ex_name, "time":ex_time, "date":ex_date, "link":ex_link}); }
                else{ exList.push({"id":ex_id,"name":ex_name, "time":ex_time, "date":ex_date, "link":ex_link}); }
                chrome.storage.sync.set({exList}, function() {
                    console.log('Value is set to ', exList);
                    console.log("저장되었습니다~");
                });
                window.alert("운동 목록이 추가되었습니다.");
                window.close();
            });

        }
        else if(lastData=='modify'){
            title.innerHTML="수정"
            titleArea.appendChild(title);

            var lastData2 = localStorage.getItem('exId');
            console.log(lastData2.substr(1,1));
            lastData2=parseInt(lastData2.substr(1,1));
            chrome.storage.sync.get("exList", function(result) {
                let exList = result.exList
                setInfo(exList);
                ex_id=lastData2;
                console.log('Value currently is ', exList, "id", lastData2, typeof(lastData2));
                document.getElementById("ex_name").value = exList[lastData2].name;
                document.getElementById("ex_time").value = exList[lastData2].time;
                document.getElementById("ex_url").value = exList[lastData2].link;
                for(let i=0;i<7;i++){
                    //let num=pain[i]+1;
                    if(exList[lastData2].date[i])document.getElementById(i).checked = true;
                  } 
            });
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
                    //ex_id=getExId();
                console.log("저장 직전 id", ex_id);
                //exList.push({"id":ex_id,"name":ex_name, "time":ex_time, "date":ex_date, "link":ex_link});
                exList[lastData2].id = ex_id;
                exList[lastData2].name = ex_name;
                exList[lastData2].time = ex_time;
                exList[lastData2].date = ex_date;
                exList[lastData2].link = ex_link;
                chrome.storage.sync.set({exList}, function() {
                    console.log('Value is set to ', exList);
                    console.log("저장되었습니다~");
                });
                window.alert("운동 목록이 수정되었습니다.");
                window.close();
            });
        }
    }
}
    




//chrome.storage.sync.set({name:ex_name, time:ex_time, date:ex_date, link:ex_link});
function setInfo(exList_t){
    exList=exList_t;
    console.log(exList);
}

/*function getExId(){
    chrome.storage.sync.get("exList", function(result) {
        let value = result.exList
        console.log('Value currently is ', value);
        let id = value.length;
        console.log("아직 리턴 전에", id);
        return id;
      });
}*/
/*
chrome.storage.sync.get("exList", function(result) {
    let value = result.exList
    console.log('Value currently is ', value);
    id=value.length;
    console.log("id", id);
  });
*/