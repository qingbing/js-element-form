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

## 4. rules
```
{ type: "required", value: true, message: "", trigger:"blur" }
{ type: "boolean", message: "", trigger:"click" }
{ type: "enum", enum: ["nan", "nv"], message: "", trigger:"blur" }
  在 input-radio 和单选的 input-select 中可直接简化为：{ type: "enum", }
{ type: "email", message: "", trigger:"blur" }
{ type: "url", message: "", trigger:"blur" }
{ type: "regexp", message: "", trigger:"blur" }
{ type: "hex", message: "", trigger:"blur" }
{ type: "pattern", pattern: /^\d{2}$/, message: "", trigger:"blur" }
  或者 { type: "pattern", pattern: "/^\\\d{2}$/", message: "", trigger:"blur" }
{ type: "date", min: 1612108800000, max: 1614528000000, message: "", } 只能用在datetime-picker中，且指定 valueFormat 必须为 timestamp
  或者 { type: "date", min: "2021-02-01", max: "2021-03-01", message: "", }


custom 定义常用
{ type: "username", message: "", trigger:"blur" }
{ type: "password", message: "", trigger:"blur" }
{ type: "zipcode", message: "", trigger:"blur" }
{ type: "mobile", message: "", trigger:"blur" }
{ type: "phone", message: "", trigger:"blur" }
{ type: "contact", message: "", trigger:"blur" }
{ type: "fax", message: "", trigger:"blur" }
{ type: "ipv4", message: "", trigger:"blur" }
```