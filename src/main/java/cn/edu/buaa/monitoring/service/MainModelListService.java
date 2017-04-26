/**
 * @Title: MainModelListService.java 
 * @Package: com.test.springboot.service 
 * @Description: TODO
 * @date: 2017年1月5日
 * @author:  wangkui
 */
package cn.edu.buaa.monitoring.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import cn.edu.buaa.monitoring.bean.MainModel;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


/**
 * @ClassName: MainModelListService 
 * @Description: 
 * @author: Administrator
 * @date: 2017年1月5日
 */
@Service
public class MainModelListService {

	private static Logger logger = LoggerFactory.getLogger(MainModelListService.class);
	
	@Value("${queryAllMainModel_url}")
	private String queryAllMainModel_url;
	
	public List<MainModel> getAllMainModels(){
		Gson gson = new Gson();
		RestTemplate restTemplate = new RestTemplate();
		logger.info(queryAllMainModel_url);
		String allMainModels = restTemplate.getForObject(queryAllMainModel_url, String.class);
		
		List<MainModel> list = gson.fromJson(allMainModels,  
                new TypeToken<List<MainModel>>() {  
                }.getType());  
		return list;
	}
}
