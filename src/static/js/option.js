export function SingleRenderOption() {
    this.singleRenderGeometry = 'point'   //String: point or polyline or polygon. Default Value: null
    this.singleRenderColor = '#808080'  //String: CSS Color. Default Value: #808080
    this.singleRenderAlpha = 1  //Number: range from 0 to 1. Default Value: 1
    this.point = {
        'imagUrl':'',
        'size': {
            width: 32,
            height: 32
        },  //Number: Default Value: 1
        // 'rotation': 0,   //Number: degrees, 0-360. Default Value: 0 
        'fillShape': 'star'   //String: such as circle, triangle, rectangle etc. Default Value: circle
    }
    this.polyline = {
        'polylineWidth': 3,  //Number: Default Value: 2
   }
    this.polygon = {
        'polygonOutlineColor': '#000000',    //String: CSS Color. Default Value: #000000
        'polygonOutlineWidth': 2,    //Number: Default Value: 2
        'polygonOutLineOpacity':''
    }
}
export function initialOptions() {
    this.mapView2D=null;
    this.mapView3D=null;
    this.operateLayer=null;
    this.lyrMgr=null

}
