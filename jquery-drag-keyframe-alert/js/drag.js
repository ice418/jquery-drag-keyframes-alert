
function Drag(drag){
    var isIE = (document.all) ? true : false;
//自定义$ 
var $ = function (id) {
    return "string" == typeof id ? document.getElementById(id) : id;
};
//返回一个函数
var Class = {
    create: function() {
        return function() { this.initialize.apply(this, arguments); }
    }
}

//扩展性质
var Extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
}

var Bind = function(object, fun) {
    return function() {
        return fun.apply(object, arguments);
    }
}
//绑定监听事件
var BindAsEventListener = function(object, fun) {
    return function(event) {
        return fun.call(object, (event || window.event));
    }
}
/*每当目标参数引发事件时，都调用处理程序封装的方法
void AddEventHandler(
    object target,
    Delegate handler
)*/
function addEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = fnHandler;
    }
};
/*
RemoveEventHandler 方法从事件源中移除事件处理程序。
target  事件源。
handler 将解除与由目标引发的事件的关联的委托。
void RemoveEventHandler(
    object target,
    Delegate handler
)*/
function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {  //detachEvent动态删除用attachEvent绑定的事件
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else { 
        oTarget["on" + sEventType] = null;
    }
};


var SimpleDrag = Class.create();
//给拖拽事件绑定四个事件：初始化，开始，移动，停止
SimpleDrag.prototype = {
  
  initialize: function(drag) {
    this.Drag = $(drag); //drag是id的话，查找到这个元素，想jquery中封装的id选择器一样
    this._x = this._y = 0; 
    this._fM = BindAsEventListener(this, this.Move); //绑定移动事件
    this._fS = Bind(this, this.Stop); //绑定停止事件
    this.Drag.style.position = "absolute"; //设置绝对定位
    addEventHandler(this.Drag, "mousedown", BindAsEventListener(this, this.Start));//给目的事件源this.Drag绑定 mousedown事件，且添加与事件源有关的事件BindAsEventListener给当前的对象，绑定Start事件
  },
 
  //  IE、Opera   offsetTop 返回的是数字，而 style.top 返回的是字符串，除了数字外还带有单位：px。offsetTop 只读，而 style.top 可读写,如果没有给 HTML 元素指定过 top 样式，则 style.top 返回的是空字符串,clientHeight 是最后一个工具条以下到状态栏以上的这个区域，与页面内容无关 offsetHeight = clientHeight + 滚动条 + 边框。 scrollHeight 是网页内容实际高度，可以小于 clientHeight 
  //scrollHeight 则是网页内容实际高度。
  Start: function(oEvent) {
    this._x = oEvent.clientX - this.Drag.offsetLeft; //得到现在的这个div内的x ， y 的位置
    this._y = oEvent.clientY - this.Drag.offsetTop;
    addEventHandler(document, "mousemove", this._fM); //给document对象添加move和start事件
    addEventHandler(document, "mouseup", this._fS);
    
  },
  Move: function(oEvent) { //设置被操作对象的位置，left 和 top,偏移了左和高的位置
    this.Drag.style.left = oEvent.clientX - this._x + "px"; 
    this.Drag.style.top = oEvent.clientY - this._y + "px";    
  },
 
  Stop: function() {  //removeEventHandler解除绑定
    removeEventHandler(document, "mousemove", this._fM);
    removeEventHandler(document, "mouseup", this._fS);
  }
};

return  new SimpleDrag(drag);
};

