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


### 16

+ tree shaking
  + ESM
  + commonjs -> esm ✅
    + vite
  + json tree shaking
    + { a: 3, b: 4 }
+ http
  + 304
  + 206
  + 204
  + 201
  + 401
  + 405
  + 429 -> Rate Limit ❎
+ http2
  + header
  + 多路复用
  + Frame/Stream/Message
  + Server Push (index.html) ❎
    + ws的区别
+ ws
+ koa / node->stream
  + cors
  + body-parser ❎
    + Content-Type
  + router
    + /api/users/:userId -> 正则
    + path-to-regexp -> 前缀树
+ webpack 体积优化
  + webpack-bundle-analyzer
  + terser
  + gzip/brotli -> not webpack
+ vue3
  + Proxy/define
+ ES6 Proxy
  + 代理
  + 不可变数据 -> immer.js


### 17 

+ css 左侧固定右侧自适应
+ js
  + Array.isArray
  + {}.toString.call ❎
  + Number
    + .isNaN
    + .isInteger
+ 0.1 + 0.2 -> https://devtool.tech/double-type ❎
+ Array
  + indexOf/includes
  + flat
  + 类数组->数组
    + Array.from
  + 数组去重
    + Set
    + Weakset
  + 【1, 1, ...1】
    + new Array(100).fill(1)
    + Array.from({ length: 100 }, x => 1)
  + TypedArray ❎
+ 可选链操作符
+ Promise.allSettled() ❎
+ cookie 字段 
  + httpOnly -> ❎
  + sameSite
+ 如何删除 cookie ❎
+ webpack
  + css-loader
  + babel-loader
  + url-loader ✅
    + 减少 http 请求
  + asset 
  + tree shaking -> 
  + code spliting
    + import()
    + splitChunksPlugin
+ 第三方库
  + dayjs
+ 首屏优化
  + performance API
  + gzip
  + http cache ❎
+ nodejs api
  + fs
    + 查看某个文件的修改时间
    + fs stat / POSIX 
  + path
  + http
  + buffer -> UInt8Array
  + stream
+ css 如何隐藏页面中的元素
  + scale: 0
+ http (强缓存) ❎
  + 如何设置强缓存
  + 404
  + 401
  + 301
  + 201
  + 307 (临时重定向)
  + 400

### 19 

1. useEffect
  1. hooks 陷阱
  1. useEffect cleanup
  1. 请求时序
  1. 如何取消请求
    1. xhr.abort
    1. AbortController
    1. axios -> CancelToken
      1. xhr.abort
      1. https/http
1. React 点击按钮自增三次
  1. setCount -> 3
1. useMemo/useCallback
1. React.memo
  1. 如何自定义比较函数
1. 前端工程化实践
  1. prettier
  1. eslint
    1. CRA -> eslint-loader
  1. githooks
    1. .git/hooks
    1. precommit
    1. git commit --no--verify
  1. commitlint
  1. CICD -> jetbrain -> team-city
    1. 如何自动部署
1. webpack/rollup -> npm package
  1. 对比
  1. webpack 的 runtime code
  1. rollup 的 runtime code
  1. vite/rollup
  1. 为啥要配置 hash ❎
    1. 方便配置长期缓存 
  1. contenthash/chunkhash !!!
1. Docker
  1. node build
  1. 数据库 -> oracal/mysql
    1. left join / right join / inner join
  1. CICD
1. Nginx
  1. try_files -> history API
  1. server_name

### 20 
1. graphql
  1. POST 
    1. 模板字符串
    1. gql
  1. GET 
  1. POST 缓存优化 ❎
    1. hash string
  1. N+1 Query
  1. /graphql 调试 ❎
    1. /graphql?UserFriends
  1. apollo-server/apollo-client
    1. graphql-codegen
1. 图片懒加载
  1. 虚拟滚动 -> elementui
1. 小图增加阿里图片压缩后缀
  1. 后缀/转格式/宽高
  1. webp/avif/jpegxl
  1. Image -> width/height/quality/webp
    1. picture ❎
1. 文件过大出现卡顿
  1. 虚拟滚动
  1. pdf.js
    1. 标注
    1. 缩略图
1. 切片上传
  1. blob.slice
  1. 断点续传
1. 网页截屏
  1. canvas
  1. processon
  1. 性能问题
    1. drag
1. 发送弹幕
  1. animation


### 23 
+ UMI 的好处
    + 约定式路由
    + ncc -> vercel
        + webpack
+ nest.js bff
    + DDD
    + 聚合/过滤/
    + 数据库
        + mongodb
        + redis
+ 安全问题
    + WAF 防火墙
        + https://www.aliyun.com/product/waf
    + http only 
    + 点击劫持
    + 反爬
        + UA
        + Rate Limit
        + 混淆
+ 性能优化
    + 监控
    + 优化
        + 加载
            + 网络
            + 首屏
        + 交互
            + 卡顿
        + 构建
            + 提速
                + esbuild
                + cache
                + 多进程
                + include/exclude
            + 体积
                + gzip/brotli
    + 分析
    + https://developers.google.com/web/fundamentals
+ 自动化测试
    + E2E
        + pptr/jest/冒烟测试
    + CI
        + when -> 选定分支
    + 监控
        + 监控平台
        + 监控异常
            + onerror
            + unhandlereject
            + react/vue -> 
            + network
                + API -> axios
    + gif
    + sendBeacon
    + 如何检测弱网
