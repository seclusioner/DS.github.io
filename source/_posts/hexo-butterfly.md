---
title: hexo theme
date: 2023-11-14 13:45:40
tags: 
- [hexo]
cover: https://pic1.zhimg.com/v2-41e1b825c51055f39c22b95777bc620b_1440w.jpg?source=172ae18b
top_img: https://pic1.zhimg.com/v2-41e1b825c51055f39c22b95777bc620b_1440w.jpg?source=172ae18b
description: 記錄Hexo撰寫Blog的過程(簡單記錄用Hexo開發的經歷)
swiper_index: 1
---

{% tip info %}
這邊簡單記錄一下hexo的butterfly主題安裝的方式與步驟，為之後我如果要測試或改動比較方便。
{% endtip %}

# hexo

<font size="4">

網路有很多教學，我就假設環境已經建立好了，我是用**Vscode**作為IDE開發的，因此接下來都在裡面做操作，但我不是專業的，沒學過前端，純粹自己玩一玩，記錄一下而已，這邊只會記錄一些常用到的hexo指令。

如果建置成功，於Vscode裡面終端機輸入以下指令應該會生成hexo本身預設的blog主題。

</font>

{% codeblock %}
hexo init
{% endcodeblock %}

<font size="4">

接著產生虛擬的伺服器，在網頁上看輸出結果：

</font>

{% codeblock %}
hexo s
{% endcodeblock %}

<font size="4">

理論上會看到如下圖的畫面：

</font>

{% image https://i.pinimg.com/736x/05/87/0d/05870da1049900262e894a4b26361cbb.jpg %}

<font size="4">

假如你沒有看到，那表示可能沒安裝好或是哪個步驟有問題，否則目前為止應該都不難。

若你做了一些更動，需要刷新，則輸入以下指令可以將舊的內容清除：

</font>

{% codeblock %}
hexo cl
{% endcodeblock %}

<font size="4">

這三個為最基本也最常用的指令。

</font>

# Theme

<font size="4">

目前都用butterfly，詳細的內容可以去[官網](https://butterfly.js.org/)看，都寫得非常之清楚，剩下的就是要動手去試試了，這邊僅記錄一些簡單的過程。

hexo初始化時預設的主題為landscape，假如你有學過一些前端的專業內容，可以著手去改看看，像我這種來沾醬油的就先用人家做好的主題。

</font>

## 安裝


<font size="4">

官網已有推薦較為穩定的方式，我就照著官網寫，首先於終端機輸入以下指令，於你的hexo根目錄將主題clone下來：

</font>

{% codeblock %}
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
{% endcodeblock %}


<font size="4">

但有時候大改將別人寫的程式加進來可能會遇到版本不相容的問題，比較簡單的還可以自己修正，但要是遇到可能需要學過前端的問題，就只能慢慢試了，有時候不同版本相容性也不同，因此若想要下載較舊的版本，要怎麼辦呢？

</font>


### 方法一


<font size="4">

可以去[作者的Github](https://github.com/jerryc127/hexo-theme-butterfly)，找到**tag**，如下圖：

{% image https://i.pinimg.com/736x/eb/a2/ec/eba2ec0f6253f7c5b526c48f1758f5ce.jpg %}

點進去後會看到不同的主題版本，選擇你可能要的版本，裡面會有更新以及修改的記錄，如果覺得是你想要的就下載它的壓縮檔，

</font>

### 方法二


<font size="4">

進入[作者的Github](https://github.com/jerryc127/hexo-theme-butterfly)，有個分支的按鍵(實際裡面的文字不一定，但位置基本上一樣)，如下圖：

{% image https://i.pinimg.com/736x/75/58/e8/7558e884c6901ae799f72383eea2a6b9.jpg %}

點進去後一樣會看到不同的主題版本，選擇你要的版本，會跑到類似的視窗，只是版本變成你點的那個版本，再來只要按綠色的按鍵，裡面有個Download ZIP，就可以下載該版本的壓縮檔。

{% image https://i.pinimg.com/736x/79/65/4d/79654d3c8c3b07563c496162a8bc1188.jpg %}

但用壓縮檔的主題下載，需要解壓縮後將內部的檔案放到你blog根目錄的theme底下，以butterfly為例，於theme資料夾裡面建立一個butterfly的資料夾(子資料夾名稱需與根目錄的.config.yml設定之主題名稱相同)，再將你剛解壓縮的檔案放進去即可。

此方法於寫code如果在Github上找Source code，如果想下載不同的版本，也會用到，因此特別記錄下來。

</font>

## 主題更改 & 測試


<font size="4">

之後再去根目錄的.config.yml將主題(theme)由landscape改成butterfly，但此時如果你直接打hexo s網頁會跑不出來，因為你還沒有安裝相關前端的插件(如果你有就可以跳過此步驟)，因此要先輸入：

</font>

{% codeblock %}
npm install hexo-renderer-pug hexo-renderer-stylus --save
{% endcodeblock %}

<font size="4">

此時再輸入一次hexo s，網頁就會跑出來了，如果你到以下畫面那就恭喜你，表示你成功了。

</font>

{% image https://i.pinimg.com/736x/ef/0b/ed/ef0bed6cc91a6817528a79f777f35991.jpg %}

<font size="4">

到這邊為第一步(略過安裝 & 建置)，如果你有興趣，就去實作看看吧！

</font>

<br>

{% folding cyan open, 資料來源 %}

[Butterfly 安裝文檔 (一)](https://butterfly.js.org/posts/21cfbf15/)

{% endfolding %}

<br><br>
