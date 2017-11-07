$("#chart_panel").css("height", 480);
var type;
var mainModelId;
var packageId;
var vid;
var user;
var versions;
$(document).ready(function(){
	
	$("#chart_table").css('display','none');
	type = getUrlParam('type');
	mainModelId = getUrlParam('mainModelId');
	packageId = getUrlParam('packageId');
	vid = getUrlParam('vid');
	user = getUrlParam('user');
	var versionstr = getUrlParam("version");
	if(versionstr != null){
		versions = versionstr.split(",");
	}
	analysis();
});
var myChart = echarts.init(document.getElementById('chart_panel'));  

window.onresize = myChart.resize;      

function showTable() {
	myChart.clear();
	$("#chart_panel").css('display','none'); 
	$("#chart_table").css('display','block'); 
	lastChartSelectorValue = $("#chart_selector ").val();
}

function showLineChart() {
	//echarts把复杂的图表结构化，图表的基本结构包括以下部分：标题，x轴，y轴，数值序列。  
	var lineChart = {
			title : {
//				text: '折线图',
			},
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				data:paramArray,
			},
			toolbox: {
				show : false,
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false},
//					magicType : {show: true, type: ['line', 'bar']},
					restore : {show: true},
					saveAsImage : {show: true}
				}
			},
			calculable : true,
			xAxis : [
			         {
			        	 type : 'category',
			        	 boundaryGap : true,
			        	 data : mainArray
			         }
			         ],
			yAxis : [
			         {
			        	 type : 'value',
			        	 scale: true,
			        	 axisLabel : {
			        		 formatter: '{value}'
			        			 }
			         }
			         ],
			series : getLineSeries()
	};
	$("#chart_table").css('display','none'); 
	$("#chart_panel").css('display','block');
	myChart.setOption(lineChart,true); 
	lastChartSelectorValue = $("#chart_selector ").val();
}	   

function getLineSeries(){
	var series=[];
	for(var i=0; i<dataArray.length; i++){
		var item={
    		name:paramArray[i],
    		type: 'line',
    		data:dataArray[i],
    	};
		series.push(item);
    }
	return series;
}

function showPieChart() {
	
	var pieChart = {
		    title : {
//		        text: '饼图',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		    },
		    toolbox: {
		        show : false,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {
		                show: true, 
		                type: ['pie', 'funnel'],
		                option: {
		                    funnel: {
		                        x: '25%',
		                        width: '50%',
		                        funnelAlign: 'left',
		                        max: 1548
		                    }
		                }
		            },
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    series : [
		              {
		                  type:'pie',
		                  radius : '55%',
		                  center: ['50%', '60%'],
		                  data:[]
		              }
		          ],
		    calculable : true,
		};
	
	if(mainArray.length == 1 && paramArray.length > 1){
		
		pieChart.legend.data = paramArray;
		pieChart.series[0].name = mainArray[0];
		var seriesData = new Array();
		for(var i=0; i<paramArray.length; i++){
			if(isNaN(dataArray[i][0])){
				alert("请选择数值型参数，参数("+paramArray[i]+")为非数值型参数！");
				$("#chart_selector ").val(lastChartSelectorValue);
				return;
			}
			seriesData.push({
				name:paramArray[i],
				value:dataArray[i][0]
			});
		}
		pieChart.series[0].data = seriesData;
		
	}else if(mainArray.length > 1 && paramArray.length == 1){
		
		pieChart.legend.data = mainArray;
		pieChart.series[0].name = mainArray[0];
		var seriesData = new Array();
		if(isNaN(dataArray[0][0])){
			alert("请选择数值型参数，参数("+paramArray[0]+")为非数值型参数！");
			$("#chart_selector ").val(lastChartSelectorValue);
			return;
		}
		for(var i=0; i<mainArray.length; i++){
			seriesData.push({
				name:mainArray[i],
				value:dataArray[0][i]
			});
		}
		pieChart.series[0].data = seriesData;
	}else{
		alert("请选择个一个版本");
		$("#chart_selector ").val(lastChartSelectorValue);
		return;
	}
	$("#chart_table").css('display','none'); 
	$("#chart_panel").css('display','block');
	myChart.setOption(pieChart,true); 
	lastChartSelectorValue = $("#chart_selector ").val();
}	

function showAreaChart() {
	var areaChart = {
			title : {
//				text: '面积图',
			},
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				data:paramArray,
			},
			toolbox: {
				show : false,
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false},
//					magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
					restore : {show: true},
					saveAsImage : {show: true}
				}
			},
			calculable : true,
			xAxis : [
			         {
			        	 type : 'category',
			        	 boundaryGap : false,
			        	 data : mainArray
			         }
			],
			yAxis : [
			         {
			        	 type : 'value'
			         }
			],
			series : getAreaSeries()
	};
	$("#chart_table").css('display','none'); 
	$("#chart_panel").css('display','block');
	myChart.setOption(areaChart,true);
	lastChartSelectorValue = $("#chart_selector ").val();
}

