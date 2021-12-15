## yarn
- yarn 与 npm 命令

[![image.png](https://chevereto.zhuangzexin.top/images/2021/07/27/image.png)](https://chevereto.zhuangzexin.top/image/fFos)
- yarn 安装
```bash
npm install yarn@latest -g

```

## yrm 切换源
```bash
npm install -g yrm

# 源列表
yrm ls
    npm -----  https://registry.npmjs.org/
    cnpm ----  http://r.cnpmjs.org/
    taobao --  https://registry.npm.taobao.org/
    nj ------  https://registry.nodejitsu.com/
    rednpm -- http://registry.mirror.cqupt.edu.cn
    skimdb -- https://skimdb.npmjs.com/registry
    yarn ----  https://registry.yarnpkg.com
    
# 使用源
yrm use taobao
```