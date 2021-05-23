package cn.kgc.demo.service;

import cn.kgc.demo.pojo.PetInfo;

import java.util.Map;

public interface PetInfoService {
    Map<String,Object> findPetAndBreed(Integer page, Integer limit);

    Map<String,Object> findPetAndBreedParams(Integer page, Integer limit, PetInfo petInfo);

    String removePetInfoAndBreedInfo(Integer petId);

    String removePetAndBreedParams(Integer[] petIds);

    String savePet(PetInfo petInfo);

    String modifyPet(PetInfo petInfo);
}
