import {Layer} from '../js/Layer.js'
export function SingleValueRender(initialOptions) {
    this.viewer = initialOptions.mapView3D
    this.map = initialOptions.mapView2D
    this.renderLayer = initialOptions.operateLayer
    this.geojsonData = this.renderLayer.GeoJsonData
    this.lyrMgr = initialOptions.lyrMgr
    this.layerName = this.renderLayer.Name
    this.layerType = this.renderLayer.Type
    this.operateNum = initialOptions.operateLayer.RenderNum
    // console.log(this.geojsonData, this.layerName, this.operateNum)
    this.singleValueRenderNum = ++this.lyrMgr.layer_entities[this.renderLayer.Index].RenderNum
    console.log(this.viewer)
}

SingleValueRender.prototype.getBillboardImageUrl = function (pointFillShape, pointSize, pointColor) {
    var canvas = document.createElement('canvas')
    canvas.id = 'tutorial'
    canvas.overflow = 'hidden'
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var x = pointSize.width
        var y = pointSize.height
        canvas.width = x
        canvas.height = y
        switch (pointFillShape) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(0.5 * x, 0.5 * y, 0.5 * x, 0, Math.PI * 2, true); // 绘制
                break;
            case 'heart':
                ctx.beginPath();
                ctx.moveTo(0.5 * x, 0.27 * y);
                ctx.bezierCurveTo(0.5 * x, 0.25 * y, 0.47 * x, 0.17 * y, 0.33 * x, 0.17 * y);
                ctx.bezierCurveTo(0.13 * x, 0.17 * y, 0.13 * x, 0.42 * y, 0.13 * x, 0.42 * y);
                ctx.bezierCurveTo(0.13 * x, 0.53 * y, 0.27 * x, 0.68 * y, 0.5 * x, 0.8 * y);
                ctx.bezierCurveTo(0.73 * x, 0.68 * y, 0.87 * x, 0.53 * y, 0.87 * x, 0.42 * y);
                ctx.bezierCurveTo(0.87 * x, 0.42 * y, 0.87 * x, 0.17 * y, 0.67 * x, 0.17 * y);
                ctx.bezierCurveTo(0.57 * x, 0.17 * y, 0.5 * x, 0.25 * y, 0.5 * x, 0.26 * y);
                break;
            case 'rectangle':
                ctx.rect(0, 0, x, y);
                break;
            case 'lozenge':
                ctx.beginPath();
                ctx.moveTo(0.5 * x, 0 * y);
                ctx.lineTo(0.13 * x, 0.5 * y);
                ctx.lineTo(0.87 * x, 0.5 * y);
                ctx.moveTo(0.5 * x, 1 * y);
                ctx.lineTo(0.13 * x, 0.5 * y);
                ctx.lineTo(0.87 * x, 0.5 * y);
                break;
            case 'bubble':
                ctx.beginPath();
                ctx.moveTo(0.5 * x, 0.17 * y);
                ctx.quadraticCurveTo(0.17 * x, 0.17 * y, 0.17 * x, 0.42 * y);
                ctx.quadraticCurveTo(0.17 * x, 0.67 * y, 0.33 * x, 0.67 * y);
                ctx.quadraticCurveTo(0.33 * x, 0.8 * y, 0.2 * x, 0.83 * y);
                ctx.quadraticCurveTo(0.4 * x, 0.8 * y, 0.43 * x, 0.67 * y);
                ctx.quadraticCurveTo(0.83 * x, 0.67 * y, 0.83 * x, 0.42 * y);
                ctx.quadraticCurveTo(0.83 * x, 0.17 * y, 0.5 * x, 0.17 * y);
                break;
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(0.5 * x, 0.13 * y);
                ctx.lineTo(0.13 * x, 0.8 * y);
                ctx.lineTo(0.87 * x, 0.8 * y);
                break;
            case 'star':
                let R = 0.4 * x
                let r = 0.2 * x
                var a,b;
                ctx.beginPath();
                ctx.translate(0.5 * x, 0.5 * y);
                for (let i = 0; i < 5; i++) {
                    // 外围凸出的每个点坐标
                    a = Math.cos((18 + 72 * i) / 180 * Math.PI) * R
                    b = - Math.sin((18 + 72 * i) / 180 * Math.PI) * R // canvas中y轴的正向方向与直角坐标系相反
                    ctx.lineTo(a, b)
                    // 外围凹下去的每个点坐标
                    a = Math.cos((54 + 72 * i) / 180 * Math.PI) * r
                    b = - Math.sin((54 + 72 * i) / 180 * Math.PI) * r // canvas中y轴的正向方向与直角坐标系相反
                    ctx.lineTo(a, b)
                }
                break;
            case 'smile':
                ctx.beginPath();
                ctx.arc(0.5 * x, 0.5 * y, 0.33 * x, 0, Math.PI * 2, true); // 绘制
                ctx.moveTo(0.73 * x, 0.5 * y);
                ctx.arc(0.5 * x, 0.5 * y, 0.23 * x, 0, Math.PI, false);   // 口 (顺时针)
                ctx.moveTo(0.43 * x, 0.43 * y);
                ctx.arc(0.4 * x, 0.43 * y, 0.03 * x, 0, Math.PI * 2, false);  // 左眼
                ctx.moveTo(0.63 * x, 0.43 * y);
                ctx.arc(0.6 * x, 0.43 * y, 0.03 * x, 0, Math.PI * 2, false);  // 右眼
                break;
        }
        ctx.fillStyle = pointColor;//修改颜色
        // console.log(ctx.fillStyle)
        ctx.fill();
    }
    var imgsrc = canvas.toDataURL();
    // console.log(imgsrc);
    return imgsrc;
}

