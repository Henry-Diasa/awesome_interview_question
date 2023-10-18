### 可能的功能

1、大文件上传技术点

- 前端上传大文件时使用 Blob.prototype.slice 将文件切片，并发上传多个切片（formData），最后发送一个合并的请求通知服务端合并切片
- 服务端接收切片并存储，收到合并请求后使用流将切片合并到最终文件
- 原生 XMLHttpRequest 的 upload.onprogress 对切片上传进度的监听
- 使用 spark-md5 根据文件内容算出文件 hash(webworker)
- 通过 hash 可以判断服务端是否已经上传该文件，从而直接提示用户上传成功（秒传）
- 通过 XMLHttpRequest 的 abort 方法暂停切片的上传 (每一个请求放入一个数组中，成功的请求删除，当暂停的时候调用数组中请求的abort，清空数组)
- 上传前服务端返回已经上传的切片名，前端跳过这些切片的上传(恢复)
- 请求并发控制 ([p-limit](https://github.com/sindresorhus/p-limit/blob/main/index.js))

2、请求函数的封装（useRequest）
> 涉及到的功能：自动请求、手动触发、错误处理、错误重试、缓存、取消请求、防抖节流、生命周期、插件系统等

封装请求`Fetch`类，里面包括了请求的结果数据、参数、loading等信息

- 自动请求
在挂载生命周期中直接触发请求
- 手动触发
通过一个参数来控制自动请求是否触发，同时暴露run或runAsync来手动调用
- 错误处理
try catch捕获错误，然后设置请求实例的error属性
- 取消请求
组件卸载和手动触发cancel，可以通过设计一个计时器count，每当取消的时候+1操作，当真正请求的时候count和之前的count不一致则返回一个新的promise
- 插件系统
插件系统提供一系列函数，函数可以有init方法，当插件注册的时候调用，可以设置请求初始状态。同时插件函数还可以返回一个生命周期的对象，可以在请求的不同阶段来影响结果，例如before影响初始值，request影响请求的实际方法
- 错误重试
利用插件在onError生命周期，在currentCount < retryCount的时候，在retryInterval时间内再次发起一个请求
- 缓存
缓存插件利用onBefore来获取缓存信息，onSuccess设置缓存信息，可以用一个map对象设置缓存，也可以缓存请求参数或者自定义缓存get和set
- 防抖节流
利用插件在调用的时候重写originRequest，在里面封装相应的逻辑即可

3、监控平台

- 错误捕获
try/catch 捕获代码运行错误
window.onerror 捕获常规错误和异步错误
window.addEventListener('error') 捕获资源加载错误 但是不能捕获new Image中的错误需要单独处理一下
window.addEventListener("unhandledrejection")捕获promise错误
vue错误可以使用全局配置errorHandler处理错误（try/catch）
react使用ErrorBoundary
跨域的资源可以在script标签添加crossorigin，然后通过error事件捕获错误
接口错误通过拦截XMLHttpRequest和fetch，重写方法接口报错上报

- 性能数据采集
PerformanceObserver API 来获取各种性能指标，例如FP、FCP、LCP、CLS、TTFB、FID等

- 用户行为数据采集
设计一个栈数据，当用户有点击事件、路由跳转、接口请求的时候将具体信息记录到栈中。然后进行上报

```
// 创建用户行为类
class Breadcrumb {
  // maxBreadcrumbs控制上报用户行为的最大条数
  maxBreadcrumbs = 20;
  // stack 存储用户行为
  stack = [];
  constructor() {}
  // 添加用户行为栈
  push(data) {
    if (this.stack.length >= this.maxBreadcrumbs) {
      // 超出则删除第一条
      this.stack.shift();
    }
    this.stack.push(data);
    // 按照时间排序
    this.stack.sort((a, b) => a.time - b.time);
  }
}

let breadcrumb = new Breadcrumb();

// 添加一条页面跳转的行为，从home页面跳转到about页面
breadcrumb.push({
  type: "Route",
  form: '/home',
  to: '/about'
  url: "http://localhost:3000/index.html",
  time: "1668759320435"
});

// 添加一条用户点击行为
breadcrumb.push({
  type: "Click",
  dom: "<button id='btn'>按钮</button>",
  time: "1668759620485"
});

// 添加一条调用接口行为
breadcrumb.push({
  type: "Xhr",
  url: "http://10.105.10.12/monitor/open/pushData",
  time: "1668760485550"
});

// 上报用户行为
reportData({
  uuid: "a6481683-6d2e-4bd8-bba1-64819d8cce8c",
  stack: breadcrumb.getStack()
});

```
`页面跳转`
通过监听window.onpopstate事件和重写pushState和 replaceState事件来进行页面跳转的上报
`用户点击`
给 document 对象添加click事件，并上报
`资源加载`
performance.getEntriesByType('resource') 获取资源列表。同时可以结合 initiatorType 字段来判断资源类型，对资源进行过滤
获取资源加载时长为 duration 字段，即 responseEnd 与 startTime 的差值
同样获取资源列表也可以判断是否来自缓存
```
function getResource() {
  if (performance.getEntriesByType) {
    const entries = performance.getEntriesByType('resource');
    // 过滤掉非静态资源的 fetch、 xmlhttprequest、beacon
    let list = entries.filter((entry) => {
      return ['fetch', 'xmlhttprequest', 'beacon'].indexOf(entry.initiatorType) === -1;
    });

    if (list.length) {
      list = JSON.parse(JSON.stringify(list));
      list.forEach((entry) => {
        entry.isCache = isCache(entry);
      });
    }
    return list;
  }
}

// 判断资料是否来自缓存
// transferSize为0，说明是从缓存中直接读取的（强制缓存）
// transferSize不为0，但是`encodedBodySize` 字段为 0，说明它走的是协商缓存（`encodedBodySize 表示请求响应数据 body 的大小`）
function isCache(entry) {
  return entry.transferSize === 0 || (entry.transferSize !== 0 && entry.encodedBodySize === 0);
}
```
如果我们只关注首页资源，可以在 window.onload 事件中去收集

- 个性化指标

`long task`

```
const entryHandler = list => {
  for (const long of list.getEntries()) {
    // 获取长任务详情
    console.log(long);
  }
};

let observer = new PerformanceObserver(entryHandler);
observer.observe({ entryTypes: ["longtask"] });

```
`memory 内存`

```
// load事件中获取此时页面的内存大小
window.addEventListener("load", () => {
  console.log("memory", performance.memory);
});

```

`首屏加载时间`

计算首屏加载时间流程
1）利用MutationObserver监听document对象，每当dom变化时触发该事件
2）判断监听的dom是否在首屏内，如果在首屏内，将该dom放到指定的数组中，记录下当前dom变化的时间点
3）在MutationObserver的callback函数中，通过防抖函数，监听document.readyState状态的变化
4）当document.readyState === 'complete'，停止定时器和 取消对document的监听
5）遍历存放dom的数组，找出最后变化节点的时间，用该时间点减去performance.timing.navigationStart 得出首屏的加载时间

- 数据上报方式和时机
图片上报和fetch请求上报，还有sendBeacon
时机可以优先使用 requestIdleCallback，利用浏览器空闲时间上报，其次使用微任务上报

- 定位源码
source-map-js库还原源码信息
source-map 的还原流程：
1、从服务器获取指定.map 的文件内容
2、new 一个 SourceMapConsumer 的实例，表示一个已解析的源映射，给它一个文件位置来查询有关原始文件位置的信息
3、输入报错发生的行和列，可以得到源码对应原始文件名、行和列信息（error-stack-parser提取给定错误的原始文件名、行和列信息）
4、从源文件的 sourcesContent 字段中，获取对应的源码信息

- 前端录屏
rrweb


