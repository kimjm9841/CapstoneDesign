// popup.html에서 작동할 기능 작성 (요정 온오프, 요정 이미지 변화, 요정 애칭 가져오기 등)
import {fairyList} from './js/getData.js';

window.onload=function(){
    var fairyname=fairyList[0];//"포크";

    var fairyLevel=0;
    if(fairyList[1]>=0&&fairyList[1]<=25) fairyLevel=1;
    else if(fairyList[1]>=26&&fairyList[1]<=50) {fairyLevel=2;}
    else if(fairyList[1]>=51&&fairyList[1]<=75) {fairyLevel=3;}
    else if(fairyList[1]>=76&&fairyList[1]<=100) {fairyLevel=4;}

    var fairyclothes=fairyList[2];
    //여기까지가 받아야 하는 데이터 -> 성공!
    //요정 비만도 + 의상으로 사진 이름 바꿔서 적용하기


    var src;
    if(fairyLevel==1){src="/images/fairy_basic.png";}
    else{src="/images/fairy_lv"+fairyLevel+".png";}

    document.getElementById('fairyname').value=fairyname;
    var ImgArea = document.getElementById('fairy');
    var img = document.createElement('img');

    img.setAttribute("src", src);
    img.setAttribute("width", "150");
    img.setAttribute("alt", "설정");

    ImgArea.appendChild(img);
}