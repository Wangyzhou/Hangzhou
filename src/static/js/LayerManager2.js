export function LayerManager(map, viewer) {
    this.map = map
    this.viewer = viewer
    this.layer_entities = new Array()
}

LayerManager.prototype.Initialize = function () {
    //删除viewer中的entities
    this.viewer.entities.removeAll()
    //删除二维所有图层
    this.map.eachLayer(function (layer) {
        if (layer.Name != undefined) {
            map.removeLayer(layer);
        }
    });
}

LayerManager.prototype.RemoveLayer = function (index) {
    console.log(this.layer_entities[index].Layer2D)
    var layer_t = this.layer_entities[index].Layer2D
    this.map.removeLayer(layer_t)
    this.layer_entities.splice(index, 1)
    this.Initialize()
    this.UpdateLayers()
}

LayerManager.prototype.GetLayerNames = function () {
    var layerNames = new Array()
    var layername = {}
    for (var i = 0; i < this.layer_entities.length; i++) {
        layername = {
            Name: this.layer_entities[i].Name,
            id: this.layer_entities[i].Index
        }
        layerNames.push(layername)
    }
    return layerNames
}


LayerManager.prototype.AddLayer = function (layer) {
    this.layer_entities.splice(0, 0, layer)
    this.Initialize()
    this.UpdateLayers()
}

LayerManager.prototype.GetAllLayers = function () {
    return this.layer_entities
}

LayerManager.prototype.UpdateLayers = function () {
    var layer_Names = new Array()

    for (var i = 0; i < this.layer_entities.length; i++) {
        this.layer_entities[i].Index = i
        layer_Names[i] = this.layer_entities[i].Name
        //二维添加
        var mapLayer = this.layer_entities[i].Layer2D
        this.map.addLayer(mapLayer)
        // mapLayer.bringToBack()
        //三维
        var entities = this.layer_entities[i].Entities
        // console.log(entities)
        for (var j = 0; j < entities.length; j++) {
            this.viewer.entities.add(entities[j])
        }
    }
    return layer_Names
}

LayerManager.prototype.UpperLayer = function (layerIndex) {
    if (layerIndex == 0) {
        return
    }
    var temp = this.layer_entities[layerIndex]
    this.layer_entities[layerIndex] = this.layer_entities[layerIndex - 1]
    this.layer_entities[layerIndex - 1] = temp
    
    this.Initialize()
    this.UpdateLayers()
}

LayerManager.prototype.LowerLayer = function (layerIndex) {
    if (layerIndex == this.layer_entities.length - 1) {
        return
    }
    var temp = this.layer_entities[layerIndex]
    this.layer_entities[layerIndex] = this.layer_entities[layerIndex + 1]
    this.layer_entities[layerIndex + 1] = temp
    this.Initialize()
    this.UpdateLayers()
}

LayerManager.prototype.SetVisibility = function (layerIndex, isSelected) {
    var entities = this.layer_entities[layerIndex].Entities
    for (var i = 0; i < entities.length; i++) {
        entities[i].show = isSelected
    }
    var layermap = this.layer_entities[layerIndex].Layer2D
    if (isSelected==false) {
        this.map.removeLayer(layermap)
    } else {
        this.Initialize()
        this.UpdateLayers()
    }
}

LayerManager.prototype.GetLayerByIndex = function (layerIndex) {
    return this.layer_entities[layerIndex]
}

LayerManager.prototype.GetLayerByName = function (layerName) {
    for (var i = 0; i < this.layer_entities.length; i++) {
        if (this.layer_entities[i].Name == layerName) {
            return this.layer_entities[i]
        }
    }
}
