<template>
<!-- <div>
<el-input placeholder="请输入内容"
  v-model="input"
  clearable></el-input> -->

<div id="container" style="width: 100%; height: calc(100vh - 60px)">
<!-- <el-button @click="drawercode = true" type="primary" ref="code" style="margin-left: 16px;">test</el-button> -->
<el-drawer
  title="Code"
  :visible.sync="drawercode"
  :direction="direction"
  :modal="false"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :append-to-body="true"
  :before-close="beforeclose"
  :show-close="false"
  size=400px
  z-index="999">
  <div class="CodeContent">
    <el-input type="textarea"
    :autosize="{ minRows: 2, maxRows: 7}"
    style="width:90%;left:20px"></el-input>
  </div>
</el-drawer>
</div>
<!-- </div> -->
</template>
<script>
import L from "leaflet";
import Bus from '@/assets/js/Bus.js'
export default {
  name: "MapTwo",
  components: {},
  data(){
    return{
      input:'map',
      drawercode: false,
      direction: 'rtl'
    }
  },
  created() {},
  mounted() {
    // 必须在组件挂载之后初始化地图，不然会报错
    setTimeout(() => {   
        this.initMap()
      }, 100);
    Bus.$on('code1',val => {
          this.drawercode = val;
      })
  },
  
  methods: {
    beforeclose(){
        drawercode:true
        },
    
    initMap() {
      const map = L.map("container", {
        crs: L.CRS.EPSG3857,
        center: [32.086566, 118.830513],
        zoom: 11,
      });
      map.invalidateSize(true);
      console.log("map:", map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors',
      }).addTo(map);
    },
  },
};
</script>
<style scoped>
#container {
  position: relative;
  /* top: 60px; */
  left: 0;
  height: 100%;
  width: 100%;
  bottom: 0;
}


.el-drawer__wrapper {
    width: 400px;
    left: unset;
    margin-top: 60px;
}

    .el-drawer__container {
      width: 400px;}


    
</style>
