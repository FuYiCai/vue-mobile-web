<template>
    <div>
        <div v-if="dataObj" v-html="dataObj.details"></div>
        <van-empty v-else description="敬请期待~~" />
    </div>
</template>
<script>
    export default {
        data() {
			return {
				dataObj:true
			}
		},
    async created(){
            const strId = this.$route.params.id;
            const id = Number(strId)
            const {data} = await this.$H.post('home/selectByMenusIdAndArticle',{menuId:id});
            console.log('富文本',data);
            if(data.code === 200 ){
                this.dataObj = data.data;
            }
        }
    }
</script>
<style >
video{
    max-width: 100%;
}
</style>