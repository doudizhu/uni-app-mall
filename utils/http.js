module.exports = (param) => {
	const url = param.url;
	const method = param.method
	const header = param.header || {}
	const data = param.data || {}
	
	// 请求方式: GET POST
	if(method){
		method = method.toUpperCase() 
		if(method === 'POST'){
			header = {
				"content-type": "application/x-www-form-urlencoded"
			}
		}
	}
	
	// 发起请求 加载动画
	if(!param.hideLoading){
		uni.showLoading({
			title:'加载中 ...'
		})
	}
	
	// 发起网络请求
	uni.request({
		url,
		header,
		method:method || 'GET',
		data,
		success:res=>{
			if(res.statusCode && res.statusCode !== 200){ // api错误
				uni.showModal({
					content: res.msg
				})
				return;
			}
			typeof param.success === 'function' && param.success(res.data);
		},
		fail: (e)=>{
			uni.showModal({
				content: e.msg,
			})
			typeof param.fail === 'function' && param.fail(e.data);
		},
		complete: ()=>{
			console.log('网络请求complete')
			uni.hideLoading()
			typeof param.complete === 'function' && param.complete(e.data);
			return
		}
	})
}