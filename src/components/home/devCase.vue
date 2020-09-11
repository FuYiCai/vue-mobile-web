<template>
   <div class="px-1 border-bottom">
       <div class="py-1 animate__animated animate__backInLeft">开发案例</div>
        <van-row>
            <van-col span="12" class="animate__animated animate__backInLeft">
               <div ref="leftCol"      :style="'height:'+itemHeight+'px'" style="overflow-y: scroll;">
                    <span v-for="item in textArr" :key="item">{{item}}</span>
               </div>
            </van-col>

            <van-col span="12" class="animate__animated animate__backInRight">
                <div ref="rightCol"
                 :style="'height:'+itemHeight+'px'" style="overflow-y: scroll;">
                    <van-row gutter="5">
                        <van-col span="12" v-for="(item,index) in imgArr" :key="index" >
                            <!-- <img :src="item.url"	width="98%" height="100" > -->
                            <van-image width="98%" fit="cover" @click="imPreview(item.url)"  :src="item.url" />
                        </van-col>
                    </van-row>
                </div>
            </van-col>
        </van-row>
   </div>
</template>
<script>
    import { ImagePreview } from 'vant';
    export default {
        data (){
            return {
                itemHeight:80,
                textArr:[],
                imgArr:[]
            }
        },
        created(){
            this.getCase()
        },
        methods:{
            imPreview(url){
                 ImagePreview([url]);
            },
            getItemHeight(){
                const  right = this.$refs.rightCol.getBoundingClientRect().height || 150;
                const left  = this.$refs.leftCol.getBoundingClientRect().height || 90;
                this.itemHeight = Math.min(right,left) + 50;
            },
            // 获取开发案例数据
		    async	getCase(){
                const {data} =await this.$H.post('home/selectByDevcases') ;
                    if(data.code === 200 ){
                    const res = data.data
                        console.log('开发案例',res);
                        this.textArr = res.map(item => item.title)
                        this.imgArr = res.map(item => {
                            return {
                                url:this.$img_url + item.picture,
                                identification:item.identification,
                                type:'image'
                            }
                        });
                        this.$nextTick(()=>{
                            this.getItemHeight()
                        })
                }
			},
        }
    }
</script>