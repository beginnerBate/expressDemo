# 《node与expres开发》 代码练习和学习

# 创建lib 用来放我们自己的模块 fortune.js

# codeback/ch04 
--工欲善其事，必先利其器 ：git 使用  版本控制

# codeback/ch05 
-- 质量保证: 4个维度：到达率（使用率）功能（）审美() 可用性（） 测试:

> 表示，将是对HTML、CSS、多媒体、JavaScript 和jQuery 之类的前端库的一种结合。

> 网站的逻辑存在于纯粹的认知领域

>本书要讨论的测试主要归为两大类：单元测试和集成测试（我认为“系统测试”属于集成
测试）。单元测试的粒度非常细，是对单个组件进行测试以确保其功能正确，而集成测试
是对多个组件甚至整个系统之间的交互进行测试。
一般而言，单元测试在测试逻辑时更实用，也更恰当（尽管我们在表示域的代码中也会看
到很多使用单元测试的实例）。集成测试则在两个领域中都有用。

```js
  //   1. Mocha 进行页面测试
  //   2. 跨页测试 Zombie.js (不支持windows)  npm install --save-dev zombie
  //   3. 逻辑测试
  //   4. 逻辑测试
  //   5. 去毛 : JSHint
  //   6. 链接检查   : LinkChecker / npm i linkscanner
```
### 2020-04-11 用Grunt实现自动化
[grunt 插件列表](https://gruntjs.com/plugins)

# 问题记录 

1. listen EADDRINUSE: address already in use :::3000
```js
 查看进程 
 杀死进程
 控制台输入sudo lsof -i:端口号，查看被占用进程的pid，再输入sudo kill -9 pid 即可杀死进程。
```
