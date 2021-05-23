package cn.kgc.demo.dao;

import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BaseMapper<T> {
    int deleteByPrimaryKey(Integer id);

    int insert(T record);

    int insertSelective(T record);

    T selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(T record);

    int updateByPrimaryKey(T record);

    //嵌套查询 - 查询员工和部门数据
    List<T> selAll();

    List<T> selectPageByPrams(T record);

    Integer deleteBatchByIds(@Param("ids") Integer[] ids);
}
