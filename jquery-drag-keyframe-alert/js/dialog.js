
/*a4print系统中封装alert，confirm，tip*/
var a4print = window.a4print || {};
/*定义弹出框方法*/
a4print.dialog = function() {
/*初始化弹出框init，背景遮罩bg，提示nav，title*/
    var bg, dialog, mod = {}, 
        init = function() {
            var mod = ['<div class="mod-dialog-bg"></div>', '<div id="mod-dialog" class="mod-dialog">', '<div class="dialog-nav">',
             '<span class="dialog-title"></span>',
             '<a href="#" onclick="return false" class="dialog-close glyphicon glyphicon-remove"></a>',   
              "</div>", '<div class="dialog-main"></div>', "</div>"].join(""),
                init = $(mod).hide().appendTo("body");
                bg = init.filter(".mod-dialog-bg");
                dialog = init.filter(".mod-dialog");  //找到class为mod-dialog的div元素
                dialog.find(".dialog-close").click(function() {//找class为mod-dialog的div的子类中class为dialog-close这个的对象添加方法
                close();
            });
        },
/*addContent把标题和html添加进去*/
        addContent = function() {
             dialog.css("width", mod.width || "");
             dialog.find(".dialog-title").html(mod.title); 
             dialog.find(".dialog-main").html(mod.html);
             dialog.show();
             bg.show();
             state();
        },
 /*state确定显示位置*/
        state = function() {
            var bg = ($(window).width() - dialog.width()) / 2,
                mod = ($(window).height() - dialog.height()) / 2;
            mod = mod > 0 ? mod + $(window).scrollTop() : 0, dialog.css({
                left: bg,
                top: mod
            })
        },

/*{html: init}*/
        open = function(bg) {
            return typeof bg != "object" && (bg = {
                html: bg || ""
            }), mod = $.extend({
                title: "提 示",
                html: "",
                closeFn: null
            }, bg), dialog || init(), addContent(), dialog
        },
 /*关闭窗口，背景遮罩bg隐藏，关闭按钮t隐藏，弹窗n关闭*/
        close = function() {
            bg && bg.hide(), dialog && dialog.hide(), mod.closeFn && mod.closeFn.call(this)
        };
    return {
        show: open,
        hide: close
    };
}();

/*确认框confirm,
e表示提示的内容dialog-content，t表示确认按钮方法，n表示取消按钮方法*/
window.confirm=a4print.dialog.confirm = function(e, t, n) {debugger
    var init = ['<div class="dialog-content">', "<p>" + e + "</p>", "</div>", '<div class="dialog-console clearfix_new">', '<a class="console-btn-confirm btn btn-info" href="#" onclick="return false;">确定</a>', '<a class="console-btn-cancel btn btn-default" href="#" onclick="return false;">取消</a>', "</div>"].join(""),
        addContent = a4print.dialog.show({
            html: init
        });
     $('.mod-dialog').css("animation","");
    return addContent.find(".console-btn-confirm").click(function() {debugger
        var e = t && t.call(addContent);
        e !== !1 && a4print.dialog.hide()
    }), 

    addContent.find(".console-btn-cancel").click(function() {
        n && n.call(addContent), a4print.dialog.hide()
    }), addContent;

};

/*提示框alert*/
 window.alert = a4print.dialog.alert = function(e, t) { debugger
    var n = ['<div class="dialog-content">', "<p>" + e + "</p>", "</div>", '<div class="dialog-console clearfix_new">', '<a class="console-btn-confirm btn btn-info" href="#" onclick="return false;">确定</a>', "</div>"].join(""),
        init = a4print.dialog.show({
            html: n
        });
        
       // $('.mod-dialog').css("animation","");
      Drag("mod-dialog");
    return init.find(".console-btn-confirm").click(function() {
        var e = t && t.call(init);
        e !== !1 && a4print.dialog.hide()
    }), init;
}; 

/*没有确认按钮的提示框tip,加动画*/
a4print.dialog.tip=function(e,t){debugger
     var n = ['<div class="dialog-content">', "<p>" + e + "</p>", "</div>", '<div class="dialog-console clearfix_new">', "</div>"].join(""),
        
        init = a4print.dialog.show({
            html: n
        });

    return init;
};
/*tip淡出，这里我是用了github上封装好的keyframe方法，定义了动画*/
var tip=function fadeout(e,t){debugger

    a4print.dialog.tip(e,t);
    /*添加帧*/
    $.keyframe.define([{
     name: 'myfirst',
    '0%':{
        'margin':'0 auto',
        'top':'20px'
    },
    '100%':{
        'margin':'0 auto',
        'top':'70px'
    }
    }]);
     $('.mod-dialog').playKeyframe({
            name: 'myfirst',
            duration: "2s",           
            fillMode: 'forwards',
          });

    $('.dialog-close ').removeClass("glyphicon glyphicon-remove");
    
    setTimeout("$('.mod-dialog-bg').fadeOut('3000'),$('.mod-dialog').fadeOut('3000')",2000);
    
}








