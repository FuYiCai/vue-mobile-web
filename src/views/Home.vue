<template>
  <div>
    <HomeHeader />
    <HomeSwiper />
    <devCase />
    <lifeExperience />
    <themUse/>
    <hotLine/>
    <homeFooter/>
    <homeService/>
  </div>
</template>

<script>
import HomeHeader from '@/components/home/header';
import HomeSwiper from '@/components/home/swiper';
import devCase from '@/components/home/devCase';
import lifeExperience from '@/components/home/lifeExperience';
import themUse from '@/components/home/themUse';
import hotLine from '@/components/home/hotLine';
import homeFooter from '@/components/home/homeFooter';
import homeService from '@/components/home/service';

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper,
    devCase,
    lifeExperience,
    themUse,
    hotLine,
    homeFooter,
    homeService
  }
}
</script>
