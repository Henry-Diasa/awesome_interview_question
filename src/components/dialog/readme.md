### [弹框实现细节](https://juejin.cn/post/7238859210661888061?searchId=20230716213122DE171AE6B5A4A3A5473D#heading-11)

- 定义声明式和命令式组件使用方式的type
- 设置一些默认配置传递到内部组件中
- 实现内部组件
    - title通过组件外部传入
    - 关闭icon可以通过传入的icon进行渲染
    - 内容直接通过外部传入的content渲染
    - 底部内容包括 取消和确认按钮。也可以设置一个loading的确认按钮
- 外部包裹组件可以实现一些显示和隐藏的动画和一些非首次进入不显示弹框内容的优化
- 一些指令调用方式 show clear等
    - show可以创建新节点，插入到body中，然后createRoot以这个新节点为root，root.render(Component)
    - clear 直接进行dom的remove

