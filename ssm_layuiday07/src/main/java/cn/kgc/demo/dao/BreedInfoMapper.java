package cn.kgc.demo.dao;

import cn.kgc.demo.pojo.BreedInfo;

import java.util.List;

public interface BreedInfoMapper {
    int deleteByPrimaryKey(Integer breedid);

    int insert(BreedInfo record);

    int insertSelective(BreedInfo record);

    BreedInfo selectByPrimaryKey(Integer breedid);

    int updateByPrimaryKeySelective(BreedInfo record);

    int updateByPrimaryKey(BreedInfo record);

    List<BreedInfo> selectAllBreed();
}