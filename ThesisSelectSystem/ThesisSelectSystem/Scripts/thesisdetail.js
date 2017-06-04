$().ready(function() {
    var url1 = "/Student/QueryGuiders";
    var data1 = new Object();
    function success1(data) {
        var teachers = $("#guider-select");
        for (var i = 0; i < data.length; i++) {
            var option = $("<option>" + data[i].name + "</option>").attr("value", data[i].name).attr("id", data[i].id);
            option.appendTo(teachers);
        }
    }

    myPostAjax(url1, data1, success1, true);


    var url2 = "/Student/QueryWhetherChooseThesis";

    function success2(data) {
        if (data.isChoose==true) {
            $("#choose-btn").attr("disabled", true);
        }
    }

    myPostAjax(url2, null, success2,true);
});
function myPostAjax(url, data, successFunction, isAsync) {
    $.ajax({
        type: "post",
        url: url,
        async: isAsync,
        data: data,
        dataType: "json",
        success: successFunction,
        error: error
    });
}
function error(textStatus, errorThrown) {
    alert("状态：" + textStatus + "\n异常：" + errorThrown);
}

//-------------------------------2017年4月6日 15:24:55------------------
//--------------TeacherThesisDetail页面->返回按钮事件-------------------
$("#back-btn").click(function () {
    event.preventDefault();
    location.href = "/Student/Index";
});


//-------------------------------2017年4月6日 15:24:55------------------
//--------------TeacherThesisDetail页面->选定按钮事件-------------------
/**
    未完成
 */
$("#choose-btn").click(function () {
    event.preventDefault();
    var thesisId = $("#thesis-id").val();
    var guiderId = $("#guider-select option:selected").attr("id");
    var guiderName = $("#guider-select option:selected").text();
    alert("论题ID："+thesisId+"\n指导老师ID："+guiderId+"\n名字："+guiderName);
});
