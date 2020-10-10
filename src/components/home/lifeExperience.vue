<template>
   <div class="px-1 border-bottom">
       <div class="py-1 animate__animated animate__rotateInUpLeft">成长经历</div>
        <van-row>
            <van-col span="12" class="animate__animated animate__lightSpeedInLeft">
                <div ref="rightCol"     :style="'height:'+itemHeight+'px'" style="overflow-y: scroll;">
                    <van-row gutter="5">
                        <van-col span="12" v-for="(item,index) in imgMsg" :key="index" >
                            <img :src="item.imgArr"	width="98%" height="100" >
                        </van-col>
                    </van-row>
                </div>
            </van-col>
            <van-col span="12" class="animate__animated animate__backInLeft">
                 <div ref="leftCol"
                  :style="'height:'+itemHeight+'px'" style="overflow-y: scroll;">
                     <span v-for="item in textArr" :key="item">{{item}}</span>
               </div>
            </van-col>
        </van-row>
        <van-popup v-model="videoShow"  @click-overlay="clickOverlay">
            <video class="animate__animated  animate__fadeInUp" width="100%" controls ref="video">
                <source :src="mp4" type="video/mp4">
                <source src="myVideo.webm" type="video/webm">
                <p>你的手机太旧了H5 video. 都不支持
                     <a :href="mp4">link to the video</a> 代替</p>
            </video>
        </van-popup>
   </div>
</template>
<script>
    export default {
        data (){
            return {
                itemHeight:50,
                textArr:[],
                imgMsg:[],
                videoShow:false,
                mp4:'https://vod.topys.com/5f59e42dcf854afdafb8bfc100c8579a/3b81d283060346e194228ca41c7fc1c7-c78099e4ee594567884dac946d1b76e3-sd.mp4'
            }
        },
        created(){
            this.getGrowpUp()
        },
        methods:{
            getItemHeight(){
                const  right = this.$refs.rightCol.getBoundingClientRect().height || 150;
                const left  = this.$refs.leftCol.getBoundingClientRect().height || 90;
                this.itemHeight = Math.min(right,left) + 50;
            },
            clickOverlay(){
                this.$refs.video.pause()
            },
            async  getGrowpUp(){
                const {data} =await this.$H.post('home/selectByGrowth')
                if(data.code === 200 ){
                    const res = data.data;
                    console.log('成长经历',res);
                    this.textArr = res.map(item => item.introduce);
                    let imgArr = '';
					this.imgMsg = res.map(item => {
                         JSON.parse(item.pictures).forEach(item =>{
                             imgArr = (this.$img_url + item)
                        })
                        return {imgArr,mp4:item.video}
                    })
                    console.log('成长经历',this.imgMsg);

                    this.getItemHeight();
                }
			},
        }
    }
</script>