function getAreaSeries(){
	var series=[];
	for(var i=0; i<dataArray.length; i++){
		var item={
    		name:paramArray[i],
    		type: 'line',
    		stack: '总量',
    		itemStyle: {normal: {areaStyle: {type: 'default'}}},
    		data:dataArray[i],
    	};
		series.push(item);
    }
	return series;

}

function showBarChart() {
	var barChart = {
			title : {
//				text: '柱状图',
			},
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				data:paramArray,
			},
			toolbox: {
				show : false,
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false},
//					magicType : {show: true, type: ['line', 'bar']},
					restore : {show: true},
					saveAsImage : {show: true}
				}
			},
			calculable : true,
			xAxis : [
			         {
			        	 type : 'category',
			        	 data : mainArray
			         }
			         ],
			yAxis : [
			         {
			             type : 'value'
			         }
			         ],
			series : getBarSeries()
	};
	$("#chart_table").css('display','none'); 
	$("#chart_panel").css('display','block');
	myChart.setOption(barChart,true); 
}	

function getBarSeries(){
	var series=[];
	for(var i=0; i<dataArray.length; i++){
		var item={
    		name:paramArray[i],
    		type: 'bar',
    		data:dataArray[i],
    	};
		series.push(item);
    }
	return series;
}

function showScatterChart() {
	
	scatterChart = {
		    title : {
//		        text: '散点图',
//				orient:'vertical',
		    },
		    tooltip : {
		        trigger: 'axis',
		        showDelay : 0,
		        formatter : function (params) {
		        	return params.seriesName + ' :<br/>'
		        		+ "(" + params.value[0] + ', ' 
		                + params.value[1] + ")" ;
		        },  
		        axisPointer:{
		            show: true,
		            type : 'cross',
		            lineStyle: {
		                type : 'dashed',
		                width : 1
		            }
		        }
		    },
		    legend: {
//		        data:mainArray,
		    },
		    toolbox: {
		        show : false,
		        feature : {
		            mark : {show: true},
		            dataZoom : {show: true},
		            dataView : {show: true, readOnly: false},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    xAxis : [
		        {
		            type : 'value',
		            scale:true,
		            name:paramArray[0],
//		            axisLabel : {
//		                formatter: '{value}'
//		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            scale:true,
		            name:paramArray[1],
//		            axisLabel : {
//		                formatter: '{value}'
//		            }
		        }
		    ],
		};
	if(mainArray.length > 0 && paramArray.length == 2){
		if(isNaN(dataArray[0][0])){
			alert("请选择数值型参数！["+paramArray[0]+"]为非数值型参数");
			$("#chart_selector ").val(lastChartSelectorValue);
			return;
		}else if(isNaN(dataArray[1][0])){
			alert("请选择数值型参数！["+paramArray[1]+"]为非数值型参数");
			$("#chart_selector ").val(lastChartSelectorValue);
			return;
		}
		var series=[];
		for(var i=0; i<dataArray[0].length; i++){
			var item={
	    		name:mainArray[i],
	    		type:'scatter',
	    		data:[[dataArray[0][i], dataArray[1][i]]],
	    	};
			series.push(item);
	    }
		scatterChart.series = series;
		$("#chart_table").css('display','none'); 
		$("#chart_panel").css('display','block');
		myChart.setOption(scatterChart,true); 
	}else{
		alert("请选择两个属性！");
		$("#chart_selector ").val(lastChartSelectorValue);
		return;
	}
	
}	

var dataArray;//value数组
var paramArray;//参数数组
var mainArray;//主模型或数据包版本数组
var lastChartSelectorValue;
var interval = null;

function analysis() {
	$("#chart_table").css('display','block'); 
	$("#chart_panel").css('display','none');
	document.getElementById("progressBar").style.visibility="visible";
	initTransac();
}

function initTransac(){

	var table = $("#tableChart");
	var thead = table.find("thead");
	var thRows =  thead.find("tr:has(th)");
	$("#tableChart tr").remove();

	var newRow = "<tr><td></td>";

	/*定义存储表格内容的数组*/
	dataArray = new Array();
	paramArray = new Array();
	mainArray = new Array();

	/*设置表头*/
	for(var i=0; i<versions.length; i++){
			newRow += "<td>"+ versions[i] +"</td>";
			mainArray.push(versions[i]);
	}
	mainArray.reverse();
	newRow += "</tr>";
	thead.append(newRow);

	/*设置表格内容*/
	var tbody = table.find("tbody");
	var colArray = new Array();//表格列数据
	/*获取表格数据*/
	for(var k=0; k<versions.length; k++){
		$.ajax({
			type: 'GET',
			url: "/compareAnalysis/DataValue",
			async: false,
			data: {type:type, mainModelId:mainModelId, packageId:packageId, vid:vid, user:user, version:versions[k]},
			dataType: 'json',
			success:function(data){
				colArray.push(data);
			},
		});
	}
	var ifFirstValue;
	var ifSame;
	if(colArray.length > 0){
		for(var j=0; j<colArray[0].length; j++){
			ifFirstValue=true;
			ifSame = true;
			var rowArray = new Array();//表格行数据
			paramArray.push(colArray[0][j].name);
			var newTdRow = "<td>" + colArray[0][j].name + "</td>";
			for(var m=0; m<versions.length; m++){
				newTdRow += "<td>"+ colArray[m][j].value +"</td>";
				rowArray.push(colArray[m][j].value);
				if(ifFirstValue){
					lastValue = colArray[m][j].value;
					ifFirstValue = false;
				}else if(lastValue != colArray[m][j].value){
					ifSame = false;
				}
			}
			rowArray.reverse();
			dataArray.push(rowArray);
			if(ifSame){
				newTdRow = "<tr class='tr_black'>" + newTdRow + "</tr>";
			}else{
				newTdRow = "<tr class='tr_red'>" + newTdRow + "</tr>";
			}
			tbody.append(newTdRow);
		}
	}
	
	$("#chart_selector ").val(1);
	lastChartSelectorValue = 1;
	document.getElementById("progressBar").style.visibility="hidden";
	showTable();
}

$(":radio").click(function(){
	   var trs = $("tr[class='tr_black']");  
	   if($(this).val() == "option2"){
		   for(i = 0; i < trs.length; i++){   
		       trs[i].style.display = "none"; //这里获取的trs[i]是DOM对象而不是jQuery对象，因此不能直接使用hide()方法  
		   } 
	   }else{
		   for(i = 0; i < trs.length; i++){   
		       trs[i].style.display = "table-row"; //这里获取的trs[i]是DOM对象而不是jQuery对象，因此不能直接使用hide()方法  
		   } 
	   }
	  });

function select_change(){
	var type = $("#chart_selector ").val();
	switch (type) {
	case "1":
		showTable();
		break;
	case "2":
		showPieChart();
		break;
	case "3":
		showLineChart();
		break;
	case "4":
		showAreaChart();
		break;
	case "5":
		showBarChart();
		break;
	case "6":
		showScatterChart();
		break;
	default:
	break;
	}
}
