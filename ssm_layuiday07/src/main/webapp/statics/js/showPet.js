layui.use(['table'],function(){
    var table = layui.table,
        $=layui.jquery,
        layer=layui.layer,
        form=layui.form,
        laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#birthday' //指定元素
        ,type: 'date'
        ,calendar: true
        ,format: 'yyyy-MM-dd HH:mm:ss' //可任意组合,此处是根据springmvc的定义日期转换配置一致
    });

    var selJsonPet={};//封装了全局变量。json格式的查询条件 {}:表示空的json对象

    loadBreedInfo();

    loadPetInfo();

    //工具条事件
    //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
    table.on('tool(showPet)', function(obj){
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        console.log("data:",data);

        if(layEvent === 'del'){ //删除
            layer.confirm('真的删除此信息吗？', function(index){
                //向服务端发送删除指令
                delPetByPetId(obj);
                //关闭窗口
                layer.close(index);
            });
        } else if(layEvent === 'edit'){ //编辑
            //1.给表单赋值 回显部门数据
            form.val("updPetFormFilter", { //formTest 即 editPet.jsp form标签 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "petid": data.petid // "petid"表单标签的name属性值:
                ,"petname": data.petname // "name": "value"
                ,"petsex": data.petsex
                ,"birthday": data.birthday
                ,"description": data.description
                ,"breedid": data.breedInfo.breedid
            });

            //2.弹出修改界面
            layer.open({
                type:1,  //弹出类型
                title:"宠物信息修改界面",  //弹框标题
                area:['480px','520px'],  //弹框款高度
                anim: 3,  //弹出的动画效果
                shade:0.5,  //阴影遮罩
                content:$("#updPetDiv")  //弹出的内容
            });
        }
    });

    /****点击触发事件***/
    //批量删除执行
    $("#batchPetBtn").click(function () {
        //获取表格中的选中的行的宠物数据编号 showPetInfo即为基础参数 id 对应的值
        var checkStatus= table.checkStatus('showPetInfo');
        console.log(checkStatus.data)//获取选中行的数据
        console.log(checkStatus.data.length)//获取选中行数量，可作为是否有选中行的条件
        //console.log(checkStatus.isAll ) //表格是否全选
        var arrPet=checkStatus.data;
        if(arrPet.length == 0){
            return layer.msg("请选择需要删除的宠物数据",{icon: 7,time:2000,anim: 6,shade:0.5});
        }
        layer.confirm("确定删除所选的宠物数据吗?",function (index) {
            var petIds=' ';
            //通过循环获取多个员工编号拼接在字符串中
            for (var i =0;i<arrPet.length;i++){
                petIds +=arrPet[i].petid+",";
            }
            petIds = petIds.substring(0,petIds.length-1);
            console.log(petIds);

            deleteBatchPetByPetIds(petIds);
            layer.close(index);//关闭当前弹窗
        })

    });
    //执行添加的信息弹窗
    $("#savePetBtn").click(function () {
        //在弹出框之前，清空表单数据
        $("#savePetForm").find("input").val("");
        //点击添加按钮，弹出添加功能模态框
        layer.open({
            type:1,  //弹出类型
            title:"宠物信息添加界面",  //弹框标题
            area:['480px','520px'],  //弹框高度
            anim: 4,  //弹出的动画效果
            shade:0.5,  //阴影遮罩
            content: $("#savePetDiv") //弹出的内容
        });
    });

    /****定义的方法***/
    //加载宠物信息
    function loadPetInfo(){
        table.render({
            elem: '#showPetInfo'  //表示跟表格容器的id进行绑定
            ,height: 400 //表格容器的高度
            //  默认会自动传递两个参数：?page=1&limit=30  page 代表当前页码、limit 代表每页数据量
            ,url: '/pet/loadDataParams' //数据接口, 用来访问到后端控制器中，获取数据返回 （JSON数据）
            ,page: true //开启分页
            ,limits: [5,10,15,20,100] //自定义分页条数
            ,limit: 5  //默认每页显示5条记录
            ,where:selJsonPet
            ,even: true  //隔行变色效果
            ,cols: [[ //表头
                {type:'checkbox',fixed:'left'}
                ,{field: 'petid', title: '宠物编号', width:130, sort: true}
                ,{field: 'petname', title: '宠物名称', width:160}
                ,{field: 'breedid', title: '宠物种类', width: 100, templet: '<div>{{d.breedInfo.breedname}}</div>'}
                ,{field: 'petsex', title: '宠物性别', width:100,templet: function(d){if(d.petsex == 1){return '雄'}else{return '雌'}}}
                ,{field: 'birthday', title: '宠物生日', width:180,sort: true}
                ,{field: 'description', title: '宠物描述', width: 300}
                /*自定义工具条列*/
                ,{field: 'right', title:'操作',width: 160, toolbar:'#barDemo',width:180}
            ]]
            //res为分页时服务器端的整个Map
            ,done:function (res, curr, count) {
                //将当前页数据赋值给当前页
                currentPage =curr;
            }
        });
    };

    //根据员工编号删除员工数据
    function delPetByPetId(obj){
        //1.发送异步请求，删除数据
        $.post(
            "/pet/delPetByPetId", //请求的url路径
            {"petId":obj.data.petid}, //传递到后端的参数，格式JSON
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
            layer.msg("数据请求异常！",{icon: 6,time:2000,anim: 3,shade:0.5});
        })
    };

    var currentPage=1;

    //批量删除数据的方法
    function deleteBatchPetByPetIds(petIds) {
        $.post(
            "/pet/delPetByParams",//请求的url路径
            {"petIds":petIds}, //传递到后端的参数，格式JSON
            function (data){
                if(data === 'success'){
                    layer.msg("删除成功！",{icon: 1,time:2000,anim: 1,shade:0.5});
                    //重新加载员工数据
                    //loadEmpAndDept();
                    table.reload('showPetInfo',{//数据表格重载 demo为table表格容器id
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
    };
    //添加宠物信息
    function savePet(saveJsonPet){
        $.post(
            "/pet/savePet", //请求的url路径
            saveJsonPet, //数据
            function (data){
                if(data === 'success'){
                    layer.msg("宠物数据添加成功！",{icon: 1,time:2000,anim: 1,shade:0.5});
                    //重新加载员工数据
                    loadPetInfo();
                }else{
                    layer.msg("宠物数据添加失败！",{icon: 2,time:2000,anim: 2,shade:0.5});
                }
            },"text" //text : 表示后端响应的是文本
        ).error(function (){
            layer.msg("数据请求异常！",{icon: 7,time:2000,anim: 3,shade:0.5});
        })
    };
    //修改宠物信息
    function editPet(updateJsonPet) {
        $.post(
            '/pet/editPet',
            updateJsonPet,
            function (data) {
                console.log(data);
                if(data=="success"){
                    layer.msg("宠物数据修改成功。。", {icon: 1,time:2000,anim: 4,shade:0.5})
                    //数据表格重载
                    table.reload('showPetInfo', {  //showPetInfo为table表格容器id
                        page: {
                            curr: currentPage //重新从第 currentPage(当前页) 页开始
                        }
                    }); //只重载数据
                }else {
                    layer.msg("宠物数据修改失败！！", {icon: 2,time:2000,anim: 3,shade:0.5})
                }
            },"text"
        ).error(function (){
            layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
        })
    };
    //加载宠物种类信息
    function loadBreedInfo() {
        $.post(
            "/pet/loadAllBreed",//请求的url路径
            function (data) {
                console.log("BreedData:",data);
                //动态生成下拉框的option选项
                var optionStr = "<option value=''>===请选择===</option>";
                //遍历data
                //jquery的遍历
                //data : 表示数据
                //function (i,dept): 表示函数，i : 下标  dept: 表示每个数组对象
                $.each(data, function (i,breedInfo){
                    optionStr += "<option value='"+breedInfo.breedid+"'>" + breedInfo.breedname + "</option>";
                });
                //把生成好的选项加入到下拉框中 即 showPet.jsp中宠儿种类
                $("#selBreed").html(optionStr);
                //把部门数据填充到添加页中 即 savePet.jsp中宠儿种类
                $("#saveBreed").html(optionStr);
                //把生成好的数据渲染到修改功能下拉框 即 editPet.jsp中宠儿种类
                $("#updBreed").html(optionStr);
                //刷新select选择框渲染
                form.render('select');
            },"json"
        ).error(function () {
            layer.msg("数据请求异常！")
        })
    };

    /****表单提交***/
    //查询条件的表单提交
    form.on('submit(selPetInfo)', function(data){
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        //就是查询条件
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        //把查询条件的值赋值给selJSONEmp
        selJsonPet = data.field;
        //调用查询员工的函数
        loadPetInfo();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    //修改数据的表单提交
    form.on('submit(editPetInfo)',function (data) {
        console.log(data.field);
        editPet(data.field);
        //关闭当前页弹窗
        layer.closeAll();
        return false;
    });
    //添加数据的表单提交
    form.on('submit(addPetInfo)',function (data) {
        console.log(data.field);
        savePet(data.field);
        //关闭当前页弹窗
        layer.closeAll();
        return false;
    });
    //表单验证
    form.verify({
        petname:function (value, item) {
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '宠物名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '宠物名首尾不能出现下划线\'_\'';
            }
            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if(value === 'xxx'){
                alert('宠物名不能为敏感词');
                return true;
            }
        },
        breedid:function (value, item) {
            if (value == null && value == ' '){
                return "宠物种类必填！";
            }
        },
        birthday:function (value, item) {
            if (value == null && value == ' '){
                return "宠物日期必填！";
            }
        },
        description:function (value, item) {
            if (value == null && value == ' '){
                return "对宠物的描述必填！";
            }
        }
    });

})