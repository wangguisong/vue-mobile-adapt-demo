(function (doc, win) {
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var docEl = win.document.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var dpr = win.devicePixelRatio || 1;
    if(isIPhone){
        if (dpr >= 3) {
            dpr = 3;
        } else if (dpr >= 2){
            dpr = 2;
        } else {
            dpr = 1;
        }
    }else{
        //安卓机兼容性混乱，故dpr取1
        dpr = 1;
    }

    var scale = 1 / dpr;
  
    /**
      * ================================================
      *   设置data-dpr和viewport
      × ================================================
      */
  
    docEl.setAttribute('data-dpr', dpr);
    // 动态改写meta:viewport标签
    if (!metaEl) {
      metaEl = doc.createElement('meta');
      metaEl.setAttribute('name', 'viewport');
      metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
      document.documentElement.firstElementChild.appendChild(metaEl);
    } else {
      metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    }
  
    /**
    * ================================================
    *   设置根元素font-size
    * 当设备宽度为375(iPhone6)时，根元素font-size=16px; 
    × ================================================
    */
    var refreshRem = function () {
        var clientWidth = win.innerWidth
                        || doc.documentElement.clientWidth
                        || doc.body.clientWidth;
        if (!clientWidth) return;
        var fz;
        var width = clientWidth;
        fz = 16 * width / 750;
        docEl.style.fontSize = fz + 'px';
    };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, refreshRem, false);
    doc.addEventListener('DOMContentLoaded', refreshRem, false);
    refreshRem();

    /* 
    * 禁止用户通过微信内置浏览器调整网页字体大小：安卓解决方案
    * -webkit-text-size-adjust: none; // IOS解决方案，给body加上此样式
    * Tips: 如果用户之前已经设置过了字体大小，访问网页时会先看到字体被放大后的效果再恢复正常，因为在 WeixinJSBridge 对象初始化完成之后才能通过 WeixinJSBridge 对象的方法设置为默认大小。
    */
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (doc.addEventListener) {
            doc.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (doc.attachEvent) {
            doc.attachEvent("WeixinJSBridgeReady", handleFontSize);
            doc.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }
    function handleFontSize() {
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        });
    }

  })(document, window);