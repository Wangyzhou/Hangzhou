function SingleRenderOption() {
    this.singleRenderGeometry = 'point'   //String: point or polyline or polygon. Default Value: null
    this.singleRenderColor = '#808080'  //String: CSS Color. Default Value: #808080
    this.singleRenderAlpha = 1  //Number: range from 0 to 1. Default Value: 1

    this.point_2D = {
        'circleMarkerRadius': 5,  //radius 点半径  默认值：5
        'circleMarkerIsFill': true, //fill 是否填充  默认值：true
        'circleMarkerIsStroke': false,  //stroke 边界是否存在  默认值：false
        'circleMarkerOutLineWeight': 5,//weight 边界线宽   默认值：5      
        'circleMarkerOutLineOpacity': 1,//opacity 边界线透明度（0：不显示，1：全显）  默认值：1
        'circleMarkerOutLineColor': '#FF0000',//color 边界线颜色  默认值：#FF0000
        'circleMarkerDashArray': 0, //dashArray 边界虚线的间隔（0：实线，数字越大虚线上间隔越大） 默认值：0

        'iconMarkerUrl': '', //iconUrl  点icon图标或者图片的url,默认为default
        'iconMarkerSize': [16, 16], //iconSize  图片大小[,]  默认值：null
        'iconMarkerAnchor': [8, 8],  //iconAnchor  点icon尖端相对于其左上角的坐标 [,]  默认值：[13, 21]
        'iconMarkerPopupAnchor': [-3, -76],  //popupAnchor  弹窗相对于icon锚点的坐标 [,]  默认值：null
        'iconMarkerShadowUrl': '',   //shadowUrl  点icon图标或图片阴影url  默认值：null
        'iconMarkerShadowSize': [68, 95],  //shadowSize  阴影大小  [,]  默认值：null
        'iconMarkerShadowAnchor': [13, 21],  //shadowAnchor  阴影的尖端相对于其左上角的坐标，默认为与iconAnchor一致
    }

    this.point_3D = {
        'size': {
            width: 32,
            height: 32
        },  //Number: Default Value: 1
        'rotation': 0,   //Number: degrees, 0-360. Default Value: 0 
        'fillShape': 'star'   //String: such as circle, triangle, rectangle etc. Default Value: circle
    }

    this.polyline_2D = {
        'lineWidth': 2,  //weight  线宽   默认值：2
        'polylineIsStroke': true,  //stroke  边界是否存在   默认值：true      
        'polylineDashArray': 0, // dashArray  边界虚线的间隔（0：实线，数字越大虚线上间隔越大）  默认值：0 

        'polylineIsFill': false, //fill  是否填充  默认值：false
        'polylineFillColor': '#00FF00',  //fillColor  填充区域颜色  默认值：#00FF00
        'polylineFillOpacity': 1,//fillOpacity  填充区域透明度   默认值：1
    }

    this.polyline_3D = {
        'polylineWidth': 3,  //Number: Default Value: 2
        'isPolylineClampToGround': true,  //Boolean: true or false. Default Value: false
        'polylineShape': 'solid'   //String: such as solid, dash, arrow... Default Value: solid
    }

    this.polygon_2D = {
        'polygonIsFill': true, //fill  是否填充  默认值：false
        'polygonIsStroke': true,  //stroke  边界是否存在，控制边界显隐  默认值：true
        'polygonOutLineWeight': 2,//weight  边界线宽  默认值：2         
        'polygonOutLineOpacity': 1,//opacity  边界线透明度（0：不显示，1：全显） 默认值：1
        'polygonOutLineColor': '#000000',//color  边界线颜色  默认值：#000000
        'polygonDashArray': 0, //dashArray  边界虚线的间隔（0：实线，数字越大虚线上间隔越大） 默认值：0
    }

    this.polygon_3D = {
        'outlineColor': '#000000',    //String: CSS Color. Default Value: #000000
        'outlineWidth': 2,    //Number: Default Value: 2
    }
}