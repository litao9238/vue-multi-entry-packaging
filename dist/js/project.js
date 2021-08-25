// 正式环境
window.isProduction = !/(hemei)|(192\.168)|(localhost)|(127\.0\.0\.1)/.test(window.location.href);
var api ='https://testapialp.hemeifinance.com/';
if (isProduction) {
  api ='https://tradeapi.alpfxg.co/';
}

var regmobile = /^((1[3-9][0-9]{1})+\d{8})$/;
var v=GetQueryValue("v");
var requestHeaders={
  'channel':v||'alp023002',
  'lang': 'cn',
  'wl_no':'ALP'
};

function GetQueryValue(queryName) {
  var query = decodeURI(window.location.search.substring(1));
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == queryName) { return pair[1]; }
  }
  return null;
}

function formatDateWFlag(date,flag,gs,lang){
  if (gs == undefined){gs = "ymd"}
  if (lang == undefined){lang = "en"}
  var date=new Date(date);
  var year = date.getFullYear();
  var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var day = (date.getDate() < 10 ? '0' + date.getDate():date.getDate());

  if(lang=="en"){
    if(gs=="ymd"){
      return year+flag+month+flag+day;
    }else if(gs=="md"){
      return month+flag+day;
    }else if(gs=="d"){
      return day;
    }
  }else{
    if(gs=="ymd"){
      return year+"年"+month+"月"+day+"日";
    }else if(gs=="md"){
      return year+"年"+month+"月";
    }else if(gs=="d"){
      return day;
    }
  }  
}

function getWeekDay(currentTime) {
  var currentDate = new Date(currentTime)
  var timesStamp = currentDate.getTime();
  var currenDay = currentDate.getDay();
  var dates = [];
  for (var i = 0; i < 7; i++) {
      //dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-'));
      dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)));
  }
  return dates;
}

function lastweek(){
  var choosedate=$("#monitor ul li a.selected").data("appid");
  var choosedate = new Date(choosedate);
  var choosedate = new Date((choosedate/1000-(86400)*7)*1000);
  getrili(choosedate);
  $("#dateinput").val(formatDateWFlag(choosedate,"-"));
  $(".yearmonth").text(formatDateWFlag(choosedate,"-","md","zh"));
  $(".ntoday").text(formatDateWFlag(choosedate,"-"));
  getDatacurl();
}

function nextweek(){
  var choosedate=$("#monitor ul li a.selected").data("appid");
  var choosedate = new Date(choosedate);
  var choosedate = new Date((choosedate/1000+(86400)*7)*1000);
  getrili(choosedate);
  $("#dateinput").val(formatDateWFlag(choosedate,"-"));
  $(".yearmonth").text(formatDateWFlag(choosedate,"-","md","zh"));
  $(".ntoday").text(formatDateWFlag(choosedate,"-"));
  getDatacurl();
}

function getrili(choosedate,isindex){
  if (isindex == undefined) isindex = 0;
  riliarr=getWeekDay(choosedate);
  var selected="";
  var rililist="";
  for(i=0;i<7;i++){
    var week = ['日','一','二','三','四','五','六'][new Date(riliarr[i]).getDay()];
    if(formatDateWFlag(choosedate,"-") == formatDateWFlag(riliarr[i],'-')){
      selected="selected";
    }else{
      selected="n";
    }
    if(isindex==1){
      rililist += "<li><a class="+selected+" data-appid="+formatDateWFlag(riliarr[i],'-')+"><span>"+formatDateWFlag(riliarr[i],'-','d')+"</span><span>"+week+"</span></a></li>";
    }else{
      rililist += "<li><a class="+selected+" data-week="+i+" data-appid="+formatDateWFlag(riliarr[i],'-')+"><span>"+week+"</span><span>"+formatDateWFlag(riliarr[i],'-','md')+"</span></a></li>";
    }
  }
  $("#monitor ul").html(rililist);
}

function MergeCell(table, startRow, endRow, col, endCol, isInit) {
  if (typeof (table) == 'string')
      table = document.getElementById(table);
  if (col >= table.rows[0].cells.length || col > endCol) {
      return;
  }
  if (isInit == undefined) isInit = true;
  if ((col == 0 || endRow == 0) && isInit) {
      endRow = table.rows.length - 1;
  }
  for (var i = startRow; i < endRow; i++) {
      if (table.rows[startRow].cells[col].innerHTML == table.rows[i + 1].cells[col].innerHTML) {
          table.rows[i + 1].cells[col].style.display = 'none';
          table.rows[startRow].cells[col].rowSpan = (table.rows[startRow].cells[col].rowSpan | 0) + 1;
          if (i == endRow - 1 && startRow != endRow) {
              MergeCell(table, startRow, endRow, col + 1, endCol, false);
          }
      } else {
          MergeCell(table, startRow, i, col + 1, endCol, false);
          startRow = i + 1;
      }
  }
}

