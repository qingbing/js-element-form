// 导入组件
import CComponent from "./component.vue";
// 定义组件安装
const Component = {
  install(Vue) {
    Vue.component('ElementForm', CComponent) // Vue 中组件的 id
  }
}
// 导出组件
export default Component;