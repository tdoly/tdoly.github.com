---
layout: post
title: 使用jsonlib实现java和json互相转换
category: coding
description: 通过jsonlib实现java beans, maps, arrays等与json到互相转换
tags: [java, json]
---

{% include contents.html %}

##介绍
Jsonlib是一个很有用的java库，可以将beans，maps，collections，java arrays,和XML转换为JSON。同样也可以将JSON转换为beans和DynaBeans。


##依赖的包（至少）

* jakarta commons-lang 2.5
* jakarta commons-beanutils 1.8.0
* jakarta commons-collections 3.2.1
* jakarta commons-logging 1.1.1
* ezmorph 1.0.6

##什么是JSON?

* JSON(JavaScript Object Notation)是一种基于文本的轻量级数据交换格式，便于人类和计算机轻松理解和使用。
* JSON作为纯文本的格式，它得以完全独立于语言。
* JSON是自描述的语言
* JSON采取了C语言家族到一些习惯，包括C, C++, C#, Java, JavaScript, Perl, Python...

这些特征使JSON成为一种理想的数据交换语言。reading more information [wiki-json]

##例子

<script src="https://gist.github.com/tdoly/7765405.js"></script>

##另外一个比较好的JSON解析器----jackson
[jackson]特点如下：

* 快（测试比其他Java的JSON解析和数据粘结都要快）
* Streaming (reading, writing)
* 不依赖除了JDK到其他包
* 功能强大（JDK类完整的数据支持，以及Java bean, Collection, Map or Enum），也可以配置
* Open Source (Apache License – or, until 2.1, alternatively LGPL)
* JSON处理器。它提供JSON解析器/ JSON发生器作为基本构建块，并增加了一个功能强大的DataBinder（JSON< - > POJO）和树模型作为可选的附加模块。


[jackson]: http://jackson.codehaus.org/

[wiki-json]: http://zh.wikipedia.org/wiki/JSON
