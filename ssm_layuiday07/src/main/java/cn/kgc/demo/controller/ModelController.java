package cn.kgc.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 视图跳转的控制器
 */
@Controller
@RequestMapping("model")
public class ModelController {
    @RequestMapping("showEmpUI")
    public String showEmpUI(){
        return "showEmp";
    }
    @RequestMapping("showPetUI")
    public String showPetUI(){
        return "showPet";
    }
}
