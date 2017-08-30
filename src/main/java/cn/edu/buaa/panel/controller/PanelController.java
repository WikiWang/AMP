/**
 * @Title: HelloController.java 
 * @Package: com.test.springboot.controller 
 * @Description: TODO
 * @date: Nov 23, 2016
 * @author:  wangkui
 */
package cn.edu.buaa.panel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import cn.edu.buaa.panel.bean.Chart;
import cn.edu.buaa.panel.bean.PanelChart;
import cn.edu.buaa.panel.repo.ChartRepository;
import cn.edu.buaa.panel.repo.PanelChartRepository;

/**
 * @ClassName: HelloController 
 * @Description: 
 * @author: wk
 * @date: Nov 23, 2016
 */
@Controller
public class PanelController {
	
	@Autowired
	private ChartRepository chartRepository;
	
	@Autowired
	private PanelChartRepository panelChartRepository;
	
	@RequestMapping(value="/panel", method = RequestMethod.GET)
	public String panel(Model model, @RequestParam(required = true) String user){
		
		List<Chart> charts = chartRepository.findByUserId(user);
		model.addAttribute("charts", charts);
		return "panel";
	}
}
