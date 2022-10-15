<template>
  <div class="Home">  
      <el-container id="container">
        <el-aside width="150px">
          <el-menu 
          :default-active="isActive"
          class="el-menu-vertical-demo"
          background-color="#273142"
          text-color="#efefef"
          active-text-color="#fc4c02">
            <el-menu-item-group v-for="item in functionList">
             <template slot="title">{{item.view}}</template>
             <el-menu-item v-for="list in item.menulist" @click="scrollIndex(list.id)" :index="list.id">{{list.title}}</el-menu-item>
            </el-menu-item-group>         
          </el-menu>
        </el-aside>
        <el-main id="main-container">
          <div v-for="item in functionList" :id="item.view">
          <div v-for="list in item.menulist" class="content-item"  :id="list.id">
          <el-row>
              <el-col :span="24"><div>
                <h3 class="HeadTitle">{{list.title}}</h3>
              </div></el-col>
          </el-row>
          <el-row :gutter="35" >
              <el-col :span="6" v-for="item1 in list.data" :xs="{span:24}" :sm="{span:12}" :md="{span:6-8}" :lg="{span:6}" :xl="{span:2-4}"><div class="grid-content bg-purple">
                <div class="item-list">
                  <!-- <router-link :to="item1.path"> -->
                  <el-image 
                  style="width:300px,height:200px"
                  :src="item1.url"
                  class="item-picture"></el-image>
                  <!-- </router-link> -->
                </div>
                <div class="item-title">
                  <span>{{item1.name}}</span>
                </div>
              </div></el-col>
          </el-row>
          </div>
          </div>                 
        </el-main>
        <!-- <div id="list1">
          <el-row>
              <el-col :span="24"><div class="bg-purple-dark">
                <h3 class="HeadTitle">分类一</h3>
              </div></el-col>
          </el-row>
          <el-row :gutter="35" >
              <el-col :span="6" v-for="item in list1" :xs="{span:24}" :sm="{span:12}" :md="{span:6-8}" :lg="{span:6}" :xl="{span:2-4}"><div class="grid-content bg-purple">
                <div class="item-list">
                  <a href="" class="item-link">
                  <el-image 
                  :fit="fill"
                  :src="item.url"
                  class="item-picture"></el-image>
                  </a>
                </div>
                <div class="item-title">
                  <span>{{item.name}}</span>
                </div>
              </div></el-col>
          </el-row>
          </div> -->
      </el-container>
  </div>
</template>

<script>
import { Step } from 'element-ui';

export default {
  name: 'Home',
  data() {
    return {
      functionList:[
        {
          view:'二维',
          menulist:[
          {
            id:'twoList1',
            title:'分类一',
            data:[
              {
                name: '功能1',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                path:'/home/maptwo'
              },
              {
                name: '功能2',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
              },
              {
                name: '功能3',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
              },
              {
                name: '功能4',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
              },
              {
                name: '功能5',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
              },
            ]
          },
          {
            id:'twoList2',
            title:'分类二',
            data:[
              {
                name: '功能hh1',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              },
              {
                name: '功能hh2',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              },
              {
                name: '功能3',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              },
              {
                name: '功能4',
                url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
              },
              {
                name: '功能5',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              },
            ]
          },          
          ],         
        },
        {
          view:'三维',
          menulist:[
          {
            id:'threeList1',
            title:'分类1',
            data:[
              {
                name: '功能hh1',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              },
              {
                name: '功能hh2',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              },
              {
                name: '功能3',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              },
              {
                name: '功能4',
                url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
              },
              {
                name: '功能5',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              },
            ]
          },
          {
            id:'threeList2',
            title:'分类2',
            data:[
              {
                name: '功能hh1',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              },
              {
                name: '功能hh2',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              },
              {
                name: '功能3',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              },
              {
                name: '功能4',
                url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
              },
              {
                name: '功能5',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              },
            ]
          },          
          ],
        },
      ],
      list1:[
        {
          name: '功能1',
          url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          name: '功能2',
          url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          name: '功能3',
          url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          name: '功能4',
          url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          name: '功能5',
          url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
      ],
     isActive:null,
     bodyHeight: 0,
    };
  },
  methods: {
      scrollIndex(id) {
        this.isActive=id;
        this.$nextTick(() => {
          let target = document.getElementById(id);
          let parent = document.getElementById('main-container');
          let distance = target.offsetTop - parent.offsetTop - 10;
          parent.scrollTo({
            top: distance,
            behavior: 'smooth'
          })         
          // console.log(this.isActive)
          //还需要设置一下滚动距离
          // document.getElementById(id).scrollIntoView({
          //   block: 'start',
          //   inline: 'nearest',
          //   behavior: 'smooth'
          // })       
        })
      },
      toScroll() {
        let parent = document.getElementById('main-container');
        this.bodyHeight = parent.scrollTop + 200;
        for(var i=0;i<this.functionList.length;i++){
            var labels=this.functionList[i].menulist;
            for(var j=0;j<labels.length;j++){
              const offset=document.getElementById(labels[j].id).offsetTop;
              // console.log(offset)
              if(this.bodyHeight>=offset){
                this.isActive=labels[j].id;
              }
            };
            
        };
        // console.log(this.bodyHeight);
        
      },
      },
  mounted() {
    window.addEventListener("scroll", this.toScroll,true);
  },
  destroyed() {
      //销毁上面监听的滚动事件
      window.removeEventListener("scroll", this.toScroll,true);
   },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  height: calc(100vh - 60px);
}
.el-menu-vertical-demo {
  height: calc(100vh - 60px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.el-row {
    margin-bottom: 20px;
  }
.el-row:last-child {
    margin-bottom: 0;
  }
.el-col {
    border-radius: 4px;
  }
.floor-item {
    /* background: #99a9bf; */
    height: 25px;
  }
.bg-purple {
    /* background: #d3dce6; */
  }
.grid-content {
    border-radius: 4px;
    min-height: 250px;
  }
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
:deep() .el-main {
    padding-top: 10px;
    /* padding-bottom: 10px; */
    padding-left: 25px;
  }
h3 {
    /* border-bottom: 1px solid #e1e5f2; */
    font-weight: normal;
    /* margin-bottom: 20px; */
    padding-bottom: 2px;
    font-size: 20px;
    border-bottom: 1px solid #efefef;
    border-left: 5px solid #fc4c02;
    padding-left: 7px;
    }
.item-title {
  /* background: red; */
  height: 30%;
  text-align: center;

}
.item-list {
  /* background: green; */
  height: 70%;
}
.item-link {
    /* border-radius: 5px; */
    
}
.item-picture {
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .05);
}
</style>
