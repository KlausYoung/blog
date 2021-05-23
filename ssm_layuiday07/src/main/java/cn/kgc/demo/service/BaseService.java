package cn.kgc.demo.service;

import java.util.List;
import java.util.Map;

/**
 *   基础公共的业务层接口
 * @param <T>  描述具体封装类型的泛型
 */
public interface BaseService<T> {
    /**
     * 带条件分页查询数据
     * @param page 当前页
     * @param limit 每一页的数据条数
     * @param t 查询条件
     * @return 分页插件的对象数据
     */
    Map<String,Object> findAll(Integer page, Integer limit, T t);

    /**
     * 查询所有数据
     * @return
     */
    List<T> findAll();

    /**
     * 根据员工编号删除单个员工数据
     */
    String removeByPrimaryKey(Integer id);

    /** 根据多个员工编号批量删除员工数据
     * @param ids 多个员工编号的数组
     * @return 操作的数据条数
     */
    String removeBatchByIds(Integer[] ids);

    /**
     * 添加数据
     * @param t 要添加的数据
     * @return
     */
    String save(T t);

    /**
     * 动态修改数据
     * @param t 要修改的的员工数据对象
     * @return 修改的操作结果
     */
    String modify(T t);

}