function ldlk(affect,actual,consensus,previous) {
  var e = affect,//affect
  i = actual,//actual
  n = consensus,//consensus
  s = previous;//previous
  n = n && parseFloat(n),
  s = s && parseFloat(s);
  var o = null !== n ? n: s,
  a = "";
  return null === i || "" === i ? "---": (i = parseFloat(i), !o && 0 !== o || i === o ? a = "影响较小": 0 === e ? a = i > o ? "利多": "利空": 1 === e && (a = i > o ? "利空": "利多"), a)
}

function ldlkclass(affect,actual,consensus,previous) {
  var e = affect,//affect
  i = actual,//actual
  n = consensus,//consensus
  s = previous;//previous
  n = n && parseFloat(n),
  s = s && parseFloat(s);
  var o = null !== n ? n: s,
  a = "";
  return null === i || "" === i ? "": (i = parseFloat(i), !o && 0 !== o || i === o ? a = "affsmall": 0 === e ? a = i > o ? "liduo": "likong": 1 === e && (a = i > o ? "likong": "liduo"), a)
}

function getDatacurl(flag){
  vmm.rows=[];
  vmm.event=[];
  vmm.festival=[];
  var choosedate=$("#dateinput").val();
  if(choosedate==null){choosedate=formatDateWFlag(new Date(),"-");}
  var country = $(".filter .country .filter-r a.selected").text();
  var grade = $(".filter .important .filter-r a.selected").text();
  if(country=="全部"){country="";}
  if(grade=="重要"){grade="111";}else{grade="";}
  if(flag==undefined){layer.load(1);}
  $.ajax({
    headers: requestHeaders,
    data:{date:choosedate,country:country,grade:grade},
    type:'post',
    url: api+'Home/calendar',
    success:function(data,status){
      vmm.rows = data.data.Financial;
      vmm.event = data.data.Event;
      vmm.festival = data.data.Festival;
      layer.closeAll('loading');
      if(flag==1){
        var mySwiper = new Swiper('.swiper-container-new',{
          direction: 'horizontal',
          autoplayDisableOnInteraction : false,
          slidesPerView: "auto",
          paginationClickable:true,
          centeredSlides:true,
          spaceBetween: 0,
          pagination: '.swiper-pagination-new',
        });
      }
    }
  });
}

function getindexnews(id){
  $.ajax({
    headers: requestHeaders,
    type:'post',
    data:{istop:0,type:id,page:1,pageSize:8},
    url: api+'home/news',
    success:function(data,status){
      vmm.indexnews=(data.data.data);
    }
  });
}

function checkRealMobileIsExit(){
  layer.msg('请输入手机号码',{time:1500});
	return false
}

