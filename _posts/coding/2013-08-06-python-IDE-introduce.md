---
layout: post
title: pythonIDE使用心得
category: coding
tagline: 
tags: [python]
---

{% include JB/setup %}

## IDLE(python GUI)
这个是在安装python时就会自动安装好，只是一个增强型的交互命令解释窗口。用于验证简短程序还是不错的。平常用用还是不错的，麻烦的就是写比较复杂点的程序就不咋样了。这个IDLE对python的格式会进行标注，如果你的换行很乱的话

## cmd.exe(windows用户)
将python的安装路径加入到环境变量中，键入`python`就可以使用这个也只是python的交互式shell了。
对于轻微键盘控，能省掉操作鼠标就省掉吧。
如果刚好使用Linux，连windows下的`WIN + R`也省了。

## Editplus
设置python运行环境，在tools-->Configure User Tools添加如下内容就可以使用快捷键运行python程序了。奈何此软件不免费。

![editplus配置][editplus配置]

## sublime text 2(跨平台)
很喜欢的一个编辑器，各种插件，各种强大...但，不是免费的，还挺贵的。现在还用的UNREGISTERED版本。这不刚好来了个提示信息

![sublime 提示][sublime 提示]

sublime只要将python的安装路径加入到环境变量中，使用`Ctrl + B`就可以运行python程序了。
顺便提下一些sublime的不错的第三方包:
### Package Control: 
第三方包的管理工具，比较像ruby的gem，python的easy_install。安装方法：ctrl+\` ，复制下面命令到控制台

    import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()); print('Please restart Sublime Text to finish installation')

  然后就可以`Ctrl + Shift + P` 来管理包了。

### Emmet:
`Ctrl + Alt + Enter` 来快速生成html标签
 如：(html>title)>(body>div#first.one)生成如下html

    &lt;html&gt;<br />
      &lt;title&gt;&lt;/title&gt;<br />
    &lt;/html&gt;<br />
    &lt;body&gt;<br />
      &lt;div id="first" class="one"&gt;&lt;/div&gt;<br />
    &lt;/body&gt;<br />

### GBK Encoding Support: 这个是为了对GBK编码的支持
### PyV8: 学python的都知道，最近更新了
### Theme - Soda: 这个主题不错，sublime 还是可以换主题的
### Markdown Preview：在浏览器中可以浏览自己写的markdown文件
### MarkdownEditing: sumblime对markdown的支持

还有其他什么文件搜索，批量替换的快捷操作等等。感兴趣Google之

## Eclipse + PyDev(跨平台)
Eclipse安装PyDev插件的方法很多。为了便于管理eclipse插件，可以使用dropins方式去添加插件；当然，也可以Help-->Install New Software--> `http://pydev.org/updates/`，然后Next，Next，Finish。OK
### 在 Eclipse 中使用 Python 的交互式 shell
还是为了方便。在做项目时，可以直接在Eclipse的控制台调试一段代码，而不用再打开一些交互式窗口了。
Run-->External Tools-->External Tools Configurations在列表中选择Program，右键New一个。然后填入Name，选择Location，Working Directory，Arguments填入-i。Run or Run-->External Tools-->pythonInterpreter。Eclipse Console就可以输入Python命令并执行。

![eclipse配置][eclipse配置]

这个也要将python的安装路径添加到系统的环境变量中去。
这样就配置了一个很好用的python IDE:

 * 包含 Python 语法高亮显示特性。
 * 进行 Python 语法分析，并在 Python 编辑器和 Tasks 视图中高亮显示错误。
 * 可将制表符转换为空格的选项
 * Outline 视图显示导入的库、类以及函数。
 * 终端视图中的 Python 堆栈跟踪信息可超链接到源代码中。
 * 源代码内部的超链接；同一个模版内的倒入和函数调用可以通过超链接进行导航
 * 从 Navigator 视图中运行 Python 脚本的能力。
 * 调试器支持断点、代码单步执行以及显示变量的值。



[sublime 提示]: http://farm6.staticflickr.com/5488/9452266932_d2e22b7583.jpg "sublime 提示"
[eclipse配置]: http://farm8.staticflickr.com/7315/9449482691_443ae360c9.jpg "eclipse配置"
[editplus配置]: http://farm3.staticflickr.com/2866/9452266988_dcbb9860b4.jpg "editplus配置"
