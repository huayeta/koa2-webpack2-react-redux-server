# **marriage**

keywords: koa2,react,redux



## Getting Start in dev mode

```
npm install # 国内可以使用 cnpm 加速, 教育网可使用 rednpm (https://npm.mirror.cqupt.edu.cn)加速
npm start  # dev mode
```

open in browser

http://127.0.0.1:3000/

## Deploy

```bash
npm test # pass unit tests
npm run build # build to dist
npm run production # or pm2 start
```

## 目录结构

```bash
.
├── app
│   ├── actions
│   ├── common
│   ├── components
│   ├── containers
│   │   └── App.jsx             # React App
│   ├── reducers
│   ├── routes.js               # 路由配置文件
│   └── store
│       └── configureStore.js
├── bin
│   ├── development.js
│   └── production.js
├── package.json
├── platforms
│   ├── browser                 # 浏览器相关
│   │   └── index.js            # 浏览器 APP 入口
│   ├── common
│   │   └── config              # 配置
│   │       ├── default.js
│   │       └── index.js
│   └── server                  # 服务端相关
│       ├── controllers
│       │   ├── indexCtrl.js
│       │   ├── serverRenderCtrl.js
│       │   └── usersCtrl.js
│       ├── index.js            # 服务端入口
│       ├── middlewareRegister.js
│       ├── models
│       ├── routes              # 服务端路由
│       │   ├── api.js
│       │   ├── index.js
│       │   └── render.js
│       ├── services
│       └── templates           # 服务端模板
│           ├── 404.ejs
│           ├── 422.ejs
│           ├── 500.ejs
│           └── index.ejs
├── pm2.json
├── public                      # public
│   ├── favicon.ico
│   └── robots.txt
├── test
│   └── test.js
├── webpack.build.js
└── webpack.development.js
```



## 同构的优势

1. 首屏性能
2. SEO / 搜索引擎爬虫支持
3. 无缝的用户体验
