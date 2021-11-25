//user 정보 (예시)

select1 = ["ID"]
select2 = [1] //auto XX
select3 = [5] //hurt
select4 = [5] //exercise
select5 = [5] //tool
select6 = ['INFJ',1] //mbti / bmi

point_list = []

const exercise = [{"id":1, "link":"https://www.youtube.com/watch?v=IS5OA7GeBJc&list=PLPPetu1spkealPT-BShcUFyWM0it3n2ql&index=4", "hurt":5, "exercise":1, "tool":5, "MBTI":"", "BMI":1},
 {"id":2, "link":"https://www.youtube.com/watch?v=87uwSVdvPY8&t=909s", "hurt":5, "exercise":1, "tool":5, "MBTI":"", "BMI":1},
 {"id":3, "link":"https://www.youtube.com/watch?v=WKtEJon-85s", "hurt":5, "exercise":1, "tool":1, "MBTI":"", "BMI":1},
 {"id":4, "link":"https://www.youtube.com/watch?v=QA5jS0dPa6w", "hurt":5, "exercise":1, "tool":1, "MBTI":"", "BMI":1},
 {"id":5, "link":"https://www.youtube.com/watch?v=x26mdeGnxyo", "hurt":5, "exercise":3, "tool":1, "MBTI":"", "BMI":1},
 {"id":6, "link":"https://www.youtube.com/watch?v=Bt1wr94FmGQ&t=25s", "hurt":5, "exercise":3, "tool":1, "MBTI":"", "BMI":1},
 {"id":7, "link":"https://www.youtube.com/watch?v=NDsjmxTROEo", "hurt":5, "exercise":3, "tool":5, "MBTI":"", "BMI":1},
 {"id":8, "link":"https://www.youtube.com/watch?v=Bt1wr94FmGQ", "hurt":5, "exercise":3, "tool":5, "MBTI":"", "BMI":1},
 {"id":9, "link":"https://www.youtube.com/watch?v=8lvmFgsQt8U", "hurt":5, "exercise":2, "tool":5, "MBTI":"", "BMI":1},
 {"id":10, "link":"https://www.youtube.com/watch?v=hJuO1AUqLUc", "hurt":5, "exercise":2, "tool":5, "MBTI":"", "BMI":1},
 {"id":11, "link":"https://www.youtube.com/watch?v=DoQGWdX9l1Y", "hurt":5, "exercise":2, "tool":1, "MBTI":"", "BMI":1},
 {"id":12, "link":"https://www.youtube.com/watch?v=W1ZUyg8Ju8w", "hurt":5, "exercise":2, "tool":1, "MBTI":"", "BMI":1},
 {"id":13, "link":"https://www.youtube.com/watch?v=6pr9nYOJW3o", "hurt":5, "exercise":5, "tool":1, "MBTI":"", "BMI":1},
 {"id":14, "link":"https://www.youtube.com/watch?v=b0bz8En15YU", "hurt":5, "exercise":5, "tool":1, "MBTI":"", "BMI":1},
 {"id":15, "link":"https://www.youtube.com/watch?v=gMaB-fG4u4g", "hurt":5, "exercise":5, "tool":5, "MBTI":"", "BMI":1},
 {"id":16, "link":"https://www.youtube.com/watch?v=Wcdz6n18lR4&list=RDCMUCpg89Ys3E4BaLGgEEWVmI9g&start_radio=1&rv=Wcdz6n18lR4&t=12", "hurt":5, "exercise":5, "tool":5, "MBTI":"", "BMI":1},
 {"id":17, "link":"https://www.youtube.com/watch?v=54tTYO-vU2E", "hurt":5, "exercise":1, "tool":5, "MBTI":"", "BMI":0},
 {"id":18, "link":"https://www.youtube.com/watch?v=2swcod5RYvU", "hurt":5, "exercise":1, "tool":5, "MBTI":"", "BMI":0},
 {"id":19, "link":"https://www.youtube.com/watch?v=xoWKLNwNva0", "hurt":5, "exercise":1, "tool":1, "MBTI":"", "BMI":0},
 {"id":20, "link":"https://www.youtube.com/watch?v=hgqSlNH_NYo", "hurt":5, "exercise":1, "tool":1, "MBTI":"", "BMI":0},
 {"id":21, "link":"https://www.youtube.com/watch?v=4qqBQ0Xs4nc", "hurt":5, "exercise":3, "tool":1, "MBTI":"", "BMI":0},
 {"id":22, "link":"https://www.youtube.com/watch?v=wCOgq8U2IOk", "hurt":5, "exercise":3, "tool":1, "MBTI":"", "BMI":0},
 {"id":23, "link":"https://www.youtube.com/watch?v=ieGVQp_eRFs", "hurt":5, "exercise":3, "tool":5, "MBTI":"", "BMI":0},
 {"id":24, "link":"https://www.youtube.com/watch?v=DWYDL-WxF1U", "hurt":5, "exercise":3, "tool":5, "MBTI":"", "BMI":0},
 {"id":25, "link":"https://www.youtube.com/watch?v=PoYzxj8Iy5M&list=PLPPetu1spkealPT-BShcUFyWM0it3n2ql", "hurt":5, "exercise":2, "tool":5, "MBTI":"", "BMI":0},
 {"id":26, "link":"https://www.youtube.com/watch?v=7TLk7pscICk", "hurt":5, "exercise":2, "tool":5, "MBTI":"", "BMI":0},
 {"id":27, "link":"https://www.youtube.com/watch?v=DoQGWdX9l1Y&t=10s", "hurt":5, "exercise":2, "tool":1, "MBTI":"", "BMI":0},
 {"id":28, "link":"https://www.youtube.com/watch?v=W1ZUyg8Ju8w&t=339s", "hurt":5, "exercise":2, "tool":1, "MBTI":"", "BMI":0},
 {"id":29, "link":"https://www.youtube.com/watch?v=hJ4_prZ9kB4&t=515s", "hurt":5, "exercise":5, "tool":1, "MBTI":"", "BMI":0},
 {"id":30, "link":"https://www.youtube.com/watch?v=lkSweEq292o", "hurt":5, "exercise":5, "tool":1, "MBTI":"", "BMI":0},
 {"id":31, "link":"https://www.youtube.com/watch?v=zSJYAyoojdw", "hurt":5, "exercise":5, "tool":5, "MBTI":"", "BMI":0},
 {"id":32, "link":"https://www.youtube.com/watch?v=s14NQ6Cz4QE", "hurt":5, "exercise":5, "tool":5, "MBTI":"", "BMI":0}
]

