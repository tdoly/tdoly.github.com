---
layout: post
title: 不使用任何数字打印出2014迎新年
category: coding
description: 晚上在CpyUG上看到一封邮件“如何不用任何int打印2014”感觉挺有意思的
tags: [python]
---

##描述
2013年过去了，迎来了2014年————马年。
邮件列表也挺热闹的，看到一个主题“如何不用任何int打印2014”,意思就是不要用数字来打印出2014，顺便迎新年。^-^

##方法一

使用到来sum,map,ord等内置函数

{% highlight python linenos %}
{% raw %}
>>>print (sum(map(ord, 'Happy new year to you!')))
2014
{% endraw %}
{% endhighlight %}

* ord()

给定一个长度为1的字符，返回一个整数值所代表的Unicode代码的字符（例如：'a', ord('a')=97，'A', ord('A')=65）。当参数是一个8-bit的字符时，（例如：ord(u'\u2020')得到8224）

* map()

map(func, seq1[, seq2…])详见[map][map]
将函数 func 作用于给定序列（s)的每个元素，并用一个列表来提供返回值；如果 func 为 None， func 表现为一个身份函数，返回一个含有每个序列中元素集合的 n 个元组的列表.So:


{% highlight python linenos %}
{% raw %}
>>>map(ord, 'Happy new year to you!')
[72, 97, 112, 112, 121, 32, 110, 101, 119, 32, 121, 101, 97, 114, 32, 116, 111, 32, 121, 111, 117, 33]
{% endraw %}
{% endhighlight %}

* sum()

最后的求和
{% highlight python linenos %}
{% raw %}
>>>ls = [72, 97, 112, 112, 121, 32, 110, 101, 119, 32, 121, 101, 97, 114, 32, 116, 111, 32, 121, 111, 117, 33]
>>>sum(ls)
2014
{% endraw %}
{% endhighlight %}
刚好是2014。

##方法二

{% highlight python linenos %}
{% raw %}
>>>(__<<__)-(__<<_)-_
2013
{% endraw %}
{% endhighlight %}

_和__在python中的值是2,和8；所以`__<<__`便是2048。
最后这个式子就是2048-32-2=2014。

耶！


##参考资料

* [python ord][ord]

[ord]: http://docs.python.org/2/library/functions.html#ord
[map]: {{ url }}/coding/python-lambda-filter-map-reduce/#mapfunc-seq1-seq2
