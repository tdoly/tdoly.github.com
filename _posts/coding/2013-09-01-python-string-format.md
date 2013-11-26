---
layout: post
title: python字符串格式化输出
category: coding
description: python字符串常用到格式化方法总结
tags: [python]
---

{% include contents.html %}

python属于强类型的语言，如果像java一样操作字符串和数字的“+”时，会出现TypeError。而python的格式化方法有多种，比如使用占位符，使用format，或者是自定义模版等等。这里介绍了其中的几种方法

下面这个例子很好的说明了python属于强类型语言：
{% highlight python linenos %}
print "abc" + 123
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: cannot concatenate 'str' and 'int' objects
{% endhighlight %}
所以，需要进行转换输出。


## 常用占位符

<table class="CodeRay">
  <tr>
    <td><strong>符号</strong></td>
    <td><strong>意思</strong></td>
  </tr>
  <tr>
    <td>%s</td>
    <td>字符串</td>
  </tr>
  <tr>
    <td>%d / %i</td>
    <td>十进制整数</td>
  </tr>
  <tr>
    <td>%u</td>
    <td>过时的十进制使用方法</td>
  </tr>
  <tr>
    <td>%o</td>
    <td>八进制整数</td>
  </tr>
  <tr>
    <td>%x / %X</td>
    <td>十六进制整数</td>
  </tr>
  <tr>
    <td>%f / %F</td>
    <td>浮点数</td>
  </tr>
  <tr>
    <td>%e / %E</td>
    <td>科学技术法</td>
  </tr>
  <tr>
    <td>%%</td>
    <td>输出%</td>
  </tr>
</table>

## 使用方式一
直接使用占位符
{% highlight python linenos %}
print '%s+%d' % ('abc', 123) #abc+123
print '%o' % 10 #12 八进制
{% endhighlight %}

为%d指定长度，%05d，如果数字小于5位会在左边补0，大于指定长度时不受此影响
{% highlight python linenos %}
print '%s+%05d' % ('abc', 123) #abc+00123
print '%03x' % 10 #00a
print '%.3e' % 123456789 #1.235e+08 保留3位小数的科学技术法
{% endhighlight %}

## 使用方式二
使用字典
{% highlight python linenos %}
print 'Python is %(args)s, %(args)s, %(args)s beautiful' % {'args': 'very'} #Python is very, very, very beautiful
{% endhighlight %}

当拼接有许多重复元素时，使用这种方式比较好

## 使用方式三
使用format的方式。在2.6之后的版本支持。
{% highlight python linenos %}
print '{0}{1}{2}{3}'.format('a', 'b', 'c', 123) #abc123
print '{}, {}, {}'.format('a', 'b', 'c') #abc 2.7+ only
print '{2}, {1}, {0}'.format('a', 'b', 'c') #c, b, a
print '{2}, {1}, {0}'.format(*'abc') #c, b, a
print '{0}{1}{0}'.format('abra', 'cad') #abracadabra
{% endhighlight %}

通过参数名字格式化
{% highlight python linenos %}
print 'Coordinates: {latitude}, {longitude}'.format(latitude='37.24N', longitude='-115.81W') #Coordinates: 37.24N, -115.81W
coord = {'latitude': '37.24N', 'longitude': '-115.81W'}
print 'Coordinates: {latitude}, {longitude}'.format(**coord) #Coordinates: 37.24N, -115.81W
{% endhighlight %}

使用元组
{% highlight python linenos %}
coord = (3, 5)
print 'X: {0[0]};  Y: {0[1]}'.format(coord) #X: 3;  Y: 5
{% endhighlight %}

进制
{% highlight python linenos %}
# format also supports binary numbers
"int: {0:d};  hex: {0:x};  oct: {0:o};  bin: {0:b}".format(42) #'int: 42;  hex: 2a;  oct: 52;  bin: 101010'

# with 0x, 0o, or 0b as prefix:
"int: {0:d};  hex: {0:#x};  oct: {0:#o};  bin: {0:#b}".format(42) #'int: 42;  hex: 0x2a;  oct: 0o52;  bin: 0b101010'
{% endhighlight %}

为数字加点号
{% highlight python linenos %}
'{:,}'.format(1234567890) #'1,234,567,890'
{% endhighlight %}

百分比表示
{% highlight python linenos %}
'{:.2%}'.format(19.5 / 22) # '88.64%'
{% endhighlight %}

时间格式化
{% highlight python linenos %}
import datetime
today = datetime.datetime.today()
'{:%Y-%m-%d %H:%M:%S}'.format(d) #'2013-09-01 21:10:22'
'{:%Y-%m-%d}'.format(today) #'2013-09-01'
{% endhighlight %}

另外也可以使用strftime来格式化时间

## 使用方式四
自定义模版
{% highlight python linenos %}
from string import Template
s = Template('$sargs plus $aargs')
s.substitute(sargs = 'abc', aargs = 123) #'abc plus 123'
{% endhighlight %}

这里有substitue和safe_substitute两种属性
{% highlight python linenos %}
d = dict(sargs = 'abc')
# s.substitute(d)
# it's a KeyError
s.safe_substitute(d) #'abc plus $aargs'
{% endhighlight %}
如果不使用safe_substitute，参数不全时会出现KeyError异常。

##参考资料

<http://docs.python.org/2/library/string.html>
