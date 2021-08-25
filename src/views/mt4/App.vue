<template>
  <div>
    <div class="pc">
      <div class="header">
        <div class="content">
          <img class="logo" src="./img/logo.png" alt=""/>
          <div class="kefu" @click="kefuHandle">
            <img src="./img/kefu.png" alt=""/>
            联系客服
          </div>
        </div>
      </div>
      <div class="banner">
        <div class="content">
          <van-form @submit="formHandle" ref="form">
            <div class="title">注册并下载</div>
            <div class="form-cell">
              <van-field
                v-focus-border
                :left-icon="require('./img/ico-b01.png')"
                v-model="form.user_cell"
                name="user_cell"
                clearable
                :rules="[{ pattern: /^((1[3-9][0-9]{1})+\d{8})$/, message: '请输入正确的手机号码' }]"
                placeholder="请输入手机号">
              </van-field>
            </div>
            <div class="form-cell">
              <van-field
                v-focus-border
                :left-icon="require('./img/ico-b04.png')"
                v-model="form.password"
                name="password"
                type="password"
                :rules="[{ pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message: '请输入正确的密码' }]"
                placeholder="请输入8-16位数字加字母的组合密码">
              </van-field>
              <div class="eye">
                <img :src="passwordShow ? require('./img/acc-pwdeye.png') : require('./img/acc-pwdeye2.png')" alt="" @click="passwordShow = !passwordShow">
              </div>
            </div>
            <div class="form-cell">
              <van-field
                v-focus-border
                :left-icon="require('./img/ico-b02.png')"
                v-model="form.msg_code"
                name="msg_code"
                clearable
                :rules="[{ pattern: /^\d{6}$/, message: '请输入正确的短信验证码' }]"
                placeholder="请输入短信验证码">
              </van-field>
              <van-button class="yzmbtn" native-type="button" :disabled="loading || time !== 60"
                          @click="sendMsgCode">
                {{ sendText }}
              </van-button>
            </div>
            <div class="form-cell">
              <van-button block class="submit-btn" native-type="submit" :loading="loading" :disabled="loading"></van-button>
            </div>
          </van-form>
        </div>
      </div>
      
      <div class="box-2">
        <h3>操作更便捷·简单更专业</h3>
        <div class="des">
          功能全/多选择/专业/高效/便捷
        </div>
        <div class="list">
          <div class="item">
            <img src="./img/icon-1.png" alt=""/>
            <div class="title">多种设备</div>
            <div class="text">Windows/Mac/ iOS/Android 多种设备</div>
          </div>
          <div class="item">
            <img src="./img/icon-4.png" alt=""/>
            <div class="title">多种产品</div>
            <div class="text">42+多种产品一站式毫秒级订单执行</div>
          </div>
          <div class="item">
            <img src="./img/icon-3.png" alt=""/>
            <div class="title">自动操作</div>
            <div class="text">支持EA自动化操作可设定止盈止损有效管理风险</div>
          </div>
          <div class="item">
            <img src="./img/icon-2.png" alt=""/>
            <div class="title">图表分析</div>
            <div class="text">自定义添加各种指标,实现全方位图表分析功能</div>
          </div>
        </div>
        <div class="btn now" @click="scrollHandle('pc')">立即体验</div>
      </div>
      
      <div class="box-3">
        <h3>选择艾普环球平台优势</h3>
        <img src="./img/bg-2.png" alt=""/>
      </div>
      
      <div class="box-4">
        <h3>投资者的安心优选平台 保障用户权益安全</h3>
        <div class="list">
          <div class="item">
            <img src="./img/ser01.png" alt=""/>
            <div class="text">全球主流实<br/>时行情软件</div>
          </div>
          <div class="item">
            <img src="./img/ser02.png" alt=""/>
            <div class="text">拥有全方位国际行情<br/>资讯和独家解盘评论</div>
          </div>
          <div class="item">
            <img src="./img/ser03.png" alt=""/>
            <div class="text">让您不管身在何处都能运<br/>筹帷幄, 享受智盈人生</div>
          </div>
        </div>
      </div>
      
      <div class="fixed">
        <div class="now" @click="scrollHandle('pc')">立即体验</div>
        <div class="now" @click="scrollHandle('pc')">免费下载</div>
      </div>
    </div>
    
    <div class="h5">
      
      <div class="banner-div">
        <img class="logo" src="./img/logo.png" alt=""/>
        <div class="kefu" @click="kefuHandle">
          <img src="./img//kefu.png" alt=""/>
          联系客服
        </div>
        <img class="banner-img" src="./img//banner.png" alt=""/>
        <van-form @submit="formHandle" ref="form">
          <div class="title">注册并下载</div>
          <div class="form-cell">
            <van-field
              v-focus-border
              :left-icon="require('./img/ico-b01.png')"
              v-model="form.user_cell"
              name="user_cell"
              clearable
              :rules="[{ pattern: /^((1[3-9][0-9]{1})+\d{8})$/, message: '请输入正确的手机号码' }]"
              placeholder="请输入手机号">
            </van-field>
          </div>
          <div class="form-cell">
            <van-field
              v-focus-border
              :left-icon="require('./img/ico-b04.png')"
              v-model="form.password"
              name="password"
              :type="passwordShow ? 'text' : 'password'"
              :rules="[{ pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message: '请输入正确的密码' }]"
              placeholder="请输入8-16位数字加字母的组合密码">
            </van-field>
            <div class="eye">
              <img :src="passwordShow ? require('./img/acc-pwdeye.png') : require('./img/acc-pwdeye2.png')" alt="" @click="passwordShow = !passwordShow">
            </div>
          </div>
          <div class="form-cell">
            <van-field
              v-focus-border
              :left-icon="require('./img/ico-b02.png')"
              v-model="form.msg_code"
              name="msg_code"
              clearable
              :rules="[{ pattern: /^\d{6}$/, message: '请输入正确的短信验证码' }]"
              placeholder="请输入短信验证码">
            </van-field>
            <van-button class="yzmbtn" native-type="button" :disabled="loading || time !== 60"
                        @click="sendMsgCode">
              {{ sendText }}
            </van-button>
          </div>
          <div class="form-cell">
            <van-button block class="submit-btn" native-type="submit" :loading="loading" :disabled="loading"></van-button>
          </div>
        </van-form>
      </div>
      
      <div class="box-2">
        <h3>操作更便捷·简单更专业</h3>
        <div class="des">
          功能全/多选择/专业/高效/便捷
        </div>
        <div class="list">
          <div class="item">
            <img src="./img//icon-1.png" alt=""/>
            <div class="title">多种设备</div>
            <div class="text">Windows/Mac/ iOS/Android 多种设备</div>
          </div>
          <div class="item">
            <img src="./img//icon-4.png" alt=""/>
            <div class="title">多种产品</div>
            <div class="text">42+多种产品一站式毫秒级订单执行</div>
          </div>
          <div class="item">
            <img src="./img//icon-3.png" alt=""/>
            <div class="title">自动操作</div>
            <div class="text">支持EA自动化操作可设定止盈止损有效管理风险</div>
          </div>
          <div class="item">
            <img src="./img//icon-2.png" alt=""/>
            <div class="title">图表分析</div>
            <div class="text">自定义添加各种指标,实现全方位图表分析功能</div>
          </div>
        </div>
        <div class="btn now" @click="scrollHandle('h5')">立即体验</div>
      </div>
      
      <div class="box-3">
        <h3>选择艾普环球平台优势</h3>
        <img src="./img//bg-2.png" alt=""/>
      </div>
      
      <div class="box-4">
        <h3>投资者的安心优选平台<br/>保障用户权益安全</h3>
        <div class="list">
          <div class="item">
            <img src="./img//item-1.png" alt=""/>
            <div class="text">全球主流实时行情软件</div>
          </div>
          <div class="item">
            <img src="./img//item-2.png" alt=""/>
            <div class="text">拥有全方位国际行情<br/>资讯和独家解盘评论</div>
          </div>
          <div class="item">
            <img src="./img//item-3.png" alt=""/>
            <div class="text">让您不管身在何处都能运筹帷幄 享受智盈人生</div>
          </div>
        </div>
      </div>
      
      <div class="fixed">
        <div class="now" @click="scrollHandle('h5')">立即体验</div>
        <div class="now" @click="scrollHandle('h5')">免费下载</div>
      </div>
    </div>
  </div>
