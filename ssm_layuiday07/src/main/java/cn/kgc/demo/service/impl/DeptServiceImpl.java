package cn.kgc.demo.service.impl;

import cn.kgc.demo.dao.DeptMapper;
import cn.kgc.demo.pojo.Dept;
import cn.kgc.demo.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
//事务处理，readOnly = false：关闭只读
@Transactional(readOnly = false)
public class DeptServiceImpl extends BaseServiceImpl<Dept> implements DeptService{
    //定义DeptService独有的特殊的方法，不放在BaseService里面
}
