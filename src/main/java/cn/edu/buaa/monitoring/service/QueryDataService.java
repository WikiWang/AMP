/**
 * @Title: QueryDataService.java 
 * @Package: com.test.springboot.service 
 * @Description: TODO
 * @date: 2017年1月7日
 * @author:  wangkui
 */
package cn.edu.buaa.monitoring.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * @ClassName: QueryDataService 
 * @Description: 
 * @author: Administrator
 * @date: 2017年1月7日
 */
@Service
public class QueryDataService {
	
	private static Logger logger = LoggerFactory.getLogger(QueryDataService.class);

	@Value("${queryData_url}")
	private String queryData_url_pre;
	
	@Value("${queryDataById_url}")
	private String queryDataById_url_pre;

	public String queryData(String id, String timeType, String timeRange){
		String queryData_url;
		queryData_url = queryData_url_pre + "?" + "id=" + id + "&timeType=" + timeType + "&timeRange=" + timeRange;
		RestTemplate restTemplate = new RestTemplate();
		logger.info(queryData_url);
		String dataJsonString = restTemplate.getForObject(queryData_url, String.class);
		return dataJsonString;
	}
	
	public String queryData(String id){
		String queryData_url;
		queryData_url = queryDataById_url_pre + "?" + "id=" + id;
		RestTemplate restTemplate = new RestTemplate();
		logger.info(queryData_url);
		String dataJsonString = restTemplate.getForObject(queryData_url, String.class);
		return dataJsonString;
	}
}
