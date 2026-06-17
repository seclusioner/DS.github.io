---
title: Hexo測試 & 部屬
date: 2022-07-11
description: 記錄Hexo撰寫Blog的過程(用來測試 hexo & 部屬到Github的指令)
tags: 
- [TEST]
categories:
- [測試]
sticky: 1
cover: https://images8.alphacoders.com/115/1156488.png
swiper_index: 1
---

{% tip info %}這裡是用來測試 Hexo 的程式碼出來的效果用的。{% endtip %}
<br>

在撰寫時會需要測試markdown的輸出結果，可以去

* https://pandao.github.io/editor.md/en.html<br/>
* https://dillinger.io/<br/>

<br/>

基本上一般的 Html 也可以用，但跟 Markdown 混用可能會發生問題。<br/>

本篇也不算正式的教學，`參考就好`，東西太多我會分篇。

# Butterfly

內容參考[{% label Butterfly orange%}](https://butterfly.js.org/) <br/>

{% hideBlock display,bg,color %}
嘿嘿
{% endhideBlock %}

{% hideToggle display,bg,color %}
content
{% endhideToggle %}

{% note [class] [no-icon] [style] %}
Any content (support inline tags too.io).
{% endnote %}

{% note blue 'fas fa-bullhorn' simple %}
content
{% endnote %}

{% mermaid %}
pie
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
{% endmermaid %}

{% note info simple %}
info 提示塊標籤
{% endnote %}

{% note success modern %}
success 提示塊標籤
{% endnote %}

<font size="3">
<br/>

如需要用圖示，可以去[Icon](https://fontawesome.com/) <br/>

部屬指令(根據我自己的方法)，僅供參考：<br/>

{% note purple 'fa fa-code' %}
先將Github的內容載下來
{% endnote %}

{% codeblock%}
git clone (你的Github網址)
{% endcodeblock %}

{% note red 'fa fa-code' %}
將舊的靜態網頁內容清除
{% endnote %}

{% codeblock%}
hexo clean
{% endcodeblock %}

{% note orange 'fa fa-code' %}
安裝部屬模組
{% endnote %}

{% codeblock  %}
npm install hexo-deployer-git --save
{% endcodeblock %}

{% note pink 'fa fa-code' %}
產生新的靜態網頁
{% endnote %}

{% codeblock %}
hexo d g
{% endcodeblock %}

{% note green 'fa fa-code' %}
加新的檔案
{% endnote %}

{% codeblock %}
git add .
{% endcodeblock %}

{% note gray 'fa fa-code' %}
上傳?
{% endnote %}

{% codeblock %}
git commit -m "make it better"
{% endcodeblock %}

{% note blue 'fa fa-code' %}
部屬至github
{% endnote %}

{% codeblock %}
git pull
{% endcodeblock %}

</font>
<br/>

{% tabs test1 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->

<!-- tab @fab fa-apple-pay -->
**只有圖標 沒有Tab名字**
<!-- endtab -->
{% endtabs %}


{% flink %}
- class_name: Link
  class_desc: Hexo
  link_list:

    - name: Hexo
      link: https://hexo.io/zh-tw/
      avatar: https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg
      descr: 快速、簡單且強大的網誌框架
{% endflink %}
<hr>
<label for="fname">TEST: </label> <input type="text" id="fname" name="fname">
<hr>

測試 hexo 張貼 youtube 影片連結(需有影片ID -> 分享 -> 網址後面一串英文):
{% youtube dQw4w9WgXcQ %}




# Hexo docs.

## Block

這裡是從 [Hexo](https://hexo.io/docs/tag-pluginsn) 擷取 ，更多資源可以去該網看看。

{% blockquote %}
content
{% endblockquote %}

{% blockquote David Levithan, Wide Awake %}
Do not just seek happiness for yourself. Seek happiness for all. Through kindness. Through mercy.
{% endblockquote %}

{% blockquote @DevDocs https://twitter.com/devdocs/status/356095192085962752 %}
NEW: DevDocs now comes with syntax highlighting. http://devdocs.io
{% endblockquote %}

{% blockquote Seth Godin http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html Welcome to Island Marketing %}
Every interaction is both precious and an opportunity to delight.
{% endblockquote %}

{% codeblock Array.map %}
array.map(callback[, thisArg])
{% endcodeblock %}

# Others

## HTML & CSS
Reference: [參考網址](https://nekodeng.gitee.io/posts/hexo-note.html)

<link type='text/css' rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" media='all'/>

<style type="text/css">
  
.note { 
  position: relative; padding: 15px; margin-top: 10px; margin-bottom: 10px; border: initial; border-left: 3px solid #eee; background-color: #f9f9f9; border-radius: 3px; font-size: var(--content-font-size); 
} 

.note.info { background-color: #eef7fa; border-left-color: #428bca; } 

.note.warning { background-color: #fdf8ea; border-left-color: #f0ad4e; } 

.note.primary { background-color: #f5f0fa; border-left-color: #6f42c1; } 

.note.danger { background-color: #fcf1f2; border-left-color: #d9534f; } 

.note.Other { background-color: #ffdead; border-left-color: #a0522d;}
</style>

<div class="note info">info</div> 

<div class="note primary">primary</div> 

<div class="note warning">warning</div>

<div class="note danger">danger</div> 

<div class="note Other" >self-defined color</div>

<hr/>

css 背景測試: <br/>

<div style="background-image: linear-gradient(to right, #FFC371, #FF5F6D); height: 200px;">
    <div style="color: white; text-align: center; padding-top: 80px;">
    <strong>這是一個測試文本</strong>
    </div>
</div>

<hr/>

Reference: [參考網址](https://ed521.github.io/2019/08/hexo-markdown/)

格式是這樣：

```html
<font color= "(顏色hex編碼, e.x. #008000)" > Color you want </font>
```

顏色編碼可以去[這裡](https://www.ifreesite.com/color/web-color-code.htm)找

輸出類似 <font color= "#008000" > Color you want </font>

<hr/>

表格:
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Text1 | Text2 | Text3 |
| Text4    | Text5    | Text6    |


<hr/>


<br/><br/>


