<template>
    <el-container>
        <el-header style="height:50px; background-color: #09022A;">
            <span class="itemName" type="text">OneSIS-<span class="color">V</span>Engine
            </span>

            <el-button @click="getthree()" style="float:right;" class="btn1">切换三维地图</el-button>
            <el-button @click="gettwo()" style="float:right;" class="btn2">切换二维地图</el-button>

            <!-- <el-button @click="getvalue()">确定</el-button> -->
            <!-- <el-dropdown @command="handleCommand">
                <el-button>
                    切换<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item command="a">二维</el-dropdown-item>
        <el-dropdown-item command="b">三维</el-dropdown-item> 
                    <el-dropdown-item command="a">二维</el-dropdown-item>
                    <el-dropdown-item command="b">三维</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->
        </el-header>
        <drawerComponent v-if="Visiable1" ref="drawer" style="left:200px; margin-top:50px" v-on:getjson="getjson">
        </drawerComponent>
        <el-container>
            <el-aside width="200px">
                <div style="width: 100%;text-align: center;top:0px;height:50px" class="header">
                    <el-button @click="add()" class="btn3">添加数据</el-button>
                    <el-button @click="drawer()" class="btn4">可视化</el-button>
                </div>
                <el-tree :data="Layers" show-checkbox default-expand-all node-key="id" ref="rootTree" highlight-current
                    :props="defaultProps" draggable @check-change="handleCheckChange" @node-drop="nodeDrop"
                    :allow-drop="allowDrop" @node-click="nodeClick" style="z-index: 9999;width:200px;" class="tree">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span style="margin-left: 10px;">
                            <el-button type="text" size="mini" @click.stop="() => remove(node, data)">
                                <i class="el-icon-close"></i>
                            </el-button>
                        </span>
                    </span>
                </el-tree>
            </el-aside>
            <el-main id="main-container" style="overflow:hidden; height: calc(100vh - 50px);">
                <!-- <keep-alive>
                    <router-view></router-view>
                </keep-alive> -->
                <div id="map"></div>
                <div id="cesiumContainer" style="display: none;"></div>
            </el-main>
        </el-container>
        <LayerSelection v-if="Visiable2" ref="addLayer" @getLayerobj="getLayerobj" :Layers="Layers"></LayerSelection>
    </el-container>
