package cn.kgc.demo.service.impl;

import cn.kgc.demo.dao.PetInfoMapper;
import cn.kgc.demo.pojo.PetInfo;
import cn.kgc.demo.service.PetInfoService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
@Transactional(readOnly = false)
public class PetInfoServiceImpl implements PetInfoService {
    @Autowired
    private PetInfoMapper petInfoMapper;
    @Override
    public Map<String, Object> findPetAndBreed(Integer page, Integer limit) {
        HashMap<String, Object> map = new HashMap<>();
        //1、开启分页查询
        PageHelper.startPage(page,limit);
        //2、查询数据 嵌套查询 - 懒加载
        List<PetInfo> list =petInfoMapper.selAllPetAndBreed();
        //3、封装数据
        PageInfo<PetInfo> pageInfo = new PageInfo<>(list);
        //注意：count的名称必须跟前端layui要求的返回格式完全一致
        map.put("count",pageInfo.getTotal());
        map.put("data",pageInfo.getList());
        return map;
    }

    @Override
    public Map<String, Object> findPetAndBreedParams(Integer page, Integer limit, PetInfo petInfo) {
        HashMap<String, Object> map = new HashMap<>();
        //1、开启分页查询
        PageHelper.startPage(page,limit);
        //2、查询数据 嵌套查询 - 懒加载
        List<PetInfo> list =petInfoMapper.selAllPetAndBreedParams(petInfo);
        //3、封装数据
        PageInfo<PetInfo> pageInfo = new PageInfo<>(list);
        //注意：count的名称必须跟前端layui要求的返回格式完全一致
        map.put("count",pageInfo.getTotal());
        map.put("data",pageInfo.getList());
        return map;
    }

    @Override
    public String removePetInfoAndBreedInfo(Integer petId) {
        if (petInfoMapper.deleteByPrimaryKey(petId)>0) {
            return "success";
        } else {
            return "fail";
        }
    }

    @Override
    public String removePetAndBreedParams(Integer[] petIds) {
        if (petInfoMapper.delBatchPetAndBreedByParams(petIds)>0) {
            return "success";
        } else {
            return "fail";
        }
    }

    @Override
    public String savePet(PetInfo petInfo) {
        if (petInfoMapper.insert(petInfo)>0) {
            return "success";
        } else {
            return "fail";
        }
    }

    @Override
    public String modifyPet(PetInfo petInfo) {
        if (petInfoMapper.updateByPrimaryKeySelective(petInfo)>0) {
            return "success";
        } else {
            return "fail";
        }
    }
}