</template>

<script>
import {randomCoding, statistics} from '@/common/util'
import {Base64} from 'js-base64'
import md5 from 'md5'

export default {
  data() {
    return {
      loading: false,
      form: {
        user_cell_zd: '86',
        user_cell: '',
        password: '',
        msg_code: ''
      },
      passwordShow: false,
      sendText: '获取验证码',
      time: 60,
      timer: null,
    }
  },
  mounted() {
    statistics()
  },
  methods: {
    kefuHandle() {
      window.open('https://html.ecqun.com/kf/sdk/openwin.html?corpid=14301445&cstype=rand&mode=0&cskey=R4cU4UQVnPEvf8wWvs&scheme=1&source=100')
    },
    scrollHandle(type) {
      $('html,body').animate({
        scrollTop: $('form:visible').offset().top - (type === 'h5' ? 200 : 0)
      }, 1000);
    },
    // 获取code
    getCode() {
      const scode = randomCoding()
      return new Promise((resolve, reject) => {
        this.$http.post('Home/setslidercode', {scode}).then(res => {
          this.form.scode = scode
          this.form.basecode = Base64.decode(res.data.basecode.slice(16, -16))
          resolve()
        })
      })
    },
    // 发送验证码
    sendMsgCode() {
      console.log($)
      this.$refs['form'].validate('user_cell').then(() => {
        this.loading = true
        this.getCode().then(() => {
          this.sendPhoneCode()
        })
      })
    },
    // 获取手机验证码
    sendPhoneCode() {
      const params = {
        user_cell: this.form.user_cell,
        user_cell_zd: this.form.user_cell_zd,
        scode: this.form.scode,
        basecode: this.form.basecode
      }
      this.loading = true
      this.$http.post('/Home/check', params).then(res => {
        this.form.msg_code = ''
        this.sendText = this.time + 's'
        this.resetTimer()
        this.$toast.success('发送成功')
      }).finally(() => {
        this.loading = false
      })
    },
    // 验证计时器
    resetTimer() {
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.time--
        this.sendText = this.time + 's'
        if (this.time === 0) {
          this.time = 60
          this.sendText = '获取验证码'
          return clearInterval(this.timer)
        }
      }, 1000)
    },
    formHandle() {
      const params = {
        ...this.form,
        password: md5(this.form.password)
      }
      this.loading = true
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      });
      this.$http.post('home/registerPc', params).then(res => {
        this.$toast.success('注册成功')
        statistics({
          token: res.data
        }).finally(() => {
          if (document.body.clientWidth > 767) {
            // return location.href = "https://client.alpfxg.co/login/"
            return window.open("https://client.alpfxg.co/login/")
          }
          location.href = "./mt4_hongbao.html?account=" + res.data;
        })
        
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>


<style lang="scss">
.h5 {
  display: none;
  background: #fef2f2;
}

.pc {
  min-width: 1200px;
  background: #fff6f6;
}

@media (max-width: 767px) {
  .h5 {
    display: block;
  }
  .pc {
    display: none;
  }
}

.pc {
  .header {
    background: #e70000;
    
    .content {
      box-sizing: border-box;
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .logo {
      width: 125px;
    }
    
    .kefu {
      cursor: pointer;
      box-sizing: border-box;
      width: 125px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      border: 1px solid #ffffff;
      border-radius: 18px;
      
      img {
        width: 20px;
        margin-right: 5px;
      }
    }
  }
  
  .banner {
    position: relative;
    height: 560px;
    background: url("./img/banner-pc.png") no-repeat center;
    
    .content {
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      max-width: 1200px;
      height: 100%;
      width: 100%;
      margin: 0 auto;
    }
  }
  
  h3 {
    font-size: 46px;
    font-family: PingFang SC, PingFang SC-Semibold;
    font-weight: 600;
    text-align: center;
    color: #333333;
    line-height: 1.5;
  }
  
  .box-2 {
    max-width: 1200px;
    margin: 0 auto;
    
    h3 {
      margin: 101px auto 20px;
    }
    
    .des {
      font-size: 30px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: center;
      color: #666666;
      margin-bottom: 131px;
    }
    
    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 100px;
      
      .item {
        width: 220px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        
        img {
          width: 125px;
          margin-bottom: 32px;
        }
        
        .title {
          font-size: 26px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: center;
          color: #565656;
          margin-bottom: 28px;
        }
        
        .text {
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: center;
          color: #565656;
          line-height: 35px;
        }
      }
    }
    
    .btn {
      cursor: pointer;
      margin: 0 auto;
      width: 300px;
      height: 60px;
      line-height: 60px;
      background: #d2211a;
      border-radius: 10px;
      box-shadow: 0px 5px 0px 0px #a70311;
      font-size: 26px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: center;
      color: #ffffff;
    }
  }
  
  .box-3 {
    max-width: 1200px;
    margin: 0 auto;
    
    h3 {
      margin: 146px 0 63px;
    }
    
    img {
      width: 687px;
      display: block;
      margin: 0 auto;
    }
  }
  
  .box-4 {
    max-width: 1000px;
    margin: 0 auto;
    padding-bottom: 73px;
    
    h3 {
      margin: 146px 0 65px;
    }
    
    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .item {
        width: 280px;
        
        img {
          display: block;
          width: 100%;
        }
        
        .text {
          height: 114px;
          background: #FFF;
          line-height: 1.5;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          color: #565656;
          text-align: center;
        }
      }
    }
  }
  
  .fixed {
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 87px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    div {
      cursor: pointer;
      width: 300px;
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: bold;
      text-align: center;
      border-radius: 10px;
      color: #FFF;
      background: #A70311;
      box-shadow: 0px 5px 0px 0px #be0000;
      
      &:last-child {
        color: #7D2A05;
        background: #FFBF4F;
        box-shadow: 0px 5px 0px 0px #a74504;
        margin-left: 32px;
      }
    }
  }
}

.h5 {
  h3 {
    font-size: 23px;
    font-family: PingFang SC, PingFang SC-Semibold;
    font-weight: 600;
    text-align: center;
    color: #333333;
    line-height: 1.5;
  }
  
  .banner-div {
    position: relative;
    
    .banner-img {
      width: 100%;
      display: block;
    }
    
    .logo {
      width: 70px;
      position: absolute;
      left: 15px;
      top: 13px;
    }
    
    .kefu {
      width: 88px;
      height: 22px;
      position: absolute;
      right: 15px;
      top: 11px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      color: #FFFFFF;
      border: 1px solid #ffffff;
      border-radius: 12px;
      
      img {
        width: 14px;
        height: 14px;
        margin-right: 5px;
      }
    }
    
    
    
    form {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 26px;
      padding: 0 9px 38px;
      width: 92%;
      height: auto;
      margin: 0 auto;
  
      .title {
        &::before {
          width: 80px;
          right: 15px;
        }
        &::after {
          left: 15px;
          width: 80px;
        }
      }
  
      .eye {
        position: absolute;
        right: 16px;
        top: 0;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 18px;
        }
      }
  
      .van-field {
        padding: 0 0 25px 0;
        flex: 1;
    
        &.input-active {
          .van-field__body {
            border-color: red;
          }
        }
    
        .van-field__left-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 10px;
          top: 5px;
      
          i {
            font-size: 18px;
          }
        }
  
        .van-field__clear {
          font-size: 18px;
        }
    
        .van-field__value {
        }
    
        .van-field__body {
          border: 1px solid #666666;
          border-radius: 10px;
          transition: all 0.3s;
          padding: 0 16px 0 35px;
        }
    
        .van-field__error-message {
          position: absolute;
        }
    
        input {
          height: 32px;
          font-size: 15px;
        }
      }
  
      .yzmbtn {
        width: 96px;
        height: 32px;
        font-size: 12px;
        border-radius: 16px;
        background: #d2681a;
        text-align: center;
        border: none;
        color: #FFF;
        margin-left: 15px;
      }
  
      .submit-btn {
        height: 46px;
      }
    }
    
  }
  
  .box-2 {
    h3 {
      margin: 39px 0 10px;
    }
    
    .des {
      font-size: 15px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: center;
      color: #666666;
      margin: 0 0 38px;
    }
    
    .list {
      box-sizing: border-box;
      padding: 0 35px 0;
      display: flex;
      flex-wrap: wrap;
      
      .item {
        text-align: center;
        width: 50%;
        box-sizing: border-box;
        padding: 0 15px 30px;
        
        img {
          width: 63px;
          margin-bottom: 12px;
        }
        
        .title {
          font-size: 17px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: bold;
          text-align: center;
          color: #565656;
          margin-bottom: 10px;
        }
      }
    }
    
    .btn {
      margin: 0 23px;
      font-size: 15px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
      height: 44px;
      line-height: 44px;
      background: #d2211a;
      border-radius: 5px;
      box-shadow: 0px 3px 0px 0px #a70311;
    }
  }
  
  .box-3 {
    padding: 0 20px;
    
    h3 {
      margin: 46px 0 32px;
    }
    
    img {
      width: 100%;
    }
  }
  
  .box-4 {
    h3 {
      margin: 37px 0 36px;
    }
    
    .list {
      box-sizing: border-box;
      padding: 0 10px 90px;
      
      .item {
        position: relative;
        
        img {
          width: 100%;
        }
        
        .text {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          right: 0;
          top: 0;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 0 20px 0 28%;
        }
      }
    }
  }
  
  .fixed {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    
    div {
      height: 56px;
      line-height: 56px;
      flex: 1;
      font-size: 18px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: bold;
      text-align: center;
      color: #971d14;
      background: #FFF;
      
      &:last-child {
        color: #ffffff;
        background: #971d14;
      }
    }
  }
  
}