$(document).ready(function() {

  $(".whcbox ul.tab li").click(function(){
    $(this).siblings().removeClass("selected");
    $(this).addClass("selected");
    var itemId = $(this).attr("data");
    $(".whcontent").find(".tc").removeClass("show");
    $(".whcontent").find(".tc:eq("+itemId+")").addClass("show");
  });

  $(".item2 .title").click(function(){
    if(!$(this).hasClass('cur')){
    $(".item2 .title").removeClass("cur");
    $(this).addClass("cur");
    $(".item2 .title").next().hide(500);
    $(this).next().toggle(100);
    }
  });

  $(".noticebox .container ul.tab li").click(function(){
    var oldId = $(".noticebox .container ul.tab li.selected").attr("data");
    $(this).siblings().removeClass("selected");
    $(this).addClass("selected");
    var itemId = $(this).attr("data");
    $(".noticebox .container").find(".notice_cont").removeClass("show");
    $(".noticebox .container").find(".notice_cont:eq("+itemId+")").addClass("show");
    if(itemId<2){
      itemId=0;
    }else if(itemId==2&&oldId>2){
      itemId=0;
    }else{
      itemId=2;
    };
    var width=itemId*(-($(this).width()));    
    $(".helptab").css({
      "transform": "translate3d("+width+"px, 0px, 0px)",
      "transition-duration": ".5s"
    })
  });


  $(".notice_cont dl dt").click(function(){
    var isopen=$(".openclose ul li.selected").attr("data");
    if(!$(this).hasClass('cur')){
    $(".notice_cont dl dt").removeClass("cur");
    $(this).addClass("cur");
    if(isopen==1){
      $(".notice_cont dl dt").next().hide(500);
    }
    $(this).next().toggle(100);
    }else{
      $(this).removeClass("cur");
      $(this).next().toggle(100);
    }
  });

  $(".openclose ul li").click(function(){
    $(this).siblings("li").removeClass('selected');
    $(this).addClass('selected');
    var itemId = $(this).attr("data");
    if(itemId==0){
      $(".notice_cont dl dt").addClass("cur");
      $(".notice_cont dl dd").show(300);
    }else{
      $(".notice_cont dl dt").removeClass("cur");
      $(".notice_cont dl dd").hide(300);
    }
  });

  $("#monitor ul").on('click','li a',function(){
    $(this).parent().siblings("li").find("a").removeClass('selected');
    $(this).addClass('selected');
    var choosedate=$(this).attr("data-appid");
    $("#dateinput").val(choosedate);
    $(".ntoday").text(choosedate);
    $(".yearmonth").text(formatDateWFlag(choosedate,"-","md","zh"));
    getDatacurl();
  });

  $(".filter .filter-r a").click(function(){
    $(this).parent().find("a").removeClass('selected');
    $(this).addClass('selected');
    getDatacurl();
  });

  $(".datepicker .today").click(function(){
    var choosedate=formatDateWFlag(new Date(),"-");
    $("#dateinput").val(choosedate);
    getrili(choosedate);
    $(".ntoday").text(choosedate);
    $(".yearmonth").text(formatDateWFlag(choosedate,"-","md","zh"));
    getDatacurl();
  });

  $('.top_2a .menu').click(function (){
		$('.top_2a .menu').toggleClass('menuopen');
		$('.top_2a ul').toggleClass('show');
  });

  $(".yzmbtn").on("click",function() {
    var mobile=$("input[name='mobile']:visible").val();
    var pwd=$("input[name='pwd']:visible").val();
    var regpassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    if(mobile==null || !regmobile.test(mobile)){
        $("input[name='mobile']:visible").focus();
        $("input[name='mobile']:visible").parent().next().html("<i></i>请输入正确的手机号码");return;
    };

    getslidecode();
  });

  $(".sdownload").click(function(){
    if(/iphone|ipod|ipad/gi.test(navigator.userAgent)){
      window.location.href = "https://apps.apple.com/cn/app/id1536913872";
    }else{
      var url = location.href;
      if(typeof(onlyMobile) == 'undefined'){
        window.location.href = "https://www.alpfxg.co/platform/guanfangbao/release_alp8888.apk";
      }else{
        var u= GetQueryValue("u");
        var v= GetQueryValue("v");
        window.location.href ="https://www.alpfxg.co/platform/"+u+"/release_"+v+".apk";
      }
    }
  });

  $(".kefu li:eq(1) a").click(function(){
    //var href=$(this).attr("href");
    //$(this).attr("href","javascript:;");
    getAuthorization(0,"link_content_top_service");
  });

  $(".zaixiankefu").click(function(){
    getAuthorization(0,"link_content_top_service");
  });

  $(".top_service").click(function(){
    getAuthorization(0,"link_content_top_service");
  });
});

$(document).bind("touchstart",function(e){
  var target  = $(e.target);
  var has=$(".top_2a ul").hasClass("show");
  if(target.closest(".top_2a ul").length == 0&&target.closest(".top_2a .menu").length == 0&&has){
    $(".top_2a ul").removeClass("show");
    $(".top_2a .menu").removeClass("menuopen");
  }
});

function getNoticeType(){
  $.ajax({
    headers: requestHeaders,
    type:'post',
    url: api+'home/getNoticeType',
    success:function(data,status){
      vmm.NoticeType=(data.data.data);
    }
  });
}

function goto(objid){
  $('html,body').animate({scrollTop: $('#'+objid).offset().top}, 1000);
}

function pctom(){
  var url = location.href;
  if(typeof(onlyMobile) == 'undefined'){
    var url = url.replace('://m.', '://');
    location.href = url;
  }
}

function strcut(str,num){
  if(str==null){return;}
  if(str.length>num){
    return str.substring(0,num)+"...";
  }else{
    return str;
  }
}

