### 1. 项目构成

日历清单小程序采用基础的 Taro + React + TypeScript + Less 进行构建，请确保已安装@tarojs/cli，[Taro相关文档](https://taro-docs.jd.com/docs/GETTING-STARTED)。

项目目录结构如下：

```
|-- calendar-todo-list
    |-- README.md
    |-- tsconfig.json
    |-- package.json
    |-- i18next-scanner.config.js
    |-- babel.config.js
    |-- types //  TS类定义
    |-- src
    |   |-- assets	//	图片、音频等静态资源
    |   |-- components	//	公共组件库
    |   |-- constant	//	常量
    |   |-- packageA	//	A 分包
    |   |-- packageB	//	B 分包
    |   |-- pages // 主包页面
    |   |   |-- auth	//	登录相关页面
    |   |   |-- mixHome	//	混合首页
    |   |   |-- collaborationTableList	//	共享日历
    |   |   |-- schedule	//	日程
    |   |   |-- extend	//	我的
    |-- services	//	请求接口
    |-- store	//	redux相关
    |-- utils	//	工具库
```

## :hammer: 构建运行

1. `npm install`
2. `npm start` 或 `npm run build`
3. 开发工具中导入项目下dist