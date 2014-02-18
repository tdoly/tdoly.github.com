---
layout: post
title: 使用spring+ibatis的raw sql语句的自助查询
category: coding
description: 记录下碰到和解决的问题
tags: [ip, tomcat, domain]
---

经常有产品需要查询数据的需求，所以就需要做一个可以自助查询sql的后台，并导出csv数据。

##问题一：java.sql.SQLException: 列名无效

这个是因`select`标签中有一个属性`remapResults`，默认为false。这样记录上一次查询结果的元数据（metadata），可以避免经常的对返回的结果进行内省的开销。这对于查询列不变的sql非常高效。所以，在不定列的sql查询，需要将`remapResults`设置为true。这样在每次查询的时候，ibatis都会内省查询结果来设置元数据。
现在就可以设置resultClass，通过输入的raw sql来返回xml结果了。

##解析xml文件为csv友好数据
ibati查询sql返回的xml文件中，如果有列为空，那么xml文件中就不存在列名了。所以需要在sql中使用`ISNULL(column, default)`为空列(column)指定默认值(default)。

<script src="https://gist.github.com/tdoly/8144372.js"></script>

##限制sql中危险字符及数据库的权限

<script src="https://gist.github.com/tdoly/8348219.js"></script>

