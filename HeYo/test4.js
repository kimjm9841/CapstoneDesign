window.onload=function(){
    var fairyname="포크";
    var fairy_value=1;
    var currentclothes=null;
    var fairycloset=[1,2,3];
    chrome.storage.sync.set({fairy_name:fairyname, fairy_bmi:fairy_value, fairy_current_clothes:currentclothes, fairy_closet:fairycloset}, function() {
        console.log('Value is set to ' + fairyname+" "+fairy_value+" "+currentclothes+" "+fairycloset);
        console.log("저장되었습니다~");
    });
}