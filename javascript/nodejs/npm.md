# npm
- nrm切换源
```
npm install -g nrm

nrm ls

nrm use taobao

```

## npm切换源
```
- 官方npm config set registry https://registry.npm.taobao.org

npm config set registry https://registry.npmjs.org/

- 淘宝镜像
npm config set registry https://registry.npm.taobao.org


```

## npm命令
```
# 单独安装npm
wget -O  -https://npmjs.com/install.sh | bash


# 升级 npm 版本
sudo npm install -g npm@next


# 安装 卸载包
npm install  # 安装
npm uninstall  # 卸载

```
- Chromedriver 下载不下来
```
npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver

```
- node-sass 下载不下来
```
npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

```

## npm jenkins 部署 权限报错 尝试
```
npm install --unsafe-perm=true --allow-root


```

## npm -d -s -g 的区别
```
npm install module_name -S    即    npm install module_name --save    写入dependencies

npm install module_name -D    即    npm install module_name --save-dev 写入devDependencies

npm install module_name -g 全局安装(命令行使用)

npm install module_name 本地安装(将安装包放在 ./node_modules 下)
