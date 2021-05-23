<%--
  Created by IntelliJ IDEA.
  User: zhaojing
  Date: 2021/4/28
  Time: 16:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path +"/";
%>
<head>
    <base href="<%=basePath%>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Title</title>
    <link rel="stylesheet" href="statics/layui/css/layui.css">
</head>
<body>
    <center>
        <h1>员工部门数据分页显示页面</h1>
        <br><br>
        <%--表单查询条件--%>
        <form class="layui-form" action="" style="margin-top: 20px;margin-bottom: -20px;">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <div class="layui-input-inline">
                        <button type="button" class="layui-btn layui-btn-radius layui-btn-normal" id="saveEmpBtn"><i class="layui-icon">&#xe654;</i>添加</button>
                    </div>
                </div>
                <div class="layui-inline">
                    <div class="layui-input-inline">
                        <button type="button" class="layui-btn layui-btn-radius layui-btn- danger" id="batchEmpBtn">
                            <i class="layui-icon">&#xe640;</i>批量删除
                        </button>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">员工姓名</label>
                    <div class="layui-input-inline">
                        <input type="text" name="ename" autocomplete="off" class="layui-input" placeholder="请输入员工姓名">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">工作</label>
                    <div class="layui-input-inline">
                        <input type="text" name="job" placeholder="请输入员工工作" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">部门</label>
                    <div class="layui-input-inline">
                        <select name="deptno" id="selDept"></select>
                    </div>
                </div>
                <div class="layui-inline">
                    <div class="layui-input-inline">
                        <button type="submit" class="layui-btn" lay-submit="" lay-filter="selEmp"><i class="layui-icon">&#xe615;</i>查询</button>
                    </div>
                </div>
            </div>
        </form>
        <!--表示表格容器，用来展示动态表格的数据-->
        <table id="demo" lay-filter="test"></table>
    </center>
    <%--引入添加员工jsp页面--%>
    <%--动态包含--%>
    <jsp:include page="saveEmp.jsp"/>
    <%--引入修改员工jsp页面--%>
    <jsp:include page="editEmp.jsp"/>
</body>
<script src="statics/layui/layui.js"></script>
<%--引入showEmp.js--%>
<script src="statics/js/showEmp.js"></script>
<%--  自定义工具条  --%>
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="edit"><i class="layui-icon">&#xe642;</i>编辑</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
</script>
</html>
