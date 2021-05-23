import cn.kgc.demo.pojo.Dept;
import cn.kgc.demo.pojo.Emp;
import cn.kgc.demo.service.EmpService;
import cn.kgc.demo.service.PetInfoService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @ClassName TestDemo
 * @Description TODO
 */
//指定在单元测试启动的时候创建spring的工厂类对象
@ContextConfiguration(locations = {"classpath:spring-config.xml"})
//RunWith的value属性指定以spring test的SpringJUnit4ClassRunner作为启动类
//如果不指定启动类，默认启用的junit中的默认启动类
@RunWith(value = SpringJUnit4ClassRunner.class)
public class TestDemo {

    private PetInfoService p;
    private EmpService empService;

    @Autowired
    public void setP(PetInfoService p) {
        this.p = p;
    }
    @Autowired
    public void setEmpService(EmpService empService) {
        this.empService = empService;
    }

    @Test
    public void test01(){
        Map<String, Object> map = empService.findEmpAndDept(2,3);
        Long count  = (Long) map.get("count");
        List<Emp> empList = (List<Emp>) map.get("data");
        for (Emp emp : empList) {
            System.out.println(emp.getDeptno()+ ", "+emp.getEname());
            System.out.println("======================================");
            Dept dept = emp.getDept();
            System.out.println(dept);
        }
    }

    @Test
    public void test02(){
        Emp emp=new Emp();
        emp.setEname("A");
        emp.setJob("CLERK");
        Map<String, Object> map = empService.findEmpAndDept(2,3);
        Long count  = (Long) map.get("count");
        List<Emp> empList = (List<Emp>) map.get("data");
        for (Emp e : empList) {
            System.out.println(e.getDeptno()+ ", "+e.getEname());
            System.out.println("======================================");
            Dept dept = e.getDept();
            System.out.println(dept);
        }
    }

    @Test
    public void test03(){
        //Integer[] empnos = {7905};
        try {//执行批量删除
            String remBatchMsg = empService.removeBatchEmpByEmpnos(new Integer[]{7905});
            System.out.println("remBatchMsg = " + remBatchMsg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test04(){
        //新建添加员工数据
        Emp emp = new Emp();
        emp.setEname("小白");
        emp.setJob("java程序员");
        emp.setMgr(1009);
        emp.setSal(BigDecimal.valueOf(23000));
        emp.setHiredate(new Date());
        emp.setComm(BigDecimal.valueOf(3000));
        emp.setDeptno(10);
        try {//执行添加
            String saveEmpMsg = empService.saveEmp(emp);
            System.out.println("添加的结果为："+saveEmpMsg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test05(){
        //新建添加员工数据
        Emp emp = new Emp();
        emp.setEmpno(7908);
        emp.setJob("java程序员");
        emp.setMgr(1009);
        emp.setSal(BigDecimal.valueOf(23000));
        emp.setHiredate(new Date());
        emp.setComm(BigDecimal.valueOf(3000));
        emp.setDeptno(10);
        try {//执行添加
            String saveEmpMsg = empService.modifyEmp(emp);
            System.out.println("修改的结果为："+saveEmpMsg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test06(){
        Integer[] petIds = {};
        try {//执行批量删除
            String remBatchMsg = p.removePetAndBreedParams(petIds);
            System.out.println("remBatchMsg = " + remBatchMsg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
