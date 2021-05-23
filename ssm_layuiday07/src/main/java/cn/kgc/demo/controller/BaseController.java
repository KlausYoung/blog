package cn.kgc.demo.controller;

import cn.kgc.demo.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

public class BaseController<T> {
    @Autowired
    private BaseService<T> baseService;

    /**
     * 通过查询条件分页查询数据
     * @param page 当前页码
     * @param limit 每页条数
     * @param t 封装了查询条件
     * @return layui所需要的封装的数据
     */
    @RequestMapping("loadDataByParams")
    public @ResponseBody Map<String,Object> loadDataByParams(Integer page, Integer limit, T t){
        Map<String, Object> map = null;
        try {
            map = baseService.findAll(page, limit, t);
            map.put("code", 0); //设置状态码：0 表示请求返回成功
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code", 200); //设置状态码：200 表示请求返回失败
            map.put("msg","数据访问失败！");
        }
        return map;
    }

    @RequestMapping("delById")
    public @ResponseBody String delById(Integer id){
        try {
            return baseService.removeByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    @RequestMapping("delBatchByIds")
    public String delBatchByIds(Integer[] ids){
        try {
            return baseService.removeBatchByIds(ids);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    @RequestMapping("saveT")
    public @ResponseBody String saveT(T t){
        try {
            return baseService.save(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    @RequestMapping("editT")
    public @ResponseBody String editT(T t){
        try {
            return baseService.modify(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    @RequestMapping("loadAll")
    public @ResponseBody List<T> loadAll(){
        try {
            return baseService.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
