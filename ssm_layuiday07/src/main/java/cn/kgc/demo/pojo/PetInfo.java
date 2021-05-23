package cn.kgc.demo.pojo;

import lombok.Data;

import java.util.Date;
@Data
public class PetInfo {
    private Integer petid;

    private String petname;

    private Integer breedid;

    private Integer petsex;

    private Date birthday;

    private String description;

    private BreedInfo breedInfo;

}