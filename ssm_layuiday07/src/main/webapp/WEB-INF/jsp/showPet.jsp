<%--
  Created by IntelliJ IDEA.
  User: Klaus
  Date: 2021/4/29
  Time: 9:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>宠物数据分页显示页面</title>
    <link rel="stylesheet" href="/statics/layui/css/layui.css">
</head>
<body>
<center>
    <h1>宠物数据分页显示页面</h1>
    <br><br>
    <%--表单查询条件--%>
    <form class="layui-form" action="" style="margin-top: 20px;margin-bottom: -20px;">
        <div class="layui-form-item">
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button type="button" class="layui-btn layui-btn-radius layui-btn-normal" id="savePetBtn">
                        <i class="layui-icon">&#xe654;</i>添加</button>
                </div>
            </div>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button type="button" class="layui-btn layui-btn-radius layui-btn- danger" id="batchPetBtn">
                        <i class="layui-icon">&#xe640;</i>批量删除
                    </button>
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">宠物姓名</label>
                <div class="layui-input-inline">
                    <input type="text" name="petname" autocomplete="off" class="layui-input" placeholder="请输入宠物姓名">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">种类</label>
                <div class="layui-input-inline">
                    <select name="breedid" id="selBreed" ></select>
                </div>
            </div>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button type="submit" class="layui-btn" lay-submit="" lay-filter="selPetInfo"><i class="layui-icon">&#xe615;</i>查询</button>
                </div>
            </div>
        </div>
    </form>
    <!--表示表格容器，用来展示动态表格的数据-->
    <table id="showPetInfo" lay-filter="showPet"></table>
    </center>
<%--引入添加员工jsp页面--%>
<%--动态包含--%>
<jsp:include page="savePet.jsp"/>
<%--引入修改员工jsp页面--%>
<jsp:include page="editPet.jsp"/>
</body>
<script src="/statics/layui/layui.js"></script>
<script src="/statics/js/showPet.js"></script>
<%--  自定义工具条  --%>
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="edit"><i class="layui-icon">&#xe642;</i>编辑</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
</script>
</html>
