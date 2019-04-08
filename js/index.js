/**
 * 公司：上海普适导航科技股份有限公司
 * 网址：http://ubinavi.com.cn/
 * 开发者：Chen Yixing
 * 开发者邮箱：1663268062@qq.com
 **/
(function($, index) {

	/**
	 * 清空列表统计数据
	 */
	index.clearType = function() {
		var type = {
			"吃饭": "0",
			"车费": "0",
			"衣服": "0",
			"其他": "0",
			"moneyTotal": "0"
		};
		return type;
	}

	/**
	 * 计算金额
	 */
	index.calcMoney = function(type, selectDateStart, selectDateEnd) {
		var currentDay = app.getDay();
		for (var i in arr) {
			var json = arr[i];
			if ((json.time >= selectDateStart.html() && json.time <= selectDateEnd.html()) || json.time == null) {
				type.moneyTotal = "" + (parseInt(type.moneyTotal) + parseInt(json.money));
				switch (json.type) {
					case "吃饭":
						type.吃饭 = "" + (parseInt(type.吃饭) + parseInt(json.money));
						break;
					case "车费":
						type.车费 = "" + (parseInt(type.车费) + parseInt(json.money));
						break;
					case "衣服":
						type.衣服 = "" + (parseInt(type.衣服) + parseInt(json.money));
						break;
					default:
						type.其他 = "" + (parseInt(type.其他) + parseInt(json.money));
						break;
				}
			}
		}
		app.setItem("type", JSON.stringify(type));
	}

	/**
	 * 组装html
	 */
	index.init_html = function(type, list, moneyTotal) {
		var html = '';
		html += '<h3 class="init-html-h3">消费类目</h3>'
		for (var key in type) {
			if (key != "moneyTotal") {
				var string = '<li class="mui-table-view-cell" typeName=' + key + '>';
				string += '<a class="mui-navigate-right">';
				string += key;
				string += '<div style="width: 200px; float: right;margin-right: 16px;">';
				string += '<span style="float: right;text-align: right;color: gray;width: 50px;">';
				string += type[key] + '元</span>';
				string += '<span class="align" style="color:gray;margin-right: 2px;">消费总额：</span></div></a></li>';
				html += string;
			}
		}
		list.html(html);
		moneyTotal.html("总消费额： " + type.moneyTotal + "元");
	}

	/**
	 * 根据导航栏左侧的时间控件值，动态设置右侧时间控件值！
	 */
	index.initDateRange = function(btn_date_range, selectDateStart, selectDateEnd) {
		if (btn_date_range.text() == '本日') {
			selectDateStart.html(app.getDay());
			selectDateEnd.html(app.getDay);
		} else if (btn_date_range.text() == '本周') {
			selectDateStart.html(app.getWeekBegin());
			selectDateEnd.html(app.getWeekEnd());
		} else if (btn_date_range.text() == '本月') {
			selectDateStart.html(app.getMonthBegin());
			selectDateEnd.html(app.getMonthEnd());
		} else if (btn_date_range.text() == '本季度') {
			selectDateStart.html(app.getSeasonBegin());
			selectDateEnd.html(app.getSeasonEnd());
		} else if (btn_date_range.text() == '本年') {
			selectDateStart.html(app.getYearBegin());
			selectDateEnd.html(app.getYearEnd());
		}
	}


}(mui, window.index = {}));
