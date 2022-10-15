<template>
<!--1.首先，弹窗页面中要有el-dialog组件即弹窗组件，我们把弹窗中的内容放在el-dialog组件中-->
<!--2.设置:visible.sync属性，动态绑定一个布尔值，通过这个属性来控制弹窗是否弹出-->
  <el-dialog 
  title="添加图层"
  v-dialogDrag
  :visible.sync="detailVisible"
  :destroy-on-close="true"
  :modal="false"
  :close-on-click-modal="false"
  :append-to-body="true"
  v-if="detailVisible"
  width="50%" 
  top="5%"
  class="pub_dialog"
 > <!-- custom-class="dialog_settings" -->
 <div class="box1">
<el-tree
  :data="dataLayers"
  default-expand-all
  node-key="id"
  ref="tree"
  highlight-current
  :props="defaultProps"
  draggable
  @node-click="nodeClick">
</el-tree>
</div>
<div slot="footer" class="dialog-footer">
    <el-button @click="getLayer()">确定</el-button>
</div>
  </el-dialog>
</template>

<script>
import axios from 'axios';
    export default {
        name: "LayerSelection",
        props:['Layers'],
        data(){
          return{
            dataLayers:[],
            detailVisible:false,
            defaultProps:{
              label:'name'
            },
            addData:{},
          }
        },
      methods:{
      //3.定义一个init函数，通过设置detailVisible值为true来让弹窗弹出，这个函数会在父组件的方法中被调用
        init(){
          this.detailVisible=!this.detailVisible;
          //data是父组件弹窗传递过来的值，我们可以打印看看
          
        },
        nodeClick(data,node,item){
          console.log(data);
          console.log(node);
          console.log(item);
          var id=this.Layers.length;
          var checkType=data.type;
          var checkName=data.name;
          var checkUrl=data.service[2].URL;
          this.addData={
            id:id,
            type:checkType,
            name:checkName,
            url:checkUrl,
            };
          console.log(this.addData);
        },
        getLayer(){
          console.log(this.addData);
          //发送请求显示图层
          this.$emit("getLayerobj", this.addData);
        }
      },
      created() {
  // console.log("Adasdas")
  axios.post('http://127.0.0.1:3000/formal/Get_WWWT_user',{
      username:'admin',
      password:'geoserver',
      // workspace_name:this.value
  }).then(res => {
    // console.log(res.data)
    const data = res.data
    // const data = res.data.layers.layer
    this.dataLayers = data
    console.log(this.dataLayers)
    // console.log("options2",data)
  })
  },
    }
</script>
<!--取消遮罩层后空白处按钮不起作用-->
<style>
.dialog-footer {
  text-align: center;
  margin-top: -5px;
}
.box1 {
  overflow-y: auto;
  height: 90%;
    /* padding: 0px 30px 11px 27px; */

}
.pub_dialog {
  display: flex;
    justify-content: center;
    align-items: center; 
    overflow: hidden; 
}
  .el-dialog__wrapper{
    pointer-events: none;
  }
  .el-dialog{
    pointer-events: auto;
    /* margin: 0 auto !important; */
        height: 70%;
        overflow: hidden;
  }
  .el-dialog__body {
            position: absolute;
            left: 0;
            top: 54px;
            bottom: 0;
            right: 0;
            padding: 10px 0 10px 0;
            z-index: 1;
            overflow: hidden;
            overflow-y: auto;
        }
        .el-dialog__footer{
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 50px;
            z-index: 1;
        }
  .dialog_settings{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 1fr;
    column-gap: 10px;
    row-gap: 10px;
  }
  /* .dialog_settings div {
      width: 33vw;
      height: 70px;
      background-color: skyblue;
      border: 1px solid black;
  } */
  .dialog_settings1 {
        margin-top: 50px;
        display: grid;
        /* 排列元素我们可以使用grid-template-areas属性，注意这里是设置了三行表格，并且每列用3分进行分布的 */
        grid-template-areas:
            "header header"
            "sidebar content"
            "footer footer"
    }

    .dialog_settings header {
        /* 命名此空间为header */
        grid-area: header;
        background-color: skyblue;
        
    }

    .dialog_settings aside {
        grid-area: sidebar;
        background-color: red;
        

    }
    .dialog_settings main {
        grid-area: content;
        background-color: blue;
        

    }
    .dialog_settings footer {
        grid-area: footer;
        background-color: green;
        

    }

</style>
