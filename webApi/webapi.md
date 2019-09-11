### 1.querySelector
  ``` js
    const nav = document.querySelector('#nav') //获取文档中id="nav"的元素
    const navClass = document.querySelector('.nav') //获取文档中class="nav"的元素
    const ele = document.querySelector('#nav li:first-child') //获取文档中id="nav"下面的第一个li元素
  ```
  <font color="#007fff">注意：无论如何只返回一个元素，如果有多个素，那也只返回第一个</font>

### 2.querySelectorAll
``` js
  const list = document.querySelectorAll('li') //NodeList(2) [li, li] 类数组
```
<font color="#007fff">注意：返回的值是一个类数组，可以使用forEach（有些浏览器无法使用，建议还是转一下），但是无法使用filter、map等，需要转换一下</font>
``` js
Array.from(list) //转成数组
```

### 3.closest
这个api是向上查询，既可以查找父元素
``` js
  document.querySelector('li').closest('#nav') //可以查找父级的父级元素，但必须要传入css元素
```

### 4.dataset
可以获取标签上以‘data-’为前缀的属性集合
``` js
  const res = document.querySelector('p').dataset //DOMStringMap {name: "webapi", value: "dataset"}
```
### 5.URLSearchParams
可以对url携带的参数进行解析，URLSearchParams()构造器创建并返回一个新的URLSearchParams 对象。提供有has()、keys()、get()、getAll()、entries()等方法
``` js
  let str = '?name=蜘蛛侠&age=16'
  const parseUrl = new URLSearchParams(str).get('name')
```

### 6.hidden
这是一个html属性，规定元素是否隐藏，表现跟css的display: none一致
``` js
  <div class="hide" hidden>这个内容被隐藏了</div>

  document.querySelector('.hide').hidden = false
  setTimeout(() => {
    document.querySelector('.hide').hidden = true
  }, 3000 )
```
### 7.contenteditable
这个地方可以被用户可以编辑
``` js
  <div class="edit" contenteditable onblur="handleBlur()">这是一个可以编辑的模块</div>
```
<font color="#007fff">这个功能可以替换textarea，可以高度自动延申。也可以和user-modify结合使用，做一个css在线编辑器</font>
``` css
  <style style="display: block; -webkit-user-modify: read-write-plaintext-only;">
    html {
      background-color: #fff;
    }
    .edit:focus {
      outline: 1px solid #000
    }
  </style>
```

### 8.classList
该对象中封装了许多操作元素的类名的方法
``` js
let elem = document.querySelector("p");

// 增加类名
elem.classList.add("title-new");

// 删除类名
elem.classList.remove("title");

// 切换类名（有则删、无则增，常用于一些切换操作，如显示/隐藏）
elem.classList.toggle("title"); 

// 替换类名
elem.classList.replace("title", "title-old"); 

// 是否包含指定类名
elem.classList.contains("title");
```

### 9.getBoundingClientRect
获取指定元素在当前页面的位置信息
``` js
  document.querySelector('.edit').getBoundingClientRect()
  DOMRect {x: 48, y: 250, width: 722, height: 21, top: 250, …}
  bottom: 271
  height: 21
  left: 48
  right: 770
  top: 250
  width: 722
  x: 48
  y: 250
  __proto__: DOMRect
```

### 10.contains
检测一个元素是否包含另一个元素（或者是其子元素）
``` js
  document.querySelector('.nav li:first-child').contains(document.querySelector('p')) //true 或 false
```
### 11.online state
监听当前的网络状态变动
``` js
  window.addEventListener("online", xxx);

  window.addEventListener("offline", () => {
    alert("你断网啦！");
  });
```
### 12.battery state
获取设备的电池状态
``` js
navigator.getBattery().then(battery => console.log(battery));

// 返回
{
  charging, // 是否在充电
  chargingTime, // 充满电所需时间
  dischargingTime, // 当前电量可使用时间
  level, 剩余电量

  onchargingchange, // 监听充电状态变化
  onchargingtimechange, // 监听充满电所需时间变化
  ondischargingtimechange, // 监听当前电量可使用时间变化
  onlevelchange // 监听电量变化
}
```

### 13.vibration
Navigator.vibrate() 方法使设备（有震动硬件）产生有频率的震动
``` js
// 震动一次
navigator.vibrate(100);

// 连续震动，震动200ms、暂停100ms、震动300ms(可以指定任意数量的振动/暂停)
navigator.vibrate([200, 100, 300]);
```
### 14.page visibility
当用户最小化窗口或切换到另一个选项卡时，API会发送一个visibilitychange事件。当程序切到后台的时候，如果当前有视频播放或者一些动画执行，可以先暂停
``` js
function handleVisibilityChange() {
  if (document.hidden) {
    pauseSimulation();
  } else  {
    startSimulation();
  }
}

document.addEventListener("visibilitychange", handleVisibilityChange, false);
```

### 15.deviceOrientation
陀螺仪，也就是设备的方向，又名重力感应，
``` js
window.addEventListener("deviceorientation", event => {
  let {
    alpha, // 水平方向旋转
    beta,  // 上下方向旋转
    gamma  // 前后方向旋转
  } = event;

  console.log(`alpha：${alpha}`);
  console.log(`beta：${beta}`);
  console.log(`gamma：${gamma}`);
})
```
### 16.toDataURL
这个是canvas的API，作用是将画布的内容转换成一个base64的图片地址,借助canvas实现一个下载功能
``` js
const downloadImage = (url, name) => {
  // 实例化画布
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");

  // 实例化一个图片对象
  let image = new Image();
  image.crossOrigin = "Anonymous";
  image.src = url;

  // 当图片加载完毕
  image.onload = () => {
    // 将图片画在画布上
    canvas.height = image.height;
    canvas.width = image.width;
    context.drawImage(image, 0, 0);

    // 将画布的内容转换成base64地址
    let dataURL = canvas.toDataURL("image/png");

    // 创建a标签模拟点击进行下载
    let a = document.createElement("a");
    a.hidden = true;
    a.href = dataURL;
    a.download = name;

    document.body.appendChild(a);
    a.click();
  }
}
```

#17.customEvent
自定义事件
``` js
  // 监听自定义事件：
  window.addEventListener("follow", event => {
    console.log(event.detail); // 输出 {name: "前端宇宙情报局"}
  });
  // 派发自定义事件
  window.dispatchEvent(new CustomEvent("follow", {
    detail: {
      name: "前端宇宙情报局"
    }
  }));
```

#18.fullScreen
不仅仅可以作用在documentElement上，还可以作用在指定元素；
``` js
/**
 * @method launchFullScreen 开启全屏
 * @param {Object} elem = document.documentElement 作用的元素
 */
const launchFullScreen = (elem = document.documentElement) => {
  if(elem.requestFullScreen) {
    elem.requestFullScreen();
  } else if(elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if(elem.webkitRequestFullScreen) {
    elem.webkitRequestFullScreen();
  }
}

/**
 * @method exitFullScreen 关闭全屏
 */
const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}
```

### 19.orientation
监听用户手机设备的旋转方向变化
``` js
window.addEventListener("orientationchange", () => {
  document.body.innerHTML += `<p>屏幕旋转后的角度值：${window.orientation}</p>`;
}, false);
```

``` css
/* 竖屏时样式 */
@media all and (orientation: portrait) {
  body::after {
    content: "竖屏"
  }
}

/* 横屏时样式 */
@media all and (orientation: landscape) {
  body::after {
    content: "横屏"
  }
}
```