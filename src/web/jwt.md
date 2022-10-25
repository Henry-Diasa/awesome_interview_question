### jwt

> https://jwt.io/

> jwt 主要分为三部分 header payload 和 verify signature。header 包括 typ 类型和 alg 加密算法。payload 就是需要加密的信息。signature 是加密的盐

> jwt 相当于 cookie 或者 session 本质区别就是后端不需要保存加密内容，只需要每次前端发送过来信息，拿着一开始的签名进行解密即可
