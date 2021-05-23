<%--
  Created by IntelliJ IDEA.
  User: Klaus
  Date: 2021/4/28
  Time: 19:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>初始化页面</title>
</head>
<body>
<%--重定向 - 跳转到查询帖子列表的控制器--%>
<%--get请求--%>
<%--    <c:redirect url="/model/showEmpUI"/>--%>
<h2>首页</h2>
<div>
    <a href="${pageContext.request.contextPath}/model/showEmpUI" title="转换员工部门数据的分页查询,点点看"  style="cursor: pointer">员工部门数据的分页查询</a>
</div>
<div>
    <a href="${pageContext.request.contextPath}/model/showPetUI" title="转换宠物宠物类型数据的分页查询,点点看"  style="cursor: pointer">宠物宠物类型数据的分页查询</a>
</div>
</body>
</html>
