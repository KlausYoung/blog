package cn.kgc.demo.dao;

import cn.kgc.demo.pojo.PetInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface PetInfoMapper {
    int deleteByPrimaryKey(Integer petid);

    int insert(PetInfo record);

    int insertSelective(PetInfo record);

    PetInfo selectByPrimaryKey(Integer petid);

    int updateByPrimaryKeySelective(PetInfo record);

    int updateByPrimaryKey(PetInfo record);

    //嵌套查询
    List<PetInfo> selAllPetAndBreed();

    List<PetInfo> selAllPetAndBreedParams(PetInfo petInfo);

    Integer delBatchPetAndBreedByParams(@Param("petIds") Integer[] petIds);
}