# 和暦変換 - Year Converter

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-5.0-blue)

全て AI で作成した実験的なプロジェクトです。
公開サイトは [こちら](https://office-ohana.net/test/wareki_convert/) 。
美しく使いやすい和暦変換 Web アプリケーション。1950 年以降の西暦を瞬時に和暦（昭和・平成・令和）に変換できます。

## ✨ 特徴

- 🚀 **リアルタイム変換**: 入力と同時に瞬時に和暦変換
- 🎯 **正確な年号対応**: 昭和・平成・令和に完全対応
- 📱 **レスポンシブデザイン**: スマートフォンでも快適に使用可能
- 🎨 **Material Design**: 美しく直感的なユーザーインターフェース
- 📋 **クリップボードコピー**: 変換結果をワンクリックでコピー
- 🔍 **年号解説機能**: 各年号の詳細情報と歴史的背景
- ⚡ **PWA 対応**: オフラインでも使用可能

## 🌐 デモ

[Live Demo](https://your-demo-url.vercel.app)

## 🚀 クイックスタート

### 前提条件

- Node.js 18.0.0 以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/test_yearConverter.git

# ディレクトリに移動
cd test_yearConverter

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

## 📖 使い方

1. **西暦入力**: 1950 年以降の西暦を入力フィールドに入力
2. **自動変換**: リアルタイムで和暦が表示されます
3. **結果コピー**: 変換結果をクリックしてクリップボードにコピー
4. **年号解説**: 詳細情報を知りたい場合は解説ボタンをクリック

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 14
- **言語**: TypeScript
- **UI ライブラリ**: Material-UI (MUI)
- **スタイリング**: CSS-in-JS (Emotion)
- **PWA**: Service Worker 対応
- **開発ツール**: ESLint, Prettier

## 📂 プロジェクト構造

```
test_yearConverter/
├── src/
│   ├── components/          # Reactコンポーネント
│   │   ├── YearConverter/   # 年変換メインコンポーネント
│   │   ├── Landing/         # ランディングページ
│   │   ├── EraInfo/         # 年号解説
│   │   └── UI/              # 共通UIコンポーネント
│   ├── data/                # 年号データ
│   ├── utils/               # ユーティリティ関数
│   └── pages/               # Next.jsページ
├── public/                  # 静的ファイル
└── package.json
```

## 🎨 主要コンポーネント

### YearConverter

西暦から和暦への変換を行うメインコンポーネント

### EraInfoModal

年号の詳細情報と歴史的背景を表示

### Landing Components

- HeroSection: ヒーローセクション
- FeatureSection: 機能紹介
- GuideSection: 使い方ガイド
- DemoSection: デモ機能

## 🔧 開発

### 利用可能なスクリプト

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# リンターチェック
npm run lint
```

## 📝 年号対応表

| 西暦年    | 和暦                  |
| --------- | --------------------- |
| 1950-1988 | 昭和 25 年-昭和 63 年 |
| 1989      | 昭和 64 年 / 平成元年 |
| 1990-2018 | 平成 2 年-平成 30 年  |
| 2019      | 平成 31 年 / 令和元年 |
| 2020-     | 令和 2 年-            |

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Request を作成

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 🙏 謝辞

- 年号データの提供: 内閣府
- UI デザイン: Material Design
- アイコン: Material Icons

## 📞 サポート

バグ報告や機能要求は [Issues](https://github.com/your-username/test_yearConverter/issues) からお願いします。

---

⭐ このプロジェクトが役に立った場合は、スターをつけていただけると嬉しいです！
