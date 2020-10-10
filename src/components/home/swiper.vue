<template>
    <van-swipe  :autoplay="3000" height="200">
        <van-swipe-item v-for="(item,index) in initArr" :key="index">
		   <img v-lazy="item" />
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
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }

</style>