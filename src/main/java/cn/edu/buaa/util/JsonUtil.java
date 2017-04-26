/**
 * @Title: JsonUtil.java 
 * @Package: com.test.springboot.util 
 * @Description: TODO
 * @date: 2017年1月15日
 * @author:  wangkui
 */
package cn.edu.buaa.util;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

/**
 * @ClassName: JsonUtil 
 * @Description: 
 * @author: Administrator
 * @date: 2017年1月15日
 */
public class JsonUtil {
	
	/**格式化json数据为tree所需结构,数据分析左侧树结构**/
	public String PareserJson(String treeJsonString, String parentId){
		JsonObject node;
		JsonArray nodes = new JsonParser().parse(treeJsonString).getAsJsonArray();
		int size = nodes.size();
		for(int i=0; i<size; i++){
			node = (JsonObject) nodes.get(i);
			node.addProperty("parentId", parentId);
			node.addProperty("isParent", false);
		}
		return nodes.toString();
	}
	
	/**格式化json数据为tree所需结构**/
	public String PareserJson(String treeJsonString){
		JsonObject node;
		JsonArray nodes = new JsonParser().parse(treeJsonString).getAsJsonArray();
		int size = nodes.size();
		for(int i=0; i<size; i++){
			node = (JsonObject) nodes.get(i);
			node.addProperty("isParent", true);
		}
		return nodes.toString();
	}

	// 将Json数组解析成相应的映射对象列表
	public static <T> List<T> parseJsonArrayWithGson(String json, Class<T> clazz) {
		List<T> lst = new ArrayList<T>();

		JsonArray array = new JsonParser().parse(json).getAsJsonArray();
		for(final JsonElement elem : array){
		lst.add(new Gson().fromJson(elem, clazz));
		}

		return lst;

	}
}
