---
layout: post
title: python修改元组中列表元素的问题
category: coding
description: 昨天在PyCon2013大会上，邹义鹏演讲的《Python 隐藏的玄机》中提到了一个很有趣的问题，学习之
tags: [python]
---

##展示问题

在python 2.7版本中，修改一个元组中的列表，得到了错误提示，而值却更改成功。

##具体操作

程序1：

{% highlight python linenos %}
{% raw %}
>>> a = ([],[])
>>> id(a)
140551915278776
>>> a[0].append(1)
>>> a
([1], [])
>>> id(a)
140551915278776
>>> a[0] += [2]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
>>> a
([1, 2], [])
>>> id(a)
140551915278776
{% endraw %}
{% endhighlight %}

我们知道tuple是不可变的，当这样操作：

程序2：

{% highlight python linenos %}
{% raw %}
>>> a = (1, 2)
>>> a
(1, 2)
>>> a[0] = 10
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
>>> a
(1, 2)
{% endraw %}
{% endhighlight %}

会得到一个TypeError的错误，而值是不会改变的。但是在程序1的操作中，使用list的“append”方法可以得到正确的结果，使用“+=”虽然内存地址没有改变，但是得到了错误提示，更加奇怪的是值却成功的修改了。这是怎么一回事？

##原理分析

"+="属于in-place操作，所以

    a[0] += [2]

等效于

    a[0].extend([2]) #(1)
    a[0] = a[0] #(2)

在执行步骤(1)时，没有出错，值已经被更改；执行步骤(2)时，因为'a'是一个tuple，所以这个时候提示了错误信息。最后到结果就出现了程序一呈现到情况。

##本质分析

从原理上已经说的通了，现在看看程序内部都发生了什么事情

{% highlight python linenos %}
{% raw %}
>>> dis.dis(compile('a[0] += [2]', '<string>', 'exec'))
  1           0 LOAD_NAME                0 (a)
              3 LOAD_CONST               0 (0)
              6 DUP_TOPX                 2
            ## 在堆中生成a[0]
              9 BINARY_SUBSCR       
             10 LOAD_CONST               1 (2)
             13 BUILD_LIST               1
            ## 运行+=
             16 INPLACE_ADD         
             17 ROT_THREE           
            ## a[0]赋值一个新值（出错）
             18 STORE_SUBSCR        
             19 LOAD_CONST               2 (None)
             22 RETURN_VALUE        
>>> 
{% endraw %}
{% endhighlight %}

从dis的分析中可以看到，在堆栈中生成一个列表并成功地扩展。在执行STORE_SUBSCR会调用C函数的PyObject_SetItem，检测对象是否支持这个元素。这种情况下的对象是一个元组，So...

##参考资料

* [python bugs list][1]
* [stackoverflow 1][2]
* [stackoverflow 2][3]
* [a blog][4]

[1]: http://bugs.python.org/issue11562
[2]: http://stackoverflow.com/questions/10397121/why-does-of-a-list-within-a-python-tuple-raise-typeerror-but-modify-the-list
[3]: http://stackoverflow.com/questions/20583527/modifying-a-list-on-a-tuple-i-get-a-type-error-but-the-tuple-value-is-changed
[4]: http://emptysqua.re/blog/python-increment-is-weird-part-ii/
