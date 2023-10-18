### 功能点梳理
1、编辑器

- 一般分为上下结构，上面为操作区，下面分为左中右，分别为组件区、画布区和属性设置区。
- 左侧左键拖拽到右侧，画布区会维护一个组件数组。直接遍历循环生成组件，组件结构如下，vue可以通过动态组件根据type来渲染。组件需要提前注册好
```js
{
    type: 'button',
    icon: 'icon-btn',
    label: '按钮',
    props: {
        ...
    },
    style: {

    },
    events: { // 事件

    },
    animations: { // 动画

    }
}
```
2、拖拽

- 组件拖拽到画布使用h5的drag api，使用dataTransfer.setData传递数据
- 画布中组件拖拽是通过绝对定位来实现。通过计算鼠标移动位置来计算组件的位置。

3、删除、调整图层层级
- 删除直接删除选中数据即可
- 调整层级是通过设置z-index来实现

4、放大缩小
- 通过一个hoc包裹组件，这个hoc上有八个点
- 通过拖拽点计算位置变化，相应的调整组件的大小

5、撤销重做
- 可以维护三个数组 past、present、future
- 撤销把past的末尾数据添加到present，present添加到future的头
- 重做则是把future的头添加为present，present的数据添加的past的尾部
- 注意撤销的时候，如果执行添加数据的操作，要把future的数组清空

6、吸附
- 为组件添加横向和纵向分别三条标线, 对齐显示标线
```
// 左对齐
a.x === b.x
// 右对齐
a.x + a.width === b.x + b.width
```
- 两个组件距离太近例如diff = 3时，设置坐标即可

7、组件属性设置
- 遍历组件style或者props在属性显示区显示即可

8、预览和保存

- 预览其实就是去掉最外层的hoc包裹组件即可，就可以达到预览的效果
- 保存数据保存componentData到服务器即可

9、复制粘贴和右键操作
10、数据交互
- 对于一些需要配置数据源的地方，提前设置好请求url，根据配置的参数在组件挂载的时候请求数据
11、发布
- 需要一个最小的运行时，可以通过页面pageId来获取保存的json，最终通过json渲染组件数据。
12、动态属性面板
- 在每个自定义组件目录下包括组件和属性组件，通过不同的组件动态渲染相应的属性组件
13、组件联动
- 不同组件之间可以设置绑定关系也就是id
- 通过事件发布订阅来实现触发事件和绑定事件
14、组件按需加载
- 所有的自定义组件抽离出来，单独存放。可以使用monorepo
- 每个组件单独打包为bundle.js，可以上传服务器或者npm
- 动态加载组件通过`<script>` 或者 `import()`
```
// 第二种
const name = 'v-text' // 组件名称
const component = await import('https://xxx.xxx/bundile.js')
Vue.component(name, component)
```

```
// 第一种
function loadjs(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        script.onload = resolve
        script.onerror = reject
    })
}

const name = 'v-text' // 组件名称
await loadjs('https://xxx.xxx/bundile.js')
// 这种方式加载组件，会直接将组件挂载在全局变量 window 下，所以 window[name] 取值后就是组件
Vue.component(name, window[name])
```
15、画布区另外的实现方式
- 画布区为了更好的解耦可以使用iframe加载一个页面，单独渲染组件数据
- 但是会增加通信的成本，例如跨iframe拖拽。这个可以实现一个假iframe（空div）, 拖拽的时候显示假的，drop的时候同步数据到iframe
- 和iframe的通信可以使用postMessage进行通信。