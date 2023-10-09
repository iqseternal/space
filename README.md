# space

一款基于 Electron, Elecron-Vite, Vue, TypeScript, Socket, Animate, AntDesignVue, Mousetrap, AutoAnimate, Pako, Pinia 等的应用程序

目前正在搭建整个应用程序的整体框架, 为后面的开发打造基础。

目前秉持着高可用, 高扩展的状态编写的代码。

并不会直接开发业务, 而是先创建 Electron 的模板应用, 因此, 如果你现在正需要一个开发模板的话, 这正好能够符合你的需求, 但是你需要明白, 使用别人的搭建的应用模板你需要付出一定的学习时间

首先, 采用 Electron-Vite, 就拥有一些非常醒目的文件夹名称 main， preload， renderer

code -> 主线程核心代码块，存放的是关于Electron的服务封装，或者是对于主线程与渲染进程交互的handle

globalForNode -> 为主线程挂载一些全局的变量，为了方便项目的书写. 但是嘚注意，非必要不要挂载到global对象上

config -> 关于项目的配置，这个配置是不希望被用户更改的，写一次写好了就行

constant -> 一些常量枚举，比如关于主线程和渲染进程之间交互的事件规定

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```
