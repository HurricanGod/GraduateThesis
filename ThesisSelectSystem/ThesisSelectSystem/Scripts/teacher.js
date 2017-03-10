$(document).ready(function () {
    //一开始将侧边栏的子菜单隐藏
    $("#student1").hide();
    $("#topic1").hide();
    $(".zini1").hide();
    $(".wode1").hide();
    $(".wode").hide();
    $(".zini").show();
    $(".manage").hide();
    $(".protocol").hide();
    $(".thesistitle").hide();
    //当父菜单被点击的时候就显示或者隐藏
    $('.navigation button').eq(0).click(function () {
        $("#student1").toggle(200);
    });
    $('.navigation button').eq(1).click(function () {
        $("#liebiao1").toggle(200);
    });
    $('.navigation button').eq(2).click(function () {
        $(".selectstudent").show();
        $(".zini").show();
        $(".wode").hide();
        $(".zini1").hide();
        $(".wode1").hide();
    });
    $('.navigation button').eq(3).click(function () {
        $(".selectstudent").show();
        $(".zini").hide();
        $(".wode").hide();
        $(".zini1").show();
        $(".wode1").hide();
    });

    $('.navigation button').eq(4).click(function () {
        $("#liebiao2").toggle(200);
    });
    $('.navigation button').eq(5).click(function () {
        $(".selectstudent").show();
        $(".wode").show();
        $(".zini").hide();
        $(".wode1").hide();
        $(".zini1").hide();
    });
    $('.navigation button').eq(6).click(function () {
        $(".selectstudent").show();
        $(".zini1").hide();
        $(".wode").hide();
        $(".zini").hide();
        $(".wode1").show();
    });
    $('.navigation button').eq(7).click(function () {
        $("#topic1").toggle(200);
    });

    $('.navigation button').eq(8).click(function () {
        $(".manage").show()
        $(".allofthetopic").show();
        $(".deletetopic").hide();
        $(".deletestudent").hide();
        $(".selectstudent").hide();
        $(".protocol").hide();
        $(".thesistitle").hide();

    });
    $('.navigation button').eq(9).click(function () {
        $(".manage").show()
        $(".deletestudent").show();
        $(".allofthetopic").hide();
        $(".deletetopic").hide();
        $(".selectstudent").hide();
        $(".protocol").hide();
        $(".thesistitle").hide();

    });
    $('.navigation button').eq(10).click(function () {
        $(".manage").show()
        $(".deletetopic").show();
        $(".allofthetopic").hide();
        $(".deletestudent").hide();
        $(".selectstudent").hide();
        $(".protocol").hide();
        $(".thesistitle").hide();

    });
    $('.navigation button').eq(11).click(function () {
        $(".selectstudent").hide();
        $(".manage").hide();
        $(".protocol").show();
        $(".thesistitle").hide();

    });
    $(".navigation button").eq(12).click(function () {
        $(".selectstudent").hide();
        $(".manage").hide();
        $(".protocol").hide();
        $(".thesistitle").show();
    });

    //设置自动刷新时间函数每隔一秒就刷新
    setInterval("startRequest()", 1000);
    //	alert(screen.width);

    //	var y1=$("#mycanvas1").offset().top;
    //	var x1=$("#mycanvas1").offset().left;
    //	var x2=$("#mycanvas1").offset().right;
    //	var y2=$("#mycanvas1").offset().bottom;
    //	alert(x1);
    //	alert(y1);
    //	alert(x2);
    //	alert(y2);
    //触发分页的代码
    $(".tcdPageCode").createPage({
        pageCount: 10, //一共有多少页
        current: 1, //当前页
        backFn:function(p){
            console.log(p);
        }
    });

    var rows = $("#un-examine-thesis").find("tr:gt(0)");
    for (var i = 0; i < rows.length; i++) {
        if (i >8) {
            rows.eq(i).hide();
        } else {
            rows.eq(i).show();
        }
    }
});




   
    var teacherThesisCount = $("#teacher-thesis").find("tr").length - 1;//论题记录总数
    var number = 6;//用于设置每页的记录数目
    //设置前一页按钮不可点击，页面加载后默认为首页
    $("#prev-page-thesis").attr('disabled', true).attr("value", 0);
    $("#next-page-thesis").attr("value", number);
    for (var i = number, rowName = "#ThesisRow"; i < teacherThesisCount; i++) {
        $(rowName + i).hide();
    }

    //注册点击“首页”按钮事件
    $("#home-page-thesis").click(function() {
        var rowName = "#ThesisRow";
        for (var j = 0; j < teacherThesisCount; j++) {
            if (j<number) {
                $(rowName + j).show();
            } else {
                $(rowName + j).hide();
            }
        }
        $("#prev-page-thesis").attr('disabled', true).attr("value",0);
        $("#next-page-thesis").attr("value", number).attr('disabled', false);
    });


    //注册点击“下一页”按钮事件
    $("#next-page-thesis").click(function() {
        var end = $(this).attr("value");
        var start = $("#prev-page-thesis").attr("value");
        var rowName = "#ThesisRow";
        var j = 0;
        for (j = parseInt(start) ; j < parseInt(start) + number*2; j++) {
            if (j < end) {
                $(rowName + j).hide();
            } else {
                $(rowName + j).show();
            }
        }
        
        //最后一条记录
        if (j>=teacherThesisCount) {
            $("#next-page-thesis").attr('disabled', true).attr('value',j);
            $("#prev-page-thesis").attr('disabled', false).attr('value', (parseInt(start) + parseInt(number)));
        }//不是最后一条记录
        else {
            $("#next-page-thesis").attr("value", j);
            $("#prev-page-thesis").attr("value", (parseInt(start) + parseInt(number)));
            $("#prev-page-thesis").attr('disabled', false);
        }
    });


    //注册点击“上一页”按钮事件
    $("#prev-page-thesis").click(function() {
        var rowName = "#ThesisRow";
        var start = $(this).attr("value");
        var end = $("#next-page-thesis").attr("value");
        if (parseInt(start)!=0) {
            for (var j = parseInt(start)-number ; j < parseInt(end) ; j++) {
                if (j < parseInt(start)) {
                    $(rowName + j).show();
                } else {
                    $(rowName + j).hide();
                }
            }
            if (parseInt(start)-number==0) {
                $("#prev-page-thesis").attr('disabled', true);
            }
            $("#prev-page-thesis").attr("value", parseInt(start) - parseInt(number));
            $("#next-page-thesis").attr('disabled', false).attr("value", (parseInt(end) - parseInt(number)));
        } else {
            $("#prev-page-thesis").attr('disabled', true).attr("value", 0);
            $("#next-page-thesis").attr('disabled', false).attr("value", number);
        }
    });


    //注册点击“尾页”按钮事件
    $("#last-page-thesis").click(function () {
        var a = parseFloat(teacherThesisCount / number);//a表示页数-1
        var c = a > parseInt(a) ? (parseInt(a) + 1) * number : parseInt(a) * number;
        var rowName = "#ThesisRow";
        for (var j = 0; j < teacherThesisCount; j++) {
            if (j<c-number) {
                $(rowName + j).hide();
            } else {
                $(rowName + j).show();
            }
        }
        $("#prev-page-thesis").attr('disabled', false).attr("value", c-number);
        $("#next-page-thesis").attr('disabled', true).attr("value", c);

    });


    //注册“删除”按钮事件
    $("button[name='delete-thesis']").each(function() {
        $(this).click(function () {
            //event.preventDefault();
            var itemElement = $(this).parent().parent();
            var id = itemElement.children().eq(0).text();
            var sure = confirm("确定要删除该论题");
            if (sure) {
                var data = { id: id };
                var url = "/Teacher/DeleteThesis";

                function success(data) {
                    alert(data.tip);
                    itemElement.remove();
                }

                function error(data) {
                    alert(data.tip);
                }

                myPostAjax(url, data, success, error);
            }
        });

    });

