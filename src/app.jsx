import React from 'react';
import ReactDOM from 'react-dom';

var items = [];
var users = [];

class RadioList extends React.Component {
  render () {
    var nodes = this.props.list.map((data)=> {
      let id = this.props.name + data.key;
      return (
        <Radio name={this.props.name} id={id} value={data.value} />
      );
    });
    return(<div>{nodes}</div>);
  }
};

class Radio extends React.Component {
  render () {
    return (
      <div>
        <input type="radio" name={this.props.name} id={this.props.id} value={this.props.value} />
        <label htmlFor={this.props.id}>{this.props.value}</label>
      </div>
    );
  }
};

class Util{
  static Format(format /*,obj1,obj2...*/)
  {
    var args = arguments;
    return format.replace(/\{(\d)\}/g, function(m, c) { return args[parseInt(c) + 1] });
  }
}

$('#buttonUserAdd').click(function (){
  var userName = $('#addUserName').val();
  if (userName == "")
  {
      alert("名前を入力してください");
      return;
  }
  users.push({key:users.length, value:userName});
  $('#addUserName').val("");

  ReactDOM.render(
    <RadioList name="kari" list={users} />,
    document.getElementById('kariname')
  );
  ReactDOM.render(
    <RadioList name="kashi" list={users} />,
    document.getElementById('kashiname')
  );
  
});

//貸しボタン
$('#buttonAdd').click(function (){
  //エラーチェック
  if ($("#itemname").val() == ""){
      alert("○○代を入力してください");
      return;
  }
  if ($("input[name='kari']:checked").val() == undefined || $("input[name='kashi']:checked").val() == undefined){
      alert("名前を選択してください");
      return;
  }
  if ($("input[name='kari']:checked").val() === $("input[name='kashi']:checked").val()){
      alert("名前を左右で変えてください");
      return;
  }
  if ($("#money").val() == ""){
      alert("円を入力してください");
      return;
  }
  if (isNaN($("#money").val()) == true){
      alert("円は数字にしてください");
      return;
  }
  var item = {
      "itemname": $("#itemname").val(), 
      "kariname": $("input[name='kari']:checked").val(),
      "kashiname": $("input[name='kashi']:checked").val(),
      "money": $("#money").val()
  }
  items.push(item);
  listshow();
  destshow();
});

//アイテムリスト表示
var listshow = function(){
    let message = "";
    items.forEach(function(item){
        message += 
          Util.Format(" ・{0}について、{1}は{2}に{3}円返す<br/>",
            item.itemname, item.kariname, item.kashiname, item.money);
    });
    $("#divList").html(message)
}
//集計
var destshow = function(){
    let message = "";
    //借りを初期化
    let kari = [];
    users.forEach(function(user){
      kari[user.value] = [];
      for (let j=0 ; j<users.length ; j++){
          kari[user.value][users[j].value] = 0;
      }
    });
    
    //相殺しつつ累計を計算
    for (var i=0 ; i<items.length ; i++){
        var money = parseInt(items[i].money);
        if (kari[items[i].kashiname][items[i].kariname] >= money){
            kari[items[i].kashiname][items[i].kariname] -= money;
         } else {
            kari[items[i].kariname][items[i].kashiname] += money;
         }
    }
    //出力
    for (var key1 in kari){
        for (var key2 in kari[key1]){
            if (kari[key1][key2] != 0)
                message += 
                  Util.Format("{0}は{1}に{2}円返す<br/>", 
                    key1, key2, kari[key1][key2]);
        }
    }
    $("#divDest").html(message)
}

//割り算
class DivInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      div2: "",
      div3: "",
      div4: "",
    };
  }
  handleChange(e) {
    let input = e.target.value;
    if (isNaN(input) == true) {
        alert("円は数字にしてください");
        return;
    }  
    this.setState({
      div2: Math.round(input / 2),
      div3: Math.round(input / 3),
      div4: Math.round(input / 4),
    });
  }
  render () {
    return (
      <div>
        <div><input id="input" type="text" onChange={this.handleChange.bind(this)}/>円を</div>
        <div>割る2　=　<input readOnly value={this.state.div2} type="text"/>円</div>
        <div>割る3　=　<input readOnly value={this.state.div3} type="text"/>円</div>
        <div>割る4　=　<input readOnly value={this.state.div4} type="text"/>円</div>
      </div>
    );
  }
};
ReactDOM.render(
  <DivInput />,
  document.getElementById('divInput')
);