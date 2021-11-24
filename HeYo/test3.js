window.onload=function(){
    let keys=["name", "time", "date", "link"]
    chrome.storage.sync.get(null, function(result) {
        let value1 = result.name;
        let value2 = result.time;
        let value3 = result.date;
        let value4 = result.link;
        console.log('Value currently is ' + value1+" "+value2+" "+value3+" "+value4);
      });

    let keys2=["user_name", "pain", "pre", "equi", "mbti", "height", "weight"]
    chrome.storage.sync.get(null, function(result) {
        let value1 = result.user_name;
        let value2 = result.pain;
        let value3 = result.pre;
        let value4 = result.equi;
        let value5 = result.mbti;
        let value6 = result.height;
        let value7 = result.weight;
        console.log('Value currently is ' + value1+" "+value2+" "+value3+" "+value4+" "+value5+" "+value6+" "+value7);
      });
    
      chrome.storage.sync.get(null, function(result) {
        let value1 = result.fairy_name;
        let value2 = result.fairy_bmi;
        let value3 = result.fairy_current_clothes;
        let value4 = result.fairy_closet;

        console.log('Value currently is ' + value1+" "+value2+" "+value3+" "+value4);
      });
}