function setCookie(name,value,days){
  var hostArr = document.domain.split('.');
  hostArr.length === 2 ? domain=hostArr.join('.') : domain=hostArr.slice(1).join('.');
  if(hostArr.length==4){domain=hostArr.slice(2).join('.');}
  if(days==undefined){days=365;}
  if(value){
  var exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+";path=/;domain="+domain;
  }
}

function getCookie(name) {
  var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
  return unescape(arr[2]);
  } else {
  return null;
  }
}

function getBanner(){
  var result="";
  $.ajax({
    headers: requestHeaders,
    type:'post',
    data:{applica_code:202},
    url: api+'home/getApplica',
    success:function(data,status){
      for(var i = 0; i < data.data.data.length; i++){
        if(data.data.data[i].applica_link==null){
          result +='<div class="swiper-slide" style="background:url('+data.data.data[i].applica_img+') no-repeat center top"></div>';
        }else{
          result +='<div class="swiper-slide" style="background:url('+data.data.data[i].applica_img+') no-repeat center top"><a target="_blank" href="'+data.data.data[i].applica_link+'"></a></div>';
        }
      }
      $('.ibanner .swiper-wrapper').append(result);
      var mySwiper = new Swiper('.swiper-container',{
        direction: 'horizontal',
        loop: true,
        autoplayDisableOnInteraction : false,
        autoplay:5000,
        slidesPerView: "auto",
        paginationClickable:true,
        centeredSlides:true,
        spaceBetween: 0,
        pagination: '.swiper-pagination',
      });
    }
  });
}

function getslidecode(){
  var num = "";
  basecode="";
  for (var i = 0; i < 4; i++){
    num += Math.floor(Math.random()*10);
  }
  sjst=new Date().getTime() + num;
  layer.load(1);
  $.ajax({
    type:'post',
    data:{scode:sjst},
    cache:false,
    url: api+'Home/setslidercode',
    success:function(data,status){
      basecode=data.data.basecode;
      basecode=basecode.slice(16,-16);
      basecode=BASE64.decode(basecode);
      var mobile=$("input[name='mobile']:visible").val();
      $.ajax({
        headers: requestHeaders,
        type:'post',
        data:{user_cell_zd:"86",user_cell:mobile,scode:sjst,basecode:basecode},
        url: api+'home/check',
        success:function(data,status){
          if(data.result==200){
            layer.closeAll('loading');
            $(".yzmbtn").attr("disabled",true);
            var time = 60;
            var run = function () {
              time--;
              $(".yzmbtn").val(time + '秒后重新获取');
              if (time > 0) {
                  setTimeout(run, 1000);
              } else {
                  $(".yzmbtn").attr("disabled",false).val('发送验证码');
              }
            }
            run();
            $('html').removeClass('navigation-is-open');
          }
        }
      });
    }
  });
}

function guid() {
  function S4() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

var end;
var visit_time = 0;
start = new Date();
function getAuthorization(visit_time,vcode,token){
	if(getCookie('trace')){
    trace = getCookie('trace');
  }else{
    trace = guid();
    setCookie('trace',trace);
  }
  const params = {
    // 访问或操作地址
    url: window.location.href,
    // 页面或操作标识
    code: vcode || window.location.pathname,
    // 请求次数
    num: 1,
    // 停留时长
    duration: visit_time || 0,
    // 停留时长的标识, 用于统计页面时长开始和结束的唯一标识
    duration_mark: '',
    // 这个只是注册时用的临时token
    token: token,
    // 来源 官网OS, 及推广
    source: GetQueryValue("utm_source") || 'OS',
    // 媒介 PC H5
    medium: GetQueryValue("utm_medium") || 'H5',
    // 系列
    campaign: GetQueryValue("utm_campaign"),
    // 组/单元
    content: GetQueryValue("utm_content"),
    // 关键词
    term: GetQueryValue("utm_term")
  };
  $.ajax({
    headers: Object.assign({},requestHeaders,{'visit-id':trace}),
    type:'POST',
    data: params,
    url: api+'commonFun/statistics',
    dataType:'json',
    success:function(data, textStatus, jqXHR){
    }
  })
}
getAuthorization(visit_time);
window.addEventListener("pagehide",function(evt){
  end = new Date(); //用户退出时间
  visit_time = end.getTime() - start.getTime();
  visit_time = Math.ceil(visit_time / 1000); //取的是秒并且化整
  console.log(visit_time);
  getAuthorization(visit_time);
},false);
