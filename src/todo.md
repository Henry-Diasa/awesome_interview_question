1. Node 镜像优化 (200MB) (harbor)
   1. BFF/Node Server
   1. npm i/npm start
   1. 多阶段构建/ubuntu/alpine
   1. 指令合并
1. 如何监控 node 服务
   1. heapdump/cpu profile
   1. 生产环境/alinode (kill USR2 监听信号)
   1. 事件延迟 (BFF)
   1. CPU/Memory (prometheus/时序数据库)
      1. pidstat (通过 code 层面代码注入，调用子进程)
      1. iostat
      1. cgroup/CPU/Memory
   1. 报警 (alert-mananger)
      1. middleware
1. deploy cluster
   1. pm2
   1. k8s
1. 数据库慢查询如何监控
   1. mysql
   1. 慢查询日志 -> 100ms
   1. explain
1. node log
   1. log4js -> API/HTTP/DB/Redis -> 存到磁盘 -> 上产到阿里云 (sls)
   1. winston -> API/Access/DB/Redis -> JSON -> (filebeat) -> 上传到 ES (Release/APP/hostname)
   1. SQL/time -> ES -> (requestId/traceId)
   1. traceId (慢接口): 查询某一条 API 请求所需要的查询次数
1. redis
   1. 缓存
      1. 击穿/穿透/雪崩
   1. 热点数据/BFF
   1. 分布式锁
   1. Rate Limit (429)
      1. 令牌桶
      1. 漏桶

- 图片懒加载
- http 缓存
- 跨域
- 简单请求/复杂请求/options
- 对 SPA 的理解
- 为什么需要虚拟 DOM
- Vue 组件化的理解
- 既然 Vue 通过数据劫持可以精准探测数据变化，为什么还需要虚拟 DOM 进行 diff 检测

- Javascript -> MDN
- React/在项目中全局搜索 use -> 了解自己的项目中使用了哪些第三方 hooks
- ahooks/react-use -> usePrevious
- React
  - https://q.shanyue.tech/fe/react/9.html
  - https://github.com/shfshanyue/Daily-Question#codesandbox-%E7%A4%BA%E4%BE%8B%E9%9B%86
- React.memo 与 useMemo: https://codesandbox.io/s/reactmemo-and-reactusememo-79txp?file=/src/App.js

* hooks 的优势
  - 状态难以复用 (状态管理)
  - withRouter(hoc)/useRouter(hook) ...
* hoc
  - 高阶组件 (属性注入)
* hooks 哪些
  - useState
  - useEffect
    - componentDidMount
    - 【deps】
  - useCallback
  - useMemo
    - 如何避免不必要的渲染？
* hooks 第三方
  - ahooks
  - react-use
* 如何在项目中发送请求
  - umi.request (fetch) ...
* React.memo
  - 避免 rerender，浅比较
  - {a: 3, b: 4}
  - {a: 3, b: 4, o: {}} ...
  - https://codesandbox.io/s/reactmemo-and-reactusememo-79txp?file=/src/App.js
* 原始数据类型
  - number
  - string
  - bool
  - undefined
  - null
  - bigint
  - symbol
* 包装类型
  - String
  - Number
  - 'hello'.replace()
* ES6
  - Map 和 WeakMap 的区别
  - Promise.race 及用途(timeout) ...
  - Promise.all 手写实现吗
  - 如何拍平数组 (.flat)
  - 如何判断一个值是数组
    - Array.isArray
    - .toString.call
  - Object.create
    - Object.create(null) / {}
* 防抖和节流
  - debounde
  - throtle
* CommonJS/UMD/ESM
* 如何创建一个数组大小为 100，每个值都为 0 的数组
  - Array.from({ length: 100 }).map(() => 0)
  - https://q.shanyue.tech/fe/js/520.html

- graphql
  - 好处 ✅
  - N+1 Query ❎ Dataloader
  - APQ 缓存
    - https://www.apollographql.com/docs/apollo-server/performance/apq/
  - Optimistic UI ✅
- tailwindcss
  - 好处
  - 按需构建
    - purgecss: https://github.com/FullHuman/purgecss
    - uncss: https://github.com/uncss/uncss
