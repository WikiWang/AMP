package cn.edu.buaa.panel.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.buaa.panel.bean.Chart;
import cn.edu.buaa.panel.bean.Panel;
import cn.edu.buaa.panel.bean.PanelChart;
import cn.edu.buaa.panel.repo.ChartRepository;
import cn.edu.buaa.panel.repo.PanelChartRepository;
import cn.edu.buaa.panel.repo.PanelRepository;
import cn.edu.buaa.panel.service.PanelTreeNodeParamService;
import cn.edu.buaa.util.GenerateSequenceUtil;
import cn.edu.buaa.util.JsonUtil;

import com.google.gson.Gson;
import com.google.gson.JsonArray;

@RestController
public class PanelChartController {

	@Autowired
	public PanelTreeNodeParamService treeNodeParamService;
	
	@Autowired
	private ChartRepository chartRepository;
	
	@Autowired
	private PanelChartRepository panelChartRepository;
	
	@Autowired
	private PanelRepository panelRepository;
	
	@RequestMapping(value="/Panel/getCharts", method = RequestMethod.GET)
	public String panel(@RequestParam(value="panelId") String panelId){
		List<PanelChart> charts = panelChartRepository.findByPanelId(panelId);
		Gson gson = new Gson();  
	    String result = gson.toJson(charts);
		return result;
	}
	
	@RequestMapping(value="/Panel/deleteChart", method = RequestMethod.GET)
	public String deleteChart(@RequestParam(value="id") String id){
		PanelChart panelChart = panelChartRepository.findOne(id);
		panelChartRepository.delete(panelChart);
		return "{\"status\":\"success!\"}";
	}
	
	@RequestMapping(value="/Panel/savePanel", method = RequestMethod.POST)
	public String savePanel(@RequestBody String body){
//		Chart chart = panelChartRepository.findOne(id);
		List<PanelChart> chartList = JsonUtil.parseJsonArrayWithGson(body, PanelChart.class);
		for(PanelChart panelChart : chartList){
			panelChart.setId(panelChart.getId().substring(4));
			PanelChart priPanelChart = panelChartRepository.findOne(panelChart.getId());
			panelChart.setUrl(priPanelChart.getUrl());
			panelChart.setPanelId(priPanelChart.getPanelId());
			panelChartRepository.delete(priPanelChart);
			panelChartRepository.save(panelChart);
		}
//		panelChartRepository.delete(chart);
		return "{\"status\":\"success!\"}";
	}
	
	@RequestMapping(value="/Panel/deletePanel", method = RequestMethod.GET)
	public String deletePanel(@RequestParam(value="panelId") String panelId){
		Panel panel = panelRepository.findOne(panelId);
		panelRepository.delete(panel);
		List<PanelChart> charts = panelChartRepository.findByPanelId(panelId);
		for(PanelChart panelChart : charts){
			panelChartRepository.delete(panelChart);
		}
		return "{\"status\":\"success!\"}";
	}	
	
	@RequestMapping(value="/Panel/addChart", method = RequestMethod.GET)
	public String addChart(@RequestParam(value="id") String id,
			@RequestParam(value="panelId") String panelId){
		Chart chart = chartRepository.findOne(id);
		PanelChart panelChart = new PanelChart(chart, panelId);
		panelChartRepository.save(panelChart);
		return "{\"status\":\"success!\"}";
	}
	
	
	
	@RequestMapping(value="/Panel/addPanel", method = RequestMethod.GET)
	public String addPanel(@RequestParam(value="panelName") String panelName){
		
		String id = GenerateSequenceUtil.generateSequenceNo();
		Panel panel = new Panel();
		panel.setId(id);
		panel.setName(panelName);
		panel.setUserId("admin");
		panel.setCharts(new ArrayList<String>());
		panelRepository.save(panel);
		
		return "{\"status\":\"success!\"}";
	}
	
	@RequestMapping(value="/Panel/getPanels", method = RequestMethod.GET)
	public String getPanels(@RequestParam(value="userId") String userId){
		
		List<Panel> panels = panelRepository.findByUserId(userId);
		Gson gson = new Gson();  
	    String result = gson.toJson(panels);
		return result;
	}
	
	@RequestMapping(value="/Panel/saveElement", method = RequestMethod.GET)
	public String saveElement(@RequestParam(value="panelId") String panelId,
			@RequestParam(value="url") String url){

		String id = GenerateSequenceUtil.generateSequenceNo();
		url = url.replaceAll("%26", "&");
		PanelChart panelElement = new PanelChart(id, panelId, url, 0, 0, 0, 0);
		Panel panel = panelRepository.findById(panelId);
		panel.getCharts().add(id);
		
		panelChartRepository.save(panelElement);
		panelRepository.save(panel);
 		return "{\"status\" : \"success!\"}";
	}
	
}
