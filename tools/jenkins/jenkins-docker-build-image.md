---
title: Jenkins自动化部署docker镜像全过程
date: 2020-03-27 13:55:45
categories:
- Jenkins
- Docker
tags:
- Jenkins
---

##### 系统及软件版本：

- ubuntu 18 LTS
- jenkins 2.176
- docker 18.09.7

##### jenkins 配置及插件

- Docker plugin

- Docker build step 

  *因为墙的原因，jenkins下载插件很慢需要更换国内站点，这里用的清华的jenkins站点。但在插件管理-高级中修改升级站点并不会生效，需要到jenkins配置文件中修改，解决方案如下：*

  ```shell
  # 修改 /var/lib/jenkins/update/default.json 执行
  
  :s/http:\/\/updates.jenkins-ci.org\/download\/plugins/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins\/plugins/g
  
  # 重启即可
  ```

<!--more-->  

##### docker 配置

- 配置阿里云仓库（官方docker hub速度很慢）[阿里云docker容器镜像服务](https://cr.console.aliyun.com/)

##### jenkins部署步骤

1. 新建一个maven项目

2. 配置源码管理，这里使用的github仓库，配置了webhook用于提交代码触发自动构建。

3. maven 构建配置

   ![image.png](https://chevereto.zhuangzexin.top/images/2020/03/27/image.png)

   *这里使用的 docker:build 是maven安装了 docker镜像生成的插件，也可以不安装，那样就需要自己用命令构建镜像*

   *maven docker 插件为:*

   ```xml
     <plugin>
                   <groupId>com.spotify</groupId>
                   <artifactId>docker-maven-plugin</artifactId>
                   <version>0.4.11</version>
                   <configuration>
                       <imageName>${docker.image.prefix}/${project.artifactId}</imageName>
                       <imageTags>
                           <imageTag>${project.version}</imageTag>
                           <imageTag>latest</imageTag>
                       </imageTags>
                       <dockerDirectory>src/main/docker</dockerDirectory>
                       <resources>
                           <resource>
                               <targetPath>/</targetPath>
                               <directory>${project.build.directory}</directory>
                               <include>${project.build.finalName}.jar</include>
                           </resource>
                       </resources>
                   </configuration>
               </plugin>
   ```

   *docker.image.prefix 自己配置 例如配置banksy  project.artifactId 是test，则生成的镜像名为 banksy/test*

   [插件地址](https://github.com/spotify/docker-maven-plugin)

4. 构建镜像并推送到远程仓库

   *使用shell*

   ![image8de90075cf8c6afa.png](https://chevereto.zhuangzexin.top/images/2020/03/27/image8de90075cf8c6afa.png)

   *shell 命令：*

   ```bash
   echo '================开始推送镜像================'
   sudo docker login -u yourusername -p yourpassword  registry.cn-shanghai.aliyuncs.com
   sudo docker tag banksy/test registry.cn-shanghai.aliyuncs.com/myimage:latest
   sudo docker push registry.cn-shanghai.aliyuncs.com/myimage:latest
   echo '================结束推送镜像================'
   ```

   *此处使用shell 会遇到两个坑*

   1. 无法使用sudo，因为jenkins是使用的jenkins用户来执行的shell，因而需要为jenkins配置sudo权限,使用root账户进入 /etc 目录执行

      ```bash
      cd /etc
      visudo
      # 添加如下内容
      # Allow members of group sudo to execute any command
      # 添加内容如下
      jenkins ALL=(ALL) NOPASSWD: ALL
      
      # ctrl+O 写入文件
      ```

      

   2.  [docker login fails on a server with no X11 installed](https://stackoverflow.com/questions/51222996/docker-login-fails-on-a-server-with-no-x11-installed) 执行

      *In a nutshell (from https://github.com/docker/compose/issues/6023)*

      ```bash
      sudo apt install gnupg2 pass 
      gpg2 --full-generate-key
      
      ```

      This generates a you a gpg2 key. After that's done you can list it with

      ```bash
      gpg2 -k
      ```

      Copy the key id (from the line labelled `[uid]`) and do

      ```bash
      pass init "whatever key id you have"
      ```

   *使用docker plugin插件*

   ![image2db23fa7a7e5409c.png](https://chevereto.zhuangzexin.top/images/2020/03/27/image2db23fa7a7e5409c.png)

5. 目标机器上pull仓库并执行

   ![image54284e3a8fcc509a.png](https://chevereto.zhuangzexin.top/images/2020/03/27/image54284e3a8fcc509a.png)

   *bash 命令：*

   ```bash
   #!/usr/bin/env bash
   echo '================开始拉取镜像================'
   docker login -u yourusername -p yourpassword  registry.cn-shanghai.aliyuncs.com
   docker push registry.cn-shanghai.aliyuncs.com/myimage:latest
   
   sudo docker run -d   --name=banksy-test -p 8080:8081 --restart=always registry.cn-shanghai.aliyuncs.com/myimage:latest
   
   echo '================结束远程启动================'
   ```

##### 结束

以上还有优化空间，push完后删除镜像，目标机器先删除老的镜像再构建等。还有可以使用docker plugin的登陆，不然需要在shell使用明文密码，使用明文密码需要安装 **gnupg2 pass** 。
