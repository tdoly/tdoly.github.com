---
layout: post
title: 为多个github项目生成Github Pages并指定域名
category: coding
description: 将Project Pages的项目放入名为gh-pages的分支下面,然后为项目指定CNAME即可
tags: [github pages, jekyll]
---

今天为了测试顶级域名，二级域名下cookie的作用域，新建了一个demo仓库。在为仓库指定域名时，没成功。然后查了下GitHub Pages的域名指定，记录下。

## [GitHub Pages][github-pages]介绍

GitHub Pages是为个人、组织和仓库提供的公共页面，免费托管在GitHub的github.io域或者你自己指定的域名下。使用Jekyll驱动，使用的模版语言[Liquid][liquid]。


## GitHub Pages的分类

一种为User and Organization Pages，一种为Project Pages

### User and Organization Pages

个人和组织页面有且仅有一个，它是一个特殊的仓库。这个仓库必须是用帐号名称来命名的。例如：<https://github.com/tdoly/tdoly.github.com>，它的命名形式是`username.github.io`。(也兼容username.github.com，后来这种都Pages都迁移到github.io域上了，最后访问的还是tdoly.github.io)。文件是存在仓库的主分支上的。

### Project Pages

这种项目页面是也就建立多个的，但是不能存放在主分支上，需要建立一个名为`gh-pages`的分支。然后以`username.github.io/project-name/`这种形式来访问Project Pages。例如，我在GitHub下建立了一个`demo.tdoly.com`然后，我就可以通过`tdoly.github.io/demo.tdoly.com`来访问了。

## 指定域名

在项目中新建CNAME文件，写入域名。然后在域名商或者域名解析商添加相关信息。
例如：

* tdoly.github.com 指定了blog.tdoly.com (User Pages)
* demo.tdoly.com 指定了demo.tdoly.com (Porject Pages)

使用dnspod指定如下：
![DNSPOD][dnsimg]

然后就可以通过指定的域名来访问网站了。

## 参考资料
 
 * [github-pages][github-pages]
 * [user-organization-and-project-pages][github-pages2]

[github-pages]: http://jekyllrb.com/docs/github-pages/
[github-pages2]: https://help.github.com/articles/user-organization-and-project-pages
[liquid]: http://wiki.shopify.com/Liquid
[dnsimg]: {{ site.body_image_url }}/dnspot.png
