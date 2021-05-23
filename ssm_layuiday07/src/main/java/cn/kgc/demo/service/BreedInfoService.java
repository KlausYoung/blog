package cn.kgc.demo.service;

import cn.kgc.demo.pojo.BreedInfo;

import java.util.List;

public interface BreedInfoService {
    /**
     * 查询所有种类数据
     * @return
     */
    List<BreedInfo> findAllBreed();
}
