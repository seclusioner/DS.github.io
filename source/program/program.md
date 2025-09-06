---
title: program
date: 2022-07-11
permalink: /program/
top_img: /images/post/programming.png
cover: /images/post/programming.png
author: D.S.
---

{% tip info %}記錄Coding基本會用到的東西{% endtip %}

# 環境建置
**最後撰寫日期：2025/08/29**

參考VIC學長格式加上自己建置的過程作撰寫

以我自己為例，主機顯卡是`RTX 5080`(當時較新的)，OS是Win 11、x64
IDE：VScode

## Python
到python官網下載想要的python版本.exe，然後執行安裝即可

我選的版本是`3.11.9`[傳送門](https://www.python.org/downloads/release/python-3119/)(因為有時候新版的會有一些相容性的問題)，可去[官網](https://www.python.org/downloads/)查詢，會有不同的Release version，當然後續虛擬環境上可以指定，或是用docker的image建

Notes：
* 若使用 VSCode，建議勾選「Add python.exe to PATH」，避免後續 cmd 找不到 python
* 可用 python --version / python -m pip --version 驗證安裝

接著若要做AI，大致可分為：
- 安裝Anaconda
- 安裝CUDA
- 安裝cuDNN

## Install Anaconda
官網：https://www.anaconda.com/download/

現在要下載好像要註冊帳號，就弄一下後，會分成Distribution Installers和Miniconda Installers，前者有預設的程式庫，後者要自己安裝建置

Miniconda Installers 說明：[傳送門](https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html)

建立虛擬環境常用指令：

- 創建虛擬環境
``` bash
conda create --name <env> python=<version>
```

- 查看虛擬環境
``` bash
conda env list
```

- 激活 / 退出
``` bash
conda activate <env>
deactivate
```

- 刪除虛擬環境
``` bash
conda remove --name <env> --all
```


## Install CUDA (Compute Unified Device Architecture)
首先開啟cmd，查看獨立顯示卡訊息，輸入指令：
``` bash
nvidia-smi
```
輸出會包含以下區塊，設備和CUDA版本因硬體而異：

``` bash
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 576.52                 Driver Version: 576.52         CUDA Version: 12.9     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                  Driver-Model | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA GeForce RTX 5080      WDDM  |   00000000:01:00.0  On |                  N/A |
|  0%   46C    P0             50W /  360W |    1348MiB /  16303MiB |      0%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+
```

不同顯卡支援(相容)不同版本的CUDA，因此要去[這裡](https://developer.nvidia.com/cuda-gpus)查看，例如我的`GeForce RTX 5080`可與CUDA版本`12.0`以上相容，而從上面輸出資訊可知最高可支援到`CUDA 12.9`

接著確認版本後，可以找相容的CUDA做安裝，例如我的最高支援到12.9，因此我就安裝`CUDA 12.9` [傳送門](https://developer.nvidia.com/cuda-12-9-0-download-archive?target_os=Windows&target_arch=x86_64&target_version=11&target_type=exe_local)

可根據上面指示選擇，最終下載.exe：
- exe(network)：下載時檔案較小，後續安裝須再下載
- exe(local)：下載時完整下載，後續安裝不須再下載

接著就跟一般的安裝流程類似，若要測試是否安裝成功可以去cmd輸入：
``` bash
nvcc -V
```

成功後會看到相關資訊。

## Install cuDNN (CUDA Deep Neural Network library)
NVIDIA 專門為深度學習開發的函式庫， 不需任何程式設計即可使用，[安裝網站](https://developer.nvidia.com/cudnn)，下載時會要求你登入才可以下載，我是直接用google帳號登入

下載壓縮檔時也要挑選版本，我自己是會去[這裡](https://developer.download.nvidia.com/compute/cudnn/redist/cudnn/windows-x86_64/)挑，或是也可以直接問GPT再自己做確認，例如我選的是`cudnn-windows-x86_64-9.12.0.46_cuda12-archive`

*下面的步驟因人而異，只要抓得到路徑就可以*

接著解壓縮後再C槽建立一個`tools`目錄，將解壓縮完的資料夾放到`tools`下，接著一樣找到`/bin`的路徑，若你照著我寫的做路徑會是`C:\tools\cuda\bin`，應該會看到`cudnn64_XX.dll`的檔案，然後一樣將`/bin`的路徑放到系統環境變數


## 測試
torch[官網](https://pytorch.org/get-started/previous-versions/)選擇合適的torch版本，接著安裝套件，我個人是用pip裝，接著測試code：
``` python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

# 1. 確認 CUDA 是否可用
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

print(f"CUDA available: {torch.cuda.is_available()}")
print(f"Using device: {device}")

if torch.cuda.is_available():
    print(f"GPU Name: {torch.cuda.get_device_name(0)}")

# 2. 創建簡單的神經網絡模型
class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)  # 假設是 10 類別的分類問題

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# 3. 創建隨機數據來模擬訓練過程
X_train = torch.randn(64, 784).to(device)  # 64 條 784 維度的隨機數據
y_train = torch.randint(0, 10, (64,)).to(device)  # 64 條隨機類別標籤，範圍 0-9

train_dataset = TensorDataset(X_train, y_train)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)

# 4. 初始化模型，損失函數和優化器
model = SimpleNN().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 5. 簡單的訓練步驟（測試訓練過程是否順利運行）
epochs = 2
for epoch in range(epochs):
    model.train()
    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device)

        # 前向傳播
        output = model(data)
        loss = criterion(output, target)

        # 反向傳播
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        if batch_idx % 10 == 0:  # 每 10 步打印一次
            print(f"Epoch [{epoch+1}/{epochs}], Step [{batch_idx+1}/{len(train_loader)}], Loss: {loss.item():.4f}")

print("finished!")
```

若全部安裝成功輸出會類似下面這樣：
``` bash
CUDA available: True
Using device: cuda
GPU Name: NVIDIA GeForce RTX 5080
Epoch [1/2], Step [1/2], Loss: 2.3457
Epoch [2/2], Step [1/2], Loss: 1.8359
Training finished!
```

## Git
做版本控制要下載github code使用，要先安裝git，直接搜尋git安裝即可
網址：https://git-scm.com/downloads

可能第一次用會需要設定使用者，大致如下：
``` bash
git config --global user.name "name"
git config --global user.email "email"
```

## gcc / g++ 編譯器 (寫C/C++使用)
我安裝的是MinGW安裝 MinGW-w64（提供 GCC 編譯器），一樣要注意位元架構要與OS一致（x64）

下載網址：https://www.winlibs.com/

下載LATEST的GCC編譯器，並解壓縮，然後將該目錄下的`\bin`目錄路徑加到系統環境變數，路徑會類似下面這個(主要是看`/bin`在哪)：

``` bash
C:\Program Files\mingw-w64\mingw64\bin
```

設定完後，開啟cmd輸入：
``` bash
gcc --version
g++ --version
```

輸出會類似下面格式(這裡我只擷取版本資訊)，若有成功顯示表示安裝沒有問題：
``` bash
gcc (MinGW-W64 x86_64-ucrt-posix-seh, built by Brecht Sanders, r1) 15.2.0
g++ (MinGW-W64 x86_64-ucrt-posix-seh, built by Brecht Sanders, r1) 15.2.0
```

## 工具與版本清單（供參考）

| 工具         | 版本 / 備註 |
|--------------|-------------|
| Python       | 3.11.9      |
| Conda        | Miniconda (建議) |
| CUDA         | 12.9        |
| cuDNN        | 9.12        |
| PyTorch      | 根據 CUDA 版本搭配 |
| GCC / G++    | 15.2.0      |
| VSCode       | 最新版      |
| Git          | 最新版      |


# Docker
一般開發時建環境會用docker，我已經有寫一篇docker的[基礎記錄文章](https://seclusioner.github.io/DS.github.io/2025/06/13/Hello-Docker/)，若深入了解後還有甚麼心得會再寫詳細的內容

# Server
許多企業或是實驗室會遠端使用server，且OS大多都是Linux系列(例如Ubuntu)，一些詳細的[步驟](https://seclusioner.github.io/2025/01/01/server/)已經在入口網頁撰寫，若之後有研究source code會再額外寫詳細的文章