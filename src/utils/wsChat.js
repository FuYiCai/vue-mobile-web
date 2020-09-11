import config from './config';
import bus from './bus';

class chat  {
    constructor(id) {
        this.socket = null;
		this.connectSocket(id)
	}
    // 连接socket
	connectSocket(id){
		this.socket = new WebSocket(config.socketUrl+id);
		console.log('this.socket',this.socket);
		// 监听连接成功
		this.socket.onopen = this.onOpen
		// 监听接收信息
		this.socket.onmessage = this.onMessage
		// 监听断开
		this.socket.onclose = this.onClose
		// 监听错误
		this.socket.onerror = this.onError
    }
    // 监听打开
	onOpen(res){
		console.log('socket连接成功',res)
	}
	// 发送消息
	send(msg){
		this.socket.send(msg)
	}
	// 关闭连接
	close(){
		this.socket.close()
	}
	// 监听接收消息
	onMessage(msg){
		bus.$emit('onMessage', msg);
	}
	// 监听关闭
	onClose(){
		// 用户下线
		console.log('socket连接关闭')
	}
	// 监听连接错误
	onError(){
		// 用户下线
		console.log('socket连接错误')
	}
	
}

export default chat