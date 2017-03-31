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
    $(".times").show();
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
        $(".protocol").hide();
        $(".thesistitle").hide();
        $(".manage").hide();
    });
    $('.navigation button').eq(3).click(function () {
        $(".selectstudent").show();
        $(".zini").hide();
        $(".wode").hide();
        $(".zini1").show();
        $(".wode1").hide();
        $(".protocol").hide();
        $(".thesistitle").hide();
        $(".manage").hide();
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
        $(".protocol").hide();
        $(".thesistitle").hide();
        $(".manage").hide();
    });
    $('.navigation button').eq(6).click(function () {
        $(".selectstudent").show();
        $(".zini1").hide();
        $(".wode").hide();
        $(".zini").hide();
        $(".wode1").show();
        $(".protocol").hide();
        $(".thesistitle").hide();
        $(".manage").hide();
    });
    $('.navigation button').eq(7).click(function () {
        $("#topic1").toggle(200);
    });

    $('.navigation button').eq(8).click(function () {
        $(".manage").show();
        $(".allofthetopic").show();
        $(".allofthetopic1").hide();
        //$(".deletetopic").hide();
        $(".deletestudent").hide();
        $(".selectstudent").hide();
        $(".protocol").hide();
        $(".thesistitle").hide();

    });
    $('.navigation button').eq(9).click(function () {
        $(".manage").show()
        $(".allofthetopic1").show();
        $(".allofthetopic").hide();
        //$(".deletetopic").hide();
        $(".deletestudent").hide();
        $(".selectstudent").hide();
        $(".protocol").hide();
        $(".thesistitle").hide();

    });
    $('.navigation button').eq(10).click(function () {
        $(".manage").show()
        $(".deletestudent").show();
        $(".allofthetopic").hide();
        $(".allofthetopic1").hide();
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
   

    $(".tcdPageCode1").createPage({ //自拟课题未选学生的分页
        pageCount: countStudentMakeThesis(), //一共有多少页
        current: 1, //当前页
        backFn: function (p) {
            console.log(p);
        }
    });
    $(".tcdPageCode2").createPage({//自拟课题已选学生的分页
        pageCount: countStudent2Page(),//一共有多少页
        current: 1,//当前页
        backFn: function (p) {
            console.log(p);
        }
    });
    $(".tcdPageCode3").createPage({//教师拟题未选学生的分页
        pageCount: chooseTeacherThesisCount(),//一共有多少页
        current: 1,//当前页
        backFn: function (p) {
            console.log(p);
        }
    });
    $(".tcdPageCode4").createPage({//教师拟定课题已选学生的分页
        pageCount: countStudent1Page(),//一共有多少页
        current: 1,//当前页
        backFn: function (p) {
            console.log(p);
        }
    });
    $(".tcdPageCode5").createPage({//审题页面的分页
        pageCount: thesisCount(),//一共有多少页
        current: 1,//当前页
        backFn: function (p) {
            console.log(p);
        }
    });
    $(".tcdPageCode").createPage({
        pageCount: 100, //一共有多少页
        current: 1, //当前页
        backFn: function (p) {
            console.log(p);
        }
    });

    //------------------进行审题->未审论题列表页面初始化-------------------------
    //------------------2017年3月16日 16:55:46-----------------------------------
    var rows = $("#un-examine-thesis").find("tr:gt(0)");
    var rowCount = 7;
    for (var i = 0; i < rows.length; i++) {
        if (i >rowCount) {
            rows.eq(i).hide();
        } else {
            rows.eq(i).show();
        }
    }

    //------------------教师拟题->未选择学生->未选择学生列表首页初始化-----------
    //------------------2017年3月16日 16:55:46-----------------------------------
    var chooseThesisInfo = $("#student5").find("tr:gt(0)");
    for (var i = 0; i < chooseThesisInfo.length; i++) {
        if (i > rowCount) {
            chooseThesisInfo.eq(i).hide();
        } else {
            chooseThesisInfo.eq(i).show();
        }
    }
   
    
    //---------------教师拟题->已选择学生列表->指定每页学生记录条数---------
    //---------------------2017年3月16日 22:19:22---------------------------
    var hasBeenChoosedUnMakeTopicStudent = $("#student6").find("tr:gt(0)");
    for (var i = 0; i < hasBeenChoosedUnMakeTopicStudent.length; i++) {
        if (i > rowCount) {
            hasBeenChoosedUnMakeTopicStudent.eq(i).hide();
        } else {
            hasBeenChoosedUnMakeTopicStudent.eq(i).show();
        }
    }

    //---------------学生拟题->已选择学生列表->指定每页学生记录条数---------
    //---------------------2017年3月16日 22:19:22---------------------------
    var makeTopicStudentCount = $("#student4").find("tr:gt(0)");
    for (var i = 0; i < makeTopicStudentCount.length; i++) {
        if (i > rowCount) {
            makeTopicStudentCount.eq(i).hide();
        } else {
            makeTopicStudentCount.eq(i).show();
        }
    }
   
    //------------------------------
    //-------------------------------
   


    var url = "/Teacher/QueryChooseTeacherThesisInfo";
    var data = new Object();
    function success(data) {
        var table = $("#student5");
        for (var i = 0; i < data.length; i++) {
            var row = $("<tr></tr>").attr("name", "unselected1");

            var td1 = $("<td></td>").text(parseInt(i + 1)).attr("class", "th1");
            var td2 = $("<td></td>").text(data[i].sname).attr("class", "th1");
            var td3 = $("<td></td>").text(data[i].title).attr("id", data[i].thesisId).attr("class", "th2");
            var td4 = $("<td></td>").attr("class", "th1");
            var input = $("<input type='checkbox'/>").attr("value", data[i].sno).attr("name", data[i].thesisId);
            input.appendTo(td4);
            td1.appendTo(row);
            td2.appendTo(row);
            td3.appendTo(row);
            td4.appendTo(row);
            row.appendTo(table);
        }

    }
   

    myPostAjax(url, data, success, error);

    //-----------------------教师拟题->已选择学生列表表格数据--------------
    //---------------------2017年3月18日 22:10:59--------------------------
    var url1 = "/Teacher/QueryTeacherHasChoosedStudentWhoHasNotMadeThesis";
    var data1 = new Object();

    function success1(data) {
        var table = $("#student6");
        for (var i = 0; i < data.length; i++) {
            var row = $("<tr></tr>").attr("name", "haveselected");

            var td1 = $("<td></td>").text(parseInt(i + 1)).attr("class", "th1");
            var td2 = $("<td></td>").text(data[i].sname).attr("class", "th1");
            var td3 = $("<td></td>").text(data[i].className).attr("class", "th2");
            var td4 = $("<td></td>").text(data[i].thesisName).attr("class", "th2");
            var td5 = $("<td></td>").text(data[i].thesiSourcs).attr("class", "th1");
            td1.appendTo(row);
            td2.appendTo(row);
            td3.appendTo(row);
            td4.appendTo(row);
            td5.appendTo(row);
            row.appendTo(table);
        }
    };
    myPostAjax(url1, data1, success1, error);


    //--------------------学生拟题->已选择学生列表->数据-------------------
    //---------------------2017年3月18日 22:10:59--------------------------
    var url4 = "/Teacher/QueryTeacherHasChoosedStudentWhoMadeThesis";
    var data4 = new Object();
    function success4(data) {
        var table = $("#student4");
        for (var i = 0; i < data.length; i++) {
            var row = $("<tr></tr>").attr("name", "haveselected");

            var td1 = $("<td></td>").text(parseInt(i + 1)).attr("class", "th1");
            var td2 = $("<td></td>").text(data[i].sname).attr("class", "th1");
            var td3 = $("<td></td>").text(data[i].className).attr("class", "th2");
            var td4 = $("<td></td>").text(data[i].thesisName).attr("class", "th2");
            var td5 = $("<td></td>").text(data[i].thesiSourcs).attr("class", "th1");
            td1.appendTo(row);
            td2.appendTo(row);
            td3.appendTo(row);
            td4.appendTo(row);
            td5.appendTo(row);
            row.appendTo(table);
        }
    };
    myPostAjax(url4, data4, success4, error);
    //------------------------------填充 课题管理->审核通过的课题 表格数据--------
    //-----------------------------2017年3月22日 00:58:00-------------------------
    var url2 = "/Teacher/QueryAllPassExamineThesis";
    var data2 = new Object();

    function success2(data) {
        var table = $("#pass-examinethesis");
        for (var i = 0; i < data.length; i++) {
            var row = $("<tr></tr>").attr("name", "pass_examine_thesis");
            var td1 = $("<td></td>").text(data[i].maker_name).attr("class", "th3");
            var td2 = $("<td></td>").text(data[i].sources).attr("class", "th3");
            var td3 = $("<td></td>").text(data[i].thesis_status).attr("class", "th4");
            var td4 = $("<td></td>").text(data[i].thesis_name).attr("class", "th5");
            var td5 = $("<td></td>").text(data[i].usingyear).attr("class", "th4");
            td1.appendTo(row);
            td2.appendTo(row);
            td3.appendTo(row);
            td4.appendTo(row);
            td5.appendTo(row);
            row.appendTo(table);
        }
        
        var allpassexaminethesisCount = $("#pass-examinethesis").find("tr:gt(0)");
       
        for (var i = 0; i < allpassexaminethesisCount.length; i++) {
            if (i > rowCount) {
                allpassexaminethesisCount.eq(i).hide();
            } else {
                allpassexaminethesisCount.eq(i).show();
            }
        }
    };

    myPostAjax(url2, data2, success2, error);

    //---------------课题管理->教师课题 教师所有课题填充----------
    //---------------------2017年3月23日 16:33:18------------------
    var url3 = "/Teacher/QueryAllThesisOfTeacher";

    function success3(data) {
        var table = $("#all-thesis-of-teacher");
        for (var i = 0; i < data.length; i++) {
            var row = $("<tr></tr>").attr("name", "all_thesis_of_teacher");
            var td1 = $("<td></td>").text(i+1).attr("class", "th3");
            var td2 = $("<td></td>").attr("class", "th5");

            var url = "/Teacher/ThesisDetail?id=" + data[i].thesis_id;
            var a = $("<a></a>").text(data[i].thesis_name).attr("href", url);
            a.appendTo(td2);


            var td3 = $("<td></td>").text(data[i].thesis_type).attr("class", "th4");
            var td4 = $("<td></td>").text(data[i].thesis_status).attr("class", "th3");
            
            td1.appendTo(row);
            td2.appendTo(row);
            td3.appendTo(row);
            td4.appendTo(row);
            row.appendTo(table);
        }

        var trs = table.find("tr:gt(0)");
        for (var i = 0; i < trs.length; i++) {
            if (i > rowCount) {
                trs.eq(i).hide();
            } else {
                trs.eq(i).show();
            }
        }
    }

    myPostAjax(url3, data2, success3, error);


    //-----------------------------填充 课题管理->删除学生 数据--------
    //-----------------------------2017年3月28日 22:10:43--------------
    var url5 = "/Teacher/QueryTeacherChooseAllOfStudent";
    var data5 = new Object();

    function success5(data) {
        var table = $("#delete-student-tb");
        for (var j = 0; j < data.length; j++) {
            var row = $("<tr></tr>").attr("name", "all_student");

            var td1 = $("<td></td>").text(j+1);
            var td2 = $("<td></td>").text(data[j].name).attr("id",data[j].sno);
            var td3 = $("<td></td>").text(data[j].thesis_name).attr("id", data[j].thesis_id);
            var td4 = $("<td></td>").attr("class", "th6");
            var btn = $("<button>退选</button>").attr("class", "btn btn-info").attr("name", "withdrawstudents");
            btn.click(function () {
                event.preventDefault();
                var grandfather = $(this).parent().parent();
                var sno = grandfather.children().eq(1).attr("id");
                var thesisNo = grandfather.children().eq(2).attr("id");
                var data = new Object();
                data.sno = sno;
                data.thesisNo = thesisNo;
                var url = "/Teacher/WithDrawStudent";

                function success(data) {
                    alert(data.tip);
                    if (data.res==true) {
                        grandfather.remove();
                        
                    }
                }

                myPostAjax(url, data, success, error);
                alert("send ajax request!");
            });
            btn.appendTo(td4);
            td1.appendTo(row);
            td2.appendTo(row);
            td3.appendTo(row);
            td4.appendTo(row);
            row.appendTo(table);
        }
        countAllStudentAndInit();
    }
    myPostAjax(url5, data5, success5, error);


    //---------------------计算论题审核未通过的总数------------------------
    //----------------------2017年3月16日 22:30:56-------------------------
    function thesisCount() {
        var count = $("#un-examine-thesis").find("tr:gt(0)").length;
        var rowCount = 7;
        count = count / rowCount + 1;
        return parseInt(count);
    }

    //----------------计算选择了某教师为指导老师的所有学生数目-------------
    //----------------------2017年3月16日 22:30:56-------------------------
    function chooseTeacherThesisCount() {
        var stuCount1 = $("#student5").find("tr:gt(0)").length;
        if (parseInt(stuCount1)%7==0) {
            return parseInt(stuCount1 / 7);
        } else {
            return parseInt((stuCount1 / 7)+1);
        }
        
    }

    //----------------计算某教师已确定的指导学生数目及页数-------------
    //----------------------2017年3月16日 22:30:56-------------------------
    function countStudent1Page() {
        var total = parseInt($("#student6").find("tr:gt(0)").length);
        if (parseInt(total) % 7 == 0) {
            return parseInt(total / 7);
        } else {
            return parseInt((total / 7) + 1);
        }
    }

    //----------------计算选了某老师的自拟题学生数目及页数-----------------
    //----------------------2017年3月16日 22:30:56-------------------------
    function countStudent2Page() {
        var total = parseInt($("#student4").find("tr:gt(0)").length);
        if (parseInt(total) % 7 == 0) {
            return parseInt(total / 7);
        } else {
            return parseInt((total / 7) + 1);
        }
    }

    function countStudentMakeThesis() {
        var total = parseInt($("#student2").find("tr:gt(0)").length);
        if (parseInt(total) % 7 == 0) {
            return parseInt(total / 7);
        } else {
            return parseInt((total / 7) + 1);
        }
    }
    //-----------------------ajax网络错误回调函数--------------------------
    //----------------------2017年3月16日 22:30:56-------------------------
    function error(textStatus, errorThrown) {
        alert("状态：" + textStatus + "\n异常：" + errorThrown);
    }

    function countAllStudentAndInit() {
        var studentTotal = parseInt($("#delete-student-tb").find("tr:gt(0)").length);
        var pageRowNum = 7;
        for (var j = 0; j < studentTotal; j++) {
            if (j<pageRowNum) {
                $("#delete-student-tb").find("tr:gt(0)").eq(j).show();
            } else {
                $("#delete-student-tb").find("tr:gt(0)").eq(j).hide();
            }
        }
        $("#prev-delete-student-btn").attr("disabled", true);//将上一页按钮设置为不可点击
    }
});
//-----------------------------$.ready()函数分割线--------------------------------------------------------

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
        $("#thesis-name").val("");
        $("#thesis-detail").val("");
    };

    function error(data) {
        alert(data.tip);
    }

    if (choose) {
        myUniversalAjax(type, url, data, dataType, success, error);
    }
   

});

