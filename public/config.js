// 白标
window.wl_no = 'ALP';
// 正式环境
window.isProduction = !/(hemei)|(192\.168)|(localhost)|(127\.0\.0\.1)/.test(window.location.href);
var SERVER_PATH ='https://testapialp.hemeifinance.com/';
if (isProduction) {
  SERVER_PATH ='https://tradeapi.alpfxg.co/';
}
