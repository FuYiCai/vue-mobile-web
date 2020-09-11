<template>
    <div style="padding:0 5px">
        <div class="text-center py-1">
			他们都在使用
		</div>
        <div class="flex justify-around" style="overflow-y: scroll;">
            <van-image   v-for="item in itemData" :key="item.id"
             class="flex-shrink" width="30%"  height="100"  fit="cover"  :src="$img_url + item.pictures" />
        </div>
    </div>
</template>
<script>
	export default {
		data() {
			return {
				itemData: [ ]
			}
		},
	    async created() {
            const {data} =await this.$H.post('home/selectByPictures');
            if(data.code === 200){
				console.log('他们在用',data.data);
				this.itemData = data.data;
            }
		}
	}
</script>