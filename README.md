# 京都・亀岡 旅のしおり（2026/10/9〜10/10）

iPhoneの「ホーム画面に追加」でアプリのように使える、1泊2日のしおりページです。

## ファイル構成

```
index.html            本体（CSS・JSはこの中）
manifest.webmanifest  ホーム画面に追加したときの名前・アイコン・表示方法
sw.js                 オフライン用（一度開いたら電波がなくても表示できる）
icons/                アイコン（180px / 192px / 512px / favicon）
images/               写真（Wikimedia Commons）と、自分の写真の差し替え口
```

## 公開する前に（大事）

GitHub Pages に置いたページは、**URLを知っている人なら誰でも見られます**。
画面上で伏せ字にしていても、ページのソースを見れば中身は読めます。

- `index.html` の `RESERVATION_NO`（予約番号）には、**公開するなら本物を入れない**のがおすすめです。
  宿の予約確認メールをスマホに残しておけば足ります
- 宿の住所・電話・メールは宿が公開している情報なので問題ありません
- 検索エンジンには出ないよう `noindex` を入れてありますが、URLは人に教えすぎないでください

## 1. GitHub Pages で公開する

公開先：https://camegane-alt.github.io/kyoto-shiori/ （リポジトリ `Camegane-Alt/kyoto-shiori`・Public）

### 中身を直したとき

案件フォルダで次を実行するだけです（元のファイルを直してから）。

```sh
bash tools/deploy_pages.sh "変更の一言"
```

- 公開用リポジトリを毎回まっさらに取ってきて、`output/site` の中身で置き換えて push します
- コミットの作者は GitHub の匿名アドレスになります（個人のメールアドレスは公開履歴に残りません）
- `sw.js` の `VERSION` は自動で上がるので、手で直さなくてOKです
- iPhoneでは、しおりを一度閉じて開き直すと新しい内容になります

### 旅行が終わったら

リポジトリを削除すれば、ページも消えます：`gh repo delete Camegane-Alt/kyoto-shiori`

### 精算タブ（2026-10-12 追加）

使ったものと払った人を入れると、割り勘の精算額が出ます。2人のスマホで同じ中身が見られます。

- 保存先は個人の Google アカウントのスプレッドシート「京都旅行の精算（しおり用）」
- 受け口は Apps Script「京都しおり 精算の受け口」（元のコードは `tools/settle_gas/Code.gs`）。URL は `index.html` の `SETTLE_API`
- 合言葉・2人の呼び名・シートの場所は Apps Script の「スクリプト プロパティ」にだけ置く（公開ページには書かない）
- 精算が終わってリポジトリを消しても、スプレッドシートは記録として残る

## 2. iPhoneで「ホーム画面に追加」する

1. iPhoneの **Safari** で公開したURLを開く（Chromeなど他のアプリからだとうまく追加できないことがあります）
2. 画面下の **共有ボタン**（四角から上向き矢印）をタップ
3. 下にスクロールして **「ホーム画面に追加」** をタップ
4. 名前が「京都しおり」になっていることを確認して **「追加」**
5. ホーム画面の「京」アイコンから開くと、アドレスバーのないアプリ表示になります

**2人とも**それぞれのiPhoneで追加してください。持ち物のチェックと空き枠のメモは、その端末だけに保存されます（相手とは共有されません）。

出発前に一度開いておくと、写真までオフライン用に保存されます（電車内・山あいで電波が弱くても開けます）。
地図・経路・電話のボタンは、Googleマップや電話アプリを開くので電波が必要です。

## 3. あとで入れるもの・差し替えるもの

`index.html` の上の方（`/* 設定（ここを書き換える） */`）にまとめてあります。

| 何を | どこを | 例 |
|---|---|---|
| 予約番号 | `RESERVATION_NO` | 公開中は空のまま（入れない） |
| 亀岡のタクシー会社の電話 | `TAXI` の `tel` | `tel: "0771-00-0000"` |

### 自分の写真に差し替える

表紙と、宿・焼肉・甘味処などのイラストは画像生成AIで作ったものです。
同じ名前のファイルを `images/` に上書きすれば、自分の写真に差し替わります（コードの変更は不要）。
横長（16:10くらい）、幅1000px程度・300KB以下が目安です。

| ファイル名 | 場所 |
|---|---|
| `images/hero.jpg` | 表紙（縦長 4:5） |
| `images/hotel.jpg` | 6ishiki（宿） |
| `images/yakiniku.jpg` | 焼肉と精肉のひら山 |
| `images/sawaya.jpg` | 粟餅所 澤屋 |
| `images/seigenin.jpg` | 西源院（昼ごはん） |
| `images/yokai.jpg` | 一条妖怪ストリート |
| `images/toyouke.jpg` | とようけ茶屋（今回は見送り） |

差し替えたら `bash tools/deploy_pages.sh` で反映してください。

## 4. 当日の動き

- 10/9・10/10 に開くと、その日のタブが開き、**いまの予定**が色付きで強調され、そこまで自動でスクロールします
- 画面下のバーに「いま／つぎ」と、次の場所の **📍地図・🚃経路**、**📞電話**（宿・焼肉・タクシー）が常に出ます
- 旅行日以外は「出発まであと○日」を表示します

### 表示の確認（パソコンで）

URLの末尾に `?now=日時` を付けると、その時刻の表示を再現できます。

- `index.html?now=2026-10-09T13:20` … 1日目の金閣寺あたり
- `index.html?now=2026-10-10T11:10` … 2日目のチェックアウト後

## 写真のクレジット

写真は Wikimedia Commons から、ライセンス（CC BY / CC BY-SA）に従って縮小して使っています。
作者・ライセンス・元URLはページ下部に載せています。店舗・予約サイトの写真は使っていません。

| ファイル | 作者 | ライセンス | 元URL |
|---|---|---|---|
| images/kitano.jpg | 663highland | CC BY 2.5 | https://commons.wikimedia.org/wiki/File:Kitano-tenmangu_Kyoto_Japan29s3s4200.jpg |
| images/kinkaku.jpg | Basile Morin | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Water_reflection_of_Kinkaku-ji_Temple_a_sunny_day,_Kyoto,_Japan.jpg |
| images/kinukake.jpg | Jxh1 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:%E3%81%8D%E3%81%AC%E3%81%8B%E3%81%91%E3%81%AE%E8%B7%AF_%E9%87%91%E9%96%A3%E5%AF%BA%E3%81%8B%E3%82%89%E9%BE%8D%E5%AE%89%E5%AF%BA%E3%81%BE%E3%81%A7%E5%8C%BA%E9%96%93.jpg |
| images/ryoanji.jpg | Stephane D'Alu | CC BY-SA 3.0 | https://commons.wikimedia.org/wiki/File:RyoanJi-Dry_garden.jpg |

一条妖怪ストリートは、ライセンスが明記された写真が Commons に見つからなかったため、イラストにしています。
表紙と、宿・焼肉・甘味処・妖怪ストリート・西源院のイラストは、このしおり用に画像生成AI（Codex）で作成しました。

## アイコンを作り直すとき

案件フォルダで `python3 tools/make_icons.py`（Pillow とヒラギノ明朝を使用）。
