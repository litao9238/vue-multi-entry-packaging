<template>
  <div class="openAccount">
    <div class="openTop">
      <span>您的用户编号为 <span class="account">{{ code }}</span>,请使用手机号登录</span>
    </div>
    <div class="tips">客服稍后会电话联系您！请注意接听（香港+0852）</div>
    <div class="openBottom">
      <div class="box">
        <div class="number">
          <div class="numList">
            <div class="numListTitle">
              <p>下载APP激活领取赠金</p>
              <span>最高领$20008赠金+1000京东卡</span>
            </div>
            <div class="numListBtn" @click="download">立即领取</div>
          </div>
          <div class="numList">
            <div class="numListTitle">
              <p>1000美元模拟金已到账</p>
              <span>免费体验交易，再领现金奖励</span>
            </div>
            <div class="numListBtn numListBtntwo">下载APP体验</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {fetchUrl} from '@/common/util'

export default {
  name: "App.vue",
  data() {
    return {
      code: ''
    }
  },
  created() {
    this.code = fetchUrl().account
  },
  methods: {
    download() {
      const isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIos) {
        window.open("https://apps.apple.com/cn/app/id1558774269");
      } else {
        window.open("http://alpfxg.co/platform/baiduwap/release_alp1016.apk", "_self");
      }
    }
  }
}
</script>

<style lang="scss">
.openAccount {
  width: 100%;
  min-height: 100%;
  padding-bottom: 30px;
  background: linear-gradient(0deg, #d9ab77 0%, rgba(217, 171, 119, 0.28) 0%);
  
  .openTop {
    width: 100%;
    height: 404px;
    background: url(./img/hongbao.png) no-repeat center;
    background-size: cover;
    
    span {
      font-size: 12px;
      display: flex;
      justify-content: center;
      color: #ffe2c4;
      position: relative;
      top: 89%;
      -webkit-transform: scale(0.9);
      -moz-transform: scale(0.9);
      -o-transform: scale(0.9);
      transform: scale(0.9);
    }
  }
  
  .tips {
    color: #d01f23;
    text-align: center;
    font-family: PingFang SC, PingFang SC-Medium;
    font-size: 13px;
    margin-top: 2px;
  }
  
  @media screen and (max-width: 768px) {
    .openTop {
      height: 443px;
      background-size: cover;
    }
  }
  
  .openBottom {
    margin: 20px 8px;
    
    .box {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      // align-items: center;
      .number {
        box-sizing: border-box;
        padding: 8px 0;
        width: 96%;
        background: #ffe3ba;
        border-radius: 5px;
        
        .numList {
          background: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px;
          border-radius: 3px;
          padding: 16px 14px;
          
          .numListTitle {
            p {
              margin: 0px;
              font-size: 14px;
              color: #333333;
              font-weight: 600;
            }
            
            span {
              font-size: 12px;
              color: #666666;
            }
          }
          
          .numListBtn {
            background: linear-gradient(0deg, #f7cc7e 0%, #f9daa3 100%);
            border-radius: 20px;
            width: 120px;
            height: 32px;
            font-size: 12px;
            padding: 0px 8px;
            color: #8d2d20;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .numListBtntwo {
            background: linear-gradient(0deg, #2caff8 0%, #a0e3ff 100%);
            color: #0b699c;
          }
        }
      }
    }
  }
}
</style>
