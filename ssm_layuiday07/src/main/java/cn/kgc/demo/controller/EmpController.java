package cn.kgc.demo.controller;

import cn.kgc.demo.pojo.Emp;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 针对Emp表数据请求的控制器
 */
@Controller
@RequestMapping("emp")
public class EmpController extends BaseController<Emp> {
    //可以写EmpController特有的控制器方法，不放在BaseController中
}
