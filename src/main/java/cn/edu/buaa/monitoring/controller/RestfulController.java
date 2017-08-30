package cn.edu.buaa.monitoring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.buaa.panel.bean.Chart;
import cn.edu.buaa.panel.bean.Panel;
import cn.edu.buaa.panel.bean.PanelChart;
import cn.edu.buaa.panel.repo.ChartRepository;
import cn.edu.buaa.panel.repo.PanelChartRepository;
import cn.edu.buaa.panel.repo.PanelRepository;
import cn.edu.buaa.monitoring.service.QueryDataService;
import cn.edu.buaa.monitoring.service.MonitoringTreeNodeParamService;
import cn.edu.buaa.util.GenerateSequenceUtil;

@RestController
public class RestfulController {

	@Autowired
	private MonitoringTreeNodeParamService treeNodeParamService;
	
	@Autowired
	private QueryDataService queryDataService;
	
	@Autowired
	private ChartRepository chartRepository;
	
	@Autowired
	private PanelChartRepository panelChartRepository;
	
	@Autowired
	private PanelRepository panelRepository;
	
	@Value("${chart_url_pre}")
	private String chart_url_pre;
	
	@RequestMapping(value="/Monitoring/TreeNodeParam")
	public String treeNodeParam(@RequestParam(value="type") String type, 
			@RequestParam(value="id") String id, 
			@RequestParam(value="parentId") String parentId){
		
		return treeNodeParamService.getTreeNode(type, id, parentId);
	}
	
	@RequestMapping(value="/Monitoring/queryData", method = RequestMethod.GET)
	public String queryData(@RequestParam(value="id") String id, 
			@RequestParam(value="timeType") String timeType, 
			@RequestParam(value="timeRange") String timeRange){
		
		return queryDataService.queryData(id, timeType, timeRange);
	}
	
	@RequestMapping(value="/Monitoring/queryRealTimeData", method = RequestMethod.GET)
	public String queryRealTimeData(@RequestParam(value="id") String id){
		
		return queryDataService.queryData(id);
	}
	
	@RequestMapping(value="/Monitoring/saveLineChart", method = RequestMethod.GET)
	public String saveLineChart(@RequestParam(value="ids") String ids,
			@RequestParam(value="name") String name, 
			@RequestParam(value="timeType") String timeType, 
			@RequestParam(value="timeRange") String timeRange,
			@RequestParam(value="panelId") String panelId,
			@RequestParam(value="userId") String userId){

		String id = GenerateSequenceUtil.generateSequenceNo();
		String url = chart_url_pre + "linechart?name=" + name + "&ids=" + ids + "&timeType=" + timeType + "&timeRange=" + timeRange;
		
		Chart lineChart = new Chart(id, name, url, userId);
		PanelChart panelLineChart = new PanelChart(id, panelId, url, 0, 0, 0, 0);
		Panel panel = panelRepository.findById(panelId);
		panel.getCharts().add(id);
		
		chartRepository.save(lineChart);
		panelChartRepository.save(panelLineChart);
		panelRepository.save(panel);
 		return "{\"status\" : \"success!\"}";
	}
	
	@RequestMapping(value="/Monitoring/saveChart", method = RequestMethod.GET)
	public String saveChart(@RequestParam(value="ids") String ids,
			@RequestParam(value="chartType") String chartType,
			@RequestParam(value="name") String name, 
			@RequestParam(value="panelId") String panelId,
			@RequestParam(value="userId") String userId){

		String id = GenerateSequenceUtil.generateSequenceNo();
		String url = chart_url_pre + chartType + "chart?name=" + name + "&ids=" + ids;
		
		Chart lineChart = new Chart(id, name, url, userId);
		PanelChart panelLineChart = new PanelChart(id, panelId, url, 0, 0, 0, 0);
		Panel panel = panelRepository.findById(panelId);
		panel.getCharts().add(id);
		
		chartRepository.save(lineChart);
		panelChartRepository.save(panelLineChart);
		panelRepository.save(panel);
 		return "{\"status\" : \"success!\"}";
	}
	
	@RequestMapping(value="/Monitoring/saveGaugeChart", method = RequestMethod.GET)
	public String saveGaugeChart(@RequestParam(value="ids") String ids,
			@RequestParam(value="name") String name, 
			@RequestParam(value="min") String min, 
			@RequestParam(value="max") String max,
			@RequestParam(value="panelId") String panelId,
			@RequestParam(value="userId") String userId){

		String id = GenerateSequenceUtil.generateSequenceNo();
		String url = chart_url_pre + "gaugechart?name=" + name + "&ids=" + ids + "&min=" + min + "&max=" + max;
		
		Chart lineChart = new Chart(id, name, url, userId);
		PanelChart panelLineChart = new PanelChart(id, panelId, url, 0, 0, 0, 0);
		Panel panel = panelRepository.findById(panelId);
		panel.getCharts().add(id);
		
		chartRepository.save(lineChart);
		panelChartRepository.save(panelLineChart);
		panelRepository.save(panel);
 		return "{\"status\" : \"success!\"}";
	}
}
