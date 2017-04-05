$(document).ready(function () {

    $("#selects").show();
    $("#applys").hide();
    $("#protocol-self").hide();
    $("#thesis").hide();

    $(".select-topic").click(function () {
        $("#selects").show();
        $("#applys").hide();
        $("#protocol-self").hide();
        $("#thesis").hide();
    });

    $(".apply-topic").click(function () {
        $("#applys").show();
        $("#selects").hide();
        $("#protocol-self").hide();
        $("#thesis").hide();
    });

    $(".Protocol-self").click(function () {
        $("#protocol-self").show();
        $("#selects").hide();
        $("#applys").hide();
        $("#thesis").hide();
    });

    $(".Thesis").click(function () {
        $("#thesis").show();
        $("#selects").hide();
        $("#applys").hide();
        $("#protocol-self").hide();
    })

    var queryThesisUrl = "/Student/QueryTeacherThesis";
    var noData = null;

    function successGetThesisData(data) {
        var table = $("#teacher-thesis-tb");
        for (var i = 0; i < data.length; i++) {
            var tr = $("<tr></tr>");
            var td1 = $("<td></td>").text(i + 1);
            var td2 = $("<td></td>").text(data[i].type);
            var td3 = $("<td></td>").text(data[i].title);
            var td4 = $("<td></td>").text(data[i].maker);
            var td5 = $("<td></td>").text(data[i].currentChoosedNumber);
            var td6 = $("<td></td>").text(data[i].maxChoosedNumber);
            var td7 = $("<td></td>");
            var button = $("<button class='btn btn-info'></button>");
            button.click(function () {
                event.preventDefault();
                alert("success");
            });
            button.appendTo(td7);
            td1.appendTo(tr);
            td2.appendTo(tr);
            td3.appendTo(tr);
            td4.appendTo(tr);
            td5.appendTo(tr);
            td6.appendTo(tr);
            td7.appendTo(tr);
            tr.appendTo(table);
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------*/
    //----------------------------Hurrican添加部分-----------------------------
    //--------------------------2017年4月5日 20:37:58--------------------------

});
/*------------------------------$(document).ready分割线------------------------------------------------------------------------*/
function myPostAjax(url, data, successFunction, isAsync) {
    $.ajax({
        type: "post",
        url: url,
        async: isAsync,
        data: data,
        dataType: "json",
        success: successFunction,
        error: function (textStatus, errorThrown) {
            alert("状态：" + textStatus + "\n异常：" + errorThrown);
        }
    });
}

function openwin() {
    window.open("detail/select.html", "_blank", "height=400,width=700,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no")
}