//------------------------------------------------------
//---------------2017年3月19日 00:38:51-----------------
//------------------------------------------------------
$("#select-student-btn").click(function() {
    var items = $("#student5").find("input:checked");
    var url = "/Teacher/ChooseStudents";
    var tempdata =[];
    items.each(function() {
        var sno = $(this).attr("value");
        var thesisid = $(this).attr("name");
        var maps = new Object();
        maps.sno = sno;
        maps.thesisid = thesisid;
        tempdata.push(maps);
    }); 
    var data = { data: JSON.stringify(tempdata) };
    function success(data) {
        if (data.tip!="true") {
            alert(data.tip);
        }
        
        location.reload(true);
    }

    myPostAjax(url,data,success);
});

//--------------------------------------------------------------------
//--------------------------2017年3月23日 16:55:10--------------------
//-------------------教师课题页面->首页、上一页、下一页、尾页事件注册
function showTableData(table,rowCount,pageNum) {
    var trlist = table.find("tr:gt(0)");
    var len = trlist.length;

}

//--------------------------------首页事件注册------------------------
$("#home-teacher-thesis").click(function() {
    var trlist = $("#all-thesis-of-teacher").find("tr:gt(0)");
    var len = trlist.length;
    var rowCount = 7;
    for (var i = 0; i < len; i++) {
        if (i<rowCount) {
            trlist.eq(i).show();
        } else {
            trlist.eq(i).hide();
        }
    }
    //首页的可见行的最后一行行号设置为rowCount-1
    $("#th").attr("name", rowCount-1);
    $("#prev-teacher-thesis").attr("disabled", true);//将上一页按钮设置为不可点击
    $("#next-teacher-thesis").attr("disabled", false);//将下一页按钮设置为可点击
});


