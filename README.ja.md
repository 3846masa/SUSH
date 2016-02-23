# 🍣 SUSH 🍣 : Simple Url SHortener

Simple Url SHortener

## What's that

ブラウザで動く短縮URLシステムです．

"http://example.com/#/google"のようにアクセスすると， SUSHはhashから文字列を抽出し (``/google``)，対応するURLへとリダイレクトします．

プラグインを追加することで，自分好みの短縮URLが実現できます．

またブラウザで動くので，HTMLとJavascriptを配信できれば，すぐに使いはじめることができます．

Github-Pages上で使えば，独自ドメインの短縮URLも作れます．

## Example

## Usage

```javascript
import SUSH from 'sush';
import keyTrim from 'sush-plugin-key-trim';
import spreadSheet from 'sush-plugin-spreadsheet';
import analytics from 'sush-plugin-google-analytics';
import redirect from 'sush-plugin-redirect';

const sheetUrl = 'https://docs.google.com/spreadsheets/d/XXXXXX_XXXXXX/edit#gid=0';

new SUSH().flow([
  keyTrim({ head: 1 }),
  spreadSheet({ sheetUrl: sheetUrl }),
  analytics({ analyticsId: 'UA-XXXXXXXX-1' }),
  redirect({ errorRedirect: '/404.html' })
]).catch((err) => {
  console.error(err.stack || err);
});
```

## Plugins

- [sush](./packages/sush)
  - コアとなるモジュールです
- [sush-plugin-key-trim](./packages/sush-plugin-key-trim)
  - keyの前後から指定した数，文字を取り除きます
  - ``/abc``を``abc``のように変えられます
- [sush-plugin-redirect](./packages/sush-plugin-redirect)
  - list内にあるkeyに対応するURLにリダイレクトします
  - ``errorRedirect``を指定すると404ページも設定できます
- [sush-plugin-spreadsheet](./packages/sush-plugin-spreadsheet)
  - Google SpreadSheetの中身を短縮URLのlistに追加します  
- [sush-plugin-add-object](./packages/sush-plugin-add-object)
  - Objectを短縮URLのlistに追加します
- [sush-plugin-google-analytics](./packages/sush-plugin-google-analytics)
  - Google Analyticsを使うことができます
  - 送信されるURL情報にhashも追加します
- [sush-plugin-template](./packages/sush-plugin-template)
  - プラグインを作るときのテンプレートです

## LICENSE

MIT (c) 3846masa
