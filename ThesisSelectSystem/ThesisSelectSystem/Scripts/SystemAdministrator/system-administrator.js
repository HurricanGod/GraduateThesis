$(document).ready(function(){
	
	$(".grade-main").hide();
	$(".addAminstrator").hide();
	$(".deleteAminstrator").hide();
	$(".addAparment").hide();
	$(".deleteAparment").hide();
	$(".subject-setup").hide();
	$(".intersetup").hide();
	
	$("#system").click(function(){
            
            $("#system-setup").toggle(200);
	});
	
	$("#apartment").click(function(){
		    $("#apartment-setup").toggle(200);
	});
	
	$("#setGrade").click(function(){
		$(".anm-main").hide();
		$(".addAminstrator").hide();
		$(".addAparment").hide();
		$(".deleteAminstrator").hide();
		$(".deleteAparment").hide();
		$(".subject-setup").hide();
		$(".intersetup").hide();
		$(".grade-main").show();
	});
	
	$("#writrAnoucement").click(function(){
		$(".anm-main").show();
		$(".grade-main").hide();
		$(".addAminstrator").hide();
		$(".addAparment").hide();
		$(".deleteAminstrator").hide();
		$(".deleteAparment").hide();
		$(".subject-setup").hide();
		$(".intersetup").hide();
	});
	
	$("#addAparment").click(function(){
		$(".anm-main").hide();
		$(".grade-main").hide();
		$(".addAminstrator").hide();
		$(".deleteAminstrator").hide();
		$(".deleteAparment").hide();
		$(".subject-setup").hide();
		$(".intersetup").hide();
		$(".addAparment").show();
	});
	$("#deleteAparment").click(function(){
		$(".anm-main").hide();
		$(".grade-main").hide();
		$(".addAminstrator").hide();
		$(".deleteAminstrator").hide();
		$(".subject-setup").hide();
		$(".intersetup").hide();
		$(".addAparment").hide();
		$(".deleteAparment").show();
	});
	$("#addAminstrator").click(function(){
		$(".anm-main").hide();
		$(".grade-main").hide();
		$(".addAminstrator").show();
		$(".deleteAminstrator").hide();
		$(".deleteAparment").hide();
		$(".subject-setup").hide();
		$(".intersetup").hide();
		$(".addAparment").hide();
	});
	$("#deleteAminstrator").click(function(){
		$(".anm-main").hide();
		$(".grade-main").hide();
		$(".addAminstrator").hide();
		$(".deleteAminstrator").show();
		$(".deleteAparment").hide();
		$(".subject-setup").hide();
		$(".intersetup").hide();
		$(".addAparment").hide();
	});
	$("#subject-setup").click(function(){
		$(".anm-main").hide();
		$(".grade-main").hide();
		$(".addAminstrator").hide();
		$(".deleteAminstrator").hide();
		$(".deleteAparment").hide();
		$(".addAparment").hide();
		$(".intersetup").hide();
		$(".subject-setup").show();
	});
	$("#interface").click(function(){
		$(".anm-main").hide();
		$(".grade-main").hide();
		$(".addAminstrator").hide();
		$(".deleteAminstrator").hide();
		$(".deleteAparment").hide();
		$(".addAparment").hide();
		$(".intersetup").show();
		$(".subject-setup").hide();
	});
	$("#institution1 a").click(function(){
		var r = confirm("确定删除该学院？")
		
	})
	$("#adminstrator1 a").click(function(){
		var s = confirm("确定删除该管理员及其所有信息？")
	});
	
	$("#left").click(function(){
		$(".vertical").css("float","left");
		$(".contain").css("float","right");
		$(".search").css("float","right");
		
	});
	$("#right").click(function(){
		$(".vertical").css("float","right");
		$(".contain").css("float","left");
		$(".search").css("float","left");
	});
	
	$("#color1").click(function(){
	    $(".contain").css("background-color", "#f1f1b8");
	});
	$("#color2").click(function(){
	    $(".contain").css("background-color", "#e7dac9");
	});
	$("#color3").click(function(){
	    $(".contain").css("background-color", "#ccffff");
	});
	$("#color4").click(function(){
	    $(".contain").css("background-color", "#fffccc");
	})
	$("#moren").click(function(){
		$(".contain").css("background-color","#FFFFFF");
	});
	
	
	
		$('#addMajor').click(function () {
		    var majorName = $("#majorName").val();
		    var departmentName = $('#loadDepartment option:selected').val();
		    $.ajax({
		        url: "/SystemAdmin/AddMajor",
		        type: "POST",
		        dataType: "json",
		        data: { major: majorName, department: departmentName },
		        success: function (data) {
		            alert("成功添加专业：" + data.name);
		        },
		        error: function () {
		            alert("添加新专业失败！");

		        }
		    });
		});


		$('#delmajor').click(function () {

		    var datas = [];
		    var deleteItem = [];
		    var i = 0;
		    $('input[name="delmajor"]:checked').each(function () {
		        var temp = $(this).parent().parent();
		        datas[i] = $(this).val();
		        deleteItem[i++] = temp;
		       // temp.remove();
		    });
		    if (datas != null) {
		        var choose = confirm("您确定要删除这专业？");
		        var test = datas.join(',');
		       // alert(test);
		        if (choose == true) {
		            $.ajax({
		                url: "/SystemAdmin/DelMajor",
		                type: "POST",
		                dataType: "json",
		                data: { "test": test },
		                success: function (data) {
		                    alert(data.message);
		                    for (var j = 0; j < deleteItem.length; j++) {
		                        deleteItem[j].remove();
		                    }
		                },
		                error: function (data) {
		                    alert(data.message);
		                }

		            });
		        } else {
		            return false;
		        }

		    }

		});


		$("#addepart").click(function () {
		    var texts = $("#addDepartment").val();
		    if (texts!=null) {
		        $.ajax({
		            type: "POST",
		            url: "/SystemAdmin/AddDepartment",
		            data: {text:texts},
		            dataType: "json",
                    success: function(data) { 
                        $("<li></li>").text(texts).insertAfter($("#schoollist"));
                        alert(data.result);
                    },
                    error: function(data) {
                        alert(data.result);
                    }
		        });
		    } else {
                alert("未填写任何二级学院名称");
		    }

		});

    //$("#teacherIdList").change(function() {
    //    //alert($("#teacherIdList option:selected").text());
    //    var tid = $("#teacherIdList option:selected").attr('id');
    //    var index = tid.substring(tid.length - 1, tid.length);
    //    //alert(tid + " 索引号为" + index);
    //    var selectId = "#tname" + index;
    //    $(selectId).attr("selected", "selected");
    //});
	//$("#teacherIdList").attr("disabled", "disabled");
	//$("#teacherNameList").change(function () {
	//    $("#teacherNameList option:selected").attr("selected", "selected");
	//    var text = $("#teacherNameList option:selected").innerText;
    //});
		function universalAjax( url, data, successFunction, errorFunction) {
        $.ajax({
            type: "post",
            url: url,
            data: data,
            dataType: "json",
            success: successFunction,
            error: errorFunction 
        });
		};

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

		function error(XMLHttpRequest, textStatus, errorThrown) {
		    alert("状态：" + textStatus + "\n异常：" + errorThrown);
		}

    //添加管理员
    $("#addAdminBtn").click(function() {
        var item = $("#teacherNameList option:selected");
        var id = item.attr('id');
        var name = item.val();
        var departmentName = $("#departmentNameSelect option:selected").val();

        function success(data) {
            alert(data.tip);
            var deleteItem = $("#teacherNameList option:selected");
            deleteItem.remove();
            //alert("管理员id为：" + id + "  姓名为：" + name+" 系名为："+departmentName);
            var newRow = $("<tr></tr>").attr("id", id);
            var cell0 = $("<td></td>").text(id);
            var cell1 = $("<td></td>").text(name);
            var cell2 = $("<td></td>").text(departmentName);
            cell0.appendTo(newRow);
            cell1.appendTo(newRow);
            cell2.appendTo(newRow);
            newRow.appendTo($("#adminList"));

            var btn = $("<button></button>")
                .attr("class", "btn btn-default")
                .attr("type", "button")
                .attr("name", "deleteAdmin");
            btn.text("删除");
            var deleteRow = $("<tr></tr>");
            var column1 = $("<td></td>").text(id).attr("id", "dAdminId" + id);
            var column2 = $("<td></td>").text(name);
            var column3 = $("<td></td>").text(departmentName);
            btn.appendTo(deleteRow);
            column1.appendTo(deleteRow);
            column2.appendTo(deleteRow);
            column3.appendTo(deleteRow);
            deleteRow.appendTo($("#deleteAdminTb"));
        };

        var type = "post";
        var url = "/SystemAdmin/AddAdmin";
        var data = { id: id, name: name, departmentName: departmentName };
        var dataType = "json";
        function error(errorThrown) {
            alert(errorThrown);
        };
        myUniversalAjax(type, url, data, dataType, success, error);
        

    });


    //删除管理员
    $("button[name='deleteAdmin']").each(function() {
        $(this).click(function () {
            var deleteRow = $(this).parent().parent();
            var adminId = $(this).parent().parent().children().eq(1).text();
            var name = $(this).parent().parent().children().eq(2).text();
            //alert(adminId);
            var data = { id: adminId };
            var type = "post";
            var url = "/SystemAdmin/DeleteAdmin";
            var dataType = "json";

            function success(data) {
                alert(data.tip);
                deleteRow.remove();
                var itemId = "#" + adminId;
                $(itemId).remove();
                var optionEle = $("<option>"+name+"</option>").attr("id", adminId);
                optionEle.appendTo($("#teacherNameList"));
            };
            function error(errorThrown) {
                alert(errorThrown);
            };
            myUniversalAjax(type, url, data, dataType, success, error);
        });
    });


    //发布公告
    $("#announceBtn").click(function () {
        event.preventDefault();
        var title = $("#Atitle").val();
        var contents = $("#textarea1").val();
        var scope = $("#announcement-scope option:selected").text();
        //alert("title: " + title + "  contents: " + contents + " scope " + scope);
        var type = "post";
        var url = "/SystemAdmin/AnnounceAnnouncement";
        var dataType = "json";
        var data = { title: title, contents: contents, scope: scope };

        function success(data) {
            alert(data.tip);
            location.reload(true);
        };

        function error(errorThrown) {
            alert(errorThrown);
        };
        myUniversalAjax(type, url, data, dataType, success, error);
    });

    //取消公告发布
    $("#cancelBtn").click(function() {
        var verify = confirm("您确认要取消发布该公告，选择取消将使刚才编辑的公告被清除，要继续请点击“确认”");
        if (verify==true) {
            $("#Atitle").val("");
            $("#textarea1").val("");
        } else {
            return false;
        }
    });


    //设置毕业年份
    $("#set-global-year-btn").click(function () {
        event.preventDefault();
        var year = $("#global-year :selected").text();
        alert(year);
        var data = { graduateYear: year };
        var url = "/SystemAdmin/SetUpGraduateYear";

        function success(data) {
            alert(data.tip);
        }

        universalAjax(url,data,success,error);

    });

    //注册增添班级事件
    $("#add-class-btn").click(function () {
        event.preventDefault();
        var className = $("#class-name").val();
        var isNull = (className == "");
        var year = $("#graduate-year option:selected").val();
        var number = $("#human-count option:selected").text();
        //alert("人数:"+number+"\n年份："+year);
        if (isNull) {
            alert("请先填写班级名");
        } else {
            var type = "post";
            var url = "/SystemAdmin/AddClass";
            var data = { className: className ,number:number,year:year};
            var dataType = "json";

            function success(data) {
                alert(data.tip);
                location.reload(true);
            };
            

            myUniversalAjax(type,url,data,dataType,success,error);
        }

    });

    //删除班级事件
    $("#delete-class-btn").click(function () {
        var deleteClasses = [];
        var deleteElement = [];
        var index = 0;
        var info;
        $('input[name="deleteClass"]:checked').each(function () {
            deleteElement[index] = $(this).parent().parent();
            deleteClasses[index++] = $(this).val();
            info = info + $(this).val() + "、";
        });
        if (index > 0) {

            var verify = confirm("你确认要删除" + info + "这几个班级？" +
                "删除这些班级将导致与这些班级有关的学生、论题等信息将被修改，继续删除请选择'确定'");
            if (verify==true) {
                var deleteClassList = deleteClasses.join(',');
                var type = "post";
                var url = "/SystemAdmin/DeleteClass";
                var data = { classNames: deleteClassList };
                var dataType = "json";

                function success(data) {
                    alert(data.tip);
                    for (var i = 0; i < deleteElement.length; i++) {
                        deleteElement[i].remove();
                    }

                }
                myUniversalAjax(type, url, data, dataType, success, error);

            } else {
                return false;
            }
        } else {
            alert("请先选择要删除的班级");
        }

    });
});
	function openwin() {
	    window.open("page.html", "newwindow", "height=300,width=450,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no");
	}


       