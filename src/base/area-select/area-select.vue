<template>
  <div>
    <div class="area-mask " @click="select" :class="{mask_active: status}"></div>
    <transition name="fade">
      <div class="area-contain" :class="{area_contain_active: status}" v-if="status">
        <section class="area-main">
          <header class="area-header">所在地区
            <i class="iconfont icon-close area-close" @click="select"></i>
          </header>
          <div class="area-top  border-a">
            <div class="area-province area-top-item" :class="{area_top_active: 1==areaStatus}" @click="selectArea(1)">{{CheckArea.province}}</div>
            <div class="area-city area-top-item" :class="{area_top_active: 2==areaStatus}" @click="selectArea(2)">{{CheckArea.city}}</div>
            <div class="area-region area-top-item" :class="{area_top_active: 3==areaStatus}" @click="selectArea(3)">{{CheckArea.region}}</div>
          </div>
          <div class="area-content border">
            <ul class="area-data" :class="{none: 1!=areaStatus}">
              <li class="area-data-item" v-for="(item,key,index) in data" @click="checkProvOne(key,item.name)" :class="{red: key==checkProvince}">
                <span class="area-text">{{item.name}}</span>
                <i class="icon-check iconfont" style="margin-left: 0.1rem" :class="{none: key != checkProvince}"></i>
              </li>
            </ul>
            <ul class="area-data" :class="{none: 2!=areaStatus}" v-if="data[checkProvince]">
              <li class="area-data-item" v-for="(item,key,index) in data[checkProvince].child" @click="checkCityOne(key,item.name,checkProvince)" :class="{red: key==checkCity}">
                <span class="area-text">{{item.name}}</span>
                <i class="icon-check iconfont" style="margin-left: 0.1rem" :class="{none: key != checkCity}"></i>
              </li>
            </ul>
            <ul class="area-data" :class="{none: 3!=areaStatus}" v-if="data[checkProvince]&&data[checkProvince].child[checkCity].child">
              <li class="area-data-item" v-for="(item,key,index) in data[checkProvince].child[checkCity].child" @click="checkRegionOne(key,item.name)" :class="{red: key==checkRegion}">
                <span class="area-text">{{item.name}}</span>
                <i class="icon-check iconfont" style="margin-left: 0.1rem" :class="{none: key != checkRegion}"></i>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  created: function() {
    this.$on("area-select", function(id) {
      // ...
    });
  },
  data: function() {
    return {
      maskStatus: true,
      areaStatus: 1,
      checkProvince: 0,
      checkCity: 0,
      checkRegion: 0,
      CheckArea: {
        province: "请选择",
        city: "请选择",
        region: "请选择"
      }
    };
  },
  methods: {
    select: function() {
      // 关闭选择器 广播事件
      this.$emit("areashow", this.CheckArea); // 广播关闭选择器
      let data =
        this.CheckArea.province + this.CheckArea.city + this.CheckArea.region;
      this.$emit("update:area", data); // 更新选择的地址
    },
    selectArea: function(it) {
      // 高亮 省 市 区 其中一个
      this.areaStatus = it;
    },
    checkProvOne: function(it, name) {
      // 选择省份
      this.checkProvince = it;
      this.CheckArea.province = name;
      this.CheckArea.city = this.data[it].child[0].name;
      this.CheckArea.region =
        this.data[it].child[0].child && this.data[it].child[0].child.length != 0
          ? this.data[it].child[0].child[0].name
          : "无";
      this.checkCity = 0;
      (this.checkRegion = 0), (this.areaStatus = 2);
    },
    checkCityOne: function(it, name, its) {
      // 选择市区
      this.checkCity = it;
      this.CheckArea.province = this.data[its].name;
      this.CheckArea.city = name;
      this.CheckArea.region =
        this.data[its].child[it].child &&
        this.data[its].child[it].child.length != 0
          ? this.data[its].child[it].child[0].name
          : "无";
      (this.checkRegion = 0), (this.areaStatus = 3);
    },
    checkRegionOne: function(it, name) {
      // 选择区
      this.CheckArea.province = this.data[this.checkProvince].name;
      this.CheckArea.city = this.data[this.checkProvince].child[
        this.checkCity
      ].name;
      this.checkRegion = it;
      this.CheckArea.region = name;
    }
  }
};
</script>

<style scoped>
.area-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #000;
  opacity: 0.7;
  display: none;
}
.mask_active {
  z-index: 99;
  display: block;
}
.area-contain {
  display: none;
  background-color: #fff;
}
.area_contain_active {
  z-index: 100;
  display: block;
  height: 5rem;
  width: 100%;
  position: fixed;
  top: auto;
  left: 0px;
  bottom: 0px;
}
.area-header {
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  font-size: 0.35rem;
}
.area-close {
  position: absolute;
  right: 0.3rem;
}
.area-top {
  height: 0.8rem;
  line-height: 0.8rem;
}
.area-top-item {
  display: inline-block;
  font-size: 0.33rem;
  padding: 0rem 0.1rem;
  max-width: 2.45rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.area_top_active {
  color: #26a2ff;
  border-bottom: 1px solid #26a2ff;
}
.area-data {
  height: 3.4rem;
  overflow: auto;
}
.area-data-item {
  height: 0.7rem;
  line-height: 0.7rem;
  padding: 0rem 0.2rem;
  font-size: 0.3rem;
}
.red {
  color: #26a2ff;
}
.fade-enter-active,
.fade-leave-active {
  transition: height 0.2s;
}
.fade-enter,
.fade-leave-active {
  height: 0;
}
</style>