</template>
<script>
import axios from 'axios';
import L from "leaflet";
import drawerComponent from './drawerComponent.vue';
import LayerSelection from './LayerSelection.vue';
import { SingleValueRender } from '../static/js/SingleValueRender2.js';
import { Layer } from '../static/js/Layer.js';
import { LayerManager } from '../static/js/LayerManager2.js';
import { SingleRenderOption } from '../static/js/option.js'
import { initialOptions } from '../static/js/option.js'
export default {
    name: "test",
    data() {
        return {
            Visiable1: false,
            Layers: [],
            defaultProps: {
                label: 'Name'
            },
            drawercode: false,
            direction: "ltr",
            jsonData: {

            },
            Visiable1: false,
            Visiable2: false,
            size: '',
            color: '',
            alpha: '',
            geoJsonData: {},
            //lyrMgr:null,
            lyrMgr: null,
            index: null,
            viewer: null,
            map: null,
            index: null,
        };
    },
    components: {
        drawerComponent,
        LayerSelection
    },
    created() {
        // console.log("Adasdas")
        // axios.post('http://127.0.0.1:3000/formal/Get_WWWT_user', {
        //     username: 'admin',
        //     password: 'geoserver',
        //     // workspace_name:this.value
        // }).then(res => {
        //     // console.log(res.data)
        //     const data = res.data
        //     // const data = res.data.layers.layer
        //     this.Layers = data
        //     console.log(this.Layers)
        //     // console.log("options2",data)
        // })
    },
    mounted() {
        this.map = L.map("map", {
            crs: L.CRS.EPSG3857,
            center: [33, 116],
            zoom: 5,
        });
        this.map.invalidateSize(true);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors',
        }).addTo(this.map);
        //
        Cesium.Ion.defaultAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODcyNDNhMi02YmJlLTQxZTUtYTJlMC1jMTBlZTI1NDQ0YzMiLCJpZCI6MTAxODExLCJpYXQiOjE2NTgyODQyMTF9.f48uLZSj85zROu2eafVTxEpgii6rYwgi3Q9eN5-0wF4";
        Cesium.Camera.DEFAULT_VIEW_FACTOR = 1; //摄像机视口远近参数，可设置地球大小
        this.viewer = new Cesium.Viewer('cesiumContainer');
        // var map = L.map('map').setView([-38, 175], 10);
        //         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //           attribution: ''
        //         }).addTo(map);
        this.lyrMgr = new LayerManager(this.map, this.viewer)

    },
    methods: {
        drawer() {
            this.Visiable1 = true;
            this.$nextTick(() => {
                this.$refs.drawer.init();
            });
        },
        add() {
            this.Visiable2 = true;
            this.$nextTick(() => {
                this.$refs.addLayer.init();
            });
        },
        updateTree() {
            this.Layers = this.lyrMgr.GetLayerNames()
            this.$nextTick(() => {
                //console.log(this.$refs.rootTree)
                this.$refs.rootTree.setCheckedNodes(this.Layers);
            });

        },
        nodeClick(a, bc, d) {
            console.log(a, a.id)
            this.index = a.id
            console.log(this.index)

        },
        allowDrop(draggingNode, dropNode, type) {
            if (draggingNode.data.level === dropNode.data.level) {
                if (draggingNode.data.parentId === dropNode.data.parentId) {
                    return type === "prev" || type === "next";
                } else {
                    return false;
                }
            } else {
                // 不同级进行处理
                return false;
            }
        },
        nodeDrop(draggingNode, dropNode, dropType, ev) {
            console.log(this.Layers)
            console.log(draggingNode);
            console.log(dropNode);
            console.log(dropType);
            console.log(ev);
            console.log(draggingNode.data.id)
            switch (dropType) {
                case "after":
                    console.log("往下移")
                    this.lyrMgr.LowerLayer(draggingNode.data.id);
                    this.Layers = this.lyrMgr.GetLayerNames()
                    this.$nextTick(() => {
                        //console.log(this.$refs.rootTree)
                        this.$refs.rootTree.setCheckedNodes(this.Layers);
                    });
                    break
                case "before":
                    console.log("往上移")
                    this.lyrMgr.UpperLayer(draggingNode.data.id);
                    this.Layers = this.lyrMgr.GetLayerNames()
                    this.$nextTick(() => {
                        //console.log(this.$refs.rootTree)
                        this.$refs.rootTree.setCheckedNodes(this.Layers);
                    });
                    console.log(this.map.eachLayer(function (layer) {
                        return layer
                    }))
                    break
                default:
                    console.log("hhh")
            }

        },
        // GetLayerNames(data) {
        //     var layerNames = []
        //     var layername = {}
        //     for (var i = 0; i < data.length; i++) {
        //         var name = data[i].Name;
        //         layername = {
        //             Name: name,
        //             id: data[i].Index
        //         }
        //         layerNames.push(layername)
        //     }
        //     return layerNames
        // },
        remove(node, data) {
            this.lyrMgr.RemoveLayer(data.id)
            //var layercollection = this.lyrMgr.GetAllLayers()
            //console.log(layercollection.length)
            this.updateTree()
        },

        getLayerobj(e) {
            axios.get(e.url).then(res => {
                // console.log(res)
                this.geoJsonData = res.data
                console.log(this.geoJsonData)
                var entityType = this.geoJsonData.features[0].geometry.type
                var features = this.geoJsonData.features
                console.log(entityType)
                var entities = []
                var layer2D;
                switch (entityType) {
                    case 'Point':
                        for (var i = 0; i < features.length; i++) {
                            var coordinates = features[i].geometry.coordinates;
                            // console.log(features[i])
                            var entity = this.viewer.entities.add({
                                name: 'point',
                                position: Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1]),
                                billboard: {
                                    image: require("../../public/下载.png"),
                                    show: true,

                                    disableDepthTestDistance: -100000
                                }
                            });
                            entities.push(entity)
                        }
                        layer2D = L.geoJson(this.geoJsonData, {
                            pointToLayer: function (feature, latlng) {
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: require("../../public/下载.png"),

                                    })
                                })
                            },
                            Style: function (feature) {
                                return {
                                    color: 'red',
                                    radius: 8,
                                }
                            }
                        })

                        break;
                    case 'MultiLineString':
                        for (var i = 0; i < features.length; i++) {
                            console.log(features[i])
                            var perLineNum = features[i].geometry.coordinates.length;
                            //分别绘制多线中的每一条线
                            // console.log(perLineNum)
                            for (var j = 0; j < perLineNum; j++) {
                                var lineCoordinatesArr = new Array()
                                //拿到每一条线的坐标点对数组
                                var perLineCoordinatesArr = features[i].geometry.coordinates[j]
                                console.log(perLineCoordinatesArr)
                                for (var k = 0; k < perLineCoordinatesArr.length; k++) {
                                    lineCoordinatesArr.push(perLineCoordinatesArr[k][0])
                                    lineCoordinatesArr.push(perLineCoordinatesArr[k][1])
                                }
                                console.log(lineCoordinatesArr)
                                var entity = this.viewer.entities.add({
                                    name: 'line',
                                    polyline: {
                                        positions: Cesium.Cartesian3.fromDegreesArray(lineCoordinatesArr),
                                        material: Cesium.Color.RED,
                                    }
                                })
                            }
                        }
                        layer2D = L.geoJson(this.geoJsonData, {
                            style: function (feature) {
                                return {
                                    weight: 4,
                                    opacity: 1,
                                    color: 'green',
                                }
                            },
                        })
                        break;
                    case 'MultiPolygon':
                        for (var i = 0; i < features.length; i++) {
                            // console.log(features[i])
                            var perPolygonNum = features[i].geometry.coordinates.length
                            //对每个polygon进行绘制
                            for (var j = 0; j < perPolygonNum; j++) {
                                var perDrawPolygonCoordinatesArr = new Array()
                                var perPolygonCoordinatesArr = features[i].geometry.coordinates[j]
                                //console.log(perPolygonCoordinatesArr[0].length)
                                for (var k = 0; k < perPolygonCoordinatesArr[0].length; k++) {
                                    perDrawPolygonCoordinatesArr.push(perPolygonCoordinatesArr[0][k][0])
                                    perDrawPolygonCoordinatesArr.push(perPolygonCoordinatesArr[0][k][1])
                                }
                                //console.log(perDrawPolygonCoordinatesArr)
                                var entity = this.viewer.entities.add({
                                    name: 'polygon',
                                    polygon: {
                                        hierarchy: Cesium.Cartesian3.fromDegreesArray(perDrawPolygonCoordinatesArr),
                                        material: Cesium.Color.RED.withAlpha(1),
                                        outline: true,
                                        outlineColor: Cesium.Color.BLACK,
                                        height: 0
                                    }
                                })
                                entities.push(entity)
                            }
                        }
                        layer2D = L.geoJson(this.geoJsonData, {
                            style: function (feature) {
                                return {
                                    fillColor: 'red',
                                    fillOpacity: 1,
                                    weight: 4,
                                    opacity: 0.8,
                                    color: 'white',

                                }
                            },
                        })
                        break;
                }
                var layerobj = new Layer(e.name, e.type, e.id, layer2D, entities, entities.length, "meta", this.geoJsonData, 0)
                //console.log(this.Layers)
                //this.Layers.splice(0,0,layerobj)
                //this.Layers.push(e)
                // this.Layers.splice(0,0,e)
                this.lyrMgr.AddLayer(layerobj)
                //console.log(this.viewer.entities)
                console.log(layerobj)
                //var layercollection = this.lyrMgr.GetAllLayers()
                //console.log(layercollection.length)
                this.updateTree()
                // this.Layers = this.lyrMgr.GetLayerNames()
                // //this.Layers= Array.from(this.Layers)
                // //console.log(this.$refs.rootTree);
                // //console.log(this.Layers[0].Name);
                // console.log(this.Layers);
                // // this.$refs.tree.setCheckedNodes(this.Layers);
                // //console.log(this.$refs.rootTree.getCheckedKeys);
                // //console.log(this.$refs);
                // this.$nextTick(() => {
                //     //console.log(this.$refs.rootTree)
                //     this.$refs.rootTree.setCheckedNodes(this.Layers);
                // });
                console.log(this.Layers);
            })
            // this.Layers.push(e);


        },

        gettwo() {
            document.getElementById("map").style.display = "block";//show当前div
            document.getElementById("cesiumContainer").style.display = "none";//hidden当前div
            document.getElementById("map").style.position = "relative";
            document.getElementById("map").style.left = "0";
            document.getElementById("map").style.width = "100%";
            document.getElementById("map").style.height = "100%";
            document.getElementById("map").style.bottom = "0";
        },
        getthree() {
            document.getElementById("map").style.display = "none";
            document.getElementById("cesiumContainer").style.display = "block";
            document.getElementById("cesiumContainer").style.position = "relative";
            document.getElementById("cesiumContainer").style.width = "100%";
            document.getElementById("cesiumContainer").style.height = "100%";
        },

        getjson(data) {
            //this.params = data

            //initialOptions=new class;
            //layer=lyrmgr.getalllayer[index]
            //singv
            console.log(data)
            var inioption = new initialOptions()
            inioption.mapView2D = this.map
            inioption.mapView3D = this.viewer
            inioption.operateLayer = this.lyrMgr.GetLayerByIndex(this.index)
            inioption.lyrMgr = this.lyrMgr
            var sr = new SingleValueRender(inioption)
            sr.pointSingleValueRender(data)
            this.updateTree()

        },
        getvalue() {
            console.log(this.params.param_color)
        },
        // handleCommand(command) {
        //     if (command == "a") {
        //         // var map = L.map('map').setView([-38, 175], 10);
        //         //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //         //     attribution: ''
        //         //   }).addTo(map);
        //         this.$router.push({ path: '/maptwo' })
        //     }
        //     else {
        //         this.$router.push({ path: '/mapthree' })
        //         // Cesium.Ion.defaultAccessToken =
        //         //                     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODcyNDNhMi02YmJlLTQxZTUtYTJlMC1jMTBlZTI1NDQ0YzMiLCJpZCI6MTAxODExLCJpYXQiOjE2NTgyODQyMTF9.f48uLZSj85zROu2eafVTxEpgii6rYwgi3Q9eN5-0wF4";
        //         //                 Cesium.Camera.DEFAULT_VIEW_FACTOR = 1; //摄像机视口远近参数，可设置地球大小
        //         //                 this.viewer = new Cesium.Viewer('map');
        //     }

        // },
        handleCheckChange(data, checked) {
            // console.log(this.$refs.rootTree.getCheckedNodes());
            console.log(data.id);
            console.log(checked);
            //console.log(this.lyrMgr.layer_entities[data.id].Entities)
            this.lyrMgr.SetVisibility(data.id, checked)

        },
        code() {
            this.drawercode = !this.drawercode;
        },



    },

}
</script>
<style scoped>
.el-main {
    padding: 0px;
}

