$().ready(function () {

    var url1 = "/Student/QueryGuiders";
    var data1 = new Object();
    function success1(data) {
        var teachers = $("#teacher");
        for (var i = 0; i < data.length; i++) {
            var option = $("<option>" + data[i].name + "</option>").attr("value", data[i].name).attr("id", data[i].id);
            option.appendTo(teachers);
        }
    }

    myPostAjax(url1, data1, success1, true);

    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();




});


var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#teacher-thesis-tb').bootstrapTable({
            url: '/Student/QueryTeacherThesis', //请求后台的URL（*）
            method: 'get', //请求方式（*）
            toolbar: '#toolbar', //工具按钮用哪个容器
            striped: true, //是否显示行间隔色
            cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true, //是否显示分页（*）
            sortable: true, //是否启用排序
            sortOrder: "asc", //排序方式
            queryParams: oTableInit.queryParams, //传递参数（*）
            queryParamsType: "undefined",//请求参数类型，必须设置，否者后端接收不到参数
            sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1, //初始化加载第一页，默认第一页
            pageSize: 6, //每页的记录行数（*）
            pageList: [5, 6, 7, 8], //可供选择的每页的行数（*）
            search: true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: true, //是否显示所有的列
            showRefresh: true, //是否显示刷新按钮
            minimumCountColumns: 2, //最少允许的列数
            clickToSelect: true, //是否启用点击选中行
            //height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id", //每一行的唯一标识，一般为主键列
            showToggle: true, //是否显示详细视图和列表视图的切换按钮
            cardView: false, //是否显示详细视图
            detailView: false, //是否显示父子表
            dataType: "json", //请求后前端接收的数据类型
            //showFooter: false,
            columns: [{                              
                field: 'id',           
                title: '题号',
                width: 100,//列宽
                sortable: true,//允许进行排序
                sortname: 'id',//排序字段名称
                valign: 'middle'//对齐单元格数据
            }, {                              
                field: 'type',                
                title: '类型',
                sortable: true,//允许进行排序
                sortname: 'type',//排序字段名称
                width: 150,//列宽
                valign: 'middle'//对齐单元格数据                 
            }, {                              
                field: 'title',
                title: '课题名称',
                valign: 'middle'//对齐单元格数据
            }, {
                field: 'maker',
                title: '出题老师',
                sortable: true,//允许进行排序
                sortname: 'maker',//排序字段名称
                width: 150,//列宽
                valign: 'middle'//对齐单元格数据
            }, {                              
                field: 'currentChoosedNumber',
                title: '已选人数',
                width: 150,//列宽
                sortable: true,//允许进行排序
                sortname: 'currentChoosedNumber',//排序字段名称
                valign: 'middle'//对齐单元格数据            
            }, {                              
                field: 'maxChoosedNumber',
                title: '可选人数',
                sortable: true,//允许进行排序
                sortname: 'maxChoosedNumber',//排序字段名称
                width: 150,//列宽
                valign: 'middle'//对齐单元格数据
            }, {
                field: 'Get_Thesis_Detail',
                title: '查看该论题',
                width: 180,//列宽
                formatter: addButton,
                valign: 'middle'//对齐单元格数据
            }]
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = { //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            //limit: params.limit, //页面大小
            //offset: params.offset, //页码
            //departmentname: $("#txt_search_departmentname").val(),
            //statu: $("#txt_search_statu").val()
        };
        return temp;
    };
    return oTableInit;

    function addButton(value, row, index) {
        t = "<button class='btn btn-info' value=" + row.id + "  name='see_more'>" +
            "<a href='/Student/TeacherThesisDetail?id=" + row.id + "'>查看"+"</a>" + "</button>";
        console.log(t);
        return t;
    };

    
};


var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        //初始化页面上面的按钮事件
    };

    return oInit;
};




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

$("#apply-make-thesis-btn").click(function() {
    
    var isMakeThesis = $("#apply-select option:selected").attr("value");
    var url = "/Student/ApplyForMakeThesis";
    var data = new Object();
    data.isMakeThesis = isMakeThesis;

    function success(data) {
        if (data.tip == false) {
            alert("操作失败");
        }
    }

    myPostAjax(url, data, success, true);
});


