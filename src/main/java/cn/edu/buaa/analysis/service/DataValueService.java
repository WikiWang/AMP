package cn.edu.buaa.analysis.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DataValueService {

	private static Logger logger = LoggerFactory.getLogger(DataValueService.class);
	
	public String queryDataValue(String fileData_url) {
		RestTemplate restTemplate = new RestTemplate();
		logger.info(fileData_url);
		String dataJsonString = restTemplate.getForObject(fileData_url, String.class);
		return dataJsonString;
	}

}
