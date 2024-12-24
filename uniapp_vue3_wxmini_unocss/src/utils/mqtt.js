// #ifdef H5
import mqtt from 'mqtt'
// #endif
// #ifdef MP-WEIXIN 
// eslint-disable-next-line
const mqtt = require('../utils/mqtt4.1.0')
// #endif
// import Stomp from 'stompjs'

class MqttClient {
  constructor () {
    this.options = {
      connectTimeout: 10000, // 超时时间
      clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
      clean: true,
      reconnectPeriod: 4000, // 重连间隔时间
      // 认证信息，如果有
      username: 'deskmedia',
      password: 'dm123456'
    }
    this.client = null
    this.connected = false
  }

  connect (url) {
    return new Promise((resolve, reject) => {
      // url
      this.client = mqtt.connect(url, this.options)

      this.client.on('connect', () => {
        console.log('成功连接服务器')
        this.connected = true
        resolve()
      })

      this.client.on('error', (error) => {
        console.log('连接失败:', error)
        reject(error)
      })

      this.client.on('offline', () => {
        console.log('客户端脱机下线')
        this.connected = false
      })

      this.client.on('close', () => {
        console.log('连接关闭')
        this.connected = false
      })

      this.client.on('reconnect', (error) => {
        console.log('正在重连:', error)
      })
    })
  }

  subscribe (topic, qos) {
    if (this.connected) {
      this.client.subscribe(topic, { qos }, (error) => {
        if (!error) {
          console.log(`订阅成功: ${topic}`)
        }
      })
    } else {
      console.log('MQTT client is not connected')
    }
  }

  publish (topic, message, qos) {
    if (this.connected) {
      this.client.publish(topic, message, { qos }, (error) => {
        if (!error) {
          console.log(`消息发布成功到: ${topic}`)
        }
        console.log(error)
      })
    } else {
      console.log('MQTT client is not connected')
    }
  }

  disconnect () {
    if (this.connected) {
      this.client.end()
      this.connected = false
    }
  }
}

export default MqttClient
/* class RabbitMQClient {
  constructor (url, options) {
    this.url = url
    this.options = options
    this.client = null
    this.connected = false
    this.messageListeners = {}
  }

  connect () {
    this.client = Stomp.client(this.url)

    this.client.connect(this.options, () => {
      this.connected = true
      console.log('Connected to RabbitMQ')
    }, (error) => {
      console.error('Failed to connect to RabbitMQ', error)
    })
  }

  disconnect () {
    if (this.client && this.connected) {
      this.client.disconnect(() => {
        this.connected = false
        console.log('Disconnected from RabbitMQ')
      })
    }
  }

  subscribe (destination, callback) {
    if (this.connected) {
      this.client.subscribe(destination, (message) => {
        callback(message.body)
      })
      console.log(`Subscribed to ${destination}`)
    } else {
      console.error('Cannot subscribe: Not connected to RabbitMQ')
    }
  }

  unsubscribe (destination) {
    if (this.client) {
      this.client.unsubscribe(destination)
      console.log(`Unsubscribed from ${destination}`)
    }
  }

  publish (destination, message) {
    if (this.connected) {
      this.client.send(destination, {}, message)
      console.log(`Published to ${destination}`)
    } else {
      console.error('Cannot publish: Not connected to RabbitMQ')
    }
  }
}

export default RabbitMQClient */
