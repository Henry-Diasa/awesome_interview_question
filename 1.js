class Promise {
    constructor(fn) {
        this.resolveTask = [];
        this.rejectTask = []
        this.state = 'pending'

        let resolve = value => {
            if(!this.state!=='pending') return
            this.state = 'fullfilled'
            this.data = value

            setTimeout(() => {
                this.resolveTask.forEach(cb => cb(value))
            })
        }


        let reject = err => {
            if(this.state!=='pending') return
            this.state = 'rejected'
            this.error = err

            setTimeout(() => {
                this.rejectTask.forEach(cb => cb(err))
            })
        }

        try {
            fn(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(resolveCallback, rejectCallback) {
        return new Promise((resolve, reject) => {
            this.resolveTask.push(() => {
                const res = resolveCallback(this.data)
                if(res instanceof Promise) {
                    res.then(resolve, reject)
                }else{
                    resolve(res)
                }
            })

            this.rejectTask.push(() => {
                const res = rejectCallback(this.error)
                if(res instanceof Promise) {
                    res.then(resolve, reject)
                }else{
                    resolve(res)
                }
            })
        })
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            for(let i = 0;i < promises.length;i++) {
                Promise.resolve(promises[i]).then(res => {
                    resolve(res) 
                }).catch(err => {
                    reject(err)
                })
            }
        })
    }

    static all(promises) {
        let result = [];
        let index = 0

        return new Promise((resolve, reject) => {
            for(let i = 0;i<promises.length;i++) {
                Promise.resolve(promises[i]).then(res => {
                    result[i] = res;
                    index++

                    if(index === promises.length) {
                        resolve(result)
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        })
    }
}

function retry(fn, delay, times) {
    return new Promise((resolve, reject) => {
        function func() {
            Promise.resolve(fn()).then(res => {
                resolve(res)
            }).catch(err => {
                if(times!==0) {
                    setTimeout(func, delay)
                    times--
                }else{
                    reject(err)
                }
            })
        }

        func()
    })
}

// 沙箱全局代理对象类
class SandboxGlobalProxy {
    constructor(sharedState) {
      // 创建一个 iframe 标签，取出其中的原生浏览器全局对象作为沙箱的全局对象
      const iframe = document.createElement("iframe", { url: "about:blank" });
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      const sandboxGlobal = iframe.contentWindow; // 沙箱运行时的全局对象
  
      return new Proxy(sandboxGlobal, {
        has: (target, prop) => {
          // has 可以拦截 with 代码块中任意属性的访问
          if (sharedState.includes(prop)) {
            // 如果属性存在于共享的全局状态中，则让其沿着原型链在外层查找
            return false;
          }
          if (!target.hasOwnProperty(prop)) {
            throw new Error(`Not find - ${prop}!`);
          }
          return true;
        }
      });
    }
  }
  
  // 构造一个 with 来包裹需要执行的代码，返回 with 代码块的一个函数实例
  function withedYourCode(code) {
    code = "with(sandbox) {" + code + "}";
    return new Function("sandbox", code);
  }
  function maybeAvailableSandbox(code, ctx) {
    withedYourCode(code).call(ctx, ctx);
  }
  
  const code_1 = `
    console.log(history == window.history) // false
    window.abc = 'sandbox'
    Object.prototype.toString = () => {
        console.log('Traped!')
    }
    console.log(window.abc) // sandbox
  `;
  
  const sharedGlobal_1 = ["history"]; // 希望与外部执行环境共享的全局对象
  
  const globalProxy_1 = new SandboxGlobalProxy(sharedGlobal_1);
  
  maybeAvailableSandbox(code_1, globalProxy_1);
  
  // 对外层的window对象没有影响
  console.log(window.abc); // undefined
  Object.prototype.toString(); // 并没有打印 Traped


  Array.prototype.myReduce = function(fn, initialValue) {
    let index, pre;
    let arr = this.slice();

    if(!initialValue) {
        
    }
  }

  function once(f) {
    let flag = false
    let r
    return function (...args) {
        if(flag) return r
        r = f(...args)
        flag = true
        return r
    }
  }


  
  