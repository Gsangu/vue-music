<template>
  <div class="sidebar">
    <transition name="fade" @touchmove.stop.prevent>
      <div class="menu-mask" v-show="showFlag" @click="hide"></div>
    </transition>

    <transition name="side">
      <div class="menu-content" v-show="showFlag">
        <div class="menu-detail">
          <div class="menu-userInfo" :style="{ backgroundImage: 'url(http://www.daiwei.org/index/images/img/indeximg.jpg)',backgroundSize: 'cover' }">
            <img class="avatar" src="http://www.daiwei.org/static/images/userlogo.jpg" width="56" height="56">
            <div class="user-detail">
              <span class="name">name</span>
              <img class="isvip" src="" alt="">
              <span class="progress">Lv.2</span>
            </div>
            <span class="sign" @click="signClick">
              <i v-show="showIcon" class="icomoon-coin"></i>{{sign}}</span>
          </div>
        </div>
        <div class="content">
          <side-list @select="myInfo" iconclass="icomoon-message" sidetitle="我的消息" disc=""></side-list>
          <side-list @select="myInfo" iconclass="icomoon-friend" sidetitle="导入歌单"></side-list>
          <side-list @select="myInfo" iconclass="icomoon-theme" sidetitle="个性换肤" disc="官方黑"></side-list>
        </div>
        <div class="footer">
          <p class="border-1px"></p>
          <div class="nightmode" @click="myInfo">
            <i class="icomoon-night"></i>
            <span>夜间模式</span>
          </div>

          <div class="setting">
            <i class="icomoon-setting"></i>
            <span>设置</span>
          </div>

          <div class="exit">
            <i class="icomoon-exit"></i>
            <span>退出</span>
          </div>
        </div>
      </div>
    </transition>
      <confirm ref="confirm" :isAlert="isAlert" confirmBtnText="确认">功能开发中...<br>敬请期待！</confirm>
  </div>
</template>

<script>
// import store from './../../store'
// import split from './../split/split'
import SideList from "base/side-list/side-list";
import Confirm from "base/confirm/confirm";

export default {
  data() {
    return {
      sign: "签到",
      showIcon: true,
      userInfo: "",
      showFlag: false,
      isAlert: true
    };
  },
  methods: {
    // 显示菜单
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    // 点击签到
    signClick() {
      this.sign = "已签到";
      this.showIcon = false;
    },
    myInfo() {
      this.$refs.confirm.show();
    }
  },
  components: {
    SideList,
    Confirm
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.sidebar {
  text-align: left;

  .menu-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 1;
    z-index: 200;
    background: $color-background-d;
    transfrom: translateZ(0);

    &.fade-enter-to, &.fade-leave-to {
      transition: opacity 0.3s;
    }

    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }
  }

  .menu-content {
    position: fixed;
    width: 286px;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 210;
    overflow-y: auto;
    background: $color-background;
    -webkit-overflow-scrolling: touch;

    &.side-enter-to, &.side-leave-to {
      transition: transform 0.3s;
    }

    &.side-enter, &.side-leave-to {
      transform: translate3d(-286px, 0, 0);
    }

    .menu-userInfo {
      box-sizing: border-box;
      width: 100%;
      height: 168px;
      // background:#FC5151
      position: relative;
      padding: 50px 15px 15px 15px;

      .avatar {
        position: absolute;
        bottom: 50px;
        left: 15px;
        border-radius: 50%;
      }

      .user-detail {
        position: absolute;
        bottom: 20px;
        left: 15px;
        font-size: 0;

        .name {
          display: inline-block;
          font-size: 16px;
          font-weight: 500;
          color: #fff;
          vertical-align: middle;
          max-width: 130px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .isvip {
          width: 14px;
          height: 14px;
          vertical-align: middle;
          margin-left: 6px;
        }

        .progress {
          font-size: 8px;
          padding: 1px 4px;
          border-radius: 8px;
          color: #fff;
          font-weight: 400;
          border: 1px solid #fff;
          margin-left: 6px;
          vertical-align: middle;
        }
      }

      .sign {
        display: inline-block;
        height: 14px;
        line-height: 14px;
        position: absolute;
        bottom: 15px;
        font-size: 12px;
        right: 15px;
        padding: 4px 8px;
        border: 1px solid #e1e1e1;
        border-radius: 12px;
        color: #fff;

        &:active {
          background: $rgba_active;
        }

        i {
          height: 14px;
          margin-right: 5px;
          vertical-align: top;
        }
      }
    }

    .content {
      background: $color-background;
      display: block;
      padding-bottom: 40px;
    }

    .footer {
      background: red;
      position: fixed;
      transfrom: translateZ(0);
      bottom: 0;
      height: 40px;
      width: 286px;
      font-size: 0;
      background: $color-background;

      .border-1px {
        border-1px($border_1px);
      }

      div {
        display: inline-block;
        font-size: 16px;
        height: 100%;
        text-align: center;

        i {
          color: $icon_color;
          font-size: 18px;
          vertical-align: middle;
        }

        span {
          font-size: 16px;
          vertical-align: middle;
        }

        &:active {
          background: $list_active;
        }

        &.nightmode {
          width: 40%;
          line-height: 40px;
        }

        &.setting, &.exit {
          width: 30%;
          line-height: 40px;
        }
      }
    }
  }
}
</style>
