<template>
    <div class="flex flex-wrap  bg-white " >
        <div v-for="(item,index) in list" :key="index"	class="p-1"	>
                 <template v-if="isWeb(item)">
                    <a style="color: #333333;" :href="item.path">{{item.menuName}}</a>
                </template>
                <template v-else>
                    <span @click="checkChildren(item)" class="iconfont">
                        {{item.menuName}}{{item.children.length > 0 ? '&#xe7a8;' : ''}} 
                    </span>
                </template>
            <template v-if="item.children.length && haveChildren">
                <list :list="item.children"></list>
            </template>
        </div>
    </div>
</template>
<script>
    const reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;

    export default {
    name: "List",
    props: {
        list: Array
    },
    inject:['that'],
    data(){
        return {
            haveChildren:false
        }
    },
    methods:{
        checkChildren(item){
            if(this.haveChildren){
                return this.haveChildren = false;
            }
            if(item.children.length){
                this.haveChildren = true;
            }else{
                this.that.navTo(item)
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
    }
    };
</script>