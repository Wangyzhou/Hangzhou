<template>
  <!--1.首先，弹窗页面中要有el-dialog组件即弹窗组件，我们把弹窗中的内容放在el-dialog组件中-->
  <!--2.设置:visible.sync属性，动态绑定一个布尔值，通过这个属性来控制弹窗是否弹出-->
  <el-dialog title="设置参数" v-dialogDrag :visible.sync="detailVisible" :destroy-on-close="true" :modal="false"
    :close-on-click-modal="false" :append-to-body="true" v-if="detailVisible" top="5vh" width="40%"
    class="pub_dialog">
    <!-- custom-class="dialog_settings" -->
    <!-- 点大小:<input id="pointsize" type="text" placeholder="请输入点大小">
    <br>
    颜色:
    <div class="block">
      <el-color-picker v-model="color"></el-color-picker>
    </div>
    透明度:<input id="pointalpha" type="text" max="1" min="0" placeholder="请输入透明度">
    <br>
    <el-button @click="getvalue()">确定</el-button> -->
      <el-form
        :model="userForm"
        ref="userForm"
        :rules="rules"
        label-position="left"
      >
        <el-form-item label="请设置点大小" prop="size">
          <el-input v-model="userForm.size"></el-input>
        </el-form-item>
        <el-form-item label="请选择颜色" prop="color">
          <el-color-picker v-model="userForm.color"></el-color-picker>
        </el-form-item>
        <el-form-item label="请设置透明度" prop="alpha">
          <el-input v-model="userForm.alpha"></el-input>
        </el-form-item>
        <!-- <el-form-item label="请设置点旋转角度" prop="rotation">
          <el-input v-model="userForm.rotation"></el-input>
        </el-form-item> -->
        <el-form-item label="请设置点形状" prop="shape">
          <template>
            <el-select
              v-model="userForm.shape"
              clearable
              placeholder="请选择形状"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
      <el-button @click="getvalue()">确定</el-button>
  </el-dialog>
</template>

<script>
import {SingleRenderOption} from '../static/js/option.js'
export default {
  name: "dialogComponent",
  data() {
    return {
      detailVisible: false,
      color: null,
      userForm: {},
      dialogFormVisible: false,
      rules: {   //表单验证
        size: [{ required: true, message: "请输入点大小", trigger: "blur" }],
        color: [{ required: true, message: "请选择颜色", trigger: "blur" }],
        alpha: [
          { required: true, message: "请输入透明度(0~1)", trigger: "blur" }
        ],
        rotation: [
          { required: true, message: "请输入角度", trigger: "blur" }
        ]
      },
      options: [  //下拉框选项
        {
          value: "circle",
          label: "圆形"
        },
        {
          value: "star",
          label: "星形"
        },
        {
          value: "heart",
          label: "心形"
        },
        {
          value: "rectangle",
          label: "矩形"
        },
        {
          value: "lozenge",
          label: "菱形"
        },
        {
          value: "bubble",
          label: "气泡"
        },
        {
          value: "triangle",
          label: "三角形"
        },
        {
          value: "smile",
          label: "微笑"
        },
      ],
    }
  },
  methods: {
    //3.定义一个init函数，通过设置detailVisible值为true来让弹窗弹出，这个函数会在父组件的方法中被调用
    init() {
      this.detailVisible = !this.detailVisible;
      //data是父组件弹窗传递过来的值，我们可以打印看看

    },
    async getvalue() {
      // const param_color = this.color;
      // const param_size = document.getElementById("pointsize").value;
      // const param_alpha = document.getElementById("pointalpha").value;
      // console.log(param_alpha, JSON.stringify(param_color), param_size);
      this.dialogVisiable=false;
      var option = new SingleRenderOption();
      option.point.size.width=this.userForm.size;
      option.point.size.height=this.userForm.size;
      option.singleRenderColor=this.userForm.color;
      option.singleRenderAlpha=this.userForm.alpha;
      option.point.fillShape=this.userForm.shape;
      this.$emit("getjson", option);
      
      //console.log(this.userForm)
    }
  }
}
</script>
<!--取消遮罩层后空白处按钮不起作用-->
<style>
.pub_dialog {
  display: flex;
    justify-content: center;
    align-items: center; 
    overflow: hidden; 
}
.el-dialog__wrapper {
  pointer-events: none;
}

.el-dialog {
  pointer-events: auto;
}
.el-dialog__body{
  padding:10px;
  margin: 10px;
}

</style>
