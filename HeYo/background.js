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


function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}