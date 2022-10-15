
export function LayerManager(L, viewer) {
    this.viewer = viewer
    this.layer_entities = new Array()
    console.log(this.viewer)
}

LayerManager.prototype.Initialize = function () {
    //删除viewer中的entities
    this.viewer.entities.removeAll()
}

LayerManager.prototype.RemoveLayer = function (index) {
    this.layer_entities.splice(index, 1)
    this.Initialize()
    this.UpdateLayers()
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
    //var layer_Names = new Array()
    //console.log(this.layer_entities)

    for (var i = 0; i < this.layer_entities.length; i++) {
        this.layer_entities[i].Index = i
        //layer_Names[i] = this.layer_entities[i].Name
        var entities = this.layer_entities[i].Entities
        // console.log(entities)
        for (var j = 0; j < entities.length; j++) {
            this.viewer.entities.add(entities[j])
        }
    }
    //return layer_Names
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
}
