---
title: Jenkins自动化部署Vue项目前端及后端
date: 2019-09-18 21:23:44
categories:
- Jenkins
- Vue项目部署
tags:
- Jenkins
---
##### 安装 

操作系统 ubuntu 18

- java安装

```shell
sudo add-apt-repository ppa:openjdk-r/ppa
# 需要回车一下
sudo apt-get update
echo y|sudo apt-get install openjdk-8-jdk

```
<!--more-->
- Jenkins 安装（这里安装的是服务版本的，可以选择安装docker版本，但是docker版本使用pipline时，用shell语言传输项目包会遇到很多权限等问题）

```shell
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
echo y|sudo apt-get install jenkins
```

- 安装完毕，相关启动命令，及目录：

```shell
sudo service jenkins start|stop|restart

/var/lib/jenkins # jenkins 内容目录 workspace
/var/lib/jenkins/.m2 # maven包放置目录

/etc/default/jenkins # jenkins 配置文件 修改端口

/usr/share/jenkins # jenkins war包放置目录
```

- 修改jenkins启动端口
  1. 修改/etc/init.d/jenkins jenkins开机启动脚本，修改do_start函数的check_tcp_port命令，端口号从8080换成8082
  2. 修改/etc/default/jenkins 文件，修改：HTTP_PORT=8082

- 设置jenkins
  1. 此时打开对应端口网站：ip：8082，初始化时要求输入密码，密码为：/var/lib/jenkins/secrets/initialAdminPassword
  2. 使用推荐配置，等待安装插件完毕
  3. 设置用户，进入首页，tips:如果首页进入空白，则输入网址跳转到：ip:8082/pluginManager/advanced,修改：升级站点内容，的https->http,然后重启jenkins即可

- 插件安装，本文安装了 blue ocean, nodejs, publish over ssh 三个插件，如果要部署maven项目可以安装maven插件
  1. blue ocean：可视化构建流程
  2. nodejs： 编译nodejs 项目
  3. publish over ssh： 编译完成后，传输到目标服务器

