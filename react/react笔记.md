## react 笔记
### 1、注意事项
#### 定义组件时必须要使用大驼峰命名方式，例如：
``` js
export default class ToDoItem extends Component {
  render() {
    return ()
  }
}
```
#### jsx中使用js语法需要在{}内，在react中使用注释同样加在{}，使用变量和vue不同，需要用{}来接收

#### react是单向数据流，在子组件中不能改变从父组件接收的变量，因此需要改变需要调用从父组件传递过来的方法，通过父组件来改变变量。 

#### react存在一个性能问题，在父组件内容发生变化渲染时，子组件也会跟着发生渲染，这里可以借助shouldComponentUpdate这个函数进行性能优化
```js
/* shouldComponentUpdate有两个参数：
nextProps:变化后的属性;
nextState:变化后的状态;
*/
shouldComponentUpdate(nextProps,nextState){
    if(nextProps.content !== this.props.content){
        return true
    }else{
        return false
    }
   
}
```

### 2、生命周期
#### Mounting阶段
```js
1.componentWillMount : // 在组件即将被挂载到页面的时刻执行。
2.render : // 页面state或props发生变化时执行。
3.componentDidMount : // 组件挂载完成时被执行
```

#### Updation
``` js
1.shouldComponentUpdate // 这个需要写一个返回值Boolean类型，为true才会执行后面的内容
2.componentWillUpdate
3.render
4.componentDidUpdate

componentWillReceiveProps // 这个组件第一次存在于Dom中，函数是不会被执行的; 如果已经存在于Dom中，函数才会被执行。
```