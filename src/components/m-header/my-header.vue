<template>
  <div class="m-header">
    <side-bar ref="sideBar"></side-bar>
    <i @click="showMenu" class="icomoon icomoon-menu"></i>
    <div class="icon"></div>
    <div class="text">Gsan Music</div>
    <router-link to="/user" class="mine" tag="div">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
import SideBar from 'components/side-bar/side-bar'

export default {
  components: {
    SideBar
  },
  methods: {
    showMenu() {
      this.$refs.sideBar.show()
    }
  }
};
</script>

<style scoped lang="stylus" rel=stylesheet/stylus>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.m-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;

  .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9px;
    bg-image('logo');
    background-size: 30px 32px;
  }

  .icomoon-menu {
    font-size: 26px;
    position: absolute;
    left: 16px;
    top: 10px;
  }

  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }

  .mine {
    position: absolute;
    top: 0;
    right: 0;

    .icon-mine {
      display: block;
      padding: 10px 16px;
      font-size: 20px;
      color: $color-theme;
    }
  }
}
</style>