- github配置

  1. github setting->developer settings->personal access tokens,新建一个access token

  2. jenkins 系统管理，添加github服务器

     ![image7ff5ffe40ec7192a.png](https://chevereto.zhuangzexin.top/images/2019/09/18/image7ff5ffe40ec7192a.png)

     密钥添加类型为 secret key，secret为上一步骤的access token

     ![image81f44369e7a63f9a.png](https://chevereto.zhuangzexin.top/images/2019/09/18/image81f44369e7a63f9a.png)

  3. 设置github hook,找到对应的项目，setting->webhoosks->add webhook,之后接可以在每次提交代码后，github通知jenkins自动拉取代码，并自动构建

     ![imagee67a2b274f6055f2.png](https://chevereto.zhuangzexin.top/images/2019/09/18/imagee67a2b274f6055f2.png)

##### 开始使用

- 新建任任务，构建一个自由风格的软件项目

  ![image14d3545f64cd9572.png](https://chevereto.zhuangzexin.top/images/2019/09/18/image14d3545f64cd9572.png)

  

- 进入页面，源码管理，选git ，输入仓库地址，并添加密钥，密钥类型选择username and password即可

  ![image1eadbd538c50d3ae.png](https://chevereto.zhuangzexin.top/images/2019/09/18/image1eadbd538c50d3ae.png)

- 配置构建触发，和构建环境。这里构建的是vue项目，所以选择了node环境（需要安装nodejs插件）。

  ![image106ce49d5c9702c8.png](https://chevereto.zhuangzexin.top/images/2019/09/18/image106ce49d5c9702c8.png)

- 构建步骤，选择执行shell 及send file or excute commands over ssh。第一步为通过插件构建项目，并打包。第二步为传输到目标服务器，ssh server可以通过系统管理中添加ssh server实现。这边时传输到windows 服务器，windows服务器开启sftp传输需要依赖第三方软件，本文用的是powershell server 2016，[具体使用方法参考](https://blog.csdn.net/achenyuan/article/details/81181347)

  ![imageaa96d92508b6a834.png](https://chevereto.zhuangzexin.top/images/2019/09/18/imageaa96d92508b6a834.png)

![image5ba97e4a59dbf7cf.png](https://chevereto.zhuangzexin.top/images/2019/09/18/image5ba97e4a59dbf7cf.png)

- 保存即可，此时如果本地提交代码，jenkins就可以自动拉取到代码，并自动打包传输到目标服务器。

- Pipeline使用，pipeline为自定义脚本控制部署流程，[具体参考官网](https://jenkins.io/zh/doc/)，需要在项目根目录下新建Jenkinsfile文件，示例如下：

  ```shell
  pipeline {
      agent any
      stages {
          stage('Test') {
                  steps {
                      echo 'test'
                      sh 'mvn -version'
                  }
           }
           stage('Build') {
                   steps {
                      sh 'mvn -B -DskipTests clean package'
                   }
           }
           stage('deliver') {
                        steps {
                           sh './jenkins/test.sh'
                              }
                    }
      }
  }
  ```

  可以自定义配置步骤，并调用脚本。

  jenkins配置示例：

  ![image404a5bc7631b92ae.png](https://chevereto.zhuangzexin.top/images/2019/09/18/image404a5bc7631b92ae.png)

  可以通过流水线语法，来生成pipeline代码。

##### 附：

- Windows 下操作脚本

  ```powershell
  ::从sftproot里拷贝传输的压缩包 至temp文件夹（覆盖）
  copy C:\"Program Files"\nsoftware\"PowerShell Server 2016"\sftproot\front.zip D:\edu\deploy_backup\temp /y
  ::将test环境压缩至备份文件夹
  7z a  D:\edu\deploy_backup\zhxy%Date:~0,4%%Date:~5,2%%Date:~8,2%%Time:~0,2%%Time:~3,2%%Time:~6,2%.zip D:\edu\zhxy_front_test\**
  :: 删除test环境文件夹下内容
  rmdir /s/q D:\edu\zhxy_front_test\static
  del D:\edu\zhxy_front_test\static\index.html
  
  ::解压temp文件，解压后有dist目录
  7z x D:\edu\deploy_backup\temp\front.zip -oD:\edu\deploy_backup\temp
  
  :: 拷贝dist文件夹下所有内容到测试环境
  xcopy D:\edu\deploy_backup\temp\dist D:\edu\zhxy_front_test /e /y
  
  :: 删除dist文件夹
  rmdir /s/q D:\edu\deploy_backup\temp\dist
  :: 删除传输过来的打包文件
  del  C:\"Program Files"\nsoftware\"PowerShell Server 2016"\sftproot\front.zip
  ```

  

- Linux shell 脚本

  ```shell
  #!/usr/bin/env bash
  # 部署到docker
  PROJECT=generator
  WAR=$WORKSPACE/target/$PROJECT-0.0.1-SNAPSHOT.war
  
  echo "待发布的 war 包：filepath=$WAR"
  
  
  rm -rf /home/docker/tomcat/webapps/$PROJECT
  
  
  unzip $WAR -d /home/docker/tomcat/webapps/$PROJECT
  
  docker container restart tomcattest
  ```

  ```shell
  #!/bin/sh
  # 远程部署,需要配置ssh免密登录
  # author: zhuang1994@foxmail.com
  # description: 自动部署war包到指定的内网docker服务器
  # 1. mvn编译打包(jenkins完成)
  # 2. scp到目标内网服务器, 并解压到指定目录
  # 3. 重启docker tomcat容器
  
  
  # 1
  PROJECT=generator
  HOST=192.168.0.1
  WAR=$WORKSPACE/target/$PROJECT-0.0.1-SNAPSHOT.war
  
  if [ ! -f "$WAR" ]; then
      echo "待发布的 war 包不存在：filepath=$WAR"
      exit 1
  fi
  echo "...............path:$WAR"
  echo "...............host:$HOST"
  # 3 scp war files
  echo "...............scp:$WAR root@$HOST:/tmp"
  scp $WAR root@$HOST:/tmp
  echo ".................... scp war files: $WORKSPACE/target/$PROJECT-0.0.1-SNAPSHOT.war "
  
  # 4.docker container restart
  ssh -tt root@$HOST <<EOF
      docker container stop tomcattest
  
      rm -rf /home/docker/tomcat/webapps/$PROJECT
  
      unzip /tmp/$PROJECT-0.0.1-SNAPSHOT.war -d /home/docker/tomcat/webapps/$PROJECT
  
      docker container start tomcattest
  
      exit
  EOF
  
  echo ".................... docker container restart tomcattest "
  ```

  - 参考

    [Widows 服务器里实现通过ssh工具SecureCRT](https://blog.csdn.net/achenyuan/article/details/81166526)

    [实战：向GitHub提交代码时触发Jenkins自动构建](http://www.uml.org.cn/pzgl/201808281.asp)

    [在 ubuntu 中愉快的安装 Jenkins](https://juejin.im/post/5b6329c2e51d4519044ab85f)

    [实战：向GitHub提交代码时触发Jenkins自动构建](https://blog.csdn.net/boling_cavalry/article/details/78943061)
