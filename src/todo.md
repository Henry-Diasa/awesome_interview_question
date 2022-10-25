1. Node BFF
   - 网关
   - 数据聚合
   - 数据校验
   - express
   - 部署: docker
   - 数据库: mongo
1. JSON Schema
   - 数据校验 (Request/Response)
   - joi
1. Long Term Cache
   - 永久缓存
   - 当内容发生变更后，会生成全新 hash 的资源
   - 分包
     - 第三方模块 vendor
     - 第三方模块特别大 echarts (import())
     - 保证资源不会重新请求 (并非编译,filesystem cache)
1. JWT (https://jwt.io/)
   - 相比 session 方式有啥好处
     - 无状态 (不需要做数据存储)
     - 安全 (不见得比传统方式更加安全)
   - jwt (签名校验)
1. Docker
   - CICD/jenkins
   - docker build/docker push/docker pull Deploy -> CD (habor)
   - CICD 构建服务器 -> CI
   - Dockerfile ❎
     - 基础镜像
     - 多阶段构建
       - node 镜像去做构建
       - nginx 镜像去做静态服务
1. Git Hooks (husky)
   - fix/chore/feat (Commit Message)
   - precommit ❎

## 建议

1. 深入阅读文档
1. 阅读源码
   1. 不停地打断点
   1. Step In/Out/Over 条件断点
   1. VSCode JS Debug Terminal
1. https://q.shanyue.tech/engineering/749.html
1. https://q.shanyue.tech/engineering/741.html

- http 状态码
  200
  201
  204
  301 有缓存/SEO(收录之后的页面)
  302 可以修改 location （收录之前的页面）
  304
  307
  308
  400
  401
  403
  405
  500
  502
  504
- IntersectionObserval
- <img loading="lazy">
- 谈谈你对 vue 的理解

- 6
