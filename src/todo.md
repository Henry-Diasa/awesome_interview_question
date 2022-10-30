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
- 9
