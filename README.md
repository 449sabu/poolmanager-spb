# <p align="center">Simple Pages Builder for Cardano SPOs</p>

<div align="center">
    <a href='https://github.com/449sabu/poolmanager-spb/actions'>
    <img src="https://img.shields.io/github/actions/workflow/status/449sabu/poolmanager-spb/nextjs.yml?label=Tests&style=for-the-badge&branch=main">
  </a>
  <a href='https://github.com/449sabu/poolmanager-spb/issues'>
    <img src="https://img.shields.io/github/issues/449sabu/poolmanager-spb?label=Issues&style=for-the-badge">
  </a>
  <a href='https://github.com/449sabu/poolmanager-spb/network/members'>
     <img src="https://img.shields.io/github/forks/449sabu/poolmanager-spb?label=Forks&style=for-the-badge">
  </a>
  <a href='https://github.com/449sabu/poolmanager-spb/stargazers'>
    <img src="https://img.shields.io/github/stars/449sabu/poolmanager-spb?label=Stars&style=for-the-badge">
  </a>
  <a href='https://github.com/449sabu/poolmanager-spb/blob/main/LICENSE'>
    <img src="https://img.shields.io/github/license/449sabu/poolmanager-spb?label=License&style=for-the-badge">
  </a>
</div>

## はじめに
- ステークプールの Metadata や 拡張Metadata などの情報をもとに、個々のステークプールの情報をまとめたシンプルなシングルページを簡単に公開できるサービスです。  
- オンチェーンのデータ取得には Koios 、Cardano Wallet との対話には Mesh を使用しています。  
素晴らしいサービスを提供してくれている２つのプロジェクトに感謝いたします。

- [(サンプルサイト)](https://www.cielstakepool.com/)

## 技術構成
- [TypeScript](https://www.typescriptlang.org/)  
- [Next.js](https://nextjs.org/)  
- [Chakra ui](https://chakra-ui.com/)  
- [SWR](https://swr.vercel.app/ja)  
- [Koios API](https://api.koios.rest/#overview--problems-solved-by-koios)  
- [Mesh SDK](https://meshjs.dev/)  

## 使い方
 1. このリポジトリをフォークする。
 2. [設定可能な環境変数](https://ctool-docs.vercel.app/docs/simple-pages-builder#%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0)を参考に、環境変数を設定する。
 3. Github Actionsを実行し、Github Pagesでサイトを公開する。

- 詳細なドキュメントは[こちら](https://ctool-docs.vercel.app/docs/simple-pages-builder)をご覧ください。

## LICENSE
[MIT license](https://github.com/449sabu/poolmanager-spb/blob/main/LICENSE)  