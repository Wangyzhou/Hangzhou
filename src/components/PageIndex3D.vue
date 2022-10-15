<template>
  <div class="" background-color="#273142">
    
    <el-container class="heightAll">
      <el-aside width="150px" class="el-aside-style">
        
        <el-menu
          background-color="#273142"
          text-color="#EFEFEF"
          active-text-color="#fc4c02"
          class="el-menu-vertical-demo heightAll"
          ref="navithree"
          id="navithree"
        >
          <el-menu-item index="1" @click="drawer_test()">
            <i class="el-icon-document"></i>
            <span slot="title">数据</span>
            <drawer-component v-if="Visiable1" ref="drawer" style="left:150px "></drawer-component>
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
        <!-- <div></div> -->
                <MapThree></MapThree>
      </el-container>
    </el-container>
    
  </div>
</template>
<script>
import drawerComponent from "./drawerComponent.vue";
import drawertabComponent from "./drawertabComponent.vue";
import MapThree from "./MapThree.vue";
export default {
  name: "PageIndex3D",
  components: {
    drawerComponent,
    drawertabComponent,
    MapThree
},
  data() {
    return {
      Visiable1: false,
      Visiable2: false,
    };
  },
  methods: {
    
    drawer_test() {
      this.Visiable1 = true;
      this.Visiable2 =false;
      this.$nextTick(() => {
        //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
        //init调用的是dialog-component组件里面的init方法
        //data是传递给弹窗页面的值
        this.$refs.drawer.init();
      });
    },
    drawer_tab() {
      this.Visiable1 = false;
      this.Visiable2 = true;
      this.$nextTick(() => {
        //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
        //init调用的是dialog-component组件里面的init方法
        //data是传递给弹窗页面的值
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
  z-index: 9999 !important;
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
/* :deep() .el-menu-item:hover {
  background-color: #ecf5ff !important;
}
:deep() .el-menu-item.is-active {
  background-color: #fc4c02 !important;
} */
:deep() .el-tabs__item {
  font-size: 20px;
}
:deep() .el-tabs__header {
  padding-left: 3px;
  margin: 0 0 3px;
}
:deep() .el-tabs__nav-wrap::after {
  position: static !important;
  /* background-color: rgb(201, 50, 50); */
  /* height: 3px; */
}
:deep() .el-tabs__active-bar {
  background-color: #273142;
  /* left: 1px; */
  height: 3px;
}
:deep() .el-tabs__item.is-active {
  /* color: #df4a0a; */
  color: #273142;
  font-weight: 800;
}
:deep().el-tabs__item:hover {
  color: #273142;
  font-weight: 800;
}


</style>

