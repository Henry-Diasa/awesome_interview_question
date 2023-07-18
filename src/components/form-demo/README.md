## 整体流程

### Form

- 创建Form组件，内部创建一个formInstace,里面有注册回调函数、设置初始值、提交表单等操作
- 通过context向下传递formInstance

### Field

- 加载时注册Field实例到formInstance中
- 通过context将其children的value值和formInstance的store关联

### useForm

- useForm 返回 Store实例，里面是保存表单的一些状态和操作

### 检验

- submit提交之前先把每个Field对应rules生成一个 `ruleKey => rules[ruleKey]` 的`map`, 然后遍历`rules`和对应的`values[ruleKey]`比较即可