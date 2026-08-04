---
title: Pytorchによる機械学習
---
## PyTorch学習の全体図（5ステップ）

1.  **準備：データ（DataLoader）**
    *   画像を読み込み、PyTorchで扱える形（テンソル）に変換して、小出しに（バッチ）取り出せるようにします。
2.  **道具：モデル（EfficientNetなど）**
    *   ニューラルネットワークを定義します。
3.  **基準：損失関数（Criterion）**
    *   「正解とどれくらいズレているか」を計算するルールを決めます。
4.  **改善：オプティマイザ（Optimizer）**
    *   ズレ（誤差）を元に、どうやって重みを更新するかを決める「調整役」です。
5.  **実行：学習ループ（Training Loop）**
    *   ここで**逆伝播**が登場します。

## 学習ループの「中身」
1回の学習（1バッチ分）は、必ずこの**5つの手順**で進みます。

```python
# --- 学習ループの1回分 ---

# 1. 勾配をゼロにする（前回の記憶を消す）
optimizer.zero_grad()

# 2. 予測する（順伝播：Forward）
outputs = model(inputs)

# 3. 答え合わせをする（損失計算）
loss = criterion(outputs, labels)

# 4. 改善点を見つける（逆伝播：Backward）
loss.backward()

# 5. 実際にモデルを調整する（重みの更新）
optimizer.step()
```

### 例え

*   **`optimizer.zero_grad()`**
    *   前回のテストの反省内容がノートに残っていると混ざってしまうので、**黒板を一度きれいに消す**
*   **`model(inputs)`**
    *   モデルに問題を解かせて、**「たぶん答えはこれだ！」** と出させる
*   **`criterion(outputs, labels)`**
    *   先生（損失関数）が採点して、**「正解と10点分ズレてるよ」** と点数を出す
*   **`loss.backward()`（逆伝播）**
    *   「なぜ10点低かったのか？ どの層のどの計算がダメだったのか？」を、**後ろ（出口）から前（入口）に向かって分析する**
*   **`optimizer.step()`**
    *   分析結果をもとに、**「じゃあ次はここをちょっと変えよう」と実際にネジを回して調整する**

### 実装例（簡略化版）
```python
## 定義
train_loader = DataLoader(train_ds, batch_size=32, shuffle=True) # データをバッチ化

model = SomethingNet().to(device)
criterion = nn.CrossEntropyLoss() # 任意の損失関数
optimizer = optim.Adam(
    [p for p in model.parameters() if p.requires_grad],
    lr=LEARNING_RATE
) # 調整役として Adam を使用する場合の例。requires_grad が ture のパラメータのみ調整対象とする


## 学習ループ
for epoch in range(EPOCHS):
    model.train()
    
    for src, labels in train_loader:
        src, labels = src.to(device), labels.to(device)

        # 1. 勾配リセット
        optimizer.zero_grad(set_to_none=True)

        # 2. 順伝播（普通に計算）
        pred = model(src)
        loss = criterion(pred, labels)

        # 3. 逆伝播（直接 backward する）
        loss.backward()

        # 4. 重み更新（直接 step する）
        optimizer.step()
```
