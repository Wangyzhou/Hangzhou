<template>
<el-drawer
  title="LAYER"
  :visible.sync="drawertab"
  :direction="direction"
  :modal="false"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :append-to-body="true"
  size="400px" >
  <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="视图1" name="first">视图1
    <img src="E:\program\vue_test\demo\src\assets\logo.png" @click="handClick()">
    <dialog-component v-if="Visiable" ref="dialog"></dialog-component>
    </el-tab-pane>
    <el-tab-pane label="视图2" name="second">视图2</el-tab-pane>
  </el-tabs> -->
 

</el-drawer>
</template>

<script>
import dialogComponent from './dialogComponent.vue';
  export default {
    name:"drawerComponent",
    components:{
      dialogComponent
    },
    data() {
      return {
        drawertab: false,
        Visiable: false,
        direction: 'ltr',
        activeName: 'first'
      };
    },
    methods: {
        init(){
          this.drawertab=!this.drawertab;
        },
        handClick() {
          this.Visiable = true;
          this.$nextTick(() => {
            //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
            //init调用的是dialog-component组件里面的init方法
            //data是传递给弹窗页面的值
            this.$refs.dialog.init();
          });
        },
        handleClick(tab, event) {
        console.log(tab, event);
      }
        
    }
    
  };
</script>
<style scoped>
/* .el-drawer.ltr{
  left: 150px;
} */
.el-drawer{
  margin-top: 60px;
  min-height: calc(100vh -36px); 
  position: absolute;
  z-index: -1;
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
.el-drawer__wrapper {
  width: 400px;
  margin-top: 60px;
}
.el-drawer__container {
  width: 400px;}

.el-upload-dragger{
  width: 380px;
  height: 200px;
  left: 10px;
}
.el-upload-dragger:hover{
  border-color: #fc4c02;
}
.el-upload-dragger.is-active{
  border-color: #fc4c02;
}
.el-upload-dragger .el-upload__text em {
    color: #fc4c02;
}
</style>