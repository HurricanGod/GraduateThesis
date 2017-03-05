$(document).ready(function () {
    //一开始将侧边栏的子菜单隐藏
    $("#student1").hide();
    $("#topic1").hide();
    $(".wode").hide();
    $(".situation").hide();
    $(".manage").hide();
    $(".protocol").hide();
    //当父菜单被点击的时候就显示或者隐藏
    $('.navigation button').eq(0).click(function () {
        $("#student1").toggle(200);
    });
    $('.navigation button').eq(1).click(function () {
        $(".selectstudent").show();
        $(".zini").show();
        $(".wode").hide();
        $(".manage").hide();
        $(".protocol").hide();
    });
    $('.navigation button').eq(2).click(function () {
        $(".selectstudent").show();
        $(".wode").show();
        $(".zini").hide();
        $(".manage").hide();
        $(".protocol").hide();


    });
    $('.navigation button').eq(3).click(function () {
        $("#topic1").toggle(200);

    });
    $('.navigation button').eq(4).click(function () {
        $(".manage").show()
        $(".situation").show();
        $(".allofthetopic").hide();
        $(".deletetopic").hide();
        $(".deletestudent").hide();
        $(".selectstudent").hide();
        $(".protocol").hide();
    });
    $('.navigation button').eq(5).click(function () {
        $(".manage").show()
        $(".allofthetopic").show();
        $(".situation").hide();
        $(".deletetopic").hide();
        $(".deletestudent").hide();
        $(".selectstudent").hide();
        $(".protocol").hide();
    });
    $('.navigation button').eq(6).click(function () {
        $(".manage").show()
        $(".deletestudent").show();
        $(".situation").hide();
        $(".allofthetopic").hide();
        $(".deletetopic").hide();
        $(".selectstudent").hide();
        $(".protocol").hide();
    });
    $('.navigation button').eq(7).click(function () {
        $(".manage").show()
        $(".deletetopic").show();
        $(".situation").hide();
        $(".allofthetopic").hide();
        $(".deletestudent").hide();
        $(".selectstudent").hide();
        $(".protocol").hide();
    });
    $('.navigation button').eq(8).click(function () {
        $(".selectstudent").hide();
        $(".manage").hide();
        $(".protocol").show();
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

});



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