/* .el-button :hover{
    background-color: #fdf6f4;
    color: #e9470e;
}
.el-button :active{
    background-color: #fdf6f4;
    color: #e9470e;
}
.el-button :focus{
    background-color: #fdf6f4;
    color: #e9470e;
} */
.btn1 {
    color: #ffffff;
}

.btn2 {
    color: #ffffff;
}

.btn1:focus,
.btn1:hover {
    color: #fc4c02;
    background-color: #09022A;
    /* border-color:#fc6a02; */
    /* background-color:#fc02020d; */
}

.btn1:active {
    color: #fc4c02;
    background-color: #09022A;
    /* border-color:#fc6a02; */
}

.btn2:focus,
.btn2:hover {
    color: #fc4c02;
    background-color: #09022A;
    /* border-color:#fc6a02; */
    /* background-color:#fc02020d; */
}

.btn2:active {
    color: #fc4c02;
    background-color: #09022A;
    /* border-color:#fc6a02; */
}

.btn3:focus,
.btn3:hover {
    color: #fc4c02;
    background-color: #ffffff;
    /* border-color:#fc6a02; */
    /* background-color:#fc02020d; */
}

.btn3:active {
    color: #fc4c02;
    background-color: #ffffff;
    /* border-color:#fc6a02; */
}

.btn4:focus,
.btn4:hover {
    color: #fc4c02;
    background-color: #ffffff;
    /* border-color:#fc6a02; */
    /* background-color:#fc02020d; */
}

.btn4:active {
    color: #fc4c02;
    background-color: #ffffff;
    /* border-color:#fc6a02; */
}

#map {
    position: relative;
    /* top: 60px; */
    left: 0;
    height: 100%;
    width: 100%;
    bottom: 0;
}

#cesiumContainer {
    width: 100%;
    height: 100%;
    position: relative;
    /* margin: 0; */
    /* padding: 0; */
    /* overflow: scroll; */
}

.color {
    color: #e9470e;
}

.itemName {
    font-size: 18px;
    color: #ffffff;
    text-align: center;
    line-height: 10px;
    /* position: fixed; */
    left: 65px;
    font-family: 'Kaushan Script';
    padding-left: 8px;
    /* top:0px; */
    /* text-shadow: (2px 1px 3px red); */
}

.el-header {
    padding-top: 5px;
}
.tree{
  min-width: 200px;
  min-height: calc(100vh - 100px);
  overflow-x: auto;
}
</style>