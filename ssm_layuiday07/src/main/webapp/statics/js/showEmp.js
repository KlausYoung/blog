layui.use(['table'],function(){
    var table = layui.table,
        $=layui.jquery,
        layer=layui.layer,
        form=layui.form,
        laydate = layui.laydate;

    //执行一个laydate实例
    $(".my_date").each(function () {
        laydate.render({
            elem: this //指定元素
            ,type: 'date'
            ,calendar: true
            ,format: 'yyyy-MM-dd HH:mm:ss' //可任意组合,此处是根据springmvc的定义日期转换配置一致
        });
    })

    var selJsonEmp={};//封装了全局变量。json格式的查询条件 {}:表示空的json对象

    //初始化部门数据
    loadAllDept();

    //初始化员工数据
    loadEmpAndDept();

    /*******工具条事件******/
    //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
    table.on('tool(test)', function(obj){
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        console.log("data:",data);

        if(layEvent === 'del'){ //删除
            layer.confirm('真的删除此信息吗？', function(index){
                //向服务端发送删除指令
                delEmpByEmpno(obj);
                //关闭窗口
                layer.close(index);
            });
        } else if(layEvent === 'edit'){ //编辑
            //1.给表单赋值 回显部门数据
            form.val("updEmpFormFilter", { //formTest 即 editEmp.jsp form标签 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "empno": data.empno // "empno"表单标签的name属性值:
                ,"ename": data.ename // "name": "value"
                ,"job": data.job
                ,"mgr": data.mgr
                ,"sal": data.sal
                ,"hiredate": data.hiredate
                ,"comm": data.comm
                ,"deptno": data.dept.deptno
            });

            //2.弹出修改界面
            layer.open({
                type:1,  //弹出类型
                title:"员工修改界面",  //弹框标题
                area:['480px','520px'],  //弹框款高度
                anim: 3,  //弹出的动画效果
                shade:0.5,  //阴影遮罩
                content:$("#updEmpDiv")  //弹出的内容
            });

            //3.修改功能的表单提交
            form.on('submit(editEmp)',function (data) {
                console.log(data.field);
                //执行修改
                editEmp(data.field);
                //关闭当前页弹窗
                layer.closeAll();
                //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                return false;
            });
        }
    });

    /**********************标签事件绑定************************/
    /*******绑定批量删除******/
    $("#batchEmpBtn").click(function () {
        //获取表格中的选中的行的员工数据编号 demo即为基础参数 id 对应的值
        var checkStatus= table.checkStatus('demo');
        console.log(checkStatus.data)//获取选中行的数据
        console.log(checkStatus.data.length)//获取选中行数量，可作为是否有选中行的条件
        //console.log(checkStatus.isAll ) //表格是否全选
        var arrEmp=checkStatus.data;
        //获取选中行数量，可作为是否有选中行的条件
        if(arrEmp.length == 0){
            return layer.msg("请选择需要删除的数据",{icon: 7,time:2000,anim: 6,shade:0.5});
        }
        //询问是否删除
        layer.confirm('确定删除所选的员工数据吗?', function(index){
            //定义员工编号的字符串
            var empnos=' ';
            //通过循环获取多个员工编号拼接在字符串中
            for (var i =0;i<arrEmp.length;i++){
                empnos +=arrEmp[i].empno+",";
            }
            empnos = empnos.substring(0,empnos.length-1);
            console.log(empnos);

            deleteBatchEmpByEmpnos(empnos);
            layer.close(index);//关闭当前弹窗
        })
    })

    /*******绑定添加按钮******/
    $("#saveEmpBtn").click(function (){
        //在弹出框之前，清空表单数据
        $("#saveEmpForm").find("input").val("");
        //点击添加按钮，弹出添加功能模态框
        layer.open({
            type:1,  //弹出类型
            title:"员工添加界面",  //弹框标题
            area:['480px','520px'],  //弹框高度
            anim: 4,  //弹出的动画效果
            shade:0.5,  //阴影遮罩
            content: $("#saveEmpDiv") //弹出的内容
        });
    })

    /*******查询条件的表单提交******/
    form.on('submit(selEmp)', function(data){
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        //就是查询条件
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        //把查询条件的值赋值给selJSONEmp
        selJsonEmp = data.field;
        //调用查询员工的函数
        loadEmpAndDept();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });



    /*******添加功能的表单提交******/
    form.on('submit(saveEmp)', function(data){
        //就是添加的数据
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        //调用员工的函数
        saveEmp(data.field);
        //关闭所有的弹出窗口
        layer.closeAll();
        //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        return false;
    });

    /*******表单验证******/
    form.verify({
        ename: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if(value === 'xxx'){
                alert('用户名不能为敏感词');
                return true;
            }
        },
        mgr: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(value > 9999 || value < 1001){
                return "上司编号只能在 1001 ~ 9999 之间！";
            }
        },
        sal: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(value > 30000 || value < 4500){
                return "工资只能在 4500 ~ 30000 之间！";
            }
        },
        comm: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(value > 5000 || value < 1500){
                return "奖金只能在 1500 ~ 5000 之间！";
            }
        },
        hiredate:function (value, item) {
            if (value == null && value == ' '){
                return "入职时间必填！";
            }
        },
        deptno:function (value, item) {
            if (value == null){
                return "入职部门必填！"
            }
        }
    });

    /*******封装了查询员工的函数 自定义的layui函数******/
    function loadEmpAndDept(){
        table.render({
            elem: '#demo'  //表示跟表格容器的id进行绑定
            ,height: 400 //表格容器的高度
            //  默认会自动传递两个参数：?page=1&limit=30  page 代表当前页码、limit 代表每页数据量
            ,url: '/emp/loadDataByParams' //数据接口, 用来访问到后端控制器中，获取数据返回 （JSON数据）
            ,page: true //开启分页
            ,limits: [5,10,15,20,100] //自定义分页条数
            ,limit: 10  //默认每页显示5条记录
            ,where:selJsonEmp
            ,even: true  //隔行变色效果
            ,cols: [[ //表头
                /*
                      表示当前一列数据：
                 field : 字段， 跟返回的JSON对象的属性的名字完全一致！！！
                 title : 表示标题
                 width ： 列的宽度
                 sort ： 是否支持排序 true支持
                 fixed: 'left'  ： 向左悬浮
                 * */
                /*开启复选框*/
                {type:'checkbox',fixed:'left'}
                ,{field: 'empno', title: '员工编号', width:130, sort: true}
                ,{field: 'ename', title: '员工名称', width:160}
                ,{field: 'job', title: '职业', width:130, sort: true}
                ,{field: 'mgr', title: '上司', width:130}
                ,{field: 'hiredate', title: '入职日期', width: 180,sort: true}
                ,{field: 'sal', title: '工资', width: 100}
                ,{field: 'comm', title: '奖金', width: 100}
                ,{field: 'dname', title: '部门名称', width: 160, templet: '<div>{{d.dept.dname}}</div>'}
                ,{field: 'loc', title: '部门地址', width: 160, templet: '<div>{{d.dept.loc}}</div>'}
                /*自定义工具条列*/
                ,{field: 'right', title:'操作',width: 160, toolbar: '#barDemo',width:180}
            ]]
            //res为分页时服务器端的整个Map
            ,done:function (res, curr, count) {
                //将当前页数据赋值给当前页
                currentPage =curr;
            }
        });
    }

    /*******根据员工编号删除员工数据******/
    function delEmpByEmpno(obj){
        //1.发送异步请求，删除数据
        $.post(
            "/emp/delById", //请求的url路径
            {"id":obj.data.empno}, //传递到后端的参数，格式JSON
            function (data){
                if(data === 'success'){
                    //2.成功 - 删除DOM，更新缓存
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    // icon: 弹出信息的图标类型（0-6）；
                    // time:2000弹出时间2s；
                    // anim: 4弹出方式（0-6）；
                    // shade:0.5背景颜色深浅（0-1）
                    layer.msg("删除成功！",{icon: 1,time:2000,anim: 1,shade:0.5});
                }else{
                    layer.msg("删除失败！",{icon: 2,time:2000,anim: 2,shade:0.5});
                }
            },"text" //text : 表示后端响应的是文本
        ).error(function (){
            lay.msg("数据请求异常！",{icon: 6,time:2000,anim: 3,shade:0.5});
        })
    }

    //添加全局变量值，指定当前页是第1页
    var currentPage=1;

    /*******批量删除数据******/
    function deleteBatchEmpByEmpnos(empnos) {
        $.post(
            "/emp/delBatchByIds",//请求的url路径
            {"ids":empnos}, //传递到后端的参数，格式JSON
            function (data){
                if(data === 'success'){
                    layer.msg("删除成功！",{icon: 1,time:2000,anim: 1,shade:0.5});
                    //重新加载员工数据
                    //loadEmpAndDept();
                    table.reload('demo',{//数据表格重载 demo为table表格容器id
                        page:{//重新从currentPage(当前页)开始
                            curr:currentPage
                        }
                    })
                }else{
                    layer.msg("删除失败！",{icon: 2,time:2000,anim: 2,shade:0.5});
                }
            },"text" //text : 表示后端响应的是文本
        ).error(function (){
            layer.msg("数据请求异常！",{icon: 6,time:2000,anim: 3,shade:0.5});
        })
    }

    /******添加员工*******/
    function saveEmp(saveJSONEmp){
        $.post(
            "/emp/saveT", //请求的url路径
            saveJSONEmp, //数据
            function (data){
                if(data === 'success'){
                    layer.msg("添加成功！",{icon: 1,time:2000,anim: 1,shade:0.5});
                    //重新加载员工数据
                    loadEmpAndDept();
                }else{
                    layer.msg("添加失败！",{icon: 2,time:2000,anim: 2,shade:0.5});
                }
            },"text" //text : 表示后端响应的是文本
        ).error(function (){
            layer.msg("数据请求异常！",{icon: 7,time:2000,anim: 3,shade:0.5});
        })
    }

    /******修改员工*******/
    function editEmp(updateJsonEmp) {
        $.post(
            '/emp/editT',
            updateJsonEmp,
            function (data) {
                console.log(data);
                if(data=="success"){
                    layer.msg("员工数据修改成功。。", {icon: 1,time:2000,anim: 4,shade:0.5})
                    //数据表格重载
                    table.reload('demo', {  //demo为table表格容器id
                    page: {
                        curr: currentPage //重新从第 currentPage(当前页) 页开始
                    }
                }); //只重载数据
                }else {
                    layer.msg("员工数据修改失败！！", {icon: 2,time:2000,anim: 3,shade:0.5})
                }
            },"text"
        ).error(function (){
            layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
        })
    }
    
    /******自定义函数：下拉框数据异步交互*******/
    function loadAllDept() {
        $.post(
            "/dept/loadAll",//请求的url路径
            function (data) {
                console.log("deptData:",data);
                //动态生成下拉框的option选项
                var optionStr = "<option value=''>===请选择===</option>";
                //遍历data
                //jquery的遍历
                //data : 表示数据
                //function (i,dept): 表示函数，i : 下标  dept: 表示每个数组对象
                $.each(data, function (i,dept){
                    optionStr += "<option value='"+dept.deptno+"'>" + dept.dname + "</option>";
                });
                //把生成好的选项加入到下拉框中 即 showEmp.jsp中部门项
                $("#selDept").html(optionStr);
                //把部门数据填充到添加页中 即 saveEmp.jsp中部门项
                $("#saveDept").html(optionStr);
                //把生成好的数据渲染到修改功能下拉框 即 editEmp.jsp中部门项
                $("#updDept").html(optionStr);
                //刷新select选择框渲染
                form.render('select');
            },"json"
        ).error(function () {
            layer.msg("数据请求异常！")
        })
    }
})

