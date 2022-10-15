
export function SingleRender(options) {
    this.viewer = options.mapViewer
    this.GeojsonUrl = options.requestGeojsonUrl
    this.renderGeometry = options.renderGeometry
    this.renderColor = options.singleRenderColor
    this.renderAlpha = options.singleRenderAlpha

    this.GeoJsonDataSourcePromise = (async function (GeojsonUrl, viewer) {
        var pDataSource;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", GeojsonUrl, true);
        xhr.send()
        await new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText))
                }
            }
        }).then(data => {
            return Cesium.GeoJsonDataSource.load(data)
        }).then(dataSource => {
            pDataSource = dataSource
            viewer.dataSources.add(dataSource)
            return viewer
        }).then(viewer => {
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(109.853042, 34.784251, 6842085),
                orientation: {
                    heading: 6.050789732066459,
                    pitch: -1.569007498110086,
                    roll: 0
                }
            })
        })
        return pDataSource
    })(this.GeojsonUrl, this.viewer)
}

SingleRender.prototype.pointSingleRender = function () {
    this.GeoJsonDataSourcePromise.then(res => {
        var entities = res.entities.values;
        for(var i = 0; i < entities.length; i++) {
            entities[i].billboard.color = Cesium.Color[this.renderColor]
        }
    })
}
// export default {
//     SingleRender
// }