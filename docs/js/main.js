$(function(){
	//console.log();
	//$("#").val()
	//変数初期化
	var items = [];
	var users = [];

	//ユーザー追加ボタン
	$('#buttonUserAdd').click(function (){
		var userName = $('#addUserName').val();
		if (userName == "")
		{
			alert("名前を入力してください");
			return;
		}
		users.push(userName);
		var id = users.length;
		var createRadio = function(name) {
			var label = '<label for="'+name+id+'">' + userName + '</label>';
			var radio = '<input type="radio" name="'+name+'name" id="'+name+id+'" value="'+userName+'">' + label + '<br>';
			return radio;
		};
		$('#kariname').append(createRadio("kari"));
		$('#kashiname').append(createRadio("kashi"));
		$('#addUserName').val("");
	});

	//貸しボタン
	$('#buttonAdd').click(function (){
		//エラーチェック
		if ($("#itemname").val() == "")
		{
			alert("○○代を入力してください");
			return;
		}
		if ($("input[name='kariname']:checked").val() == undefined || $("input[name='kashiname']:checked").val() == undefined)
		{
			alert("名前を選択してください");
			return;
		}
		if ($("input[name='kariname']:checked").val() === $("input[name='kashiname']:checked").val())
		{
			alert("名前を左右で変えてください");
			return;
		}
		if ($("#money").val() == "")
		{
			alert("円を入力してください");
			return;
		}
		if (isNaN($("#money").val()) == true)
		{
			alert("円は数字にしてください");
			return;
		}
		var item = {
			"itemname": $("#itemname").val(), 
			"kariname": $("input[name='kariname']:checked").val(),
			"kashiname": $("input[name='kashiname']:checked").val(),
			"money": $("#money").val()
		}
		items.push(item);
		listshow();
		destshow();
	})
	//アイテムリスト表示
	var listshow = function(){
		var message = "";
		for (var i=0 ; i<items.length ; i++){
			message += Format(" ・{0}について、{1}は{2}に{3}円返す<br/>", items[i].itemname, items[i].kariname, items[i].kashiname, items[i].money);
		}
		$("#divList").html(message)
	}
	//集計
	var destshow = function(){
		var message = "";
		//借りを初期化
		var kari = new Array();
		for (var i=0 ; i<users.length ; i++){
			kari[users[i]] = new Array();
			for (var j=0 ; j<users.length ; j++){
				kari[users[i]][users[j]] = 0;
			}
		}
		//相殺しつつ累計を計算
		for (var i=0 ; i<items.length ; i++){
			var money = parseInt(items[i].money);
			if (kari[items[i].kashiname][items[i].kariname] >= money)
				kari[items[i].kashiname][items[i].kariname] -= money;
			else
				kari[items[i].kariname][items[i].kashiname] += money;
		}
		//出力
		for (var key1 in kari){
			for (var key2 in kari[key1]){
				if (kari[key1][key2] != 0)
					message += Format("{0}は{1}に{2}円返す<br/>", key1, key2, kari[key1][key2]);
			}
		}
		$("#divDest").html(message)
	}
	//割り算
	var calc = function(div){
		if ($("#calc_money").val() == "")
		{
			alert("円を入力してください");
			return;
		}
		$("#calc_dest").val(Math.round($("#calc_money").val() / div));
	}
	
	//割り算ボタン
	$('#buttonDiv2').click(function (){
		calc(2);
	});
	$('#buttonDiv3').click(function (){
		calc(3);
	});
});