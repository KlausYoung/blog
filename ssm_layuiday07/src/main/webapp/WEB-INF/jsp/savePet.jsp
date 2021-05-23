<%--
  Created by IntelliJ IDEA.
  User: Klaus
  Date: 2021/5/1
  Time: 17:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<div id="savePetDiv" style="display: none;margin-top: 20px;">
    <form class="layui-form" action="" id="savePetForm">
        <div class="layui-form-item">
            <label class="layui-form-label">宠物姓名</label>
            <div class="layui-input-inline">
                <input type="text" name="petname" lay-verify="required|petname" placeholder="请输入宠物姓名" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">宠物种类</label>
            <div class="layui-input-inline">
                <select name="breedid" id="saveBreed" lay-verify="required|breedid"></select>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">宠物性别</label>
            <div class="layui-input-block">
                <input type="radio" name="petsex"  value="1" title="雄" checked>
                <input type="radio" name="petsex" value="2" title="雌" >
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">宠物生日</label>
            <div class="layui-input-inline">
                <input type="text" name="birthday" id="birthday" lay-verify="required|birthday" placeholder="请输入宠物生日日期" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">宠物的描述</label>
            <div class="layui-input-inline">
                <input type="text" name="description" lay-verify="required|description" placeholder="请输入对宠物的描述" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit lay-filter="addPetInfo">添加</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
    </form>

</div>
</body>
</html>
