/*
  说明：本js只是在bootstrap3-dialog的基础上进行的2次封装，
  bootstrap3-dialog已经是非常好用了，调用也非常简单。
  详情请访问：https://github.com/nakupanda/bootstrap3-dialog，
  这是原项目地址，可以自行下载，然后查看效果可能是个人习惯问题，
  本人喜欢自己进行2次封装，这里这是把我封装的代码分享给大家，
  使用起来个人感觉更加简单了!!
*/
var HSJ = {}

/**
 * 设置dialog的样式
 **/
HSJ.T = function (t) {
  var t_
  if (t == 0) t_ = BootstrapDialog.TYPE_DEFAULT
  else if (t == 1) t_ = BootstrapDialog.TYPE_INFO
  else if (t == 2) t_ = BootstrapDialog.TYPE_PRIMARY
  else if (t == 3) t_ = BootstrapDialog.TYPE_SUCCESS
  else if (t == 4) t_ = BootstrapDialog.TYPE_WARNING
  else if (t == 5) t_ = BootstrapDialog.TYPE_DANGER
  else t_ = BootstrapDialog.TYPE_DEFAULT
  return t_
}

/**
 * 设置dialog的大小
 **/
HSJ.S = function (s) {
  var s_
  if (s == 1) s_ = BootstrapDialog.SIZE_SMALL
  else if (s == 2) s_ = BootstrapDialog.SIZE_NORMAL
  else if (s == 3) s_ = BootstrapDialog.SIZE_LARGE
  else if (s == 4) s_ = BootstrapDialog.SIZE_WIDE
  else s_ = BootstrapDialog.SIZE_NORMAL
  return s_
}

/**
 * dialog工具类
 **/
HSJ.util = {
  /**
   * 普通信息提示类，不带按钮
   **/
  alert: {
    /**
     * 最基本的调用 --不推荐直接调用，传递参数太多了，如果有特殊需要再调用吧，
     * 推荐调用 HSJ.util.alert.common(args);
     * 参数
     *   m：需要提示的文字内容
     *   t：提示框类型，详见：HSJ.T(args) 方法
     *   s：提示框尺寸，详见：HSJ.S(args) 方法
     *   c：提示框显示时间，单位：毫秒
     *   r：提示框关闭后重定向地址，为空则不进行页面跳转
     *   f：提示框关闭后的回调方法
     **/
    base: function (m, t, s, c, r, f) {
      var d = BootstrapDialog.show({
        type: HSJ.T(t),
        title: "提示",
        message: m,
        size: HSJ.S(s),
        size: BootstrapDialog.SIZE_SMALL
      })
      setTimeout(function () {
        d.close()
        if (f != null) {
          f()
        }
        if (r != null) {
          window.location.href = r
        }
      }, c)
    },
    /**
     * 公共调用方法
     * 调用示例：
     *   HSJ.util.alert.common({
		 *   status:"success（提示框类型：success-成功类型，
		 *   error-错误类型，warn-警告类型，默认为成功类型）",
		 *   message:"这里是提示信息",
		 *   uri:"提示框关闭后跳转地址，设空不做任何处理",
		 *   callback:"提示框关闭后回调函数，设空不做任何处理"
		 *   })；
     **/
    common: function (data) {
      if (data.status == "success") {
        HSJ.util.alert.base(data.message, 3, 2, 3000, data.uri, data.callback)
      } else if (data.status == "error") {
        HSJ.util.alert.base(data.message, 5, 2, 3000, data.uri, data.callback)
      } else if (data.status == "warn") {
        HSJ.util.alert.base(data.message, 4, 2, 3000, data.uri, data.callback)
      } else {
        HSJ.util.alert.base(data.message, 3, 2, 3000, data.uri, data.callback)
      }
    }
  },

  /**
   * 模态提示框，带按钮
   **/
  confirm: {
    /**
     * 最基本的调用 --不推荐直接调用，传递参数太多了，如果有特殊需要再调用吧，
     * 推荐调用 HSJ.util.confirm.common.***(args);
     * 参数
     *   title：提示框的标题
     *   msg：需要提示的文字内容
     *   t：提示框类型，详见：HSJ.T(args) 方法
     *   s：提示框尺寸，详见：HSJ.S(args) 方法
     *   btns: 按钮信息，格式为；
     *   [
          {
            label: '按钮文字',
            action: function(dialog){
              ###这里是按钮的点击函数##
              dialog.close(); ##关闭提示窗的方法
             }
          },
          {
            label: '按钮文字',
            action: function(dialog){
              ###这里是按钮的点击函数##
              dialog.close(); ##关闭提示窗的方法
            }
          }
         ]
     **/
    base: function (title, msg, t, s, btns) {
      var d = BootstrapDialog.show({
        type: HSJ.T(t),
        title: title,
        message: msg,
        size: HSJ.S(s),
        closable: false,
        buttons: btns
      })
    },
    common: {
      /**
       * 公共调用方法,基本调用
       * 调用示例：
       *   HSJ.util.confirm.common.base({
			 *		title:"这里是提示标题",
			 *		message:"提示信息",
			 *    	t：提示框类型，详见：HSJ.T(args) 方法
			 *    	s：提示框尺寸，详见：HSJ.S(args) 方法
			 *		ok_callback:"点击确定的回调函数"
			 *		cancel_callback:"点击取消的回调函数"
			 *	})；
       **/
      base: function (data) {
        var btns = [{
          label: '确定',
          action: function (dialog) {
            if (data.ok_callback != null) data.ok_callback()
            dialog.close()
          }
        }, {
          label: '取消',
          action: function (dialog) {
            if (data.cancel_callback != null) data.cancel_callback()
            dialog.close()
          }
        }]
        HSJ.util.confirm.base(data.title, data.message, data.t, data.s, btns)
      },
      /**
       * 公共调用方法,成功提示框
       * 调用示例：
       *   HSJ.util.confirm.common.suc({
			 *		message:"提示信息",
			 *		ok_callback:"点击确定的回调函数"
			 *		cancel_callback:"点击取消的回调函数"
			 *	})；
       **/
      suc: function (data) {
        HSJ.util.confirm.common.base({
          title: "提示",
          message: data.message,
          t: 3,
          s: 2,
          ok_callback: data.ok_callback,
          cancel_callback: data.cancel_callback
        })
      },
      /**
       * 公共调用方法,失败提示框
       * 调用示例：
       *   HSJ.util.confirm.common.suc({
			 *		message:"提示信息",
			 *		ok_callback:"点击确定的回调函数"
			 *		cancel_callback:"点击取消的回调函数"
			 *	})；
       **/
      err: function (data) {
        HSJ.util.confirm.common.base({
          title: "温馨提示",
          message: data.message,
          t: 5,
          s: 2,
          ok_callback: data.ok_callback,
          cancel_callback: data.cancel_callback
        })
      },
      /**
       * 公共调用方法,警告提示框
       * 调用示例：
       *   HSJ.util.confirm.common.suc({
			 *		message:"提示信息",
			 *		ok_callback:"点击确定的回调函数"
			 *		cancel_callback:"点击取消的回调函数"
			 *	})；
       **/
      warn: function (data) {
        HSJ.util.confirm.common.base({
          title: "温馨提示",
          message: data.message,
          t: 4,
          s: 2,
          ok_callback: data.ok_callback,
          cancel_callback: data.cancel_callback
        })
      }
    }
  }
}