package cn.edu.buaa.analysis.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import cn.edu.buaa.util.JsonUtil;

@Service
public class TreeNodeParamService {
	
	private static Logger logger = LoggerFactory.getLogger(TreeNodeParamService.class);

	public String queryTreeNodeParam(String fileData_url) {
		RestTemplate restTemplate = new RestTemplate();
		logger.info(fileData_url);
		String treeJsonString = restTemplate.getForObject(fileData_url, String.class);
		JsonUtil jsonUtil = new JsonUtil();
		return jsonUtil.PareserJson(treeJsonString);
	}

	public String queryTreeNodeRootParam(String fileData_url, String versions) {
		String[] versionArray = versions.split(",");
		String version_fileData_url = null;
		RestTemplate restTemplate = new RestTemplate();
		JsonArray jsonArray = new JsonArray();
		for(String version : versionArray){
			version_fileData_url = fileData_url + "&version=" +version;
			logger.info(version_fileData_url);
			String treeJsonString = restTemplate.getForObject(version_fileData_url, String.class);
			JsonArray nodes = new JsonParser().parse(treeJsonString).getAsJsonArray();
			int size = nodes.size();
			for(int i=0; i<size; i++){
				jsonArray.add((JsonObject) nodes.get(i));
			}
		}
		JsonUtil jsonUtil = new JsonUtil();
		return jsonUtil.PareserJson(jsonArray.toString());
	}

}
