---
title: Latex 測試
date: 2023-03-03 16:11:38
tags:
- [hexo]
cover: https://i.etsystatic.com/7084552/r/il/6aeb27/1739362212/il_794xN.1739362212_i7e2.jpg
description: 記錄Hexo撰寫Blog的過程(用來測試Latex是否能使用)
swiper_index: 1
---

{% tip info %}這篇用來測試我之後可能會寫比較學術性的內容，所需要的數學公式能否正確顯示，順便用用看最近很夯的 ChatGPT 整理而寫出來的一小段DSP的內容。{% endtip %}

<br>

Latex(Katex) 設置參考[這篇](https://www.nickxu.top/2022/04/17/Hexo-Butterfly-%E5%BB%BA%E7%AB%99%E6%8C%87%E5%8D%97%EF%BC%88%E5%85%AB%EF%BC%89%E4%BD%BF%E7%94%A8-KaTeX-%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F/)<br>

如果要線上測試轉成代碼(Latex、html)，可以去[這裡](https://www.latexlive.com/)<br><br>


# Z-transform

Z轉換是一種數學變換，將離散時域中的序列轉換為複平面上的函數。可以看做是拉普拉斯變換在離散時間域的推廣。

在控制工程和信號處理中，Z轉換常常用於設計數位控制器和數位濾波器，以及分析離散時間信號的穩定性和頻域特性等。

Z轉換的定義如下：

$$ X(z) = \sum_{n=0}^{\infty} x(n)z^{-n} $$

其中，$x(n)$表示輸入的離散時間信號，$z$是一個複變量。在這個公式中，$z^{-n}$表示時間延遲，$n$表示延遲的時間步數。

Z轉換的逆變換可以用公式表示為：

$$ x(n) = \frac{1}{2\pi j} \oint_C X(z)z^{n-1}dz $$

其中，$C$是包圍復平面上所有極點的圍道，$j$是虛數單位。逆變換的結果是原始的離散時間序列。

要設計數位濾波器，可以使用Z轉換來分析濾波器的頻率響應和穩定性，然後使用逆Z轉換將設計好的濾波器轉換為離散時間域中的差分方程或差分方程的係數。

以下是一般的數位濾波器設計步驟：

1. 確定濾波器的類型和特性，如低通、高通、帶通或帶阻等。
2. 確定濾波器的截止頻率或通帶頻率和阻帶頻率。
3. 使用Z轉換將連續時間域的濾波器轉換為離散時間域中的傳遞函數，即$H(z)$，其中$z=e^{j\omega}$，$\omega$為數位角頻率。
4. 根據濾波器的類型和特性，選擇合適的濾波器結構，如FIR（有限脈衝響應）或IIR（無限脈衝響應）。
5. 對於FIR濾波器，可以使用窗函數法或最佳法來設計。
6. 對於IIR濾波器，可以使用雙線性變換法將連續時間域的傳遞函數轉換為離散時間域中的傳遞函數，然後根據差分方程的形式得到差分方程的係數。
7. 通過差分方程的係數可以實現數位濾波器，可以使用各種數位信號處理工具來實現，如MATLAB、Python等。

需要注意的是，數位濾波器的設計需要根據實際應用場合來選擇合適的濾波器類型和特性，以及確定合適的截止頻率或通帶頻率和阻帶頻率。在設計過程中，還需考慮濾波器的計算複雜度和穩定性等問題。

以Python為例：

``` python
import scipy.signal as signal
import matplotlib.pyplot as plt

# filter configuration
fs = 10000 # sampling rate
fc = 1000 # cutoff frequency
order = 4 # order of filter

# nomalize the cutoff frequency
wc = 2 * fc / fs

# IIR LPF
b, a = signal.butter(order, wc, 'low')

# Frequency Response
w, h = signal.freqz(b, a)
plt.plot(w, 20 * np.log10(abs(h)))
plt.xlabel('Digital frequency (rad/sample)')
plt.ylabel('Magnitude (dB)')
plt.title('Frequency Response')
plt.show()

```

# 其他測試

測試數學公式(Latex)，參考至[這裡](https://wizardforcel.gitbooks.io/markdown-simple-world/content/3.html)：


```Tex
$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$
```

輸出結果如：
$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$

<br/>

```Tex
$\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$
```

輸出結果如：<br/>
$\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$

<br/>

Tex語法可以去[這裡](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)<br/>