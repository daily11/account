/**
 * 开发者：Chen Yixing
 * 开发者邮箱：1663268062@qq.com
 **/
(function($, write) {

	/**
	 * 保存单次消费记录
	 * arr:消费记录数组，里面每个元素都是一条消费记录
	 * type：消费类型
	 * money：消费金额
	 */
	write.save = function(arr, type, money) {
		var json = {};
		json.type = type;
		json.time = app.getDay();
		json.money = money;
		arr.push(json);
		app.setItem("write", JSON.stringify(arr));
		// console.log(app.getItem("write"));
	}

	/**
	 * 消费时间li监听
	 */
	write.selectDate = function(selectItems) {
		var year = parseInt(selectItems.y.text);
		var month = parseInt(selectItems.m.text);
		var day = parseInt(selectItems.d.text);
		var hour = parseInt(selectItems.h.text);
		var second = parseInt(selectItems.i.text);
		return "" + year + "/" + month + "/" + day + " " + hour + ":" + second;
	}

}(mui, window.write = {}));
