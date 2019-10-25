1. 弹出数字键盘
``` js
<!-- 有"#" "*"符号输入 -->
<input type="tel">

<!-- 纯数字 -->
<input pattern="\d*">

```

2. 调用系统的某些功能
``` js
<!-- 拨号 -->
<a href="tel:10086">打电话给: 10086</a>

<!-- 发送短信 -->
<a href="sms:10086">发短信给: 10086</a>

<!-- 发送邮件 -->
<a href="mailto:839626987@qq.com">发邮件给：839626987@qq.com</a>

<!-- 选择照片或者拍摄照片 -->
<input type="file" accept="image/*">

<!-- 选择视频或者拍摄视频 -->
<input type="file" accept="video/*">

<!-- 多选 -->
<input type="file" multiple>

```

3. 打开原生应用
``` js
<a href="weixin://">打开微信</a>
<a href="alipays://">打开支付宝</a>
<a href="alipays://platformapi/startapp?saId=10000007">打开支付宝的扫一扫功能</a>
<a href="alipays://platformapi/startapp?appId=60000002">打开支付宝的蚂蚁森林</a>
```
这种方式叫做URL Scheme，是一种协议，一般用来访问APP或者APP中的某个功能/页面（如唤醒APP后打开指定页面或者使用某些功能）😒
URL Scheme的基本格式如下：
```
     行为(应用的某个功能/页面)    
            |
scheme://[path][?query]
   |               |
应用标识       功能需要的参数
```
一般是由APP开发者自己定义，比如规定一些参数或者路径让其他开发者来访问，就像上面的例子🍤

4. 解决active伪类失效
``` js
<body ontouchstart></body>
```

5. 忽略自动识别
``` js
<!-- 忽略浏览器自动识别数字为电话号码 -->
<meta name="format-detection" content="telephone=no">

<!-- 忽略浏览器自动识别邮箱账号 -->
<meta name="format-detection" content="email=no">
```

6. 解决input失焦后页面没有回弹
一般出现在IOS设备中的微信内部浏览器，出现的条件为：

页面高度过小
聚焦时，页面需要往上移动的时候
所以一般input在页面上方或者顶部都不会出现无法回弹🤣

解决办法为，在聚焦时，获取当前滚动条高度，然后失焦时，赋值之前获取的高度
``` js
<template>
  <input type="text" @focus="focus" @blur="blur">
</template>

<script>
  export default {
    data() {
      return {
        scrollTop: 0
      }
    },
    
    methods: {
      focus() {
        this.scrollTop = document.scrollingElement.scrollTop;
      },
      
      blur() {
        document.scrollingElement.scrollTo(0, this.scrollTop);
      }
    }
  }
</script>
```

6. 禁止长按
``` js
// 禁止长按图片保存
img {
  -webkit-touch-callout: none;
  pointer-events: none; // 像微信浏览器还是无法禁止，加上这行样式即可
}

// 禁止长按选择文字
div {
  -webkit-user-select: none;
}

// 禁止长按呼出菜单
div {
  -webkit-touch-callout: none;
}
```

7. 滑动不顺畅，粘手
一般出现在IOS设备中，自定义盒子使用了overflow: auto || scroll后出现的情况。
``` js
div {
  -webkit-overflow-scrolling: touch;
}
```

8. 屏幕旋转为横屏时，字体大小会变
``` js
* {
  -webkit-text-size-adjust: 100%;
}
```
9. 最简单的rem自适应
``` js
html {
 font-size: calc(100vw / 3.75);
}

body {
  font-size: .14rem;
}
```

10. 滑动穿透
``` js
document.querySelector(".mask").addEventListener("touchmove", event => {
  event.preventDefault();
});

vue <div class="mask" @touchumove.prevent></div>
```
