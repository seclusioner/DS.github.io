window.document.oncontextmenu = function(event) {
    if (event.ctrlKey) return true; //ctrl+右鍵 使用原生右鍵
    if (/Android|webOS|BlackBerry/i.test(navigator.userAgent)) return true; //媒體選擇
    if (localStorage.getItem("SAOSwitch")==='turnOff') return true //若持續關閉標記值為turnoff則使用原生菜單
    return popMenu(event); //打開右鍵菜單
  };
  
  //監聽位移動作，實現拖動效果
  var dv = document.getElementById("SAO-menu");
  var x = 0;
  var y = 0;
  var l = 0;
  var t = 0;
  var isDown = false;
  dv.onmousedown = function(e) {
    x = e.clientX;
    y = e.clientY;
    l = dv.offsetLeft;
    t = dv.offsetTop;
    isDown = true;
    dv.style.cursor = "move"
  };
  window.onmousemove = function(e) {
    if (isDown == false) {
      return
    }
    var nx = e.clientX;
    var ny = e.clientY;
    var nl = nx - (x - l);
    var nt = ny - (y - t);
    dv.style.left = nl + "px";
    dv.style.top = nt + "px"
  };
  dv.onmouseup = function() {
    isDown = false;
    dv.style.cursor = "default"
  };
  //監聽鼠標點擊動作，點擊空白處關閉菜單
  document.addEventListener("click", function(event) {
    if (event.target.id === 'SAO-back'){
      SAOclose()
    }
  });
  //關閉菜單
  function SAOclose() {
      var mymenu = document.getElementById('SAO-back');
      mymenu.style.display = "none";
  }
  
  //初始化，隱藏所有active類
  function SAOinit() {
    var activedItems = document.querySelectorAll('.active');
    if (activedItems) {
      for (i = 0; i < activedItems.length; i++) {
        activedItems[i].classList.remove('active');
      }
    }
  }
  //二級菜單初始化，隱藏所有三級菜單的active類
  function Menuinit(menu) {
    var activedChild = menu.querySelectorAll('.active');
    if (activedChild) {
      for (i = 0; i < activedChild.length; i++) {
        activedChild[i].classList.remove('active');
      }
    }
  }
  //link start,處理鏈接跳轉的pjax請求；調用了主題自帶的pjax對象。其他主題需要另外適配。
  function linkStart(link){
    if (link.includes('https://') || link.includes('http://') ){
      window.location.href = link;
    }
    else{
      if (pjax){
        pjax.loadUrl(link);
      }
      else{
        window.location.href = link;
      }
    }
  }
  //點擊菜單內元素播放點擊音頻
  //無子菜單時，點擊音效
  function clickAudio() {
    var clickAudio = document.getElementById("SAOClick");
    if (clickAudio) {
      clickAudio.play();//有音頻時播放
    }
  }
  //有子菜單時，展開音效
  function panelAudio() {
    var panelAudio = document.getElementById("SAOPanel");
    if (panelAudio) {
      panelAudio.play();//有音頻時播放
    }
  }
  //警告音效
  function alertAudio() {
    var alertAudio = document.getElementById("SAOAlert");
    if (alertAudio) {
      alertAudio.play();//有音頻時播放
    }
  }
  //關閉當前頁面
  function confirmLogout(){
    setTimeout(function(){
      window.opener=null;
      window.open('','_self');
      window.close();
    },500);
  }
  function openLogout(){
    SAOclose();
    var logoutWindow = document.getElementById('SAO-logout');
    logoutWindow.classList.add('activeLogout');
  }
  function cancelLogout(){
    var logoutWindow = document.getElementById('SAO-logout');
    logoutWindow.classList.remove('activeLogout');
  }
  
  //監聽一級菜單點擊動作，控制二級菜單顯隱
  function UtilsClick(){
    var thisElement = event.target;
    // console.log('click at', thisElement);
    var hasMenu = thisElement.parentElement.querySelector('.menu-list');
    var hasPanel = thisElement.parentElement.querySelector('.user-panel');
    var hasActived = thisElement.parentElement.querySelector('.active');
    //當有二級菜單或屬性欄被激活時
    if (hasActived){
      // console.log('hasmenu or haspanel]');
      //如果有二級菜單且已經激活，則重新隱藏二級菜單
      if (hasMenu && (hasMenu.className.indexOf('active') > -1) ){
        hasMenu.classList.remove('active');
      }
      //如果有屬性欄且已經激活，則重新隱藏屬性欄
      if (hasPanel && (hasPanel.className.indexOf('active') > -1) ){
        hasPanel.classList.remove('active');
      }
    }
    else{
      SAOinit();//先初始化以清除其他的激活項
      //若有二級菜單就顯示二級菜單
      if (hasMenu) {
        hasMenu.classList.add('active');
      }
      //若有屬性欄，就顯示屬性欄
      if (hasPanel) {
        hasPanel.classList.add('active');
      }
    }
  }
  //監聽二級菜單點擊動作，控制三級菜單顯隱
  function MenusClick(){
    var thisElement = event.target;
    // console.log('click at', thisElement);
    //當前按鈕指向的三級菜單
    var hasChild = thisElement.parentElement.querySelector('.menu-child');
    //當前按鈕所在的二級菜單
    var menuParent = thisElement.parentElement.parentElement;
    if (hasChild) {
      //若已經激活了，則再點擊就隱藏；
      if (hasChild.className.indexOf('active') > -1) {
        hasChild.classList.remove('active');
      }
      //若未激活
      else{
        Menuinit(menuParent);//先初始化以清除其他的激活項
        hasChild.classList.add('active');//再給當前子菜單添加激活
      }
    }
  }
  
  function popMenu(event) {
    //播放菜單打開音樂
    SAOinit();
    var audio = document.getElementById("SAOlauncher");
    if (audio) {
      audio.play();//有音樂時打開
    }
    document.getElementById('SAO-back').style.display = "block";
    var mymenu = document.getElementById('SAO-menu');
    var screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // 菜單顯示
    mymenu.style.display = 'block';
  
    //---- start 點擊位置旁邊生成。不自動判斷位置
    // mymenu.style.left = (event.clientX + mymenu.clientWidth/2) + "px";
    // mymenu.style.top = (event.clientY - mymenu.clientHeight/2) + "px";
    //--- end 點擊位置旁邊生成。不自動判斷位置
    //---- start 自動判斷確保給菜單邊緣留下足夠位置
    //根據當前位置決定菜單出現位置，確保菜單可完整顯示
    var currentX = event.clientX;
    var currentY = event.clientY;
    //X軸判斷
    //偏左
    if (currentX < 230){
      mymenu.style.left = (mymenu.clientWidth/2 + 230)  + "px";
    }
    //偏右
    else if ((screenWidth - currentX) < 320 ){
      mymenu.style.left = (mymenu.clientWidth/2 - 320 + screenWidth) + "px";
    }
    //默認情況
    else{
      mymenu.style.left = (currentX + mymenu.clientWidth/2) + "px";
    }
    //Y軸判斷
    //偏高
    if (currentY < (mymenu.clientHeight/2 + 130)){
      mymenu.style.top = "130px";
    }
    //偏低
    else if ((screenHeight - currentY) < (80 + mymenu.clientHeight/2)){
      mymenu.style.top = ( screenHeight - mymenu.clientHeight - 80) + "px";
    }
    //默認情況
    else {
      mymenu.style.top = (event.clientY - mymenu.clientHeight/2) + "px";
    }
    //---- end 自動判斷確保給菜單邊緣留下足夠位置
    //屏蔽原生菜單
    return false;
  }
  //自定義動作
  //搜索按鈕動作
  function openSearch() {
    document.body.style.cssText = 'width: 100%;overflow: hidden'
    document.querySelector('#local-search .search-dialog').style.display = 'block'
    document.querySelector('#local-search-input input').focus()
    btf.fadeIn(document.getElementById('search-mask'), 0.5)
    if (!loadFlag) {
      search(GLOBAL_CONFIG.localSearch.path)
      loadFlag = true
    }
    // shortcut: ESC
    document.addEventListener('keydown', function f (event) {
      if (event.code === 'Escape') {
        closeSearch()
        document.removeEventListener('keydown', f)
      }
    })
  }
  //在線聊天按鈕動作
  function openTidio() {
  window.tidioChatApi.show();window.tidioChatApi.open();
  }
  //鏡像站跳轉動作
  function Mirror() {
    let pathname;
    let hostname;
    let url;
    pathname = window.location.pathname;
    hostname = window.location.hostname;
    if (hostname === 'akilar.top') {
      url = "https://akilar.gitee.io" + pathname;
      window.alert("即將前往糖果屋分店🍬");
      window.location.href = url;
    }
    else if(hostname === 'akilar.gitee.io') {
      url = "https://akilar.top" + pathname;
      window.alert("正在返回糖果屋本部🍭！");
      window.location.href = url;
    }
    else {
      window.alert("Master，本地調試不需要跳轉哦！🍫");
    }
  }
  //評論窗口跳轉
  function ToComment(){
    var hasComment = document.getElementById('post-comment');
    if (hasComment){
      window.location.href = '#post-comment'; //如果有評論區就跳轉到評論區
    }
    else{
      linkStart('/comments/');//如果沒有，就跳轉到留言板
    };
  }
  //評論窗口跳轉
  function ToComment(){
    var hasComment = document.getElementById('post-comment');
    if (hasComment){
      window.location.href = '#post-comment'; //如果有評論區就跳轉到評論區
    }
    else{
      linkStart('/comments/');//如果沒有，就跳轉到留言板
    };
  }
  //固化關閉右鍵菜單效果
  function SAOKeepOff(){
    localStorage.setItem("SAOSwitch", "turnOff");//將關閉狀態激活
    SAOclose();
  }
  //控制開關右鍵菜單效果
  function SAOSwitch(){
    var SAOSwitch = localStorage.getItem("SAOSwitch");
    // 若鍵值存在且為turnoff，則轉為turn；同時打開右鍵菜單
    if (SAOSwitch === "turnOff"){
      localStorage.setItem("SAOSwitch", "turnOn");
      popMenu(event); // 打開右鍵菜單
    }else { //否則，持續關閉右鍵菜單
      SAOKeepOff()
    }
  }