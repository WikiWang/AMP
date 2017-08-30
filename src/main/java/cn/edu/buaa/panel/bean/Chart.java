/**
 * @Title: Chart.java 
 * @Package: com.test.springboot.bean 
 * @Description: TODO
 * @date: 2017年1月7日
 * @author:  wangkui
 */
package cn.edu.buaa.panel.bean;

import org.springframework.data.annotation.Id;

/**
 * @ClassName: Chart 
 * @Description: 
 * @author: Administrator
 * @date: 2017年1月7日
 */
public class Chart {

	@Id
	private String id;
	private String name;
	private String url;
	private String userId;
	
	
	public Chart(String id, String name, String url, String userId) {
		this.id = id;
		this.name = name;
		this.url = url;
		this.userId = userId;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

}
