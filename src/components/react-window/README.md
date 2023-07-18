### 虚拟列表

#### 定高实现细节

![图片示例](https://static.zhufengpeixun.com/reactwindowfixed_1651225094542.jpg)
- 根据itemCount 计算出所有要渲染的item
- 通过scrollTop的值计算需要在列表中开始显示的index和结束index，对所有内容进行截取
- 监听scroll事件动态渲染
- 提高渲染效果，可以在列表的首尾添加overscanCount 缓冲

#### 非定高实现细节

- 获取预估的总高度 -- 先获得已经测量的offset 和  size 然后在加上未测量的预估高度
- 获取开始索引 -- 找到最近的已经测量的offset值大于 卷去的高度的索引就是start index
- 获得结束索引 -- 从开始索引开始 递归 遍历到 小于 最大的offset的的index
- 通过一个itemMap来存放每个item的信息  包括 offset 和 index
