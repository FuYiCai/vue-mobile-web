<template>
    <div class="py-1 px-1 footer-bg text-center grayff"  >
		<div class="flex justify-center align-center mb-1">
            <img :src="webdata.qrcode"  @click="imPreview(webdata.qrcode)"	width="120" height="120" >
		</div>
		<span>关注公众号： All软件开发</span>
		<div class="my-1">服务热线：<a class="grayff" :href="'tel:'+webdata.cellphone">{{webdata.cellphone}} </a> </div>
		<a href="https://beian.miit.gov.cn" style="color: inherit;">
			<span space="ensp" >
				© {{webdata.icpPreparation}}
			</span>
		</a>
	</div>
</template>
<script>
    import { ImagePreview } from 'vant';

    export default {
        data(){
            return {
                webdata:{qrcode:'',cellphone:'0859-3225588'},
            }
        },
        async  created() {
            const {data} = await this.$H.post('home/selectByWebsite');
            console.log('公司信息',data);
            if(data.code === 200) {
                data.data[0].qrcode = this.$img_url + data.data[0].qrcode;
                this.webdata = data.data[0];
            }
        },
        methods:{
             imPreview(url){
                 ImagePreview([url]);
            },
        }
    }
</script>
<style  scoped>
.footer-bg{
		background-color: rgb(78, 82, 94);
	}
.footer-item{
    color: rgb(195, 198, 202);
    background-color: rgb(85, 89, 101);
}
.grayff{
    color: rgb(195, 198, 202);
}
</style>