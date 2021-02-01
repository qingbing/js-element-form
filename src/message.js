/**
 * 定义验证的默认提示消息
 */
const messages = {
  default: "{label} 输入无效",
  required: "{label} 必填",

  pattern: "{label} 输入无效",

  boolean: "{label} 不是一个boolean值",
  regexp: "{label} 输入无效",
  email: "{label} 不是有效的邮箱地址",
  url: "{label} 不是有效URL",
  enum: "{label} 必须是 {enum} 中的一个",
  hex: "{label} 必须输入3或6个[0-9a-f]的十六进制",

  date: {
    base: "{label} 不是有效的日期对象",
    len: "{label} 必须是 {len}",
    min: "{label} 不能早于 {min}",
    max: "{label} 不能晚于 {max}",
    range: "{label} 必须介于 {min} 和 {max} 之间"
  },
  number: {
    base: "{label} 不是有效的数字",
    len: "{label} 必须等于 {len}",
    min: "{label} 必须大于 {min}",
    max: "{label} 必须小于 {max}",
    range: "{label} 必须介于 {min} 和 {max} 之间"
  },
  float: {
    base: "{label} 不是有效的浮点数",
    len: "{label} 必须等于 {len}",
    min: "{label} 必须大于 {min}",
    max: "{label} 必须小于 {max}",
    range: "{label} 必须介于 {min} 和 {max} 之间"
  },
  integer: {
    base: "{label} 不是有效的整数",
    len: "{label} 必须等于 {len}",
    min: "{label} 必须大于 {min}",
    max: "{label} 必须小于 {max}",
    range: "{label} 必须介于 {min} 和 {max} 之间"
  },
  string: {
    base: "{label} 不是有效的字符串",
    len: "{label} 必须包含 {len} 个字符",
    min: "{label} 必须大于 {min} 个字符",
    max: "{label} 必须小于 {max} 个字符",
    range: "{label} 必须输入 {min} 到 {max} 个字符"
  },
  array: {
    base: "{label} 不是数组",
    len: "{label} 的个数必须等于 {len}",
    min: "{label} 的个数必须大于 {min}",
    max: "{label} 的个数必须小于 {max}",
    range: "{label} 的个数必须介于 {min} 和 {max} 之间"
  },
  // 非原生组件支持的验证规则
  username: "{label} 不是有效的用户名",
  password: "{label} 不是有效的密码",
  zipcode: "{label} 不是有效的邮政编码",
  mobile: "{label} 不是有效的手机号码",
  phone: "{label} 不是有效的座机号码",
  contact: "{label} 不是有效的联系方式",
  fax: "{label} 不是有效的传真号码",
  ipv4: "{label} 不是有效的IPV4"
};

export default messages;