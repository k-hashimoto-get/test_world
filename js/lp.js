//----------------------------------------------------------
// ヘッダ固定
//----------------------------------------------------------
fixedFlag = 0;
function headerFixed() {
  //オブジェクト
  var o = $('body');
  var o2 = $('#fixed-header').offset(); //固定開始の高さ
  //スクロール時処理
  $(window).scroll(function () {
    if (!fixedFlag) {
      if ($(window).scrollTop() > o2.top) {
        //固定化
        o.addClass('fixed');
        fixedFlag = 1;
      }
      //固定解除
    } else {
      if ($(window).scrollTop() <= o2.top) {
        //解除
        o.removeClass('fixed');
        fixedFlag = 0;
      }
    }
  });
};

//----------------------------------------------------------
// アンカースクロール
//----------------------------------------------------------
function anchorScroll() {
  $('a[href^="#"]').click(function (e) {
    var id = $(this).attr("href");
    if ($(id)[0]) {
      var header = $('#fixed-header').innerHeight();
      var target = $(id).offset().top - header;
      $('html, body').animate({
        scrollTop: target
      }, 500);
    }
    //イベントを中止し、アドレスバーにハッシュをつけない
    e.preventDefault();
    return false;
  });
}

//----------------------------------------------------------
// ページトップ
//----------------------------------------------------------
function setPageTop() {
  if (!$('#pagetop')[0]) {
    $('body').append('<div id="pagetop"><a href="javascript:void(0)"></a></div>');
  }
  var pageTop = $('#pagetop a');
  pageTop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 700) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  });
  pageTop.click(function () {
    $('body, html').animate({
      scrollTop: 0
    }, 500, 'swing');
    return false;
  });
};

//----------------------------------------------------------
// FAQ　開閉
//----------------------------------------------------------
function faqToggle() {
  $('.question').click(function () {
    //ロックされていなければ
    if(!$(this).parent().hasClass('locked')) {
      $(this).next().slideToggle('normal', function(){
        $(window).resize();
      });
      $(this).toggleClass('open');
    }
  });
}

//----------------------------------------------------------
// 画像遅延
//----------------------------------------------------------
function lazyLoad() {
  $("img.lazy").lazyload({
    skip_invisible: true,
    threshold: 600
  });
  $("img.lazy").lazyload({
    event: 'loadImg'
  });
  var loadImgFlg = false;
  $('.hd-nav a, .hd-menu a').on('click', function () {
    if(!loadImgFlg) {
      $("img.lazy").trigger("loadImg");
      loadImgFlg = true;
    }
  });
}

//----------------------------------------------------------
// アニメーション
//----------------------------------------------------------
function setAnimation() {
  /*  お申し込みボタンエフェクト */
  $('.btn-red, .btn-red-s').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('anime');
    }
  });
}

//----------------------------------------------------------
// GAイベント登録
//----------------------------------------------------------
function gae(c, a, l) {
  try{ ga('send', 'event', c, a, l); } catch(e){}
}

//----------------------------------------------------------
// コピーライト
//----------------------------------------------------------
function copyright() {
  var dt = new Date();
  var year = dt.getFullYear();
  var str = 'Copyright (C) BIGLOBE Inc. 1996-' + year;
  $("#copyright").html(str);
}

//----------------------------------------------------------
// 実行
//----------------------------------------------------------
$(function () {
  //固定ヘッダー
  headerFixed();
  //アンカースクロール
  anchorScroll();
  //ページトップ
  setPageTop();
  //FAQトグル
  faqToggle();
  //画像遅延
  lazyLoad();
  //アニメーション設定
  setAnimation();
  //コピーライト
  copyright();
});
