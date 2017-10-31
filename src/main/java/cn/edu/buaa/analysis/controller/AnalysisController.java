package cn.edu.buaa.analysis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AnalysisController {

	@RequestMapping(value="/analysis", method = RequestMethod.GET)
	public String analysis(Model model){
		return "analysis";
	}
	@RequestMapping(value="/2DAnalysis", method = RequestMethod.GET)
	public String DAnalysis(Model model){
		return "2DAnalysis";
	}
	@RequestMapping(value="/compareAnalysis", method = RequestMethod.GET)
	public String compareAnalysis(Model model){
		return "compareAnalysis";
	}
}
