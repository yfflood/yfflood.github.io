# MidiNet: a Convolutional Generative Adversarial Network for Symbolic-Domain Music Generation

原文： https://arxiv.org/pdf/1703.10847v2.pdf



近年来，尤其伴随着神经网络的研究进展，出现了许多使用算法生成音乐的研究。大部分现有的模型选用了循环神经网络(RNN)架构；而DeepMind的WaveNet模型证明卷积神经网络(CNN)同样具备生成音乐的能力。下表为作者总结的一些基于神经网络的音乐生成模型：

![](C:\Users\19046\AppData\Roaming\marktext\images\2022-05-15-16-49-46-image.png)

本文提出了一个基于CNN-GAN架构的新模型来实现符号域（区别于音频域）音乐生成，并通过条件机制来利用先验知识。评估表明该模型有不亚于RNN的表现，且拥有CNN训练相对更快、便于并行化的优势。



## 模型

### 符号化表示

本文的模型以小节(bar)为单位生成音乐。将一个MIDI文件分割成小节，每一个小节可以表示为一个 $h\times w$的 矩阵。在不考虑音量(velocity/volumn)属性的情况下，则会得到一个二值(binary)矩阵$X\in\{0,1\}^{h\times w}$。这样的表示方法存在问题：**无法区分**两个相同的、但中间断奏的时值较短音符和一个时值较长的音符。



在实现中，为了方便，本文选取16分音符为**最小单元**，即$w=16$。由此忽略了三连音、更短的音符等等。同时，模型的符号表示中**没有考虑休止**，而是采取了将休止位置的前一个音符延长的方式处理（若休止在小节开始则将小节第二个音的开始提前至小节起始）。此外，作者将旋律**限制在两个八度之内**，保留全部音符表示仅用以识别GAN是否发生模式坍塌(mode collapse)。



选用了如下表的简化方式表示和弦。

<img title="" src="file:///C:/Users/19046/AppData/Roaming/marktext/images/2022-05-15-17-10-09-image.png" alt="" width="463" data-align="center">

### 核心架构：生成器CNN与判别器CNN

![](C:\Users\19046\AppData\Roaming\marktext\images\2022-05-15-16-54-34-image.png)

本文主要神经网络架构如上图。

架构的核心是一个改进的深度卷积生成对抗网络(DCGAN)，主要的目标是：

- 判别器$D$, 用以识别真实数据和生成（人造）数据

- 生成器$G$, 能够使判别器无法识别其生成结果



在一般的GAN中，生成器的输入是一个随机向量$z\in \mathbb{R}^l$，通过转置卷积层实现上采样，最终输出是一个矩阵$\small\hat{X}_{h\times w} = G(z)$。 GAN通过迭代求解如下目标的优化问题训练生成器与判别器：

$$
\small
\min_G\max_DV(D,G)=\mathbb{E}_{X\sim p_{data}(X)}[\log(D(X))]+
\mathbb{E}_{z\sim p_{Z}(z)}[\log(1-D(G(z)))]
$$

其中$X\sim p_{data}(X)$表示从真实数据中采样。



而由于minimax games自身的性质，GAN的训练往往有不稳定、模式坍塌等问题。本文选用了**特征匹配**和**单侧标签平滑**的方式来改善训练过程。其中，特征匹配的主要想法是在上述优化目标后加入$L2$正则项：

$$
\lambda_1||E[X]-E[G(z)]||_2^2+\lambda_2||E[f(X)]-E[f(G(z))]||_2^2
$$

其中$f$表示判别器中的第一个卷积层。



### 调节器(Conditioner) CNN

在基于GAN的图像生成中，人们往往将现有的先验知识编码为一个向量（1-D condition），并作为额外输入提供给模型。而由于本文模型生成结果是一个矩阵，因此需要通过调节器CNN将2-D condition转化为生成器可以接受的输入。

事实上，作者指出调节器CNN可以看作生成器CNN的反函数。



### 调节：提升创造性

模型的一个主要权衡点(trade-off)是**创造性**和**合规性**。作者提出了两种调节方式：

1. 仅在生成器的部分转置卷积层中使用先验知识(condition)，给生成器更多机会自由发挥

2. 利用特征匹配方法的特点：增大$\lambda_1,\lambda_2$的值可以使生成的音乐与训练集中的数据更相似。



## 实验 & 评估

本文最终得到的模型既能从头开始作曲，也能基于给定的一部分输入继续作曲。

在实验中，本文选择GoogleBrain团队Magenta项目中的MelodyRNN模型作为baseline，共包括三种模型：

- basic RNN

- lookback RNN

- attention RNN

作者也相应给出三种MidiNet的变体模型：

- Model 1: 无和弦调节的旋律生成器

- Model 2: 有和弦调节的旋律生成器，稳定模式

- Model 3: 有和弦调节的旋律生成器，创造模式

<img title="" src="file:///C:/Users/19046/AppData/Roaming/marktext/images/2022-05-15-17-50-54-image.png" alt="" width="411" data-align="center">

实验结果显示，MidiNet在真实感和愉悦度上取得了与MelodyRNN不相上下的表现，而旋律则更具有趣味性。



作者也给出了MidiNet生成的结果示例

![](C:\Users\19046\AppData\Roaming\marktext\images\2022-05-15-17-54-49-image.png)



---

参考文献：

[1] Yang L C, Chou S Y, Yang Y H. MidiNet: A convolutional generative adversarial network for symbolic-domain music generation[J]. arXiv preprint arXiv:1703.10847, 2017.
