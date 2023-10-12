var w = window.innerWidth ? window.innerWidth: $(window).width();
var h = window.innerHeight ? window.innerHeight: $(window).height();
var scroll = 0;
var bp = 660; //ブレイクポイント
var speed = 0; //アクションスピード

$(function() {

  //各数値の調整
  $(window).on('load scroll resize',function(){
    w = window.innerWidth ? window.innerWidth: $(window).width();
    h = window.innerHeight ? window.innerHeight: $(window).height();
    scroll = $(this).scrollTop();
  });

  $(window).on('load scroll', function() {
    var scrollPx = $(window).scrollTop();
    var mvHeight = $(".leadArea").height();
    if (scrollPx > mvHeight) {
      $('.toTop').css('transform', "translate(-44px,-8px)");
    } else {
      $('.toTop').css('transform', "translate(-44px,400px)");
    }

  });

  $(window).on('load scroll', function() {
    var scrollPx = $(window).scrollTop();
    var mvHeight = $(".topPage__about__logo").height();
    if (scrollPx > mvHeight) {
      $('.header--sp--topPage').css('top', "0");
    } else {
      $('.header--sp--topPage').css('top', "calc(-110% - 40px)");
    }

  });

  // スムーズスクロール
  $('a[href^="#"]').click(function(){
		var speed = 500;
		var w = $(window).width();
		var href= $(this).attr("href");
		var target = $(href === "#" || href === "" ? 'html' : href);
		var position = target.offset().top +1;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});

  // ページ移動　フェードアウト
  // var fadeOutPages = true;
  // if(fadeOutPages){
  //   $('a[href^="/"]').click(function(){
  //     var url = $(this).attr('href');
  //     if (url !== '') {
  //       $('body').fadeOut(speed);
  //       setTimeout(function(){
  //           location.href = url;
  //       }, speed*2);
  //     }
  //     return false;
  //   });
  // }

});

// 疑似visited
$(function() {
    // ナビゲーションのリンクを指定
   var navLink = $('.innerPage__nav__item--current .innerPage__nav__smallLink');

    // 各コンテンツのページ上部からの開始位置と終了位置を配列に格納しておく
   var contentsArr = new Array();
  for (var i = 0; i < navLink.length; i++) {
       // コンテンツのIDを取得
      var targetContents = navLink.eq(i).attr('href');
      // ページ内リンクでないナビゲーションが含まれている場合は除外する
      if(targetContents.charAt(0) == '#') {
         // ページ上部からコンテンツの開始位置までの距離を取得
            var targetContentsTop = $(targetContents).offset().top;
         // ページ上部からコンテンツの終了位置までの距離を取得
            var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
         // 配列に格納
            contentsArr[i] = [targetContentsTop, targetContentsBottom]
      }
   };

  // 現在地をチェックする
   function currentCheck() {
       // 現在のスクロール位置を取得
        var windowScrolltop = $(window).scrollTop();
        var doch = $(document).innerHeight(); //ページ全体の高さ
        var winh = $(window).innerHeight(); //ウィンドウの高さ
        var bottom = doch - winh; //ページ全体の高さ - ウィンドウの高さ = ページの最下部位置
        for (var i = 0; i < contentsArr.length; i++) {
           // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
          if(contentsArr[i][0] <= windowScrolltop && contentsArr[i][1] >= windowScrolltop) {
                // 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
               // navLink.removeClass('innerPage__nav__smallLink--visited');
               navLink.eq(i).addClass('innerPage__nav__smallLink--visited');
                i == contentsArr.length;
            }
          else if (bottom <= $(window).scrollTop()){
            $(".innerPage__nav__item--current .innerPage__nav__smallLink").addClass('innerPage__nav__smallLink--visited');
          }
       };
  }

   // ページ読み込み時とスクロール時に、現在地をチェックする
  $(window).on('load scroll', function() {
      currentCheck();
 });

 // ナビゲーションをクリックした時のスムーズスクロール
   //  navLink.click(function() {
   //    $('html,body').animate({
   //        scrollTop: $($(this).attr('href')).offset().top
   //     }, 300);
   //      return false;
   // })
});
