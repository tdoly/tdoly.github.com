    /**
     * 在页面上产生个gotop按钮。
     * 用纯粹的JS实现，无须额外的CSS和HTML支持。
     *
     * @param int width 网页的主体宽度，以下三种取值
     * - 0 按钮靠浏览器左
     * - -1 按钮靠流利器右
     * - 其它正数 按钮靠网页内容右侧
     * @return void
     */
    function gotoTop(width)
    {
      document.write('<a id="goto-top">^</a>');
      var gotop = document.querySelector('#goto-top');
      /* 默认情况下CSS属性的设置 */
      gotop.style.visibility='hidden';
      gotop.style.cursor='pointer';
      gotop.style.position = 'fixed';
      gotop.style.fontSize='2.5em';
      gotop.style.fontWeight='900';
      gotop.style.textAlign='center';
      gotop.style.background = 'gray';
      gotop.style.borderRadius = '0.2em';
      gotop.style.width='1.4em';
      gotop.style.height='1em';
      gotop.style.top = (document.documentElement.clientHeight / 2) + 100 + 'px';
      gotop.style.opacity='0.3';
      gotop.style.visibility = (document.body.scrollTop + document.documentElement.scrollTop > 10) ? 'visible' : 'hidden';
      if(0 == width)
      { gotop.style.left = '0em';  }
      else if(-1 == width)
      { gotop.style.right = '0em';  }
      else
      {
      var resize = function()
      {
      var left = (document.documentElement.clientWidth - width) / 2 + width + 10;
      if((left - gotop.clientWidth) < width)
      {
      gotop.style.right='0em';
      gotop.style.left = null;  // 设定了right属性，则需要取消left属性。
      }
      else
      {
      gotop.style.left = left + 'px';
      gotop.style.right = null;
      }
      };
      resize();
      window.addEventListener('resize', function()
      {
      resize();
      }, false);
     
      }
      gotop.addEventListener('mouseover', function()
      {
      this.style.opacity='0.8';
      this.style.textDecoration='none';
      }, false);
      gotop.addEventListener('mouseout', function()
      {
      this.style.opacity='0.3';
      }, false);
      gotop.addEventListener('click', function()
      {
      // IE9和opera下body.scrollTop为0，chrome下documentElement.scrollTop为0
      // 两者始终有一个为0
      var h = document.body.scrollTop + document.documentElement.scrollTop; // 当前位置
      var t = window.setInterval(function()
      {
      window.scrollTo(0,h -= 100); // 每次上移100像素
      if(h <= 0)
      { window.clearInterval(t);  }
      }, 5);
      }, false);
      /* 通过window.onscroll事件确定按钮是否需要显示 */
      window.addEventListener('scroll', function()
      {
      var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
      gotop.style.visibility = scrollTop > 10 ? 'visible':'hidden';
      }, false);
    };



    function article_index($content) {   
        $matches = array();   
        $ul_li = '';   
        $r = "/<h3>([^<]+)<\/h3>/im";   
      
        if(preg_match_all($r, $content, $matches)) {   
            foreach($matches[1] as $num => $title) {   
                $content = str_replace($matches[0][$num], '<h4 id="title-'.$num.'">'.$title.'</h4>', $content);   
                $ul_li .= '<li><a href="#title-'.$num.'" title="'.$title.'">'.$title."</a></li>\n";   
            }   
            $content = "\n<div id=\"article-index\">
                    <strong>文章目录</strong>  
                    <ul id=\"index-ul\">\n" . $ul_li . "</ul>  
                </div>\n" . $content;   
        }   
        return $content;   
    }   
    add_filter( "the_content", "article_index" );  

