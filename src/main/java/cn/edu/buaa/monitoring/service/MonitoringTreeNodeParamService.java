/**
 * @Title: TreeNodeParamService.java 
 * @Package: com.test.springboot.service 
 * @Description: TODO
 * @date: 2016年12月11日
 * @author:  wangkui
 */
package cn.edu.buaa.monitoring.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import cn.edu.buaa.util.JsonUtil;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * @ClassName: TreeNodeParamService 
 * @Description: 
 * @author: Administrator
 * @date: 2016年12月11日
 */
@Service
public class MonitoringTreeNodeParamService {
	
	private static Logger logger = LoggerFactory.getLogger(MonitoringTreeNodeParamService.class);
	@Value("${fileData_url}")
	private String tree_url;
//	private String tree_url = "http://202.112.140.210:8380/mdc/web/fileDataByMainModel";

	public String getTreeNode(String type, String id, String parentId){
		String fileData_url;
		if(parentId == null){
			fileData_url = tree_url + "?" + type + "Id=" + id + "&pid=";
		}else{
			fileData_url = tree_url + "?" + type + "Id=" + id + "&pid=" + parentId;
		}
		RestTemplate restTemplate = new RestTemplate();
		logger.info(fileData_url);
		String treeJsonString = restTemplate.getForObject(fileData_url, String.class);
		JsonUtil jsonUtil = new JsonUtil();
		return jsonUtil.PareserJson(treeJsonString);
	}
	
}
