<template>
    <div id="cesiumContainer" style="width: 100%; height: calc(100vh - 60px)">
    <el-drawer
  title="Code"
  :visible.sync="drawercode"
  :direction="direction"
  :modal="false"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :append-to-body="true"
  :show-close="false"
  size=400px
  z-index="999">
  <div style="left:20px;position: relative;" class="test1"><el-button >运行</el-button></div>
  
  <div class="CodeContent">
    <el-input type="textarea"
    :autosize="{ minRows: 2, maxRows: 7}"
    style="width:90%;left:20px"></el-input>
  </div>
</el-drawer>
    </div>
</template>
 
<script>
import Bus from "@/assets/js/Bus.js"
export default {
  name: 'MapThree',
  data(){
    return{
      drawercode: false,
      direction: 'rtl'
    }
  },
  mounted(){
    setTimeout(() => {   
        this.init()
      }, 100);
    Bus.$on("code2",val =>{
      this.drawercode =val
    })
  },
  methods: {
    init() {
      
      let Cesium = this.cesium;
      Cesium.Ion.defaultAccessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODcyNDNhMi02YmJlLTQxZTUtYTJlMC1jMTBlZTI1NDQ0YzMiLCJpZCI6MTAxODExLCJpYXQiOjE2NTgyODQyMTF9.f48uLZSj85zROu2eafVTxEpgii6rYwgi3Q9eN5-0wF4';
      Cesium.Camera.DEFAULT_VIEW_FACTOR=1//摄像机视口远近参数，可设置地球大小
      let viewer = new Cesium.Viewer('cesiumContainer',{
      });
      viewer._cesiumWidget._creditContainer.style.display = "none";// 隐藏版权
    }
  }
};
</script>
 
<style scoped>
#cesiumContainer {
  width: 100%;
  /* height: 100%; */
  position: relative;
  /* margin: 0; */
  /* padding: 0; */
  /* overflow: scroll; */
}
.el-drawer__wrapper {
    width: 400px;
    left: unset;
    margin-top: 60px;
}

    .el-drawer__container {
      width: 400px;}


   
</style>
