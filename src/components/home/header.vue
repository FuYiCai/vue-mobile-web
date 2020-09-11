<template>
    <div class="px-1">
        <div class="bg-white border-bottom animate__animated animate__fadeInDown">
			<div class="flex justify-between flex-wrap align-center  p-1  ">
                <span v-for="(item,index) in treeData"	 :key="index"    @click="headerFn(item,index)" class="iconfont mb-1"> 
                    <template v-if="isWeb(item)">
                        <a style="color: #333333;" :href="item.path">{{item.menuName}}</a>
                    </template>
                    <template v-else>
                        {{item.menuName}}{{item.children.length > 0 ? '&#xe7a8;' : ''}} 
                    </template>
                </span>
			</div>
		</div>
        <van-popup v-model="show"  position="top"  >
            <headerListItem :list="headerTreeObj.children" ></headerListItem>
        </van-popup>
    </div>
</template>
<script>
    const reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;

    import headerListItem from './headerListItem'
    export default {
        components:{
            headerListItem
        },
        provide(){
            return {
                that:this
            }
        },
        data(){
            return {
                treeData:[],
                show:false,
                headTitleIndex:1000
            }
        },
        created(){
            this.menuFn()
        },
        computed:{
            headerTreeObj(){
				if(this.headTitleIndex !== 1000){
					return this.treeData[this.headTitleIndex]
				}
				return [{menuName:'***',children:[]}];
			},
        },
        methods:{
            headerFn(item='abc',index){
                if(this.isWeb(item))return;
				this.headTitleIndex = index;
				if(this.treeData[index].children.length > 0){
                    this.show = true;
				}
            },
            isWeb(item){
                // 只判断是否是最后一个是调a标签
                if(item.children.length){
                    return false
                }
                if(reg.test(item.path)) {
                    return true
                }
                return false;
            },
            navTo(item){
                if(item.path === 'cate') {
                    return this.$router.push({ path: `/cate/${item.id}` }) 	
				};
				if(item.path === "details") {
                    return this.$router.push({ path: `/details/${item.id}` }) 
                }
                return this.$router.push({ path: `/list/${item.id}` }) 
            },
            
            // 头部菜单
		    async	menuFn(){
                const {data} =await this.$H.post('home/treeselect');
                if(data.code === 200){
                    console.log('菜单',data.data);
					this.treeData = data.data;
                }
            
			},
        }
    }
</script>
<style scoped>
.py-05{
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>