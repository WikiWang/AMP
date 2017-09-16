/**
 * @Title: HelloController.java 
 * @Package: com.test.springboot.controller 
 * @Description: TODO
 * @date: Nov 23, 2016
 * @author:  wangkui
 */
package cn.edu.buaa.monitoring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import cn.edu.buaa.monitoring.bean.MainModel;
import cn.edu.buaa.panel.bean.Panel;
import cn.edu.buaa.panel.repo.PanelRepository;
import cn.edu.buaa.monitoring.service.MainModelListService;


/**
 * @ClassName: HelloController 
 * @Description: 
 * @author: wk
 * @date: Nov 23, 2016
 */
@Controller
public class ModelController {
	
	@Autowired
	public MainModelListService mainModelListService;
	
	@Autowired
	private PanelRepository panelRepository;
	
	@RequestMapping(value="/monitor", method = RequestMethod.GET)
	public String index(Model model, @RequestParam(required = true) String user, @RequestParam(required = true) String password){
		List<MainModel> allMainModels = mainModelListService.getAllMainModels(user, password);
		List<Panel> panels = panelRepository.findByUserId(user);
		model.addAttribute("allMainModels", allMainModels);
		model.addAttribute("panels", panels);
		return "monitor";
	}
	
	@RequestMapping(value="/linechart", method = RequestMethod.GET)
	public String lineChart(Model model){
		return "linechart";
	}
	
	@RequestMapping(value="/barchart", method = RequestMethod.GET)
	public String barChart(Model model){
		return "barchart";
	}
	
	@RequestMapping(value="/piechart", method = RequestMethod.GET)
	public String pieChart(Model model){
		return "piechart";
	}
	
	@RequestMapping(value="/gaugechart", method = RequestMethod.GET)
	public String guageChart(Model model){
		return "gaugechart";
	}
}
