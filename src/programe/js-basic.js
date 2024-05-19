// Object.create

function create(obj) {
    function F(){};
    F.prototype = obj;
    return new F();
}

// instanceof

function myInstance(left, right) {
    let proto = Object.getPrototypeOf(left),
    prototype = right.prototype;

    while(true) {
        if(!proto) return false;
        if(proto === prototype) return true;

        proto = Object.getPrototypeOf(proto);
    }
}

// new 

function myNew() {
    let newObj = {};
    let constructor = Array.prototype.shift.call(arguments);
    let result = null;

    if(typeof constructor !=='function') {
        console.error('type error');
        return;
    }
    newObj = Object.create(constructor.prototype);
    result = constructor.apply(newObj, arguments);

    let flag = result && (typeof result === 'object' || typeof result === 'function');
    return flag ? result : newObj;

}

// Promise

function Promise(fn) {
    let self = this;

    this.state = 'pending';
    this.value = null;

    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    function resolve(value) {
        if(value instanceof Promise) {
            return value.then(resolve, reject)
        }

        setTimeout(() => {
            if(self.state === 'pending') {
                self.state = 'resolved';
                self.value = value;

                self.resolvedCallbacks.forEach(c => c(value))
            }
        }, 0)
    }
    function reject(value) {
        setTimeout(() => {
            if(self.state === 'pending') {
                self.state = 'rejected';
                self.value = value;

                self.rejectedCallbacks.forEach(c => c(value))
            }
        }, 0) 
    }

    try {
        fn(resolve, reject)
    } catch (error) {
        reject(error)
    }
}
Promise.prototype.then = function (onFulfilled, onReject) {
    const self = this;

    return new Promise((resolve, reject) => {
        let fulfilled = () => {
            try {
                const result = onFulfilled(self.value);
                return result instanceof Promise ? result.then(resolve, reject) : resolve(result)
            } catch (error) {
                reject(error)
            }
        }
        let rejected = () => {
            try {
                const result = onReject(self.value);
                return result instanceof Promise ? result.then(resolve, reject) : reject(result)
            } catch (error) {
                reject(error)
            }
        }

        switch(self.state) {
            case 'pending':
                self.resolvedCallbacks.push(fulfilled)
                self.rejectedCallbacks.push(rejected);
                break;
            case 'resolved':
                fulfilled();
                break;
            case 'rejected':
                rejected();
                break;       
        }
    })
}

// Promise.all

function PromiseAll(promises) {
    return new Promise((resolve, reject) => {
        let count = 0;
        let num = promises.length;
        let result = [];

        for(let i = 0; i < num; i++) {
           Promise.resolve(promises[i]).then(value => {
                count++;
                result[i] = value;

                if(count === num) {
                    resolve(result)
                }
           }).catch(err => {
                reject(err)
           }) 
        }
    })
}

// Promise.race

function PromiseRace(promises) {
    return new Promise((resolve, reject) => {
        for(let i = 0; i< promises.length;i++) {
            promises[i].then(resolve, reject)
        }
    })
}

// 防抖 & 节流
 
function debounce(fn, wait) {
    let timer = null;

    return function() {
        const args = arguments;
        if(timer) clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait)
    }
}

function throttle1(fn, wait) {
    let curr = Date.now();

    return function() {
        let args = arguments,
        now = Data.now();

        if(now - curr >= wait) {
            curr = Date.now();
            fn.apply(this, args);
        }
    }
}
function throttle2(fn, wait) {
    let timer = null;

    return function() {
        let args = arguments;
        if(!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null
            }, wait)
        }
    }
}

// call apply bind

Function.prototype.myCall = function(context) {
    let args = [...arguments].slice(1),
    result = null;

    context = context || window;
    context.fn = this;
    
    result = context.fn(...args);

    delete context.fn;

    return result;

}

Function.prototype.myApply = function(context) {
    let result = null;

    context = context || window;
    context.fn = this;

    if(arguments[1]) {
        result = context.fn(...arguments[1]);
    }else{
        result = context.fn();
    }

    delete context.fn;

    return result;
}

Function.prototype.myBind = function(context) {
    let args = [...arguments].slice(1),
    fn = this;

    return function Fn() {
        return fn.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments)
        )
    }
}

// curry

function curry(fn, ...args) {
    return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args)
}