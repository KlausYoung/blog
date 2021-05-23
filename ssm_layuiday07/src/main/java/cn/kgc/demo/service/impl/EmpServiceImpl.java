package cn.kgc.demo.service.impl;

import cn.kgc.demo.pojo.Emp;
import cn.kgc.demo.service.EmpService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = false)
public class EmpServiceImpl extends BaseServiceImpl<Emp>  implements EmpService {

}
