export function SingleRender(initialOptions) {
    this.mapScheme = initialOptions.mapScheme
    this.dataSource = initialOptions.dataSource
}

SingleRender.prototype.getBillboardImageUrl = function (pointFillShape, pointSize, pointColor) {
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
        ctx.fill();
    }
    var imgsrc = canvas.toDataURL();
    console.log(imgsrc);
    return imgsrc;
}

SingleRender.prototype.pointSingleRender = function (SingleRenderOptions) {
    console.log(SingleRenderOptions)
    var pointRotation = SingleRenderOptions.point.rotation
    var pointFillShape = SingleRenderOptions.point.fillShape
    var pointSize = SingleRenderOptions.point.size
    var pointColor = SingleRenderOptions.singleRenderColor
    var billboardImageUrl = this.getBillboardImageUrl(pointFillShape, pointSize, pointColor)
    this.dataSource.then(res => {
        var entities = res.entities.values
        for(var i = 0; i < entities.length; i++) {
            var entity = entities[i]
            console.log(entity.billboard)
            entity.billboard.image = billboardImageUrl
            entity.billboard.rotation = pointRotation
        }
    })
}

SingleRender.prototype.polylineSingleRender = function (SingleRenderOptions) {
    var polylineColor = SingleRenderOptions.singleRenderColor
    var polylineWidth = SingleRenderOptions.polyline.polylineWidth
    var isPolylineClampToGround = SingleRenderOptions.polyline.isPolylineClampToGround
    var polylineShape = SingleRenderOptions.polyline.polylineShape
    var polylineAlpha = SingleRenderOptions.singleRenderAlpha

    this.dataSource.then(res => {
        var entities = res.entities.values
        for(var i = 0; i < entities.length; i++) {
            var entity = entities[i]
            entity.polyline.material.color = Cesium.Color.fromCssColorString(polylineColor).withAlpha(polylineAlpha)
            entity.polyline.width = polylineWidth
            entity.polyline.clampToGround = isPolylineClampToGround
        }
    })
}

SingleRender.prototype.polygonSingleRender = function (SingleRenderOptions) {
    var renderColor = SingleRenderOptions.singleRenderColor
    var renderAlpha = SingleRenderOptions.singleRenderAlpha
    var polygonOutLineColor = SingleRenderOptions.polygon.outlineColor
    var polygonOutLineWidth = SingleRenderOptions.polygon.outlineWidth
    this.dataSource.then(res => {
        var entities = res.entities.values;
        for (var i = 0; i < entities.length; i++) {
            entities[i].polygon.material.color = Cesium.Color.fromCssColorString(renderColor).withAlpha(renderAlpha)
            entities[i].polygon.outlineColor = Cesium.Color.fromCssColorString(polygonOutLineColor)
            entities[i].polygon.outlineWidth = polygonOutLineWidth
        }
    })
}

