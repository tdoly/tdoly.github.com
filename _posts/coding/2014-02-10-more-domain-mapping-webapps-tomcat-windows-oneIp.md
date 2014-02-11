---
layout: post
title: 在本地环境为同一IP使用多个domain对应不同的项目
category: coding
description: 测试环境：windows 7，tomcat-6.0.37
tags: [ip, tomcat, domain]
---

还是为了测试顶级域和www域下的cookies。所以需要在本地为项目配置域名。

## No.1修改hosts文件

文件地址：%SystemRoot%\system32\drivers\etc\hosts
添加对应关系

{% highlight xml linenos %}
{% raw %}
192.168.101.88 localhost
192.168.101.88 tdoly.com
192.168.101.88 www.tdoly.com
{% endraw %}
{% endhighlight %}

然后ping命令检查hosts是否生效。

## No.2在Tomcat上设置多个Virtual Host

文件位置：`%CATALINA_HOME%\conf\server.xml`

将Connector标签的8080端口修改为80端口。80为HTTP的默认端口，测试时可以省去输入端口的步骤。

在Engine标签下增加Host:

{% highlight xml linenos %}
{% raw %}
<Host name="www.tdoly.com" appBase="webapps" unpackWARs="true" autoDeploy="true" xmlValidation="false" xmlNamespaceAware="false"></Host>
<Host name="tdoly.com" appBase="webapps" unpackWARs="true" autoDeploy="true" xmlValidation="false" xmlNamespaceAware="false"></Host>
{% endraw %}
{% endhighlight %}

在webapps下有2个模块，wap和web。
其中appBase可以是相對於`%CATALINA_HOME%`的相對路徑或是絕對的系統路徑都可以。

## No.3启动测试

启动Tomcat，输入www.tdoly.com和tdoly.com就会看到`$CATALINA_HOME/webapps/ROOT/index.html`这个欢迎页面了。然后就可以用来测试模块了。

## No.4直接用域名来访问项目

虽然这样也可以测试了，但是却需要输入模块名。所以还需要将模块名去掉，这里就需要Context标签了。

{% highlight xml linenos %}
{% raw %}
<Host name="www.tdoly.com" appBase="webapps2" unpackWARs="true" autoDeploy="true" xmlValidation="false" xmlNamespaceAware="false">
    <Context path="" docBase="$ProjectName" workDir="$ProjectName" reloadable="true"/>
</Host>

<Host name="tdoly.com" appBase="webapps" unpackWARs="true" autoDeploy="true" xmlValidation="false" xmlNamespaceAware="false">
    <Context path="" docBase="$ProjectName" workDir="$ProjectName" reloadable="true"/>
</Host>
{% endraw %}
{% endhighlight %}

这样就可以直接根据域名来访问web项目了。（如果在一个Host下有多个Context的存在时，就需要为Context的path指定访问名了）

## No.5 为一个域下指定多个项目模块

其中Valve用来记录访问日志。

{% highlight xml linenos %}
{% raw %}
<Host appBase="webapps" autoDeploy="true" name="www.tdoly.com" unpackWARs="true" xmlNamespaceAware="false" xmlValidation="false">

    <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log." suffix=".txt" pattern="common" resolveHosts="false"/>

    <Context docBase="$ProjectOne" path="/one" reloadable="true" />
    <Context docBase="$ProjectTwo" path="/two" reloadable="true" />
</Host>
{% endraw %}
{% endhighlight %}

然后就可以通过

* www.tdoly.com 访问 `$CATALINA_HOME/webapps/ROOT/index.html`
* www.tdoly.com/one 访问 `$ProjectOne`,
* www.tdoly.com/two 访问 `$ProjectTwo`。


[javaworld]: http://www.javaworld.com.tw/jute/post/view?bid=9&id=180191
