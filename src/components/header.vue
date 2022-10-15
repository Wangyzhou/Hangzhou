<template>
<div>
  <el-header class="content-header" style="height:60px">
        <el-menu mode="horizontal"
        class="el-menu-demo"
        background-color="#273142"
        text-color="#efefef"
        active-text-color="#fc4c02"
        >
        <img class="logo" src="../assets/地图1.png" alt="onesis" />
        <h3 class="itemName">OneSIS</h3>
          <el-menu-item index="1" @click="toIndex()">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">功能分类</template>
            <el-menu-item index="2-1" @click="toMap()">二维</el-menu-item>
            <el-menu-item index="2-2" @click="toMapThree()">三维</el-menu-item>
          </el-submenu>
          <el-button v-show="$route.path=='/maptwo'" @click="code()" type="text" class="code-btn">code</el-button>
          <el-button v-show="$route.path=='/mapthree'" @click="code1()" type="text" class="code-btn">code</el-button>
        </el-menu>
        
      </el-header>
      
      </div>
</template>
<script>
// import maptwo from './MapTwo.vue'
import Bus from "@/assets/js/Bus.js"
  export default{
    name:'vHeader',
    components:{
      // maptwo
    },
    
    
    methods: {
      // search(){
      //   this.$router.push({path: this.path, query: {query: this.query}});
      //   this.query = '';
      // }
      code() {
      this.codeVisiable = !this.codeVisiable;
      // this.$nextTick(() => {
      //   this.$refs.drawercode.init();
      // });
      Bus.$emit(
         'code1'
         , this.codeVisiable)
         console.log(this.codeVisiable)
    },
    beforeDestroy(){
    Bus.$off('code1')
    Bus.$off("code2")
  },
  code1() {
      this.codeVisiable1 = !this.codeVisiable1;
      // this.$nextTick(() => {
      //   this.$refs.drawercode.init();
      // });
      Bus.$emit("code2",this.codeVisiable1)
    },
    beforeDestroy(){
    Bus.$off('code1')
    Bus.$off("code2")
  },
      toIndex(){
        this.$router.push({path:'/home'})
      },
      toMap(){
        this.$router.push({path:'/maptwo'})
      },
      toMapThree(){
        this.$router.push({path:'/mapthree'})
      }
    }
  };
</script>
<style scoped>
.code-btn {
  color:#efefef;
  /* background: #273142; */
  margin-top: 10px;
  right:20px;
  position: absolute;
}
.code-btn :hover{
  color:#fc4c02;
}

.code-btn :focus{
  color:#fc4c02;
}
.logo{
  width:50px;
  height:50px;
  position: fixed;
  float:left;
  left:10px;
  top:5px;
}
.code{
  width:12px;
  height:12px;
  /* vertical-align: -30% */
}
.text{
  text-align: center;
  /* vertical-align: 70% */
}
.itemName{
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 60px;
  position: fixed;
  left:65px;
  /* top:0px; */
  /* text-shadow: (2px 1px 3px red); */
}
.content-header {
  /* margin: 0; */
  padding-left: 0px;
  padding-right: 0px;
  /* margin-bottom: 1px; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  /* z-index: 100000 !important; */
  /* font: "PingFang SC"; */
}

:deep() .el-menu-item {
  height: 60px;
  line-height: 60px;
  margin-left: 150px;
  
}
:deep() .el-submenu .el-submenu__title {
  height: 60px;
  line-height: 60px;
}

</style>
