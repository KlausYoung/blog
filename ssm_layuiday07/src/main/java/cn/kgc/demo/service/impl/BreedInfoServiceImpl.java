package cn.kgc.demo.service.impl;

import cn.kgc.demo.dao.BreedInfoMapper;
import cn.kgc.demo.pojo.BreedInfo;
import cn.kgc.demo.service.BreedInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
//事务处理，readOnly = false：关闭只读
@Transactional(readOnly = false)
public class BreedInfoServiceImpl implements BreedInfoService {
    @Autowired
    private BreedInfoMapper breedInfoMapper;
    @Override
    public List<BreedInfo> findAllBreed() {
        return breedInfoMapper.selectAllBreed();
    }
}
