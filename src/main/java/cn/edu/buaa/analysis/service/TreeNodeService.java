package cn.edu.buaa.analysis.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import cn.edu.buaa.util.JsonUtil;

@Service
public class TreeNodeService {
	
	private static Logger logger = LoggerFactory.getLogger(TreeNodeService.class);

	public String queryTreeNode(String tree_url, String parentId) {
		RestTemplate restTemplate = new RestTemplate();
		logger.info(tree_url);
		String treeJsonString = restTemplate.getForObject(tree_url, String.class);
		if(treeJsonString==null || treeJsonString.equals("")){
			System.out.println("接口"+tree_url+"获取数据错误");
		}
		JsonUtil jsonUtil = new JsonUtil();
		return jsonUtil.PareserJson(treeJsonString, parentId);
	}

}