document.getElementById("ok_btnR").addEventListener('click', compare);


function autoservice(){
    alert(select2[0]);
}

json = JSON.stringify(exercise);
const data = JSON.parse(json);
console.log(data[0]['link']);

function compare(){
    if(select2[0] == 1){
        autoservice();
    }
    for(var i = 0 ; i < exercise.length ;i++){
        var point = 0;
    
        
        if(select3[0] == 5){
            point+=1
        }
        else if(select3[0] != data[i]['hurt']){
            point+=1
        }
        else{
            point += 0
        }
    
        if(select4[0] == 5){        
            point+=1
        }
        else if(data[i]['exercise'] == 5){
            point+=1
        }
        else if(select4[0] == data[i]['exercise']){
            point+=1
        }
        else{
            point+=0.5
        }
        
        if(select5[0] == 5){
            if(data[i]['tool'] == 5){
                point+=1
            }
        }
        else if(select5[0] == data[i]['tool']){
            point+=1
        }
        else{
            point+=0.5
        }
    
        if(select6[0][2] == data[i]['MBTI'][2] && select6[0][3] == data[i]['MBTI'][3]){
            point+=1
        }
        
        if(select6[1] == 0){
            point+=1
        }
        else if(select6[1] == data[i]['BMI']){
            point+=1
        }
        else{
            point+=0.5
        }
    
        point_list.push(point);
    }
    
    console.log(point_list);
    
    var maxpoint = 0;
    for(var i=0; i< point_list.length ; i++){
        if(point_list[i] >= maxpoint){
            maxpoint = point_list[i];
        }
    }
    
    var max_index_list = [];
    for(i=0; i< point_list.length ; i++){
        if(point_list[i] == maxpoint){
            max_index_list.push(i)
        }
    }
    
    console.log("Recommend for "+ select1[0] + " is")
    for(var i = 0; i<max_index_list.length ; i++){
        console.log(data[max_index_list[i]]['link'])
    }
}