SingleValueRender.prototype.pointSingleValueRender = function (SingleValueRenderOptions) {
    
    var pointFillShape = SingleValueRenderOptions.point.fillShape
    var pointSize = SingleValueRenderOptions.point.size
    var pointColor = SingleValueRenderOptions.singleRenderColor
    // console.log(1,pointSize)
    var pointRotation = SingleValueRenderOptions.point.rotation
    var features = this.geojsonData.features
    var entitiesArr = new Array()
    var billboardImageUrl = this.getBillboardImageUrl(pointFillShape, pointSize, pointColor)
    for (var i = 0; i < features.length; i++) {
        var coordinates = features[i].geometry.coordinates
        var entity = this.viewer.entities.add({
            name: 'sPoint',
            position: Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1]),
            billboard: {
                image: billboardImageUrl,
                rotation: pointRotation
            }
        })
        entitiesArr.push(entity)
    }

    var mapLayer2D = L.geoJson(this.geojsonData, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: billboardImageUrl
                })
            })

        },
    })

    var layer = new Layer(this.layerName + '_SingleValueRender_' + this.singleValueRenderNum, this.layerType, 0, mapLayer2D, entitiesArr, entitiesArr.length, 'pointSingleValueRender', this.geojsonData, 0)
    this.lyrMgr.AddLayer(layer)
    console.log(this.lyrMgr)
}

SingleValueRender.prototype.multiLineStringSingleValueRender = function (SingleValueRenderOptions) {
    var polylineColor = SingleValueRenderOptions.singleRenderColor
    var polylineWidth = SingleValueRenderOptions.polyline.polylineWidth
    var polylineShape = SingleValueRenderOptions.polyline.polylineShape
    var polylineAlpha = SingleValueRenderOptions.singleRenderAlpha
    var entitiesArr = new Array()
    var features = this.geojsonData.features

    for (var i = 0; i < features.length; i++) {
        // console.log(features[i])
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
                    material: Cesium.Color.fromCssColorString(polylineColor).withAlpha(polylineAlpha),
                    clampToGround: true,
                    width: polylineWidth
                }
            })
            entitiesArr.push(entity)
        }
    }
    var layer = new Layer(this.layerName + '_SingleValueRender_' + this.singleValueRenderNum, this.layerType, 0, entitiesArr, entitiesArr.length, 'polylineSingleValueRender', this.geojsonData, 0)
    this.lyrMgr.AddLayer(layer)
}

SingleValueRender.prototype.multiPolygonSingleValueRender = function (SingleValueRenderOptions) {
    var renderColor = SingleValueRenderOptions.singleRenderColor
    var renderAlpha = SingleValueRenderOptions.singleRenderAlpha
    var polygonOutLineColor = SingleValueRenderOptions.polygon.outlineColor
    var polygonOutLineWidth = SingleValueRenderOptions.polygon.outlineWidth
    var features = this.geojsonData.features
    var entitiesArr = new Array()
    for (var i = 0; i < features.length; i++) {
        console.log(features[i])
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
            var entity = this.viewer.entities.add({
                name: 'polygon',
                polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray(perDrawPolygonCoordinatesArr),
                    material: Cesium.Color.fromCssColorString(renderColor).withAlpha(renderAlpha),
                    outline: true,
                    outlineColor: Cesium.Color.fromCssColorString(polygonOutLineColor),
                    outlineWidth: polygonOutLineWidth,
                    height: 0
                }
            })
            entitiesArr.push(entity)
        }
    }
    var layer = new Layer(this.layerName + '_SingleValueRender_' + this.singleValueRenderNum, this.Type, 0, entitiesArr, entitiesArr.length, 'polygonSingleValueRender', this.geojsonData, 0)
    this.lyrMgr.AddLayer(layer)
}