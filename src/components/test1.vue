<template>
  <div class="fatherBox">
    <div class="box1" id="map"></div>
    <div class="overlay">
      <button id="replay" @click="code()">图层</button>
      <el-dropdown @command="handleCommand">
        <el-button>
          切换<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="a">二维</el-dropdown-item>
        <el-dropdown-item command="b">三维</el-dropdown-item> -->
          <el-dropdown-item command="a">二维</el-dropdown-item>
          <el-dropdown-item command="b">三维</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-drawer :visible.sync="drawercode" :direction="direction" :modal="false" :close-on-click-modal="false"
      :close-on-press-escape="false" :append-to-body="true" :modal-append-to-body="false" :show-close="false"
      size="400px" z-index="999" title="图层列表" @open="handleOpen">
      <div class="template-btn">
        <el-button @click="drawer()">可视化模板</el-button>
      </div>
      <div>
        <el-tree :data="Layers" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current
          :props="defaultProps" draggable @check-change="handleCheckChange" @check="checkLayer" @node-click="nodeClick">
        </el-tree>
      </div>
      <!-- <div><h3>{{ size }}</h3></div>
        <div><h3>{{ color }}</h3></div>
        <div><h3>{{ alpha }}</h3></div> -->
    </el-drawer>
    <drawerComponent v-if="Visiable1" ref="drawer" style="left:400px" @test="test(arguments)"></drawerComponent>
    <!-- <el-main>
    <router-view></router-view>
  </el-main> -->
  </div>
