# 封装 vue-element-ui 的组件
对 vue-element-ui 进行封装表单组件

### ====== 版本说明 ======
- 1.0.1 : 基础表单选项
- 1.0.2 : 增加json-editor
- 1.0.4 : 增加quill-editor(vue2-editor)
- 1.0.5 : vue2-editor 增加编辑器 id 属性扩展
- 1.0.6 : vue2-editor 增加编辑器 code 行号显示
- 1.0.7 : 去除不需要的 isDev 代码
- 1.0.8 : 将 element-form 的 items 传递用 object 来代替 array
- 1.0.9
  - 添加 idCard 身份证验证规则
  - 添加 qq 规则验证
  - 完善 time-picker 组件
  - 完善 datetime-picker 组件
- 1.0.10
  - 将 datetime-picker 改成 date-picker
- 1.0.11
  - 将 date-picker 中如果默认值小于 "1100-01-01",将视为""
- 1.0.12
  - 修改 options 的初始渲染问题
- 1.0.13
  - 检查 item 中是否有 field 字段，无则用 idx(索引) 代替 
- 1.0.14
  - 使用 watch 监控（checkbox、radio、select、date-picker） fromData，当数据整个发生变化时，将重新对数据进行必要的类型纠正
- 1.0.15
  - 修改 switch 在数据复制时的显示bug
- 1.0.16
  - 为所有的组件适当的添加 change、blur 事件
- 1.0.17
  - 解决未定义 exts 时的报错
- 1.0.18
  - 解决 viewText 的在显示时的计算问题，通过计算属性来实现
- 1.0.19
  - 修改 base.vue 文件中事件函数（ changeCallback， blurCallback ） 的参数传递
- 1.0.20
  - 修改 date-picker 和 time-picker 的 editable 的默认值为 false
- 1.0.21
  - 修改 upload
- 1.0.22
  - switch组件的值支持数字和字符串数字
- 1.0.23(调试版本)
  - vue2-editor 替换成 @qingbing/vue2-editor
    - 新组件增加源码查看和编辑功能
    - 新组件对图片的编辑更为灵活
- 1.0.24
  - 修正了对 @qingbing/vue2-editor 的使用
- 1.0.25
  - 配合修改inArray 为 isElement

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
// 字符串长度可以从 exts 的 minlength、maxlength 中获取
{ type: "string", min: 2, max: 4, }
// 数字可以从 exts 的 min、max 中获取
{ type: "number", min: 2, max: 4, }
// 数字可以从 exts 的 min、max 中获取
{ type: "integer", min: 2, max: 4, }
// 数字可以从 exts 的 min、max 中获取
{ type: "float", min: 2, max: 4, }
// 数字可以从 exts 的 min、max 中获取
{ type: "array", min: 2, max: 4, }
// ajax 的url验证，需要 ajaxMethod 函数在不通过时返回字符串，只要返回时字符串，就认为不通过
{ type: "ajax", url: '/rule-ajax', fields: ["select2",], params: { id: 55 }, method: 'get' }
// callback 的函数式验证，如果验证不通过，返回一个字符串即可
{type: "callback", fields: ["select2",], params: { id: 55 }, callback(data, formData) { return "Error. There is something wrong!";}}
// compare 对比验证
{ type: "compare", compareField: "password-text", message: "密码确认不正确" }

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

## 5. 关于 vue-json-editor
### 5.1 接受参数
- showBtns : 是否显示 vue-json-editor 的保存按钮
  - 默认 true
- expandedOnStart : 在开始时展开
  - 默认 false
- mode : 显示的模式，从 modes 里面选其一
  - 默认 tree
- modes : 支持的显示模式，当传递的 modes 为 [] 时，模式选项将隐藏
  - 默认 ["tree", "code", "form", "text", "view"]
- lang : 保存按钮显示的语言
  - 默认 en， 支持 "en", "zh", "it"

### 5.2 接受事件
- @json-change: json编辑器内容改变时触发
- @json-save: 点击保存时触发
- @has-error: 发生错误时触发


## 6. 关于 @qingbing/vue2-editor
### 5.1 exts 参数
- toolbarMode : 工具栏模式
  - 默认 simple
- editorToolbar : 自定义工具栏
  - 默认 []
- editorOptions : 编辑器配置
  - 默认 {}
- useSource : 开启源码工具按钮
  - 默认 false
- useImageUrl : 图片使用url输入模式
  - 默认 true
- useImageHandle : 开启图片上传
  - 默认 false
- imgAdded : 图片上传方法（function）
  - 无默认