form {
  
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 3px;
  width: 540px;
  height: 490px;
  padding: 0 31px 34px;
  
  .title {
    position: relative;
    opacity: 1;
    font-size: 23px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: center;
    color: #333333;
    margin: 30px auto 23px;
    
    &::before, &::after {
      content: "";
      display: block;
      position: absolute;
      top: 15px;
      width: 135px;
      height: 2px;
      border-radius: 1px;
    }
  
    &::before {
      right: 30px;
      background: linear-gradient(to right, #d2211a, #ffffff);
    }
    &::after {
      left: 30px;
      background: linear-gradient(to left, #d2211a, #ffffff);
    }
  }
  
  .form-cell {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
  }
  
  .eye {
    position: absolute;
    right: 16px;
    top: 0;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 26px;
    }
  }
  
  .van-field {
    padding: 0 0 40px 0;
    flex: 1;
    
    &.input-active {
      .van-field__body {
        border-color: red;
      }
    }
  
    .van-field__left-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 10px;
      top: 17px;
    
      i {
        font-size: 26px;
      }
    }
    
    .van-field__clear {
      font-size: 26px;
    }
    
    .van-field__value {
    }
    
    .van-field__body {
      border: 1px solid #666666;
      border-radius: 10px;
      transition: all 0.3s;
      padding: 0 16px 0 40px;
    }
    
    .van-field__error-message {
      position: absolute;
    }
    
    input {
      height: 56px;
      font-size: 18px;
    }
  }
  
  .yzmbtn {
    width: 163px;
    height: 56px;
    font-size: 18px;
    border-radius: 28px;
    background: #d2681a;
    text-align: center;
    border: none;
    color: #FFF;
    margin-left: 15px;
  }
  
  .submit-btn {
    background: url("./img//btn.png") no-repeat center;
    background-size: 100%;
    height: 56px;
    border-radius: 10px;
  }
}


</style>
