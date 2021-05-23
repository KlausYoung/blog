package cn.kgc.demo.controller;

import cn.kgc.demo.pojo.BreedInfo;
import cn.kgc.demo.pojo.PetInfo;
import cn.kgc.demo.service.BreedInfoService;
import cn.kgc.demo.service.PetInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * 针对PetInfo表数据请求的控制器
 */
@RestController
@RequestMapping("pet")
public class PetController {
    private PetInfoService petInfoService;
    private BreedInfoService breedInfoService;

    @Autowired
    public void setPetInfoService(PetInfoService petInfoService) {
        this.petInfoService = petInfoService;
    }

    @Autowired
    public void setBreedInfoService(BreedInfoService breedInfoService) {
        this.breedInfoService = breedInfoService;
    }

    @RequestMapping("/loadAllBreed")
    public List<BreedInfo> loadAllBreed(){
        try {
            return breedInfoService.findAllBreed();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("/loadData")
    public Map<String ,Object> loadData(Integer page,Integer limit){
        System.out.println("page = " + page);
        System.out.println("limit = " + limit);
        Map<String,Object> map=null;
        try {
            map = petInfoService.findPetAndBreed(page, limit);
            map.put("code", 0); //设置状态码：0 表示请求返回成功
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code", 200); //设置状态码：200 表示请求返回失败
            map.put("msg","数据访问失败！");
        }
        return map;
    }

    @RequestMapping("/loadDataParams")
    //@ResponseBody  //只返回数据JSON格式
    public Map<String,Object> loadDataParams(Integer page, Integer limit, PetInfo petInfo){
        System.out.println("page = " + page);
        System.out.println("limit = " + limit);
        Map<String,Object> map=null;
        try {
            map = petInfoService.findPetAndBreedParams(page, limit, petInfo);
            map.put("code", 0); //设置状态码：0 表示请求返回成功
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code", 200); //设置状态码：200 表示请求返回失败
            map.put("msg","数据访问失败！");
        }
        return map;
    }

    //根据员工编号删除员工数据
    @RequestMapping("/delPetByPetId")
    public String delPetByPetId(Integer petId){
        try{
            return petInfoService.removePetInfoAndBreedInfo(petId);
        }catch (Exception e){
            e.printStackTrace();
            return "error";
        }
    }

    @RequestMapping("/delPetByParams")
    public String delPetByParams(Integer[] petIds){
        try {
            return petInfoService.removePetAndBreedParams(petIds);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    @RequestMapping("/savePet")
    public String savePet(PetInfo petInfo){
        try {
            return petInfoService.savePet(petInfo);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    @RequestMapping("/editPet")
    public String editPet(PetInfo petInfo){
        try {
            return petInfoService.modifyPet(petInfo);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
}
