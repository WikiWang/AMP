package cn.edu.buaa.analysis.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

}