//------------------------------上一页事件注册------------------------
$("#prev-teacher-thesis").click(function () {
    var rowCount = 7;
    var itemLastRowNumber;
    var trlist = $("#all-thesis-of-teacher").find("tr:gt(0)");
    var currentLastRowNumber = parseInt($("#th").attr("name"));
    if ((currentLastRowNumber+1) % rowCount == 0) {
            itemLastRowNumber = currentLastRowNumber - rowCount;
        } else {
        itemLastRowNumber = currentLastRowNumber - (currentLastRowNumber + 1) % rowCount;
    }
    $("#next-teacher-thesis").attr("disabled", false);
    if (itemLastRowNumber< rowCount) {//如果已经是首页
        $("#th").attr("name", rowCount - 1);//将当前可见行的最后一行行号设置为rowCount-1
        $("#prev-teacher-thesis").attr("disabled", true);//将上一页按钮设置为不可点击
        for (var i = 0; i < trlist.length; i++) {
            if (i < rowCount) {
                trlist.eq(i).show();
            } else {
                trlist.eq(i).hide();
            }
        }
    } else {
        $("#th").attr("name", itemLastRowNumber);//将当前可见行的最后一行行号设置为itemLastRowNumber
        //$("#prev-teacher-thesis").attr("disabled", false);//将上一页按钮设置为可点击
        for (var i = 0; i < trlist.length; i++) {
            if (i <= itemLastRowNumber && i > itemLastRowNumber-rowCount) {
                trlist.eq(i).show();
            } else {
                trlist.eq(i).hide();
            }
        }

    }

});


