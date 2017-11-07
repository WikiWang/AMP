package cn.edu.buaa.analysis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import cn.edu.buaa.analysis.service.DataValueService;
import cn.edu.buaa.analysis.service.TreeNodeParamService;
import cn.edu.buaa.analysis.service.TreeNodeService;

@RestController
public class AnalysisRestController {

	@Autowired  
    private Environment env;  
	
	@Autowired
	private TreeNodeService treeNodeService;
	
	@Autowired
	private TreeNodeParamService treeNodeParamService;
	
	@Autowired
	private DataValueService dataValueService;
	
	@RequestMapping(value="/Analysis/TreeNode")
	public String queryTreeNode(@RequestParam(value="id") String id, 
			@RequestParam(value="type") String type, 
			@RequestParam(value="parentId", defaultValue="") String parentId){

		String tree_url;
		tree_url = env.getProperty(type+"_tree_url") + "?" + type + "Id=" + id + "&pid=" + parentId;
		return treeNodeService.queryTreeNode(tree_url, parentId);
	}
	
	@RequestMapping(value="/Analysis/TreeNodeParam")
	public String queryTreeNodeParam(@RequestParam(value="id") String id, 
			@RequestParam(value="type") String type, 
			@RequestParam(value="parentId", defaultValue="") String parentId){

		String fileData_url;
		if(parentId.equals("")){
			fileData_url = env.getProperty(type+"_fileData_url") + "?" + type + "Id=" + id + "&pid=";
		}else{
			fileData_url = env.getProperty(type+"_fileData_url") + "?" + type + "Id=" + id + "&pid=" + parentId;
		}
		return treeNodeParamService.queryTreeNodeParam(fileData_url);
	}
	
	@RequestMapping(value="/Analysis/DataValue", method = RequestMethod.GET)
	public String queryDataValue(@RequestParam(value="id") String id, 
			@RequestParam(value="type") String type, 
			@RequestParam(value="parentId", defaultValue="") String parentId,
			@RequestParam(value="version") String version){

		String fileData_url;
		if(version != null && !version.equals("")){
			version = version.substring(0, version.length()-1);
		}
		if(parentId.equals("")){
			fileData_url = env.getProperty(type+"_fileDataValue_url") + "?" + type + "Id=" + id + "&version=" + version + "&pid=";
		}else{
			fileData_url = env.getProperty(type+"_fileDataValue_url") + "?" + type + "Id=" + id + "&version=" + version + "&pid=" + parentId;
		}
		return dataValueService.queryDataValue(fileData_url);
	}
	
	@RequestMapping(value="/2DAnalysis/TreeNodeParam")
	public String query2dTreeNodeParam(@RequestParam(value="id") String id, 
			@RequestParam(value="type") String type, 
			@RequestParam(value="parentId", defaultValue="") String parentId,
			@RequestParam(value="versions") String versions,
			@RequestParam(value="version", defaultValue="") String version){

		String fileData_url;
		if(parentId.equals("")){
			fileData_url = env.getProperty(type+"_DataCompare_fileData_url") + "?" + type + "Id=" + id + "&pid=";
			return treeNodeParamService.queryTreeNodeRootParam(fileData_url, versions);
		}else{
			fileData_url = env.getProperty(type+"_DataCompare_fileData_url") + "?" + type + "Id=" + id + "&pid=" + parentId + "&version=" + version;
		}
		return treeNodeParamService.queryTreeNodeParam(fileData_url);
	}
	
	@RequestMapping(value="/2DAnalysis/DataValue", method = RequestMethod.GET)
	public String query2DDataValue(@RequestParam(value="id") String id, 
			@RequestParam(value="type") String type, 
			@RequestParam(value="parentId", defaultValue="") String parentId,
			@RequestParam(value="version") String version){

		String fileData_url;
//		if(version != null && !version.equals("")){
//			version = version.substring(0, version.length()-1);
//		}
		if(parentId.equals("")){
			fileData_url = env.getProperty(type+"_DataCompare_fileDataValue_url") + "?" + type + "Id=" + id + "&version=" + version + "&pid=";
		}else{
			fileData_url = env.getProperty(type+"_DataCompare_fileDataValue_url") + "?" + type + "Id=" + id + "&version=" + version + "&pid=" + parentId;
		}
		return dataValueService.queryDataValue(fileData_url);
	}
	
	@RequestMapping(value="/compareAnalysis/DataValue", method = RequestMethod.GET)
	public String queryCompareAnalysisDataValue(@RequestParam(value="mainModelId") String mainModelId, 
			@RequestParam(value="type") String type, 
			@RequestParam(value="packageId") String packageId,
			@RequestParam(value="vid") String vid,
			@RequestParam(value="user") String user,
			@RequestParam(value="version") String version){
		String fileData_url;
		if("0".equals(type)){
			fileData_url = env.getProperty("mainModel__analysis_fileData_url") + "?" + "mainModelId=" + mainModelId + "&vid=" + vid + "&user=" + user + "&version=" + version;
		}else{
			fileData_url = env.getProperty("package__analysis_fileData_url") + "?" + "mainModelId=" + mainModelId + "&packageId=" + packageId + "&vid=" + vid + "&user=" + user + "&version=" + version;
		}
		return dataValueService.queryDataValue(fileData_url);
	}
}
