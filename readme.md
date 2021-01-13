# 封装 vue-element-ui 的组件
对 vue-element-ui 进行封装表单组件

## 1. 安装
```
npm install @qingbing/element-form
```

## 2. 包导入，在vue的main.js中确认加入如下代码
```js
// 注意引入element-ui在Vue下，因为可能会被其他组件使用到
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局引入组件包（也可以局部引用）
import ElementForm from "@qingbing/element-form";
Vue.use(ElementForm);
```

## 3. vue文件中使用
```
<element-form></element-form>
```