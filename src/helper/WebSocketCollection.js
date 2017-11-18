export const WebSocketCollection = {
  data () {
    return {
      socketCollection: []
    }
  },
  methods: {
    addSocket (socketurl) {
      this.socketCollection[socketurl] = new WebSocket(socketurl)
      this.socketCollection[socketurl].onopen = function (event) {
        console.log('Connection opened successfully with the server')
      }
      this.socketCollection[socketurl].onclose = function (event) {
        console.log('Connection close successfully with the server')
      }
    },
    deleteSocket (socketurl) {
      this.socketCollection[socketurl].close()
      delete this.socketCollection[socketurl]
    },
    getSocket (socketurl) {
      return this.socketCollection[socketurl]
    },
    attachListToSocket (socketurl, dataArray, length) {
      this.socketCollection[socketurl].onmessage = function (event) {
        var dataObject = JSON.parse(event.data)
        if (dataArray.length <= length) {
          dataArray.push(dataObject.message)
        } else {
          dataArray.shift()
          dataArray.push(dataObject.message)
        }
      }
    }
  }
}
