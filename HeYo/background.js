/*
chrome.notifications.create(getNotificationId(), {
    type: 'basic',
    title: '운동명',
    message: '운동할 시간이야~',
    priority: 2,
    iconUrl:'/images/fairy_basic.png',
    requireInteraction: true,
    buttons: [
      { title: 'Exrcise' },
      { title: 'Delay' },
    ]
}, function(id) { console.log("Last error:", chrome.runtime.lastError); });
/*
//chrome.tabs.create({url: "chrome-extension://opkjgffjlcbefefmjhejbnjplgolhebj/test2_input.html"});
chrome.tabs.create({url: "test2_input.html"});
function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}
*/

/*
function setAlarm(time, url){
}

chrome.alarms.create('testAlarm',{
  when: Date.now(),
  periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name == "testAlarm") {
      chrome.notifications.create('test', {
          type: 'basic',
          iconUrl: 'images/fairy_basic.png',
          title: 'Test Message',
          message: 'You are awesome!',
          priority: 2,
          requireInteraction: true,
          buttons: [
            { title: 'Exrcise' },
            { title: 'Delay' },
          ]
      
      });
  }
});
*/


/*
var myNotificationID = null;


// Respond to the user's clicking one of the buttons
chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
  if (notifId === myNotificationID) {
      if (btnIdx === 0) {
          window.open("...");
      } else if (btnIdx === 1) {
          saySorry();
      }
  }
});

// Add this to also handle the user's clicking 
// the small 'x' on the top right corner
chrome.notifications.onClosed.addListener(function() {
  saySorry();
});

// Handle the user's rejection 
// (simple ignore if you just want to hide the notification)
function saySorry() {
  alert("Sorry to bother you !");
}
*/