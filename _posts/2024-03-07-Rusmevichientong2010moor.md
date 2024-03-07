---
title: "[Paper Note] Linearly parameterized bandits"
date: 2024-03-07
permalink: /posts/2024/03/07/rusmevichientong2010moor/
tags:
  - bandits
---
The key ideas for finding bounds is to
- attribute *regret* to the causes: *exploration* or *estimation error*
- find the relation between these two parts, if any

# Model formulation
$\mathcal{U}_r \subset \mathbb{R}^r$ a *compact* set if arms ($r\geq2$), The reward in period $t$ is given by

$$X_{t}^{u}=u^{T}Z + W_{t}^{u},\tag{1}$$
- $Z\in\mathbb{R}^r$ is a random variable
- $W_{t}^{u}$ are iid mean-zero random variables

A *policy* $\psi=(\psi_{1},\psi_{2},...)$  is a sequence of functions, each mapping from *history* to $\mathcal{U}_r$. For any policy $\psi$ and $z\in\mathbb{R}^r$, the *cumulative regret* under $\psi$ given $Z=z$ is

$$\text{Regret}(z,T,\psi)=\sum\limits_{t=1}^{T}E\bigg[\max_{v\in\mathcal{U}_{r}}v^Tz - U^{T}_{t}z\,\vert\,Z=z\bigg],$$

The *cumulative Bayes risk* under $\psi$ is the expectation w.r.t. the *prior* of $Z$.

$$\text{Risk}(T,\psi)=E[\text{Regret}(Z,T,\psi)]$$

![regret table](/images/Pasted image 20240307221236.png)

# Lower bounds
Linear bandits has $\Omega(r\sqrt{T})$ lower bounds on the Bayes risk and thus on regret, given normal prior on $Z$.
1. The cumulative risk can be lower-bounded by the **estimator error variance** and the **total amount of exploration**.
	**Lemma** (risk decomposition) Let $S_{t}^{1},..., S_{t}^{r-1}$ denote a collection of orthogonal unit vectors that are also orthogonal to $\hat{Z}$. For any $T\geq 1$, 
	$$\text{Risk}(T,\psi)\geq \frac{1}{2}\sum\limits_{k=1}^{T}E \bigg[||Z||\sum\limits_{t=1}^{T}(T_{t}^{T}S_{t}^{k})^{2} + \frac{T}{||Z||} \{(Z-\hat{Z}_{T})^{T}S_{T}^{k}\}^2\bigg]$$

2. The two terms are interelated. Little exploration implies large estimation error
	**Lemma** For any $k$ and $T\geq 1$,
	$$E[\{(Z-\hat{Z})^{T}S_{T}^{k}\}^{2}\vert H_{T}]\geq\frac{1}{r+\sum\limits_{t=1}^{T}(T_{t}^{T}S_{t}^{k})^{2} },$$
	where $r$ is prior precision of $Z$.
3. There is a lower bound on the probability that $Z$ is bounded away from 0.
4. Then we can derive a *minimum directional risk*.

# Upper bounds: PEGE algorithm

## Algorithm: phased-exploration-and-exploitation
There are two phases in each cycle $c\geq 1$:
1. Exploration ($r$ periods) play arm $b_k$. The explored arms span the entire space.
	compute the OLS estimate $\hat{Z}(c)=Z+\frac{1}{c}(\sum\limits_{k=1}^{r}b_{k}b_{k} ^{T})^{-1}\sum\limits_{s=1}^{c}\sum\limits_{k=1}^{r}b_{k}W^{b_{k}}(s)$
2. Exploitation ($c$ periods) play the greedy arm $G(c)=\arg\max_{v\in\mathcal{U}_{r}} v^{T}\hat{Z}(c)$.
In the algorithm, $c$ is of the **order $O(\sqrt{T})$**.

## Assumptions
1. Subgaussian noise
2. Arms are bounded, and include $r$ linearlly independent components
3. $\mathcal{U}_{r}$ satisfy *smooth best arm response with parameter J*
		$$||u^{*}(z)-u^{*}(y)||\leq J||z-y||$$

## Upper bound
**For PEGE, we can explicitly disentangle risk caused by *exploration* and *misspecification***
**Thm.** There exists a positive constant $a_{1}$ that depends only on the noise bounds, arm bounds and response bounds, such that for any $z$ and $T\geq r$,
$$\text{Regret}(z,T,\text{PEGE})\leq a_{1}(||z||+\frac{1}{||z||})r\sqrt{T}$$
- Since the arm bound provides a trivial bound $2\bar{u}||z||$ on *instantaneous regret*, the bound does not deteriorate as $||z||$ approaches 0.

1. There is an upper bound on the squared norm error
		$$E[||\hat{Z}(c)-z||^{2}| Z=z]\leq \frac{h_{1}r}{c}$$

2. Expected **instantaneous regret** under greedy decision is of order $O(||Z-\hat{Z}||^2)$ given **smoothness** assumption.
3. Over total $K$ cycles, $K=O(\sqrt{T})$
		$$\text{Regret}\left(z,rK+\sum\limits_{c=1}^{K}c,\text{PEGE}\right)\leq h_{3}r||z||K+h_{4}\sum\limits_{c=1}^{K} \frac{r}{||z||}$$
