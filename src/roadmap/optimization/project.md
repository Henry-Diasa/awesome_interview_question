### 项目优化可以考虑的点

#### 分析

`构建工具分析`

- 体积 webpack-bundle-analyzer
- 速度 speed-measure-webpack-plugin

`项目分析`

NetWork: 网络面板，用于侦测浏览器资源下载与上传的能耗视图。
Performance: 性能面板：用于侦测浏览器运行时的性能表现，得出项目运行的时序图，同时也可以分析页面的一些隐式问题，如 (内存泄漏)。
Lighthouse: 性能评测(灯塔)，基于当前浏览器页面的阶段性加载现状来为用户提供结果分析数据指标报告。
探针: 前端框架如React有相关Profiler的探针API和chrome插件，能够为开发者探测代码编写时的问题，避免重复或者是频繁异常的Repeat rendering

#### 优化

`构建工具优化`

体积

- 按需加载
- tree-shaking
- minify 包括js压缩和css压缩
- CDN依赖 无法按需加载，占用请求资源

速度

- 持久化缓存 webpack cache
- 多进程构建  thread-loader
- building 基于Rust的高性能编译工具swc-loader
- DLL
- buildless vite

`项目`

资源加载

- 懒加载  图片 路由
- 预加载 
    - 首页预载 pre-load  pre-fetch
    - 关键页预载 
- 接口优化  大接口拆分或者零散聚合
- 缓存 浏览器缓存

网络

- DNS预解析
- PreConnect
- CDN
- HTTP/2
- Gzip

交互

- 加载态  loading或者骨架屏
- 虚拟列表

浏览器

- 回流和重绘
- RAF&RDC（requestAnimationFrame和requestIdleCallback）动画和执行复杂逻辑
- 事件委托

图片

- WebP
- 渐进式加载  模糊到清楚
- 图片切割  大图切割成小份
- 图片cdn  内容分发响应速度，图片裁切功能动态的定义分辨率大小、清晰度展示等辅助其在页面上的展示



