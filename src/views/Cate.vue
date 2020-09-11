<template>
    <div>
        <template v-if="isHaveData">
            <div class="text-center border-top">
			<div class="py-1">
                {{tabData.type}}
			</div>
			<table  class="text-center" style="overflow: scroll;" >
				<tr  >
				  <td style="width: 30%;">组件</td>
				  <td>框架</td>
				  <td>语言</td>
				  <td>数据库</td>
				</tr>
                <tr v-for="(item,index) in tabData.assembly"  :key="index">
                    <td class="border">{{item}} </td>
                    <td v-if="index===0"  :rowspan="assemblyLen" >{{tabData.frames}}</td>
                    <td v-if="index===0"   :rowspan="assemblyLen">{{tabData.language}}</td>
                    <td v-if="index===0"  :rowspan="assemblyLen">{{tabData.database}}</td>
                </tr>
			</table >
        </div>
        </template>
        <van-empty v-else description="敬请期待~~" />
    </div>
</template>
<script>
	export default {
		data() {
			return {
                tabData:{assembly:[]},
                isHaveData:false
			}
		},
		computed:{
			assemblyLen(){
				return this.tabData.assembly.length
			}
		},
		created() {
            const strId = this.$route.params.id;
            const id = Number(strId)
			this.getInitData(Number(id));
		},
		methods: {
		    async	getInitData(id){
                const {data:res} = await this.$H.post('home/selectByDevelType',{menuId:id});
                const {code,data} = res;
                if(code === 200 && data){
                    this.isHaveData = true;
                    if(typeof data.assembly === 'string'){
                        data.assembly  = data.assembly.split('、')
                        this.tabData = data;
					}
                }else{
                    this.isHaveData = false;
                }
                console.log('业务类型',this.tabData );
			}
		}
	}
</script>

<style scoped>
table{
	 border-collapse:collapse;
	 border:1px solid #dee2e6;
}
td{
	height: 60rpx;
	border:1px solid #dee2e6;
}
.b-black{
	border:1px solid #dee2e6;
}
</style>