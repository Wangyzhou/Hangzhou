<template>
  <div class="" background-color="#273142">
    
    <el-container class="heightAll">
      <el-aside width="150px" class="el-aside-style">
        <el-menu
          background-color="#273142"
          text-color="#EFEFEF"
          active-text-color="#fc4c02"
          class="heightAll"
          ref="navitwo"
        >
          <el-menu-item index="1" @click="drawer_test()">
            <i class="el-icon-document"></i>
            <span slot="title">数据</span>
            <!-- <div style="height: calc(100vh - 40px)"> -->
            <drawer-component v-if="Visiable1" ref="drawer" style="left:150px"></drawer-component>
            <!-- </div> -->
          </el-menu-item>
          <el-menu-item index="2" @click="drawer_tab()">
            <i class="el-icon-document"></i>
            <span slot="title">图层</span>
            <drawertab-component v-if="Visiable2" ref="drawertab" style="left:150px"></drawertab-component>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">符号库</span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>典型应用</span>
            </template>
            <el-menu-item index="4-1"> 类别图 </el-menu-item>
            <el-menu-item index="4-2"> 渐进图 </el-menu-item>
            <el-menu-item index="4-3"> 气泡图 </el-menu-item>
            <el-menu-item index="4-4"> 热力图 </el-menu-item>
            <el-menu-item index="4-5"> 聚合图 </el-menu-item>
            <el-menu-item index="4-6"> 时态图 </el-menu-item>
          </el-submenu>
          <el-menu-item index="5">
            <i class="el-icon-document"></i>
            <span slot="title">故事地图</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
                <MapTwo></MapTwo>
      </el-container>
    </el-container>
    
  </div>
</template>
<script>
import MapTwo from "./MapTwo.vue";
import drawerComponent from "./drawerComponent.vue";
import drawertabComponent from "./drawertabComponent.vue";
export default {
  name: "PageIndex2D",
  components: {
    MapTwo,
    drawerComponent,
    drawertabComponent,
  },
  data() {
    return {
      Visiable1: false,
      Visiable2: false,
    };
  },
  beforeRouteLeave(to,from,next){
      if(this.name === 'maptwo'){
      global.codeVisiable1 = "false";
      }
      next()
      console.log(this.codeVisiable1)
      console.log(this, 'beforeRouteLeave');
      console.log(to, '组件独享守卫beforeRouteLeave第一个参数');
  },
  methods: {
    drawer_test() {
      this.Visiable1 = true;
      this.Visiable2=false;
      this.$nextTick(() => {
        this.$refs.drawer.init();
      });
    },
    drawer_tab() {
      this.Visiable1=false;
      this.Visiable2 = true;
      this.$nextTick(() => {
        this.$refs.drawertab.init();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.heightAll {
  height: calc(100vh - 60px);
}
.el-aside-style {
  height: calc(100vh - 60px);
  z-index: 100000 !important;
}
.el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
    min-width: 150px;
}
:deep() .el-main {
  padding: 0;
}
:deep() .el-menu {
  border-right: none;
  overflow-x: hidden;
}


</style>

