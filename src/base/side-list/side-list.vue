<template>
  <div class="sidelist" @click="select">
    <i class="icomoon" :class="side_iconclass"></i>
    <span class="title">{{side_title}}</span>
    <span class="disc" v-show="showDisc">{{side_disc}}</span>
  </div>
</template>

<script>
export default {
  props: {
    iconclass: {
      type: String,
      default: ""
    },
    sidetitle: {
      title: String,
      default: ""
    },
    disc: {
      title: String,
      default: ""
    }
  },
  data() {
    return {
      side_iconclass: this.iconclass,
      side_title: this.sidetitle,
      side_disc: this.disc
    };
  },
  methods: {
    select(){
      this.$emit('select')
    }
  },
  computed: {
    showDisc() {
      return this.side_disc.length;
    }
  },
  mounted() {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.sidelist {
  position: relative;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 0;
  padding: 0 15px;
  box-sizing: border-box;

  // background:#fff
  &:active {
    background: #fff;
  }

  .icomoon, .title {
    display: inline-block;
    vertical-align: middle;
  }

  .icomoon {
    font-size: 16px;
    margin-right: 6px;
    color: #9a9a9a;
  }

  .title {
    font-size: 14px;
    color: $color-text;
  }

  .disc {
    position: absolute;
    right: 15px;
    font-weight: 400;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    color: #9c9c9c;
    font-size: 10px;
  }
}
</style>