//------------------------------下一页事件注册------------------------
$("#next-teacher-thesis").click(function () {
    var rowCount = 7;
    var itemLastRowNumber;//点击下一页后可见行的最后一行的行号
    var trlist = $("#all-thesis-of-teacher").find("tr:gt(0)");
    var currentLastRowNumber = parseInt($("#th").attr("name"));
    if (currentLastRowNumber+rowCount+1 < trlist.length) {
        itemLastRowNumber = currentLastRowNumber + rowCount;
    } else {
        itemLastRowNumber = trlist.length-1;
    }
    $("#prev-teacher-thesis").attr("disabled", false);//将上一页按钮设置为可点击
    if (itemLastRowNumber == trlist.length - 1) {
        $("#next-teacher-thesis").attr("disabled", true);
        $("#th").attr("name", itemLastRowNumber); //将当前可见行的最后一行行号设置为itemLastRowNumber
        for (var i = 0; i < trlist.length; i++) {
            if (i > currentLastRowNumber && i <= itemLastRowNumber) {
                trlist.eq(i).show();
            } else {
                trlist.eq(i).hide();
            }

        }
    } else {
        $("#next-teacher-thesis").attr("disabled", false);
        $("#th").attr("name", itemLastRowNumber); //将当前可见行的最后一行行号设置为itemLastRowNumber
        for (var i = 0; i < trlist.length; i++) {
            if (i > currentLastRowNumber && i <= itemLastRowNumber) {
                trlist.eq(i).show();
            } else {
                trlist.eq(i).hide();
            }
        }
    }

});


