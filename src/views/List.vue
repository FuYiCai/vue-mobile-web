<template>
    <div>
        <template v-if="caseArr.length">
            <div class="flex flex-wrap justify-between">
                <div
                    v-for="(item,index) in caseArr" :key="index"
                    style="width: 48%;"
                    class="mb-2 animate__animated animate__zoomIn d-inline-block" >
                    <van-image @click="imgPreview(item.picture)" class="mb-2 flex-shrink" 
                    :src="$img_url + item.picture" fit="cover"></van-image>
                    <div class="dian">{{item.title}}</div>
                </div>
            </div>
        </template>
        <template v-else>
             <van-empty  description="敬请期待~~" />
        </template>
    </div>
</template>
<script>
    import { ImagePreview } from 'vant';

    export default {
        data() {
			return {
				caseArr:[1]
			}
		},
        async created() {
            const strId = this.$route.params.id;
            const id = Number(strId)
            const {data} =await this.$H.post('home/selectByMenuIdAndDevcases',{menuId:id});
            console.log('案例',data);
            if(data.code === 200){ 
                this.caseArr = data.data
            }
        },
        methods:{
            imgPreview(url) {
                ImagePreview([this.$img_url + url])
            }
        }
    }
</script>
<style  scoped>
    .dian{
        overflow: hidden;
    text-overflow: ellipsis; 
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    }
</style>