</template>
<script>
import axios from 'axios';
import L from "leaflet";
import drawerComponent from './drawerComponent.vue';
import SingleValueRender from '../static/js/SingleValueRender.js';
var viewer = window.viewer
export default {
  name: "test",
  components: {
    drawerComponent
  },
  data() {
    return {
      Layers: [],
      defaultProps: {
        label: 'name'
      },
      drawercode: false,
      direction: "ltr",
      jsonData: {

      },
      Visiable1: false,
      size: '',
      color: '',
      alpha: '',
    };
  },
  computed: {

  },
  methods: {
    test(params) {
      console.log(params[0]);
      console.log(params[1]);
      console.log(params[2]);
      this.size = params[0];
      this.color = params[1];
      this.alpha = params[2];
    },
    drawer() {
      this.Visiable1 = true;
      this.$nextTick(() => {
        this.$refs.drawer.init();
      });
    },
    handleCommand(command) {
      if (command == "a") {
        // var map = L.map('map').setView([-38, 175], 10);
        //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: ''
        //   }).addTo(map);
        this.$router.push({ path: "/maptwo" })
      }
      else {
        this.$router.push({ path: "/mapthree" })
        // Cesium.Ion.defaultAccessToken =
        //                     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODcyNDNhMi02YmJlLTQxZTUtYTJlMC1jMTBlZTI1NDQ0YzMiLCJpZCI6MTAxODExLCJpYXQiOjE2NTgyODQyMTF9.f48uLZSj85zROu2eafVTxEpgii6rYwgi3Q9eN5-0wF4";
        //                 Cesium.Camera.DEFAULT_VIEW_FACTOR = 1; //摄像机视口远近参数，可设置地球大小
        //                 this.viewer = new Cesium.Viewer('map');
      }

    },
    handleCheckChange(data, checked) {
      console.log(this.$refs.tree.getCheckedNodes());
      console.log(checked);
      var checkedLayer = this.$refs.tree.getCheckedNodes();
      console.log(checkedLayer);
      if (checked) {
        // for(var i = 0; i<checkedLayer.length; i++){
        //   var checkId=checkedLayer[i].id;
        //   // var checkType=checkedLayer[i].type;
        //   var checkName=checkedLayer[i].name;
        //   var checkUrl=checkedLayer[i].service[2].URL;
        //   this.jsonData={
        //     id:checkId,
        //     // type:checkType,
        //     name:checkName,
        //     url:checkUrl,
        //   }
        //   // return this.jsonData;
        // }
        var checkId = data.id;
        var checkType = data.type;
        var checkName = data.name;
        var checkUrl = data.service[2].URL;
        this.jsonData = {
          id: checkId,
          type: checkType,
          name: checkName,
          url: checkUrl,
        }
        this.get3d()
      }
      console.log(this.jsonData);
      console.log(data);
      // console.log(checkedData.checkedNodes);

    },
    nodeClick(data, node, item) {
      console.log(data);
      console.log(node);
      console.log(item);
      var checkId = data.id;
      var checkType = data.type;
      var checkName = data.name;
      var checkUrl = data.service[2].URL;
      this.jsonData = {
        id: checkId,
        type: checkType,
        name: checkName,
        url: checkUrl,
      };
      console.log(this.jsonData);
      this.get3d();

    },
    code() {
      this.drawercode = !this.drawercode;
    },
    get3d() {
      var pDataSource;
      axios.get(this.jsonData.url).then(res => {
        // console.log(res)
        this.geoJsonData = res.data
        var entityType = this.geoJsonData.features[0].geometry.type
        var features = this.geoJsonData.features
        console.log(entityType)
        switch (entityType) {
          case 'Point':
            for (var i = 0; i < features.length; i++) {
                var coordinates = features[i].geometry.coordinates;
                console.log(features[i])
                this.viewer.entities.add({
                    name: 'point',
                    position: Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1]),
                    billboard: {
                        image: require("../../public/下载.png"),
                        show: true
                    }
                })
            }
            console.log(this.viewer.entities)
            break;
          case 'MultiLineString':
            // for (var i = 0; i < features.length; i++) {
            //     console.log(features[i])
            //     var perLineNum = features[i].geometry.coordinates.length;
            //     //分别绘制多线中的每一条线
            //     // console.log(perLineNum)
            //     for (var j = 0; j < perLineNum; j++) {
            //         var lineCoordinatesArr = new Array()
            //         //拿到每一条线的坐标点对数组
            //         var perLineCoordinatesArr = features[i].geometry.coordinates[j]
            //         console.log(perLineCoordinatesArr)
            //         for (var k = 0; k < perLineCoordinatesArr.length; k++) {
            //             lineCoordinatesArr.push(perLineCoordinatesArr[k][0])
            //             lineCoordinatesArr.push(perLineCoordinatesArr[k][1])
            //         }
            //         console.log(lineCoordinatesArr)
            //         viewer.entities.add({
            //             name: 'line',
            //             polyline: {
            //                 positions: Cesium.Cartesian3.fromDegreesArray(lineCoordinatesArr),
            //                 material: Cesium.Color.RED,
            //             }
            //         })
            //     }
            // }
            break;
          case 'MultiPolygon':
            for (var i = 0; i < features.length; i++) {
              // console.log(features[i])
              var perPolygonNum = features[i].geometry.coordinates.length
              //对每个polygon进行绘制
              for (var j = 0; j < perPolygonNum; j++) {
                var perDrawPolygonCoordinatesArr = new Array()
                var perPolygonCoordinatesArr = features[i].geometry.coordinates[j]
                console.log(perPolygonCoordinatesArr[0].length)
                for (var k = 0; k < perPolygonCoordinatesArr[0].length; k++) {
                  perDrawPolygonCoordinatesArr.push(perPolygonCoordinatesArr[0][k][0])
                  perDrawPolygonCoordinatesArr.push(perPolygonCoordinatesArr[0][k][1])
                }
                console.log(perDrawPolygonCoordinatesArr)
                viewer.entities.add({
                  name: 'polygon',
                  polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray(perDrawPolygonCoordinatesArr),
                    material: Cesium.Color.RED.withAlpha(0.7),
                    outline: true,
                    outlineColor: Cesium.Color.BLACK,
                    height: 0
                  }
                })
              }
            }
            break
        }
      })
      // var options = {
      //     'mapScheme': '三维 ',
      //     'mapViewer': viewer,
      //     'requestGeojsonUrl': 'http://localhost:8088/geoserver/wfs?request=GetFeature&version=1.1.0&typeName=sf:hn_wenbao2020&maxFeatures=50&outputFormat=application/json',
      //     'singleRenderGeometry': 'point',
      //     'singleRenderColor': color,
      //     'singleRenderAlpha': alpha,
      //     'pointSize': size,
      //     'lineWidth': null
      // } 
      var initialOptions = {
        'mapView': viewer,
        'operateData': geoJsonData
      }
      var SingleRenderOptions = {
        // 'mapViewer': this.viewer,  //Object:cesiumViewer or leafletViewer. Default Value: null
        'singleRenderGeometry': this.jsonData.type,//
        'singleRenderColor': this.color,
        'singleRenderAlpha': this.alpha, ///Number: range from 0 to 1. Default Value: 1
        'point': {
          'size': {
            width: 32,
            height: 32
          },  //Object: Default Value: {width: 32, height: 32}
          'rotation': 0,   //Number: degrees, 0-360. Default Value: 0 
          'fillShape': 'star'   //String: such as circle, triangle, rectangle etc. Default Value: circle
        },
        'polyline': {
          'polylineWidth': 2,  //Number: Default Value: 2
          'isPolylineClampToGround': false,  //Boolean: true or false. Default Value: false
          'polylineShape': 'solid'   //String: such as solid, dash, arrow... Default Value: solid
        },
        'polygon': {
          'outlineColor': '#000000',    //String: CSS Color. Default Value: #000000
          'outlineWidth': 2    //Number: Default Value: 2
        }
      };
      var sr = new SingleValueRender(initialOptions);
      sr.pointSingleValueRender(SingleRenderOptions);
      console.log(SingleRenderOptions)
    },



  },
  mounted() {

    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODcyNDNhMi02YmJlLTQxZTUtYTJlMC1jMTBlZTI1NDQ0YzMiLCJpZCI6MTAxODExLCJpYXQiOjE2NTgyODQyMTF9.f48uLZSj85zROu2eafVTxEpgii6rYwgi3Q9eN5-0wF4";
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 1; //摄像机视口远近参数，可设置地球大小
    this.viewer = new Cesium.Viewer('map');
    // var map = L.map('map').setView([-38, 175], 10);
    //         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //           attribution: ''
    //         }).addTo(map);
  },
  created() {
    // console.log("Adasdas")
    axios.post('http://127.0.0.1:3000/formal/Get_WWWT_user', {
      username: 'admin',
      password: 'geoserver',
      // workspace_name:this.value
    }).then(res => {
      // console.log(res.data)
      const data = res.data
      // const data = res.data.layers.layer
      this.Layers = data
      console.log(this.Layers)
      // console.log("options2",data)
    })
  },
};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.template-btn {
  margin-left: 25px;
  margin-bottom: 10px;
}

#map {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  overflow: auto;
}

.fatherBox {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  /* overflow: hidden; */
  /* margin: 100px auto; */
}

.box1 {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  /* overflow: hidden; */
}

.overlay {
  position: absolute;
  top: 100px;
  width: 80px;
  left: 10px;
  z-index: 999;
}

.overlay button {
  font: 600 15px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  background-color: #e9470e;
  color: #fff;
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  width: 80px;
}

.overlay button:hover {
  background-color: #e8511a;
}

.el-drawer__wrapper {
  width: 400px;
  /* margin-top: 45px; */
  margin-left: 90px;
}

.el-drawer__container {
  width: 400px;
  /* margin-top: 45px; */
  margin-left: 90px;
}

.el-icon-arrow-down {
  font-size: 12px;
}

/* :deep() .el-dropdown {
  margin-left: 20px;
} */
/* :deep() .el-dropdown-menu {
  color: #273142;
  background-color: black;
} */
</style>

