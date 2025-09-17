---
title: program
date: 2022-07-11
permalink: /program/
top_img: /images/post/programming.png
cover: /images/post/programming.png
author: D.S.
---

{% tip info %}記錄Coding基本會用到的東西，5主要是環境建置{% endtip %}

**最後更新：2025/09**

設備規格
- OS：Win11 64-bit
- 顯卡：NVIDIA GeForce RTX 5080
- IDE：VScode

# Python Coding
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

# CUDA / CUDA coding
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

不同顯卡支援(相容)不同版本的CUDA，因此要去[這裡](https://developer.nvidia.com/cuda-gpus)查看，CUDA Version 指的是 **驅動支援的 CUDA Runtime 版本，不代表你已安裝的 Toolkit 版本**，例如我的`GeForce RTX 5080`可與CUDA版本`12.0`以上相容，而從上面輸出資訊可知最高可支援到`CUDA 12.9`

接著確認版本後，可以找相容的CUDA做安裝，例如我的最高支援到12.9，因此我就安裝`CUDA 12.9` [傳送門](https://developer.nvidia.com/cuda-12-9-0-download-archive?target_os=Windows&target_arch=x86_64&target_version=11&target_type=exe_local)

可根據上面指示選擇，最終下載.exe：
- exe(network)：下載時檔案較小，後續安裝須再下載
- exe(local)：下載時完整下載，後續安裝不須再下載

接著就跟一般的安裝流程類似，若要測試是否安裝成功可以去cmd輸入：
``` bash
nvcc -V
```

成功後會看到相關資訊。

## 撰寫CUDA程式碼(.cu)

步驟：
0. (可選) 安裝[CUDA Driver](https://www.nvidia.com/Download/index.aspx)
1. 下載並安裝 Visual Studio 2019 或 2022（完整版或 Community 都可），要勾選`C++ 的桌面開發`、`MSVC編譯工具`、`Windows 10/11 SDK`，並將`cl`檔案的路徑加入 PATH 環境變數中(nvcc 編譯器依賴 Visual Studio 的 cl.exe（C++ 編譯器）)，例如我的是`C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.44.35207\bin\Hostx64\x64`，並注意需搭配CUDA版本，例如安裝12.9 VS只能用2022版本的，需參考[官方文檔](https://docs.nvidia.com/cuda/cuda-installation-guide-microsoft-windows/)
2. 下載並安裝 CUDA Toolkit (步驟與上面相同，包含設定環境變數)
3. 跑code測試 (.cu檔)
``` cpp
#include <iostream>
#include <cstdlib>
#include <cuda_runtime.h>

#define CHECK(call)                                                          \
{                                                                            \
    cudaError_t err = call;                                                  \
    if (err != cudaSuccess) {                                                \
        std::cerr << "CUDA error in " << __FILE__ << "@" << __LINE__ << ": " \
                  << cudaGetErrorString(err) << std::endl;                   \
        std::exit(EXIT_FAILURE);                                             \
    }                                                                         \
}

using namespace std;

int main() {
    int dev = 0;
    cudaDeviceProp devProp;
    CHECK(cudaGetDeviceProperties(&devProp, dev));

    cout << "GPU device " << dev << ": " << devProp.name << endl; 
    cout << "# of SM: " << devProp.multiProcessorCount << endl; 
    cout << "Size of shared memory: " << devProp.sharedMemPerBlock / 1024.0 << " KB" << endl; 
    cout << "Maximum # of threads per block: " << devProp.maxThreadsPerBlock << endl; 

    return 0;
}
```

4. IDE：
- VScode
編譯指令：
``` bash
nvcc test.cu -o test.exe
```

(可選) 若目前的C++編譯器(cl.exe)選的版本配置是錯誤的，則可能會需要直接指定`-ccbin`，若執行成功，則需要再修改環境變數後重啟VScode，就可以編譯成功了(實作結果)：
``` bash
nvcc test.cu -ccbin "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Tools\MSVC\14.29.30133\bin\Hostx64\x64" -o test.exe
```

- Visual Studio (VS)
若前面安裝沒問題且有在VS的installer裡面看到`CUDA<version> runtime`(例如我的是CUDA 12.9 runtime)，則可以創建一個新專案，裡面會有範例(kernel.cu)，也可以自己include程式庫進來做測試，例如：

``` cpp
#include <iostream>
#include <cstdlib>
#include <chrono>
#include <cuda_runtime.h>

#define N 1024 // 矩陣大小

// CUDA kernel: 每個 thread 負責計算 C[row][col]
__global__ void matrixMulCUDA(float* A, float* B, float* C, int width) {
    int row = blockIdx.y * blockDim.y + threadIdx.y;
    int col = blockIdx.x * blockDim.x + threadIdx.x;

    if (row < width && col < width) {
        float sum = 0;
        for (int k = 0; k < width; ++k) {
            sum += A[row * width + k] * B[k * width + col];
        }
        C[row * width + col] = sum;
    }
}

// CPU matrix multiplication
void matrixMulCPU(float* A, float* B, float* C, int width) {
    for (int row = 0; row < width; ++row) {
        for (int col = 0; col < width; ++col) {
            float sum = 0;
            for (int k = 0; k < width; ++k) {
                sum += A[row * width + k] * B[k * width + col];
            }
            C[row * width + col] = sum;
        }
    }
}

// 驗證 CPU / GPU 結果是否一致
bool verify(float* A, float* B, int size) {
    for (int i = 0; i < size; ++i) {
        if (fabs(A[i] - B[i]) > 1e-3) return false;
    }
    return true;
}

int main() {
    int size = N * N;
    int bytes = size * sizeof(float);

    // Host memory allocation
    float* h_A = new float[size];
    float* h_B = new float[size];
    float* h_C_cpu = new float[size];
    float* h_C_gpu = new float[size];

    // Initialize matrices
    for (int i = 0; i < size; ++i) {
        h_A[i] = static_cast<float>(rand()) / RAND_MAX;
        h_B[i] = static_cast<float>(rand()) / RAND_MAX;
    }

    // CPU timing
    auto start_cpu = std::chrono::high_resolution_clock::now();
    matrixMulCPU(h_A, h_B, h_C_cpu, N);
    auto end_cpu = std::chrono::high_resolution_clock::now();
    std::chrono::duration<float, std::milli> cpu_duration = end_cpu - start_cpu;
    std::cout << "CPU time: " << cpu_duration.count() << " ms\n";

    // Device memory allocation
    float* d_A, * d_B, * d_C;
    cudaMalloc(&d_A, bytes);
    cudaMalloc(&d_B, bytes);
    cudaMalloc(&d_C, bytes);

    // Copy input to device
    cudaMemcpy(d_A, h_A, bytes, cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, h_B, bytes, cudaMemcpyHostToDevice);

    // CUDA kernel config
    dim3 threadsPerBlock(16, 16);
    dim3 blocksPerGrid((N + 15) / 16, (N + 15) / 16);

    // GPU timing
    auto start_gpu = std::chrono::high_resolution_clock::now();
    matrixMulCUDA << <blocksPerGrid, threadsPerBlock >> > (d_A, d_B, d_C, N);
    cudaDeviceSynchronize();
    auto end_gpu = std::chrono::high_resolution_clock::now();
    std::chrono::duration<float, std::milli> gpu_duration = end_gpu - start_gpu;
    std::cout << "GPU time: " << gpu_duration.count() << " ms\n";

    // Copy result back to host
    cudaMemcpy(h_C_gpu, d_C, bytes, cudaMemcpyDeviceToHost);

    // Verify result
    std::cout << "Results match: " << (verify(h_C_cpu, h_C_gpu, size) ? "YES" : "NO") << std::endl;

    // Clean up
    delete[] h_A;
    delete[] h_B;
    delete[] h_C_cpu;
    delete[] h_C_gpu;
    cudaFree(d_A);
    cudaFree(d_B);
    cudaFree(d_C);

    return 0;
}
```

Notes：
* 錯誤訊息：`nvcc error : 'cudafe++' died with status 0xC0000005`
原因：**編譯環境問題**
- 編譯器沒對到正確的版本
- VS Build Tools缺少一些東西，因此要安裝完整版的或是[Community](https://visualstudio.microsoft.com/zh-hant/vs/community/)

✅ 解法：
1. Visual Studio 是否完整安裝（Community、勾選項目）
2. `cl.exe` 的版本是否與你安裝的 CUDA 相容（可參考 CUDA Release Notes）
3. 是否在編譯時使用正確的 `-ccbin` 指向 cl.exe 所在目錄
4. 是否重啟過 VSCode（以更新環境變數）

* 觀看環境變數，不過輸出格式沒有排版：
``` bash
echo $env:PATH
```

* 可撰寫`tasks.json`檔案做編譯或一些VScode終端的設定，編譯快捷鍵是`Ctrl + Shift + B`，或是可以改.`vscode`目錄下的`settings.json`，設定編譯的相關內容，這樣便可以自動化

* 實作時若有裝VS後安裝CUDA toolkit時才會裝VS的套件

{% folding green, 學習資源 %}

- [CUDA Samples](https://github.com/NVIDIA/cuda-samples)  
  NVIDIA 提供的 CUDA 範例程式，適合用來實作與理解 CUDA 應用。

- [【Nvidia 官方课程】](https://www.bilibili.com/video/BV1JJ4m1P7xW/?spm_id_from=333.1387.favlist.content.click&vd_source=ca03fd0852ffb82b5114d0f50bd7e5ad)  
  Bilibili 上的 Nvidia 官方課程影片，適合初學者入門 CUDA。

- [參考書籍：CUDA Programming Guide](https://www.nvidia.cn/docs/IO/57399/NVIDIA_CUDA_Programming_Guide_2.0Final.pdf)  
  官方提供的 CUDA 程式設計指南 PDF，適合進一步學習 CUDA 架構與最佳實踐。

{% endfolding %}


## 需要設定的環境變數（以 CUDA 12.9 為例）

| 類別         | 路徑範例                                                                 |
|--------------|--------------------------------------------------------------------------|
| CUDA bin     | `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.9\bin`          |
| CUDA lib     | `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.9\libnvvp`      |
| Visual C++   | `C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.44.35207\bin\Hostx64\x64` |
| Nsight       | `C:\Program Files\NVIDIA Corporation\Nsight Compute 2024.1`（視情況）    |


## Install cuDNN (CUDA Deep Neural Network library)
NVIDIA 專門為深度學習開發的函式庫， 不需任何程式設計即可使用，安裝網站：https://developer.nvidia.com/cudnn

下載時會要求你登入才可以下載，我是直接用google帳號登入

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

# Git
做版本控制要下載github code使用，要先安裝git，直接搜尋git安裝即可
網址：https://git-scm.com/downloads

可能第一次用會需要設定使用者，大致如下：
``` bash
git config --global user.name "name"
git config --global user.email "email"
```

# C/C++ Coding
## gcc / g++ 編譯器
我安裝的是MinGW安裝 MinGW-w64（提供 GCC 編譯器）

下載網址：https://www.winlibs.com/

一樣要注意位元架構要與OS一致（x64），下載LATEST的GCC編譯器，並解壓縮，然後將該目錄下的`\bin`目錄路徑加到系統環境變數，路徑會類似下面這個(主要是看`/bin`在哪)：

``` bash
C:\Program Files\mingw-w64\mingw64\bin
```
⚠️ 注意：實際路徑取決於你下載與解壓縮的位置

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

## CMake
`Makefile`：定義編譯內容、檔案關係的文字檔，基本結構：

``` bash
target: dependencies
	[Tab] command to build
```

`make`：自動化建構工具，根據 `Makefile` 的規則來編譯原始碼，並只重新編譯有變動的部分，節省時間

CMake 是一個跨平台的建構工具，它會自動產生 `Makefile`，只需撰寫 `CMakeLists.txt`，就能自動生成對應平台的建構指令[下載連結](https://cmake.org/download/)

確認系統是否有cmake：
``` bash
cmake --version
```

## 基本流程
1. 建立一個 `CMakeLists.txt`
2. 使用 cmake 指令產生 `Makefile`
3. 使用 `make` 指令編譯

專案架構：
``` bash
MyApp/
├── main.cpp
├── math.cpp
├── math.h
├── Makefile           ← 手動建構方式
└── CMakeLists.txt     ← 自動建構方式
```

`main.cpp`：
``` cpp
#include <iostream>
#include "math.h"

int main() {
    std::cout << "3 + 4 = " << add(3, 4) << std::endl;
    return 0;
} 
```

`math.h`：
``` cpp
#ifndef MATH_H
#define MATH_H

int add(int a, int b);

#endif
```

`math.cpp`：
``` cpp
#include "math.h"

int add(int a, int b) {
    return a + b;
}
```

(可選) `Makefile`：
``` makefile
main: main.o math.o
	g++ -o main main.o math.o

main.o: main.cpp math.h
	g++ -c main.cpp

math.o: math.cpp math.h
	g++ -c math.cpp

clean:
	rm -f *.o main
```

make指令：
``` bash
make       # 編譯
./main     # 執行
make clean # 清除中間檔案
```

---

`CMakeLists.txt`：
``` txt
cmake_minimum_required(VERSION 3.10)
project(MyApp)

set(CMAKE_CXX_STANDARD 11)

add_executable(main main.cpp math.cpp)
```

cmake指令：
``` bash
mkdir build
cd build
cmake ..
cmake --build .
./main
```

{% folding cyan, Cmake Cheat Sheet %}

基本結構：
``` txt
cmake_minimum_required(VERSION 3.10)
project(MyProject)

set(CMAKE_CXX_STANDARD 17)       # 設定 C++ 標準（11, 14, 17, 20...）

add_executable(MyApp main.cpp)   # 建立可執行檔

```

多個檔案 / 子目錄
``` txt
add_executable(MyApp src/main.cpp src/foo.cpp src/bar.cpp)
include_directories(include)  # 如果有 headers 在 include/

```

加入靜態 / 動態函式庫
``` txt
add_library(mylib STATIC foo.cpp bar.cpp)   # .a / .lib
# add_library(mylib SHARED foo.cpp bar.cpp) # .so / .dll

add_executable(main main.cpp)
target_link_libraries(main mylib)

```

加入第三方函式庫（如 OpenCV）
``` txt
find_package(OpenCV REQUIRED)
include_directories(${OpenCV_INCLUDE_DIRS})
target_link_libraries(MyApp ${OpenCV_LIBS})

```

設定變數 / 常用指令
``` txt
set(VAR_NAME value)               # 設定變數
message(STATUS "Hello")           # 輸出訊息
file(GLOB SOURCES src/*.cpp)      # 抓取檔案清單
add_executable(app ${SOURCES})    # 使用變數建立可執行檔
```

清除建構產物
``` txt
cmake --build . --target clean   # CMake 的清除方式
make clean                       # make

```

官方手冊：https://cmake.org/cmake/help/latest/
{% endfolding %}

# Docker
一般開發時建環境會用docker，我已經有寫一篇docker的[基礎記錄文章](https://seclusioner.github.io/DS.github.io/2025/06/13/Hello-Docker/)，若深入了解後還有甚麼心得會再寫詳細的內容

# Server
許多企業或是實驗室會遠端使用server，且OS大多都是Linux系列(例如Ubuntu)，一些詳細的[步驟](https://seclusioner.github.io/2025/01/01/server/)已經在入口網頁撰寫，若之後有研究source code會再額外寫詳細的文章