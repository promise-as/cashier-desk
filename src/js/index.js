window.onload = function () {
  /*兼容IE9*/
  if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
      get: function() {
        var self = this;
        function update(fn) {
          return function(value) {
            var classes = self.className.split(/\s+/g),
              index = classes.indexOf(value);

            fn(classes, index, value);
            self.className = classes.join(" ");
          }
        }

        return {
          add: update(function(classes, index, value) {
            if (!~index) classes.push(value);
          }),

          remove: update(function(classes, index) {
            if (~index) classes.splice(index, 1);
          }),
        };
      }
    });
  }

  /*支付方式：银行，支付宝，微信*/
  var headerItem = document.querySelectorAll(".head-item");
  /*支付方式内容*/
  var tabContent = document.querySelectorAll(".payment-tab .tab-content");
  /*银行种类*/
  var typesItem = document.querySelectorAll(".bank-types .types-item");
  /*隐藏弹框*/
  var hiddenBtn = document.querySelectorAll(".content-btn");
  /*关闭x*/
  var closeBtn = document.querySelectorAll(".close-btn");
  /*关闭弹框*/
  var concealBtn = document.querySelectorAll(".btn");
  /*蒙版*/
  var mainMask = document.querySelectorAll(".main-mask");
  /*支付方式头部*/
  var payHeader = document.querySelectorAll(".payment-header");
  /*进行中的订单 头部*/
  var orderHeader = document.querySelectorAll(".order-header");
  /*进行中的订单 内容*/
  var orderTab = document.querySelectorAll(".order-tab");
  /*服务商信息*/
  var facilitatorContent = document.querySelectorAll(".facilitator-content");

  active(headerItem, tabContent);
  bank(typesItem);
  hidden(hiddenBtn);
  hidden(closeBtn);
  hidden(concealBtn);

  /*支付方式*/
  function active(headList, contentList) {
    for (let i = 0, len = headList.length; i < len; i++) {
      headList[i].onclick = function () {
        for (let j = 0; j < len; j++) {
          // console.log(111, headList[j])
          headList[j].classList.remove("tab-active");
          contentList[j].classList.remove("tab-active");
        }
        headList[i].classList.add("tab-active");
        contentList[i].classList.add("tab-active");
      };
    }
  }

  function bank(activeList) {
    for (let i = 0, len = activeList.length; i < len; i++) {
      activeList[i].onclick = function () {
        for (let j = 0; j < len; j++) {
          activeList[j].classList.remove("bank-active");
        }
        activeList[i].classList.add("bank-active");
      };
    }
  }

  function hidden(cont) {
    for (let i = 0, len = cont.length; i < len; i++){
      cont[i].onclick = function () {
        console.log(mainMask)
        mainMask[0].style.display = 'none'
      }
    }
  }

  if(payHeader.length){
    payHeader[4].onclick = function () {
      if (facilitatorContent[1].style.display === 'block'){
        facilitatorContent[1].style.display = 'none'
      } else {
        facilitatorContent[1].style.display = 'block'
      }
    }
  }

  orderHeader[1].onclick = function () {
    if (orderTab[1].style.display === 'block'){
      orderTab[1].style.display = 'none'
    } else {
      orderTab[1].style.display = 'block'
    }
  }
}