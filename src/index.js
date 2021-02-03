// 导入组件
import CComponent from "./component.vue";
import { isObject, isFunction, isDev } from "@qingbing/helper";
// 定义组件安装
const Component = {
  install(Vue, ops) {
    // 这是 ajax method 函数
    let ajaxMethod;
    if (isObject(ops) && isFunction(ops.ajaxMethod)) {
      ajaxMethod = ops.ajaxMethod;
    } else {
      ajaxMethod = () => {
        throw new Error(`Element-Form 使用远端请求时必须指定远端请求的方法 ajaxMethod`);
      };
    }

    Vue.prototype.ajaxMethod = ajaxMethod;
    Vue.component('ElementForm', CComponent) // Vue 中组件的 id
  }
}
// 导出组件
export default Component;