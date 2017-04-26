/**
 * @Title: ChartRepository.java 
 * @Package: com.test.springboot.repo 
 * @Description: TODO
 * @date: 2017年1月7日
 * @author:  wangkui
 */
package cn.edu.buaa.panel.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import cn.edu.buaa.panel.bean.Chart;

/**
 * @ClassName: ChartRepository 
 * @Description: 
 * @author: Administrator
 * @date: 2017年1月7日
 */
public interface ChartRepository extends MongoRepository<Chart, String>{

}
