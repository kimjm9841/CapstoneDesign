var exList = [];

window.onload=function(){
    var fairyname="포크";
    var fairy_value=27;
    var currentclothes=null;
    var fairycloset=[1,2,3];
    chrome.storage.sync.set({fairy_name:fairyname, fairy_bmi:fairy_value, fairy_current_clothes:currentclothes, fairy_closet:fairycloset}, function() {
        console.log('Value is set to ' + fairyname+" "+fairy_value+" "+currentclothes+" "+fairycloset);
        console.log("저장되었습니다~");
    });

    chrome.storage.sync.get("exList", function(result) {
        let exList = result.exList
        setInfo(exList);
        console.log('Value currently is ', exList);
    });

    //운동리스트 저장하기
    //var exList = [];

}
var inputBtn = document.getElementById("inputBtn");
inputBtn.addEventListener('click', function(){
    getInfo();
    //console.log("저장전이에요", exList);
    var exList = [];
    exList.push({"id":0,"name": "스쿼트", "time":"15:30", "date":[true, false, true, false, true, false, false], "link":"https://www.youtube.com"});
    exList.push({"id":1,"name": "어깨스트레칭", "time":"16:30", "date":[true, true, true, true, true, true, true], "link":"https://www.youtube.com"});
    chrome.storage.sync.set({exList}, function() {
        console.log('Value is set to ', exList);
        console.log("저장되었습니다~");
    });
});
function setInfo(exList_t){
    exList=exList_t;
    console.log(exList);
}

function getInfo(){
    console.log(exList);
}
/*
                "name": {"type": "string"},
                "time": {"type": "string"},
                "date": {"type": "array"},
                "link": {"type": "string"}
*/