//--------------------------------尾页事件注册------------------------
$("#end-teacher-thesis").click(function () {
    var trlist = $("#all-thesis-of-teacher").find("tr:gt(0)");
    var len = trlist.length;
    var rowCount = 7;
    var temp = len % rowCount;
    var item;
    if (temp==0) {
        item = len - rowCount;
    } else {
        item = len - temp;
    }
    for (var i = 0; i < len; i++) {
        
        if (i >= item) {
            trlist.eq(i).show();
        } else {
            trlist.eq(i).hide();
        }
    }
    $("#th").attr("name", len - 1);
    $("#prev-teacher-thesis").attr("disabled", false);//将上一页按钮设置为可点击
    $("#next-teacher-thesis").attr("disabled", true);//将下一页按钮设置为不可点击
});

//----------------------------------------------------------分割线----------------------------------------------------------
//---------------------退选学生->首页、上一页、下一页、尾页事件---------------------
//-----------------------2017年3月31日 20:08:53-------------------------------------
//首页事件
$("#home-delete-student-btn").click(function () {
    var trlist = $("#delete-student-tb").find("tr:gt(0)");
    var len = trlist.length;
    var rowCount = 7;
    for (var i = 0; i < len; i++) {
        if (i < rowCount) {
            trlist.eq(i).show();
        } else {
            trlist.eq(i).hide();
        }
    }
    //首页的可见行的最后一行行号设置为rowCount-1
    $("#th").attr("name", rowCount - 1);
    $("#prev-delete-student-btn").attr("disabled", true);//将上一页按钮设置为不可点击
    $("#next-delete-student-btn").attr("disabled", false);//将下一页按钮设置为可点击
});


//上一页事件
//-----------------------------2017年3月31日 20:22:45-----------------
$("#prev-delete-student-btn").click(function () {
    var rowCount = 7;
    var itemLastRowNumber;
    var trlist = $("#delete-student-tb").find("tr:gt(0)");
    var currentLastRowNumber = parseInt($("#tr").attr("name"));
    if ((currentLastRowNumber + 1) % rowCount == 0) {
        itemLastRowNumber = currentLastRowNumber - rowCount;
    } else {
        itemLastRowNumber = currentLastRowNumber - (currentLastRowNumber + 1) % rowCount;
    }
    $("#next-delete-student-btn").attr("disabled", false);
    if (itemLastRowNumber < rowCount) {//如果已经是首页
        $("#tr").attr("name", rowCount - 1);//将当前可见行的最后一行行号设置为rowCount-1
        $("#prev-delete-student-btn").attr("disabled", true);//将上一页按钮设置为不可点击
        for (var i = 0; i < trlist.length; i++) {
            if (i < rowCount) {
                trlist.eq(i).show();
            } else {
                trlist.eq(i).hide();
            }
        }
    } else {
        $("#tr").attr("name", itemLastRowNumber);//将当前可见行的最后一行行号设置为itemLastRowNumber
        //$("#prev-teacher-thesis").attr("disabled", false);//将上一页按钮设置为可点击
        for (var i = 0; i < trlist.length; i++) {
            if (i <= itemLastRowNumber && i > itemLastRowNumber - rowCount) {
                trlist.eq(i).show();
            } else {
                trlist.eq(i).hide();
            }
        }

    }

});

