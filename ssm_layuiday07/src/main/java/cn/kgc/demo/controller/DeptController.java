package cn.kgc.demo.controller;

import cn.kgc.demo.pojo.Dept;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("dept")
public class DeptController extends BaseController<Dept>{

}
