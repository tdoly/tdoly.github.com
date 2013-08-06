---
layout: post
category: coding
title: blog中图片的存放
tagline: 结合flickr的使用
tags: [python]
---

##Blog的图片
github提供的免费空间非常的有限，但是流量却是无限制的。所以提倡节约的美德，只好将图片转存到其它地方了。
Flickr这个大家都知道的，免费1TB的存储空间。不用用太对不起自己了。^-^
虽然有了放置图片的地方，获取图片路径又是个麻烦事。所以写了个脚本爬爬网站生成 `[***]： URL "***"` Markdow格式的图片引用文本还是不错的。
当然这个能运行的程序都是建立在正确的步骤产生的数据之上的。
 * 进入flickr，上传图片（注册账号之类的就不表了）
 * 以自然月建立相片集（这个月是8月，则是2013-08）
 * 以yyyy-mm-dd为图片ALT，为了方便获取到相同alt图片的URL （见下图）
 * yyyy-mm-dd : TEXT 为图片描述，方便获取“:”(英文逗号)后的文本

登录flickr之后，从Photostream-->编辑，可以编辑图片的alt属性，描述文本。

![flickr介绍][flickr介绍]

为了不必要的工作量，可以在上传图片的时候就编辑好alt属性和描述文本及选择相片集，可以减少很多修改的工作。

![上传图片](http://farm4.staticflickr.com/3713/9441890681_a1e76a3b82.jpg)

相片集只是为了给图片做个分类存储，便于浏览，以免杂乱无章。

![相片集][相片集]

##程序(python)
通过定义自己的flicker的URL,ALT,TEXT获取图片链接和描述文字

    # -*- coding: utf-8 -*-
    """
    get my flicker image url use to Markdown text
    """

    __author__ = "mingdong.li"
    __date__ = '$2013-08-01'
    __version__ = '1.0'

    import urllib2
    import re
    import sys
    from bs4 import BeautifulSoup

    """定义自己的URL,ALT和TEXT"""
    URL = 'http://www.flickr.com/photos/96090901@N04/?details=1'
    ALT = '2013-08-06'
    TEXT = '2013-08-06:'

    class ImageAndTextValueException(Exception):
        """A define exception class"""
        def __init__(self, text, image, text_len, image_len):
            Exception.__init__(self)
            self.text = text
            self.image = image
            self.text_len = text_len
            self.image_len = image_len

    def getHtmlText(url):
        """return the image_url html chunk"""
        text = urllib2.urlopen(url)
        chunk = text.read()
        return chunk

    def parseChunk(chunk):
        """use BeautifulSoup parse the image url and detail"""
        soup = BeautifulSoup(chunk)
        text = soup.find_all(text=re.compile(TEXT))
        img = soup.find_all(alt=ALT)
        try:
            if (len(text) < 1 or len(img) < 1) or (len(text) != len(img)):
                raise ImageAndTextValueException(text, img, len(text), len(img))
        except ImageAndTextValueException, e:
            print "The image URL value is  %s and detail text is %s.\n \
                The len(image) is %d and len(text) is %d.\n \
                Please check the step is right?" % (e.image, e.text, e.image_len, e.text_len)
            sys.exit() # exit the program
        return (img, text)


    if __name__ == '__main__':
        chunk = getHtmlText(URL)
        content = parseChunk(chunk)

        imgs = content[0]
        texts = content[1]
        imgs_list = []
        texts_list = []

        if len(imgs) > 1:
            for img in imgs:
                img_url = re.findall(r'[a-zA-z]+://[^\s]*.jpg', str(img))
                img_split = unicode(img_url[0]).split('_m.')
                imgs_list.append("".join(img_split).join('.').join(img_split))
        if len(texts) > 1:
            for text in texts:
                text_split = unicode(text).split(':')
                texts_list.append(text_split[1])

        #combination imgs_list and texts_list
        if len(imgs_list) == len(texts_list):
            cls=map(lambda name, url, alt: "[%s]: %s \"%s\"" % (name, url, alt), texts_list, imgs_list, texts_list)
            print cls
            for ls in cls:
                print ls.encode('utf-8')
        else:
            print "Please check the step is right?"


[flickr介绍]: http://farm4.staticflickr.com/3690/9444632396_ce292439f9.jpg "flickr介绍"
[上传图片]: http://farm4.staticflickr.com/3713/9441890681_a1e76a3b82.jpg "上传图片"
[相片集]: http://farm3.staticflickr.com/2842/9444652780_292192a42c.jpg "相片集"
