<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in initArr" :key="index">
           <van-image  width="100%" height="100%"  fit="cover"  :src="item.path" />
        </van-swipe-item>
    </van-swipe>
</template>
<script>
	export default {
		data() {
			return {
				initArr: []
			}
		},
		async  created() {
      const {data} = await this.$H.post('home/bannersList');
      if(data.code === 200){
        const res =data.data;
				console.log('获取banner图数据',res);
				this.initArr = res.map(item => this.$img_url + item.path)
      }
		}
	}
</script>
<style  scoped>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>