- webpack-bundle-analyzer (next.js) -> https://github.com/vercel/next.js/blob/canary/packages/next/build/webpack-config.ts
  - lodash
  - echarts
  - split-chunks (http cache) -> next.js
    - react/react-dom
  - 路由懒加载
    - lazy/suspense
  - image
    - webp
      - imagemin-webpack-plugin (sharp)
    - picture
    - width/height
    - 懒加载
      - IntersectionObserver
        - https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
      - loading.lazy
    - Image Component -> next.js
  - prefetch -> import('') Webpack 魔法注释
  - compressWebpackPlugin
    - gzip/brotli
  - minify
    - js -> terser
    - css -> cssnano

* CICD
* Github Action (免费)
  - Github 管理项目
  - 前端在哪里部署？
    - COS
* 持续交付
* 版本管理/Tag/Release
* 质量检查 (PR)
  - lint
  - test
  - prettier
  - commit-msg
  - 多个阶段
    - husky (git hooks) ❎
      - lint-staged -> Stage
      - git index/stage/head
      - git hooks 是如何工作的
        - `.git/hooks/precommit`
    - ci 的时机
      - PR/feature/xxx 新功能分支
        - N 个分支走到 dev 环境是否无法上线
      - dev 测试环境
      - staging 预发布环境
      - master 会做吗？ ❎
      - on: pull_request and feature/\*\*
        - 【open、sync\_\*\*】
    - sync\_
* 自动关掉 PR
  - 为什么这么做？ (当 CI 失败时自动关掉)
  - WIP:
  - CI 失败: -> 策略
    - Approving + CI Success 才能进行合并 ❎
* Code Review
  - 两个人合并
* Preview/Review App
  - environment
  - Docker/Label/docker-compose/service ❎
    - k8s/Deployment
    - docker-compose/service name
* Integration
  - 企业微信
* ChangeLog
* Artifact
* 如何自动部署
  - only_files
* 如何回滚

### 13

+ hooks
+ electron
+ leveldb

+ react hooks -> vue3 (electron)
  + 3D
  + 570ms -> 200ms 延时？
    + React.memo
    + React 一次状态改变
  + C++ -> JS
  + napi / C++ Addon ❎
    + wasm
    + https://nodejs.org/api/n-api.html
+ memo
  + useCallback
  + useMemo
  + React.memo -> ❎
    + shouldComponentUpdate
+ componentDidMount
  + useEffect(, 【】)
+ react hooks
  + useSelector -> redux
  + useHistory -> react-router
+ redux
  + Action  -> {}
  + Reducer -> o = { a: 3 }
  + Store
+ 如何发送请求
  + React Query ❎
  + swr
  + redux -> dispath({ }) ❎
    + redux-thunk -> https://github.com/reduxjs/redux-thunk
    + redux-saga
  + redux-toolkit ❎ 
+ leveldb (localstorage)
  + k/v
  + node.js
+ node 读取图片文件
  + fs
+ bytenote
  + 二进制加密
+ node-ffi
  + C++

### 14
1. WebSocket
  1. 轮询
  1. 定时器/短轮询
  1. 和短轮询有什么区别
    1. 性能 (DOM/Network !!!)
      1. 连接数 (http2/connection-keep-alive 除外)
      1. Payload
    1. 及时性
    1. 业务逻辑复杂
  1. Websocket 报文格式 ❎
    1. Frame (不了解也可以，不过大厂会问)
  1. HTTP2 Server Push (不了解也可以，不过大厂会问)
1. react hooks
  1. useReducer 
  1. ahooks
    1. useThrottle
    1. useDebounce
    1. useRequest -> React Query
1. useInterval/useCountDown ❎
  1. code
1. 短信验证
  1. 流程 -> 注册
  1. Server 后端 ❎
    1. phone
  1. 坑
    1. 短信模板
1. Gitlab CI ❎
  1. exitcode
  1. lint/build
  1. health check
1. vDOM ❎
  1. patch
  1. diff
    1. vnode 
    1. 时间复杂度
      1. On3 -> On
    1. tag
      1. ul>li*3 -> li完全相同
      1. ol>li*3
    1. key 
1. 字节
  1. 小程序视觉层和逻辑层是怎么连接的
  1. 水波纹效果 (地震了)



