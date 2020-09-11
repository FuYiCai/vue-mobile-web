<template>
    <div>
        <div class="py-1 px-1 d-inline-block">报名热线</div>
        <van-form @submit="onSubmit" ref="form">
            <van-field
                v-model="phone"
                name="phone"
                label="手机号"
                type="tel"
                maxlength="11"
                label-width="4em"
                placeholder="手机号"
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="username"
                name="username"
                label-width="4em"
                label="姓  名"
                placeholder="姓  名"
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                @click="slectSite = true"
                v-model="site"
                name="site"
                label-width="4em"
                label="所在地区"
                placeholder="请选择所在地区"
                :rules="[{ required: true, message: '' }]"
                readonly
            />
            <van-field
                v-model="companyName"
                name="companyName"
                label="公司名称"
                label-width="4em"
                placeholder="公司名称"
                :rules="[{ required: true, message: '' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                提交
                </van-button>
            </div>
        </van-form>
        <van-popup v-model="slectSite" position="bottom" :style="{ height: '40%' }" >
             <van-area  @confirm="confirm" :area-list="areaList" value="522301" />
        </van-popup>
    </div>
</template>
<script>
    import areaList from '../../assets/areaList'
    export default {
        data(){
            return {
                username: '',
                phone: '',
                companyName:'',
                site:'',
                slectSite:false,
                areaList:areaList
            }
        },
        methods: {
            onSubmit(values) {
                console.log('submit', values);
                const {companyName,username,phone,site} = values;
				this.$toast.loading({
                    message: '提交中...',
                    forbidClick: true,
                });
				this.$H.post('home/addHotline',{
					telephone:phone,
					name:username,
					companies:companyName,
					region:site,
				}).then(res =>{
					this.$toast.success('提交成功');
					for (let v in values) {
                      this[v] = ''
                    }
				})
            },
            confirm(area){
                console.log(area);
                this.site = area.map(item => item.name).join('')
                this.slectSite = false;
            }
        },
    }
</script>