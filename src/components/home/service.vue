<template>
    <div>
        <div class="item"  :style="'top:'+itemTop"    @click="showPop"
        @touchmove.stop.prevent="touchmove"   >
            <span v-if="isNotRed" class="msg zwyShake">+1</span>
            <img width="50" height="50" src="../../assets/images/kefu.png" alt="客服">
        </div>
        <van-popup v-model="show"  overlay round position="bottom" style="height:350px" >
            <div style="height:100%" class="flex flex-column">
                <div class="p-1 text-white bg-primary rounded-top" >小驭</div>
                <div ref="scrollerContent"   style="overflow:scroll;" class="flex-1">
                    <div v-for="(item,index) in chatMsg" :key="index">
                        <div v-if="item.id === 1" class="flex flex-column p-1 mb-2">
                            <div class="flex align-center">
                                <img src="../../assets/images/kefu.png" 	class="chat-img flex-shrink">：
                                <span class="bg-hover-light line-height2em text-muted  rounded">{{item.chat}}</span>
                            </div>
                            <div class="flex align-center justify-center font12 text-muted mt-1">{{item.sendTime}}</div>
                        </div>
                        <!-- 用户 -->
                        <div v-if="item.id === 0" class="flex  flex-column align-center mb-2 px-1 text-white " >
                            <div class="ml-auto flex ">
                                 <span class="bg-primary line-height2em  rounded">{{item.chat}}</span>
                               <div>我</div>
                            </div>
                            <div class="flex align-center justify-center font12 text-muted mt-1">{{item.sendTime}}</div>
                        </div>
                    </div>
                </div>
                <div >
                    <div class="flex align-center bg-primary" >
                        <textarea class="flex-1 p-1"  style="height: 25px;" v-model="chatValue" placeholder="请输入..."/>
                        <div class="flex align-center px-3 text-white"  @click="sendMsg"	> 发送  </div>
                    </div>
                    <div class="flex justify-center text-muted py-1 change-color" >驭浪科技</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import wsChat from '@/utils/wsChat';
    import bus from '@/utils/bus';
    export default {
        data(){
            return {
                itemTop:'400px',
                show:false,
                chatValue:'',
                chatMsg:[
                    {chat:'您好！我是小驭，能为您提供什么帮助吗？',id:1,
                    sendTime: new Date().toLocaleString('chinese', { hour12: false })
                    }
                ],
                wsChatObj:null,
                isNotRed:false, //消息未读数
            }
        },
        watch:{
			chatMsg:function(nv){
				this.goToBottom()
            },
            show:function(nv){
                if(nv){
                    this.isNotRed = false
                    if(!this.wsChatObj ){
                        this.wsChatObj = new wsChat(this.getRandomNum());
                    }
                }
            },

        },
        mounted(){
            bus.$on('onMessage', (e) => {
                const {nickname,msg} = JSON.parse(e.data);

                if(nickname === 'admin'){
                    if(!this.show){
                        // 关闭后收到消息显示未读
                        this.isNotRed = true
                    }else{
                        this.isNotRed = false
                    }
                    this.chatMsg.push({chat:msg,id:1,
                    sendTime: new Date().toLocaleString('chinese', { hour12: false })});
                }
            })
        },
        destroyed(){
           this.wsChatObj && this.wsChatObj.close()
        },
        methods:{
            sendMsg(){
                const msg = {chat:this.chatValue,id:0,
                sendTime: new Date().toLocaleString('chinese', { hour12: false })};
                if(msg.chat === '')return;
                const socketMsg = { msg: msg.chat, toUser:'admin' ,type:1, roomId:this.getRandomNum()};
                this.wsChatObj.send(JSON.stringify(socketMsg));
				this.chatMsg.push(msg);
                this.chatValue = "";
            },
            touchmove(e){
                this.itemTop = e.touches[0].clientY - 20 + 'px';
            },
            showPop(){
                this.show = true;
                this.goToBottom()
            },
            goToBottom(){
                if(!this.show)return ;
                this.$nextTick(()=>{
                     this.$refs.scrollerContent.scrollTop = 350;
                })
            },
            getRandomNum(e = 32){
                const wStor = window.sessionStorage.getItem('getRandomNum') ;
                if(wStor){
                    return wStor
                }
                const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"
                const a = t.length
                let n = "";
                for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
                window.sessionStorage.setItem('getRandomNum', n);
                return n;
            }
        }   
    }
</script>
<style lang="scss" scoped>

.item{
    position: fixed;
    right: 5px;
}
.msg{
    position: absolute;
    right: 0;
    padding: 2px;
    background-color: red;
    color: white;
    border-radius: 50%;
}
.chat-img{
    width: 25px;height: 25px;
}
.line-height2em {
    line-height: 1.5em;
    padding: 5px ;
}
@-webkit-keyframes masked-animation {
		0% {
			background-position: 0 0
		}

		to {
			background-position: -100% 0
		}
	}
	.change-color {
		width: 94%;
		margin: 0 auto;
		height: 100rpx;
		line-height: 100rpx;
		font-weight: 900;
		font-size: 36rpx;
		background-image: -webkit-linear-gradient(left, #f60, #DD524D 25%, #3499cd 50%, #DD524D 75%, red);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		-webkit-background-size: 200% 100%;
		-webkit-animation: masked-animation 1s infinite linear;
	}
.font12{
    font-size: 12px;
}
//文字抖动
.zwyShake {
	transform-origin: center bottom;
	animation: zwyShake 2s 0.5s ease-out infinite;
}
@keyframes zwyShake {
	0% {
		transform: rotate(0deg);
		transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
	}

	10% {
		transform: rotate(-12deg);
		transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
	}

	20% {
		transform: rotate(12deg);
		transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
	}

	28% {
		transform: rotate(-10deg);
		transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
	}

	36% {
		transform: rotate(10deg);
		transition-timing-function: cubic-bezier(0.755, .5, .855, .06);
	}

	42% {
		transform: rotate(-8deg);
		transition-timing-function: cubic-bezier(0.755, .5, .855, .06);
	}

	48% {
		transform: rotate(8deg);
		transition-timing-function: cubic-bezier(0.755, .5, .855, .06);
	}

	52% {
		transform: rotate(-4deg);
		transition-timing-function: cubic-bezier(0.755, .5, .855, .06);
	}

	56% {
		transform: rotate(4deg);
		transition-timing-function: cubic-bezier(0.755, .5, .855, .06);
	}

	60% {
		transform: rotate(0deg);
		transition-timing-function: cubic-bezier(0.755, .5, .855, .06);
	}

	100% {
		transform: rotate(0deg);
		transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
	}
}

</style>