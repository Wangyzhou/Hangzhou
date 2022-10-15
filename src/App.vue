<template>
  <div id="app">
    <Test></Test>
  </div>
</template>

<script>
import Test from './components/test.vue';

export default {
  name: "App",
  data(){
      return {
        // query: '',
        // placeholder: '',
        // path: 'search-movie',
      }
    },
    
  components: {
    Test
},
//刷新回到home页
    // created() {
    //   if (this.$router.path !== "/home")
    //     this.$router.replace("home")
    // },
  methods:{
    // tourl(){
    //   this.$router.push({path:'/TopBar'})
    // }
  }
};
</script>

<style>
@import '../src/assets/fonts/fonts.css';
html,
body,
#app
{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  position: relative;
}

    /**滚动条的宽度*/
     ::-webkit-scrollbar {
        width: 5px;
        /*竖向*/
        height: 5px;
        /*横向*/
    } 
 
    /*滚动条的滑块*/
    ::-webkit-scrollbar-thumb {
        background-color: #3e495b;
        border-radius: 5px;
    }
</style>
