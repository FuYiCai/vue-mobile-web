<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
	export default {
		created() {
			const sUserAgent = navigator.userAgent.toLowerCase();
			if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
				  //跳转移动端页面  
			}else{
				  window.location.href = "https://yulangsat.com" + this.$router.history.current.fullPath
			}
		}
	}
</script>
<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
	background-color: #FFFFFF;
	font-size: 14px;
	color: #333333;
	font-family: Helvetica Neue, Helvetica, sans-serif;
}
div{box-sizing: border-box;}
@font-face {
  font-family: 'iconfont';  /* project id 2005872 */
  src: url('//at.alicdn.com/t/font_2005872_c9lq9eiq947.eot');
  src: url('//at.alicdn.com/t/font_2005872_c9lq9eiq947.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2005872_c9lq9eiq947.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2005872_c9lq9eiq947.woff') format('woff'),
  url('//at.alicdn.com/t/font_2005872_c9lq9eiq947.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2005872_c9lq9eiq947.svg#iconfont') format('svg');
}

</style>
