	  var yundaoWx={};
	  yundaoWx.projectid="uber";
	  yundaoWx.scope="";
	  var myuserOpenid="";
	  //微信jssdk接口校验
	  yundaoWx.Signature=function(){
		  $.ajax({
				url : 'http://h5.sjzzimu.com/zimuWx/wxAction/wxSignature.action',
				data : {
					url : location.href
				},
				type : 'POST',
				success : function(data) {
					wx.config({
						debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId : 'wx61c6b796cc8c608d', // 必填，公众号的唯一标识
						timestamp : data.timestamp, // 必填，生成签名的时间戳
						nonceStr : data.nonceStr, // 必填，生成签名的随机串
						signature : data.signature,// 必填，签名，见附录1
						jsApiList : [ 'onMenuShareTimeline',
								'onMenuShareAppMessage', 'onMenuShareQQ',
								'onMenuShareWeibo', 'onMenuShareQZone',
								'startRecord', 'stopRecord', 'onVoiceRecordEnd',
								'playVoice', 'pauseVoice', 'stopVoice',
								'onVoicePlayEnd', 'uploadVoice', 'downloadVoice',
								'chooseImage', 'previewImage', 'uploadImage',
								'downloadImage', 'translateVoice',
								'getNetworkType', 'openLocation', 'getLocation',
								'hideOptionMenu', 'showOptionMenu',
								'hideMenuItems', 'showMenuItems',
								'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem',
								'closeWindow', 'scanQRCode', 'chooseWXPay',
								'openProductSpecificView', 'addCard', 'chooseCard',
								'openCard' ]
					});
				}
			});
	  }
	  //微信网页验证，获取用户信息
	  yundaoWx.OAuth=function(callBack){
		  if(yundaoWx.getUrlParam("code") !=null){
			 var mycode=yundaoWx.getUrlParam("code");
			
			  //根据code获取用户信息
			    $.ajax({
				url : 'http://h5.sjzzimu.com/zimuWx/wxAction/getUserMsg.action',
				data : {
					code : mycode,
					scope:yundaoWx.scope
				},
				type : 'POST',
				success : function(data) {
						if(data){
							var obj = JSON.parse(data);
							myuserOpenid=obj.openid;
							yundaoWx.AddBrowse();
							callBack(obj);
						} else {
							var index = location.href.indexOf('?');
							var	url = location.href.substr(0,index);
							location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx61c6b796cc8c608d&redirect_uri="+url+"&response_type=code&scope="+yundaoWx.scope+"&state=STATE#wechat_redirect"
						}
					}
				});
		  }else{
			  if(yundaoWx.scope=="unscope"){
			  //不需要网页授权  
			  yundaoWx.AddBrowse();
			  }else{
			  //需要获取网页授权
				  
		      location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx61c6b796cc8c608d&redirect_uri="+location.href+"&response_type=code&scope="+yundaoWx.scope+"&state=STATE#wechat_redirect" 
			  }
		  }
	  }
	  //获取URL中的参数
	  yundaoWx.getUrlParam=function (name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	        if (r != null) return unescape(r[2]); return null; //返回参数值
	    }
	  //获取用户信息后  回调
	  yundaoWx.getUserMsg=function(data){
		  
		  
	  }
	  //添加访问量统计
	  yundaoWx.AddBrowse=function(){
		  $.ajax({
				url : 'http://h5.sjzzimu.com/zimuWx/wxAction/addBrowse.action',
				data : {
					projectid : yundaoWx.projectid,openid:myuserOpenid
				},
				type : 'POST',
				success : function(data) {
				}
				});
	  }
	  yundaoWx.share_title="";
	  yundaoWx.share_desc="";
	  yundaoWx.share_link="";
	  yundaoWx.share_imgUrl="";
	  //添加访问量统计
	  yundaoWx.share=function(){
		  // 全局变量
		    var share_title = yundaoWx.share_title;
		    var share_desc = yundaoWx.share_desc;
		    var share_link = yundaoWx.share_link;
		    var share_imgUrl = yundaoWx.share_imgUrl;
		    yundaoWx.Signature();
		    wx.ready(function() {
				yundaoWx.ready();
		        wx.onMenuShareTimeline({
		            title: share_title,
		            link: share_link,
		            imgUrl: share_imgUrl,
		            success: function() {
					
		            	yundaoWx.statisticsShare("onMenuShareTimeline");
		            	
		            	
		            },
		            cancel: function() {
		            }
		        });

		        wx.onMenuShareAppMessage({
		            title: share_title, // 分享标题
		            desc: share_desc, // 分享描述
		            link: share_link,
		            imgUrl: share_imgUrl,
		            type: 'link', // 分享类型,music、video或link，不填默认为link
		            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		            success: function() {
		            	yundaoWx.statisticsShare("onMenuShareAppMessage");
		            	
		            },
		            cancel: function () { 
		                // 用户取消分享后执行的回调函数
		            }
		        });
		        wx.onMenuShareQQ({
		            title: share_title, // 分享标题
		            desc: share_desc, // 分享描述
		            link: share_link,
		            imgUrl: share_imgUrl,// 分享图标
		            success: function() {
		            	
		            	yundaoWx.statisticsShare("onMenuShareQQ");
		            },
		            cancel: function () { 
		               // 用户取消分享后执行的回调函数
		            }
		        });

		        wx.onMenuShareWeibo({
		            title: share_title, // 分享标题
		            desc: share_desc, // 分享描述
		            link: share_link,
		            imgUrl: share_imgUrl, // 分享图标
		            success: function() {
		            	yundaoWx.statisticsShare("onMenuShareWeibo");
		            	
		            },
		            cancel: function () { 
		                // 用户取消分享后执行的回调函数
		            }
		        });

		        wx.onMenuShareQZone({
		            title: share_title, // 分享标题
		            desc: share_desc, // 分享描述
		            link: share_link,
		            imgUrl: share_imgUrl, // 分享图标
		            success: function() {
		            	yundaoWx.statisticsShare("onMenuShareQZone");
		            },
		            cancel: function () { 
		                // 用户取消分享后执行的回调函数
		            }
		        });
		    });
	  }
	  //统计分享量
	  yundaoWx.statisticsShare=function(type){
		  yundaoWx.shareCallBack();
		  $.ajax({
				url : 'http://h5.sjzzimu.com/zimuWx/wxAction/statisticsShare.action',
				data : {
					projectid : yundaoWx.projectid,userOpenid:myuserOpenid,type:type
				},
				type : 'POST', 
				success : function(data) {
				}
				});
	  }

	
		  //关键步骤操作统计
	  yundaoWx.mainOperation=function(type){
		  yundaoWx.shareCallBack();
		  $.ajax({
				url : 'http://h5.sjzzimu.com/zimuWx/wxAction/mainOperation.action',
				data : {
					projectid : yundaoWx.projectid,userOpenid:myuserOpenid,type:type
				},
				type : 'POST', 
				success : function(data) {
				}
				});
	  }
	
	
	
	
	yundaoWx.shareCallBack=function(){
		
		
		
	}
	yundaoWx.ready=function(){
	
		
	}
	