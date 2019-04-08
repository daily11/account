(function($, owner) {

	/**
	 * 真实环境[上线版本，不允许打印Log]，值为true；
	 * 测试环境，值为false;
	 */
	let APP_LOG = false;

	/**
	 * 手机端打印Log
	 */
	owner.route = function() {
		var url = location.href;
		// console.log(url);
		if (!APP_LOG) {
			var arr = url.split("www");
			url = arr[1];
			console.log("--->页面路径：" + url);
		} else {
			url = "";
		}
		return url;
	}
	
	owner.showProgressBar = function(bShow) {
		if (bShow || bShow == undefined) {
			if (owner.count_progress == 0) {
				mui('body').progressbar({
					progress: undefined
				}).show();
			}

			owner.count_progress++;
		} else {
			owner.count_progress--;

			if (owner.count_progress == 0) {
				setTimeout(function() {
					mui('body').progressbar().hide();
				}, 100)
			}
		}
	}

	owner.setItem = function(key, value) {
		localStorage.setItem(key, value);
	}

	owner.getItem = function(key) {
		return localStorage.getItem(key);
	}


	owner.ajax = function(_url, mapInfo, callback) {
		mui.ajax(_url, {
			data: mapInfo,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 20000, //超时时间设置为10秒；
			//    headers:{'Content-Type':'application/json'},    
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'X-Requested-With': 'XMLHttpRequest'
			},
			//    headers:{'content-type':'multipart/form-data','X-Requested-With':'XMLHttpRequest'},
			processData: true,
			success: function(data) {
				callback(data);
			},
			error: function(xhr, type, errorThrown) {
				//                console.log(_url);
				//                console.log(xhr);
				//                console.log(JSON.stringify(xhr));
				//异常处理；
				callback({
					'return': 1,
					'error': type + " " + errorThrown
				});
			}
		});
	}

	owner.open = function(str) {
		mui.openWindow({
			url: str,
			id: str,
			preload: false,
			createNew: true,
			show: {
				aniShow: 'pop-in'
			},
			styles: {
				popGesture: 'hide'
			},
			waiting: {
				autoShow: true
			}
		});
	}

	owner.getUrlParam = function(key) {
		var href = location.href;
		var arrParams = href.split("?");
		var strParam = "";
		if (arrParams.length > 1)
			strParam = arrParams[1];

		var arrSubParams = strParam.split("&");
		if (arrSubParams.length > 0) {
			for (var i = 0; i < arrSubParams.length; ++i) {
				var arrKeyValue = arrSubParams[i].split('=');
				if (arrKeyValue.length > 0) {
					if (arrKeyValue[0].toLowerCase() == key.toLowerCase()) {
						if (arrKeyValue.length > 1)
							return decodeURI(arrKeyValue[1]);

						return "";
					}
				}
			}
		}

		return "";
	}


	owner.formatUnixtime = function(value) {
		var unixTimestamp = null;
		if (value)
			unixTimestamp = new Date(value);
		else
			unixTimestamp = new Date();
		return unixTimestamp.toLocaleString();
	}

	owner.plusZero = function(value) {
		if (value < 10)
			return "0" + value;

		return value;
	}

	owner.formatUnixtime2 = function(value, hasSecond) {
		var unixTimestamp = null;
		if (value)
			unixTimestamp = new Date(value);
		else
			unixTimestamp = new Date();

		var strDate = unixTimestamp.getFullYear() + '-' + owner.plusZero((unixTimestamp.getMonth() + 1)) + '-' + owner.plusZero(
			unixTimestamp.getDate());
		strDate += " " + owner.plusZero(unixTimestamp.getHours()) + ":" + owner.plusZero(unixTimestamp.getMinutes());

		if (hasSecond)
			strDate += ":" + owner.plusZero(unixTimestamp.getSeconds());

		return strDate;
	}

	owner.formatUnixtime3 = function(value, plusDays, bZeroTime) {
		var unixTimestamp = new Date(value);
		if (value)
			unixTimestamp = new Date(value);
		else
			unixTimestamp = new Date();

		if (plusDays) {
			unixTimestamp.setTime(unixTimestamp.getTime() + plusDays * 60 * 60 * 24 * 1000);
		}

		var strDate = unixTimestamp.getFullYear() + '-' + owner.plusZero((unixTimestamp.getMonth() + 1)) + '-' + owner.plusZero(
			unixTimestamp.getDate());

		if (bZeroTime) {
			strDate += " 00:00:00";
		} else {
			strDate += " " + owner.plusZero(unixTimestamp.getHours()) + ":" + owner.plusZero(unixTimestamp.getMinutes());
			strDate += ":" + owner.plusZero(unixTimestamp.getSeconds());
		}

		return strDate;
	}

	owner.formatSeconds = function(value) {
		var result = [0, 0, 0];
		var secondTime = parseInt(value); // 秒
		var minuteTime = 0; // 分
		var hourTime = 0; // 小时
		if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
			//获取分钟，除以60取整数，得到整数分钟
			minuteTime = parseInt(secondTime / 60);
			//获取秒数，秒数取佘，得到整数秒数
			secondTime = parseInt(secondTime % 60);
			//如果分钟大于60，将分钟转换成小时
			if (minuteTime > 60) {
				//获取小时，获取分钟除以60，得到整数小时
				hourTime = parseInt(minuteTime / 60);
				//获取小时后取佘的分，获取分钟除以60取佘的分
				minuteTime = parseInt(minuteTime % 60);
			}
		}

		result[2] = parseInt(secondTime);

		if (minuteTime > 0) {
			result[1] = parseInt(minuteTime);
		}
		if (hourTime > 0) {
			result[0] = parseInt(hourTime);
		}
		return result;
	}

	owner.formatSecondsStr = function(value) {
		var arr = owner.formatSeconds(value);
		var str = '';
		if (arr[0] > 0)
			str += arr[0] + '小时';
		if (arr[1] > 0)
			str += arr[1] + '分';
		if (arr[2] > 0)
			str += arr[2] + '秒';

		if (str == '')
			str = '0小时';

		return str;
	}

	owner.minute2hour = function(val) {
		return parseInt(val * 100 / 60) / 100.0;
	}

	owner.getDay = function(value) {
		var unixTimestamp = null;
		if (value)
			unixTimestamp = new Date(value);
		else
			unixTimestamp = new Date();

		var strYear = unixTimestamp.getFullYear();
		var strMonth = unixTimestamp.getMonth() + 1;

		return strYear + '-' + owner.plusZero(strMonth) + '-' + owner.plusZero(unixTimestamp.getDate());
	}

	owner.getWeekBegin = function(value) {
		var unixTimestamp = null;
		if (value)
			unixTimestamp = new Date(value);
		else
			unixTimestamp = new Date();

		var uTime = new Date(unixTimestamp.getTime() - unixTimestamp.getDay() * 24 * 60 * 60 * 1000);

		return uTime.getFullYear() + '-' + owner.plusZero(uTime.getMonth() + 1) +
			"-" + owner.plusZero(uTime.getDate());
	}

	owner.getWeekEnd = function(value) {
		var unixTimestamp = null;
		if (value)
			unixTimestamp = new Date(value);
		else
			unixTimestamp = new Date();

		var uTime = new Date(unixTimestamp.getTime() + (6 - unixTimestamp.getDay()) * 24 * 60 * 60 * 1000);

		return uTime.getFullYear() + '-' + owner.plusZero(uTime.getMonth() + 1) +
			"-" + owner.plusZero(uTime.getDate());
	}

	owner.getMonthBegin = function(value) {
		var unixTimestamp = null;
		if (value)
			unixTimestamp = new Date(value);
		else
			unixTimestamp = new Date();

		var strYear = unixTimestamp.getFullYear();
		var strMonth = unixTimestamp.getMonth() + 1;

		return strYear + '-' + owner.plusZero(strMonth) + '-01';
	}

	owner.getMonthEnd = function(value) {
		var unixTimestamp = null;
		if (value)
			unixTimestamp = new Date(value);
		else
			unixTimestamp = new Date();

		var strYear = unixTimestamp.getFullYear();
		var strMonth = unixTimestamp.getMonth() + 1;

		// next month
		if (strMonth == 12) {
			strMonth = 1;
			strYear++;
		} else {
			strMonth++;
		}

		var dayNextMonthBegin = new Date(Date.UTC(strYear, strMonth - 1, 1, 0, 0, 0));
		dayNextMonthBegin.setHours(0);
		var dayMonthEnd = new Date(dayNextMonthBegin.getTime() - 100 * 1000);

		return dayMonthEnd.getFullYear() + '-' + owner.plusZero(dayMonthEnd.getMonth() + 1) +
			"-" + owner.plusZero(dayMonthEnd.getDate());
	}

	owner.getSeasonBegin = function(value) {
		var unixTimestamp = null;
		if (value)
			unixTimestamp = new Date(value);
		else
			unixTimestamp = new Date();

		var strYear = unixTimestamp.getFullYear();
		var strMonth = unixTimestamp.getMonth() + 1;

		if (strMonth <= 3) {
			return strYear + '-01-01';
		} else if (strMonth <= 6) {
			return strYear + '-04-01';
		} else if (strMonth <= 9) {
			return strYear + '-07-01';
		}

		return strYear + '-10-01';
	}

	owner.getSeasonEnd = function(value) {
		var unixTimestamp = null;
		if (value)
			unixTimestamp = new Date(value);
		else
			unixTimestamp = new Date();

		var strYear = unixTimestamp.getFullYear();
		var strMonth = unixTimestamp.getMonth() + 1;

		if (strMonth <= 3) {
			return strYear + '-03-30';
		} else if (strMonth <= 6) {
			return strYear + '-06-30';
		} else if (strMonth <= 9) {
			return strYear + '-09-30';
		}

		return strYear + '-12-31';
	}

	owner.getYearBegin = function(value) {
		var unixTimestamp = null;
		if (value)
			unixTimestamp = new Date(value);
		else
			unixTimestamp = new Date();

		var strYear = unixTimestamp.getFullYear();
		var strMonth = unixTimestamp.getMonth() + 1;

		return strYear + '-01-01';
	}

	owner.getYearEnd = function(value) {
		var unixTimestamp = null;
		if (value)
			unixTimestamp = new Date(value);
		else
			unixTimestamp = new Date();

		var strYear = unixTimestamp.getFullYear();
		var strMonth = unixTimestamp.getMonth() + 1;

		return strYear + '-12-31';
	}


}(mui, window.app = {}));