//下一页事件
//-----------------------------2017年3月31日 20:22:45-----------------
$("#next-delete-student-btn").click(function () {
    var rowCount = 7;
    var itemLastRowNumber;//点击下一页后可见行的最后一行的行号
    var trlist = $("#delete-student-tb").find("tr:gt(0)");
    var currentLastRowNumber = parseInt($("#tr").attr("name"));
    if (currentLastRowNumber + rowCount + 1 < trlist.length) {
        itemLastRowNumber = currentLastRowNumber + rowCount;
    } else {
        itemLastRowNumber = trlist.length - 1;
    }
    $("#prev-delete-student-btn").attr("disabled", false);//将上一页按钮设置为可点击
    if (itemLastRowNumber == trlist.length - 1) {
        $("#next-delete-student-btn").attr("disabled", true);
        $("#tr").attr("name", itemLastRowNumber); //将当前可见行的最后一行行号设置为itemLastRowNumber
        for (var i = 0; i < trlist.length; i++) {
            if (i > currentLastRowNumber && i <= itemLastRowNumber) {
                trlist.eq(i).show();
            } else {
                trlist.eq(i).hide();
            }

        }
    } else {
        $("#next-delete-student-btn").attr("disabled", false);
        $("#tr").attr("name", itemLastRowNumber); //将当前可见行的最后一行行号设置为itemLastRowNumber
        for (var i = 0; i < trlist.length; i++) {
            if (i > currentLastRowNumber && i <= itemLastRowNumber) {
                trlist.eq(i).show();
            } else {
                trlist.eq(i).hide();
            }
        }
    }

});

//-----------------------------2017年3月31日 20:22:45-----------------
//--------------------------------尾页事件注册------------------------
$("#tail-delete-student-btn").click(function () {
    var trlist = $("#delete-student-tb").find("tr:gt(0)");
    var len = trlist.length;
    var rowCount = 7;
    var temp = len % rowCount;
    var item;
    if (temp == 0) {
        item = len - rowCount;
    } else {
        item = len - temp;
    }
    for (var i = 0; i < len; i++) {

        if (i >= item) {
            trlist.eq(i).show();
        } else {
            trlist.eq(i).hide();
        }
    }
    $("#tr").attr("name", len - 1);
    $("#prev-delete-student-btn").attr("disabled", false);//将上一页按钮设置为可点击
    $("#next-delete-student-btn").attr("disabled", true);//将下一页按钮设置为不可点击
});



//----------------------------选取自拟题学生-----------------------------------------
//-----------------------2017年3月28日 20:05:45--------------------------------------
$("#select-stu-thesis-btn").click(function() {
    var items = $("#student2").find("input:checked");
    var url = "/Teacher/ChooseStudents";
    var tempdata = [];
    items.each(function () {
        var sno = $(this).attr("value");
        var thesisid = $(this).attr("name");
        var maps = new Object();
        maps.sno = sno;
        maps.thesisid = thesisid;
        tempdata.push(maps);
    });
    var data = { data: JSON.stringify(tempdata) };
    function success(data) {
        if (data.tip!="true") {
            alert(data.tip);
        }
        location.reload(true);
    }

    myPostAjax(url, data, success);
});






