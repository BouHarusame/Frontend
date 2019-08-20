import _ from 'lodash';
import './index.css'
import Logo from './logo.png'
import Data from './data.xml';

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello')

  // 将图像添加到我们现有的 div。
  var myIcon = new Image();
  myIcon.src = Logo; 
  element.appendChild(myIcon);

  console.log(Data);
  return element;
}

document.body.appendChild(component());