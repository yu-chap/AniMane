# AniMane

アニメ管理アプリ([AniMane](https://animane.tk/)).

自分の好きなフォルダを作成し各フォルダごとにアニメを管理できる.

ユーザーエクスペリエンス向上のためSingle Page Applicationを実装した.

![Top Page](/images/top.jpg)
![Navigation](/images/Navigation.jpg)
![ItemList](/images/itemList.jpg)
## 作成に至る経緯
アニメの管理を行う際にGoogle keepなどのメモアプリを使用しているが管理するアニメ数が増えると管理のしづらさを感じるようになった. 特に, メモアプリだけでは, 構造的に管理することと並び替えを行うことができない. この解決策として, アニメ視聴管理アプリが挙げられるが, 登録されているアニメに制限があることと構造的に管理できる機能に制限がある(フォルダ構造がサービスによってすでに決まっている)ため使用要件を満たせない. そこで, 自分の好きなフォルダを作成し各フォルダごとにアニメを管理できるアプリ作成しようと考えた.

## 機能一覧
- ユーザー登録, ログイン機能
- アニメの登録・管理機能
    - アニメの作成ができる
    - アニメの削除ができる
    - アニメの変更ができる
    - フォルダに属するアニメの一覧を閲覧できる(無限スクロール)
    - アニメのタイトル順に並べ替えられる
    - アニメの作成順に並べ替えられる
    - アニメの最新順に並べ替えられる
    - フォルダ内検索ができる
- フォルダの登録・管理機能
    - フォルダの作成ができる
    - フォルダの削除ができる
    - フォルダの変更ができる
    - フォルダの一覧を閲覧できる
    - フォルダの検索ができる
- 通知機能
    - API通信の成功・失敗の通知

## 使用技術
###### フロントエンド
- React 17.0.2

###### バックエンド
- PHP 8.0.19
- Laravel 8.83.11

###### ミドルウェア・サーバー
- MySQL 8.0.29
- Nginx 1.20.2

###### その他
- AWS(EC2, RDS, Route53, ALB)
- Docker/Docker-compose
- Circle CI/CD

###### コードの格納場所
主要コードは以下に格納してある.
- [バックエンドのルーティング](https://github.com/yu-chap/AniMane/blob/main/src/routes/web.php)
- [バックエンドの主要機能](https://github.com/yu-chap/AniMane/tree/main/src/app/Http/Controllers/Api)
- [フロントエンドのReactコード](https://github.com/yu-chap/AniMane/tree/main/src/resources/js)
- [テストコード](https://github.com/yu-chap/AniMane/tree/main/src/tests)

## 設計
### インフラ構成図
![Infra Image](/images/Infra.jpg)
- githubにpushされた時に, テストが自動で実行される
- main branchへのpush時にはテストが自動で実行され, 成功すればEC2への自動デプロイを行う
### データベース設計
![Database Design](/images/database_design.jpg)
### URL設計

###### フロントエンド

| URL | Description |
| --- | --- |
| /app/home | ホーム画面 |
| /app/home/folders/:folderId/items| 選択されたフォルダのアイテム一覧表示画面 |

###### バックエンド

| URL | Method | Description |
| --- | --- | --- |
| /api/folders | GET | フォルダ一覧を取得 |
| /api/folders | POST | 新しいフォルダの作成 |
| /api/folders/{folder} | PUT | フォルダの更新 |
| /api/folders/{folder} | DELETE | フォルダの削除 |
| /api/folders/{folder}/items | GET | 選択されたフォルダに関連するアイテムの取得 |
| /api/folders/{folder}/items/search | GET | フォルダ内検索 |
| /api/folders/{folder}/items | POST | 新しいアイテムの作成 |
| /api/folders/{folder}/items/{item} | PUT | アイテムの更新 |
| /api/folders/{folder}/items/{item} | DELETE | アイテムの削除 |

## テスト
基本的な機能のテストとエラー関係のテストを行った.
テストコードは[/src/tests](https://github.com/yu-chap/AniMane/tree/main/src/tests)に記述している.

エラー関係のテストでは主に
- 存在しないコンテンツにアクセスした場合
- アクセス権限がないコンテンツにアクセスした場合
- 正常なrequestが行われなかった場合

を記述した.

## 今後
管理するアニメの増加により, 普通のメモアプリでは構造的な管理ができないという課題を解決するために, フォルダによって構造的に管理できるよう本アプリを開発した.しかしながら, 作成してみると使いづらさや想定できていなかったところが見つかった. したがって, 今後もそれらの改善を行っていく予定である.
###### 改善予定一覧
- [ ] 入力のsubmitをEnterでできるようにする
- [ ] フォルダ選択画面の現在選択されたフォルダの表示
- [ ] Searchバーのボタン化(常時表示するのをやめる)
- [ ] ユーザー削除機能
- [ ] user nameの表示
- [ ] メールによる再設定
- [ ] Reactテストの自動化
- [ ] タグ機能の追加
- [ ] ランキング機能の追加