//});



//发布论题
$("#submit").click(function () {
    event.preventDefault();
    var choose = confirm("确定提交？");
    var thesisTitle = $("#thesis-name").val();
    var thesisType = $("#type-select option:selected").text();
    var usedyear = $("#used-year option:selected").text();
    var usedNumber = $("#used-number option:selected").text();
    var content = $("#thesis-detail").val();
    var type = "post";
    var url = "/Teacher/SaveTeacherThesis";
    var dataType = "json";
    var data = { title: thesisTitle, type: thesisType, year: usedyear, number: usedNumber, content: content };

    function success(data) {
        alert(data.tip);
    };

    function error(data) {
        alert(data.tip);
    }

    if (choose) {
        myUniversalAjax(type, url, data, dataType, success, error);
    }
   

});


function startRequest() {
    $(".realtime").text((new Date()).toLocaleString());
}

function myUniversalAjax(type, url, data, dataType, successFunction, errorFunction) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: dataType,
        success: successFunction,
        error: errorFunction
    });
};

function myPostAjax(url, data,successFunction, errorFunction) {
    $.ajax({
        type: "post",
        url: url,
        data: data,
        dataType: "json",
        success: successFunction,
        error: errorFunction
    });
}

//分页代码
(function ($) {
    var ms = {
        init: function (obj, args) {
            return (function () {
                ms.fillHtml(obj, args);
                ms.bindEvent(obj, args);
            })();
        },
        //填充html
        fillHtml: function (obj, args) {
            return (function () {
                obj.empty();
                //上一页
                if (args.current > 1) {
                    obj.append('<a href="javascript:;" class="prevPage">上一页</a>');
                } else {
                    obj.remove('.prevPage');
                    obj.append('<span class="disabled">上一页</span>');
                }
                //中间页码
                if (args.current != 1 && args.current >= 4 && args.pageCount != 4) {
                    obj.append('<a href="javascript:;" class="tcdNumber">' + 1 + '</a>');
                }
                if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
                    obj.append('<span>...</span>');
                }
                var start = args.current - 2, end = args.current + 2;
                if ((start > 1 && args.current < 4) || args.current == 1) {
                    end++;
                }
                if (args.current > args.pageCount - 4 && args.current >= args.pageCount) {
                    start--;
                }
                for (; start <= end; start++) {
                    if (start <= args.pageCount && start >= 1) {
                        if (start != args.current) {
                            obj.append('<a href="javascript:;" class="tcdNumber">' + start + '</a>');
                        } else {
                            obj.append('<span class="current">' + start + '</span>');
                        }
                    }
                }
                if (args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5) {
                    obj.append('<span>...</span>');
                }
                if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
                    obj.append('<a href="javascript:;" class="tcdNumber">' + args.pageCount + '</a>');
                }
                //下一页
                if (args.current < args.pageCount) {
                    obj.append('<a href="javascript:;" class="nextPage">下一页</a>');
                } else {
                    obj.remove('.nextPage');
                    obj.append('<span class="disabled">下一页</span>');
                }
            })();
        },
        //绑定事件
        bindEvent: function (obj, args) {
            return (function () {
                obj.on("click", "a.tcdNumber", function () {
                    var current = parseInt($(this).text());
                    var count = 7;//待审课题每页的行数
                    ms.fillHtml(obj, { "current": current, "pageCount": args.pageCount });
                    if (typeof (args.backFn) == "function") {
                        args.backFn(current);
                    }
                    
                    //.slice(current*5, current*5+5)
                    
                    var rows = $("#un-examine-thesis").find("tr:gt(0)");
                    for (var i = 0; i < rows.length; i++) {
                        if (i < (current-1) * count || i > current * count) {
                            rows.eq(i).hide();
                        } else {
                            rows.eq(i).show();
                        }
                    }
                });
                //上一页
                obj.on("click", "a.prevPage", function () {
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj, { "current": current - 1, "pageCount": args.pageCount });
                    if (typeof (args.backFn) == "function") {
                        args.backFn(current - 1);
                    }
                });
                //下一页
                obj.on("click", "a.nextPage", function () {
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj, { "current": current + 1, "pageCount": args.pageCount });
                    if (typeof (args.backFn) == "function") {
                        args.backFn(current + 1);
                    }
                });
            })();
        }
    }
    $.fn.createPage = function (options) {
        var args = $.extend({
            pageCount: 10,
            current: 1,
            backFn: function () { }
        }, options);
        ms.init(this, args);
    }
})(jQuery);

