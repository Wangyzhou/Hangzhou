const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'


module.exports = {
  // 基本路径  3.6之前的版本时 baseUrl
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // webpack-dev-server 相关配置
  devServer: {
    proxy: {
      '/try': {
        target: 'https://www.runoob.com',
        ws: true,
        changeOrigin: true
      },
      '/yuxi_DEM': {
        target: 'http://yxgis2sim.hdec.com',
        ws: true,
        changeOrigin: true
      },
      '/iserver': {
        target: 'http://yxgis2sim.hdec.com',
        ws: true,
        changeOrigin: true
      },
      '/testt': {
        target: 'http://localhost:8081',
        ws: true,
        changeOrigin: true
      },
      // '/ismap-mvt-ShenSeDiTu1231erver': {
      //   target: 'http://gisct.ecidi.com/iserver/services',
      //   ws: true,
      //   changeOrigin: true
      // },
      '/map-mvt-ShenSeDiTu1231': {
        target: 'http://gisct.ecidi.com/iserver/services',
        ws: true,
        changeOrigin: true
      },
      '/yuxiBasemap': {
        target: 'http://yxgis2.hdec.com',
        ws: true,
        changeOrigin: true
      },
      '/geoserver': {
        target: 'http://localhost:8088',
        ws: true,
        changeOrigin: true
      },
      '/UserController': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true
      }
      // '/foo': {
      //   target: '<other_url>'
      // }
    }
  },
  configureWebpack: {
    output: {
      sourcePrefix: ' '
    },
    amd: {
      toUrlUndefined: true
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
        'cesium': path.resolve(__dirname, cesiumSource)
      }
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns:[{ 
          from: path.join(cesiumSource, cesiumWorkers),
          to: 'Workers' 
        }]}),
      new CopyWebpackPlugin({
        patterns:[{ 
          from: path.join(cesiumSource, 'Assets'), 
          to: 'Assets' 
        }]}),
      new CopyWebpackPlugin({
        patterns:[{ 
          from: path.join(cesiumSource, 'Widgets'), 
          to: 'Widgets' 
        }]}),
      new CopyWebpackPlugin({
        patterns:[{ 
          from: path.join(cesiumSource, 'ThirdParty/Workers'), 
          to: 'ThirdParty/Workers' 
        }]}),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./')
      })
    ],
    module: {
      unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false
    }
  }
}