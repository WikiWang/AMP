/**
 * @Title: PanelRepository.java 
 * @Package: com.test.springboot.repo 
 * @Description: TODO
 * @date: 2017年2月12日
 * @author:  wangkui
 */
package cn.edu.buaa.panel.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import cn.edu.buaa.panel.bean.Panel;

/**
 * @ClassName: PanelRepository 
 * @Description: 
 * @author: Administrator
 * @date: 2017年2月12日
 */
public interface PanelRepository extends MongoRepository<Panel, String>{

	Panel findById(String id);

	List<Panel> findByUserId(String userId);
	


}
