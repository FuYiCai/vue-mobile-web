let _url = '';
const h5 = 'https://sys.api.yulangsat.com/api/';
// const h5 = 'http://192.168.1.15:8080/api/';

const img_url = 'https://sys.api.yulangsat.com';
function url () {
	if(process.env.NODE_ENV === 'development'){
	    console.log('开发环境',process.env.NODE_ENV )
		_url = '/api';
	}else{
		console.log('生产环境',process.env.NODE_ENV )
	    _url = h5;
	}
	return _url;
}



export default  {
  base_url:url(),
  socketUrl:'wss://sys.api.yulangsat.com/websocket/front/',
  img_url:img_url
}

// http://www.yulangsat.com/

// http://192.168.1.17:8080/api/