<template>
<el-drawer
  title="可视化模板"
  :visible.sync="drawer"
  :direction="direction"
  :modal="false"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :append-to-body="true"
  :modal-append-to-body=false
  :show-close="false"
  size=400px>
  
  <div>
  <el-row :gutter="20" style="width: 400px;">
              <el-col
                :span="6"
                v-for="item in functionlist"
                :xs="{ span: 6 }"
                :sm="{ span: 12 }"
                :md="{ span: 12 }"
                :lg="{ span: 12 }"
                :xl="{ span: 12 }"
                >
                <div class="grid-content bg-purple">
                  <div class="item-list">
                    <!-- <router-link :to="item1.path"> -->
                 <img 
                  :src="item.imgurl"
                  class="item-picture"
                  v-on:click="tofunc()">
                  <!-- </router-link> -->
                  </div>
                  
                  <div class="item-title">
                    <span>{{ item.name }}</span>
                  </div>
                </div></el-col
              >
  </el-row>
  <DialogComponent v-if="dialogVisiable" ref="dialog" v-on="$listeners"></DialogComponent>
  </div>
</el-drawer>

</template>
<script>
import DialogComponent from './dialogComponent.vue';
  export default {
    name:"drawerComponent",
    components:{
    DialogComponent
},
    data() {
      return {
        drawer: false,
        direction: 'ltr',
        detailFileList: [],
        containerHeight: {
        height: "" 
      } ,
      dialogVisiable:false,
        functionlist:[
          {
            imgurl:"..//..//public//WFS_PointSingleRender.png",
            name:"点单值渲染"
          },
          // {
          //   imgurl:"..//..//public//wfs//pointRender//pointur//WFS_PointUniqueRender.png",
          //   name:"点唯一值渲染"
          // },
        ]    
      };
    },
  //   created() {
  //   //动态调整左侧菜单栏高度
  //   var docHeight = document.documentElement.clientHeight;
  //   this.containerHeight.height = docHeight - 40 + "px";
  //   console.log(docHeight)
  // },
    methods: {
        init(){
          this.drawer=!this.drawer;
        },
        tofunc(){
          this.dialogVisiable = true;
            this.$nextTick(() => {
                this.$refs.dialog.init();
            });
        }
    }
  };
</script>
<style scoped>
/* .el-drawer.ltr{
  left: 150px;
} */
.el-drawer{
  
  /* min-height: calc(100vh -36px);  */
  position: absolute;
  z-index: -1;
  overflow-x: hidden;
}
.el-drawer__header{
  height: 30px;
  margin: 12px;
  padding: 12px;
  font-size: 16px;
  /* border-bottom: 1px solidrgba(0,0,0,.08); */
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(0, 0, 0, 0.08);
  /* color: #ffffFF; */
  /* background: rgba(19, 32, 42, 0.5) !important; */
}
.el-drawer__body{
  overflow-x: hidden;
}
 .el-drawer__wrapper {
    width: 400px;
    /* margin-top: 60px; */
    }

    .el-drawer__container {
      width: 400px;}


    
</style>
