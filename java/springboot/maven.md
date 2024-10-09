## spring-boot-starter-parent
- 此为SpringBoot核心，提供多种依赖，例如tomcat，thymeleaf等
- 启动对应依赖需要启动对应starter，例如tomcat依赖于spring-boot-starter-web
## 排除依赖
- 如spring-boot-starter-web默认集成了tomcat，当要换成jetty时，可以在pom.xml中spring-boot-starter-web下排除tomcat依赖，然后手动引入jetty依赖：
```
<dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcat</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jetty</artifactId>
    </dependency>
```
## spring-boot-maven-plugin 功能
1. 把项目打包成一个可执行的超级JAR（uber-JAR）,包括把应用程序的所有依赖打入JAR文件内，并为JAR添加一个描述文件，其中的内容能让你用java -jar来运行应用程序。
2. 搜索public static void main()方法来标记为可运行类。