//---------------------------------------------------------------------
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
                    ms.fillHtml(obj, { "current": current, "pageCount": args.pageCount });
                    if (typeof (args.backFn) == "function") {
                        args.backFn(current);
                    }
                    var count = 7;//待审课题每页的行数
                    //------------------审题页面论题分页------------------
                    var rows = $("#un-examine-thesis").find("tr:gt(0)"); 
                    for (var i = 0; i < rows.length; i++) {
                        if (i < (current-1) * count || i >= current * count) {
                            rows.eq(i).hide();
                        } else {
                            rows.eq(i).show();
                        }
                    }
                   
                    
                    //------------------教师拟题->未选择学生->未选择学生列表分页------------------
                    //----------------------2017年3月16日 16:55:46--------------------------------
                    var chooseThesisInfo = $("#student5").find("tr:gt(0)");
                    for (var i = 0; i < chooseThesisInfo.length; i++) {
                        if (i < (current - 1) * count || i >= current * count) {
                            chooseThesisInfo.eq(i).hide();
                        } else {
                            chooseThesisInfo.eq(i).show();
                        }
                    }

                    //-------------------教师拟题->已选择的学生列表->分页--------------------------
                    //----------------------2017年3月16日 23:05:04---------------------------------
                    var hasBeenChoosedUnMakeTopicStudent = $("#student6").find("tr:gt(0)");
                    for (var i = 0; i < hasBeenChoosedUnMakeTopicStudent.length; i++) {
                        if (i < (current - 1) * count || i >= current * count) {
                            hasBeenChoosedUnMakeTopicStudent.eq(i).hide();
                        } else {
                            hasBeenChoosedUnMakeTopicStudent.eq(i).show();
                        }
                    }

                    //-------------------学生拟题->已选择的学生列表->分页--------------------------
                    //----------------------2017年3月16日 23:05:04---------------------------------
                    var makeTopicStudentCount = $("#student4").find("tr:gt(0)");
                    for (var i = 0; i < makeTopicStudentCount.length; i++) {
                        if (i < (current - 1) * count || i >= current * count) {
                            makeTopicStudentCount.eq(i).hide();
                        } else {
                            makeTopicStudentCount.eq(i).show();
                        }
                    }


                    //-----------------课题管理->审核通过的论题->中间页事件------------------------
                    //----------------------2017年3月23日 13:01:58---------------------------------
                    var passExamineThesisCount = $("#pass-examinethesis").find("tr:gt(0)");
                    for (var i = 0; i < passExamineThesisCount.length; i++) {
                        if (i < (current - 1) * count || i >= current * count) {
                            passExamineThesisCount.eq(i).hide();
                        } else {
                            passExamineThesisCount.eq(i).show();
                        }
                    }


                    //-----------------选择学生->自拟课题->中间页事件------------------------
                    //----------------------2017年3月28日 19:52:43---------------------------
                    var studentMakeThesisCount = $("#pass-examinethesis").find("tr:gt(0)");
                    for (var i = 0; i < studentMakeThesisCount.length; i++) {
                        if (i < (current - 1) * count || i >= current * count) {
                            studentMakeThesisCount.eq(i).hide();
                        } else {
                            studentMakeThesisCount.eq(i).show();
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
                    //------------------审题页面上一页点击事件------------------
                    //------------------2017年3月16日 23:06:48------------------
                    var rows = $("#un-examine-thesis").find("tr:gt(0)");
                    var count = 7;//待审课题每页的行数
                    for (var i = 0; i < rows.length; i++) {
                        if (i < (current-2) * count || i > (current-1) * count) {
                            rows.eq(i).hide();
                        } else {
                            rows.eq(i).show();
                        }
                    }
                    
                    
                    //------------------教师拟题->未选择学生->未选择学生列表->上一页点击事件------------------
                    //-----------------------2017年3月16日 23:07:43-------------------------------------------
                    var chooseThesisInfo = $("#student5").find("tr:gt(0)");
                    for (var i = 0; i < chooseThesisInfo.length; i++) {
                        if (i < (current - 2) * count || i > (current - 1) * count) {
                            chooseThesisInfo.eq(i).hide();
                        } else {
                            chooseThesisInfo.eq(i).show();
                        }
                    }
                   

                    //----------------教师拟题->已选择的学生列表->点击上一页事件-------------------
                    //----------------------2017年3月16日 23:05:04---------------------------------
                    var hasBeenChoosedUnMakeTopicStudent = $("#student6").find("tr:gt(0)");
                    for (var i = 0; i < hasBeenChoosedUnMakeTopicStudent.length; i++) {
                        if (i < (current - 2) * count || i > (current - 1) * count) {
                            hasBeenChoosedUnMakeTopicStudent.eq(i).hide();
                        } else {
                            hasBeenChoosedUnMakeTopicStudent.eq(i).show();
                        }
                    }

                    //----------------学生拟题->已选择的学生列表->点击上一页事件-------------------
                    //----------------------2017年3月16日 23:05:04---------------------------------
                    var makeTopicStudentCount = $("#student4").find("tr:gt(0)");
                    for (var i = 0; i < makeTopicStudentCount.length; i++) {
                        if (i < (current - 2) * count || i > (current - 1) * count) {
                            makeTopicStudentCount.eq(i).hide();
                        } else {
                            makeTopicStudentCount.eq(i).show();
                        }
                    }



                    //-----------------课题管理->审核通过的论题->上一页事件------------------------
                    //----------------------2017年3月23日 13:01:58---------------------------------
                    var passExamineThesisCount = $("#pass-examinethesis").find("tr:gt(0)");
                    for (var i = 0; i < passExamineThesisCount.length; i++) {
                        if (i < (current - 2) * count || i > (current - 1) * count) {
                            passExamineThesisCount.eq(i).hide();
                        } else {
                            passExamineThesisCount.eq(i).show();
                        }
                    }


                    //-----------------选择学生->自拟课题->上一页事件------------------------
                    //----------------------2017年3月28日 19:52:43---------------------------
                    var studentMakeThesisCount = $("#pass-examinethesis").find("tr:gt(0)");
                    for (var i = 0; i < studentMakeThesisCount.length; i++) {
                        if (i < (current - 2) * count || i > (current - 1) * count) {
                            studentMakeThesisCount.eq(i).hide();
                        } else {
                            studentMakeThesisCount.eq(i).show();
                        }
                    }
                });
                //下一页
                obj.on("click", "a.nextPage", function () {
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj, { "current": current + 1, "pageCount": args.pageCount });
                    if (typeof (args.backFn) == "function") {
                        args.backFn(current + 1);
                    }
                    //------------------审题页面下一页点击事件------------------
                    //------------------2017年3月16日 23:11:07------------------
                    var rows = $("#un-examine-thesis").find("tr:gt(0)");
                    var count = 7;//待审课题每页的行数
                    for (var i = 0; i < rows.length; i++) {
                        if (i <= ((current) * count )|| i >= ((current+1) * count)) {
                            rows.eq(i).hide();
                        } else {
                            rows.eq(i).show();
                        }
                    }
                    

                    //------------------教师拟题->未选择学生->未选择学生列表->点击下一页事件--------
                    //--------------------------2017年3月16日 23:11:34------------------------------
                    var chooseThesisInfo = $("#student5").find("tr:gt(0)");
                    for (var i = 0; i < chooseThesisInfo.length; i++) {
                        if (i <= ((current) * count) || i >= ((current + 1) * count)) {
                            chooseThesisInfo.eq(i).hide();
                        } else {
                            chooseThesisInfo.eq(i).show();
                        }
                    }
                    


                    //----------------教师拟题->已选择的学生列表->点击下一页事件-------------------
                    //----------------------2017年3月16日 23:05:04---------------------------------
                    var hasBeenChoosedUnMakeTopicStudent = $("#student6").find("tr:gt(0)");
                    for (var i = 0; i < hasBeenChoosedUnMakeTopicStudent.length; i++) {
                        if (i <= ((current) * count) || i >= ((current + 1) * count)) {
                            hasBeenChoosedUnMakeTopicStudent.eq(i).hide();
                        } else {
                            hasBeenChoosedUnMakeTopicStudent.eq(i).show();
                        }
                    }

                    //----------------学生拟题->已选择的学生列表->点击下一页事件-------------------
                    //----------------------2017年3月16日 23:05:04---------------------------------
                    var makeTopicStudentCount = $("#student4").find("tr:gt(0)");
                    for (var i = 0; i < makeTopicStudentCount.length; i++) {
                        if (i <= ((current) * count) || i >= ((current + 1) * count)) {
                            makeTopicStudentCount.eq(i).hide();
                        } else {
                            makeTopicStudentCount.eq(i).show();
                        }
                    }


                    //-----------------课题管理->审核通过的论题->下一页事件------------------------
                    //----------------------2017年3月23日 13:01:58---------------------------------
                    var passExamineThesis = $("#pass-examinethesis").find("tr:gt(0)");
                    var passExamineThesisLength = passExamineThesis.length;
                    for (var i = 0; i < passExamineThesisLength; i++) {
                        if (i <= ((current) * count) || i >= ((current + 1) * count)) {
                            passExamineThesis.eq(i).hide();
                        } else {
                            passExamineThesis.eq(i).show();
                        }
                    }

                    //-----------------选择学生->自拟课题->下一页事件------------------------
                    //----------------------2017年3月28日 19:52:43---------------------------
                    var studentMakeThesisCount = $("#pass-examinethesis").find("tr:gt(0)");
                    var studentMakeThesisLen = studentMakeThesisCount.length;
                    for (var i = 0; i < studentMakeThesisLen; i++) {
                        if (i <= ((current) * count) || i >= ((current + 1) * count)) {
                            studentMakeThesisCount.eq(i).hide();
                        } else {
                            studentMakeThesisCount.eq(i).show();
                        }
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

