$("#chart").css("height", 420);
//window.onresize = function(){
//myChart.resize();
//};

var myChart = echarts.init(document.getElementById('chart'));  

window.onresize = myChart.resize;      

var chartType = 'line';
var RealTimeType = "timeRange";
var $active = $("#lineChart");
var interval = null;
var len;//获取span标签的个数
var ids=[];
var timeType;
var timeRange;
var min = 0;
var max = 100;
var interval = null;
var mainId;
var versions;
var type;
var dataArray;//value数组
var paramArray;//参数数组

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
//			toolbox: {
//				show : false,
//				feature : {
//					mark : {show: true},
//					dataView : {show: true, readOnly: false},
////					magicType : {show: true, type: ['line', 'bar']},
//					restore : {show: true},
//					saveAsImage : {show: true}
//				}
//			},
			calculable : true,
			xAxis : [
			         {
			        	 type: 'value'
			         }
			         ],
			yAxis : [
			         {
			        	 type : 'value',
//			        	 scale: true,
			        	 axisLabel : {
			        		 formatter: '{value}'
			        			 }
			         }
			         ],
			series : getLineSeries()
	};
	myChart.setOption(lineChart,true); 
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

function refresh() {

	var count = $("#paramLine").children().length;
	if(interval != null){
		clearInterval(interval);
	}
	initTransac();
//	interval = setInterval(initTransac, 3000);
//	len = $("#dom_1 span").size();//获取span标签的个数
//	timeType = $("#metric").val();
//	timeRange =  $("#range").val();
//	if(len == 0){
//		alert("请拖入数据项！");
//	}else if(RealTimeType == "timeRange" && timeRange == ""){
//		alert("请输入时间区间！");
//	}else if(RealTimeType == "timeRange" && isNaN(timeRange)){
//		alert("时间区间必须为数字！");
//	}else{
//		if(len > 1 && chartType == 'gauge'){
//			alert("仪表盘只能拖入一个参数！");
//			return;
//		}
//		myChart.showLoading({
//			text : '数据获取中',
//			effect: 'whirling'
//		});
//		if(interval != null){
//			clearInterval(interval);
//		}
//		if(RealTimeType == "timeRange"){
//			interval = setInterval(setSeriexData_Range, 5000);
//		}else{
//			min = parseInt($("#min").val());
//			max = parseInt($("#max").val());
//			interval = setInterval(setSeriexData_RealTime, 5000);
//		}
//
//	}
}

function initTransac(){
	dataArray = new Array();  
	paramArray = new Array();
	
	$('#paramLine').children().each(function(){
	    //$(this)用来表示当前元素
//	    alert($(this).text());
		var legendName="";
		var paramNumber = 0;
		var x="";
		var y="";
		$(this).children(".domBtnDivX").each(function(){
			$(this).children(".categoryDiv").each(function(){
				$(this).children(".domBtn").each(function(){
					var domid=$(this).attr("domid");
					var mName=$(this).attr("mName");
				    var name=$(this).text();
				    var version = $(this).attr("name");
//				    alert(domid);
//				    alert(name);
				    if(paramNumber == 0){
				    	legendName = mName + ":" + name;
				    }else{
				    	legendName = legendName + "-" +name;
				    }
				    paramNumber++;	
				    $.ajax({
						type: 'GET',
						url: "/2DAnalysis/DataValue",
						async: false,
						data: {id:mainId, parentId:domid, version:version, type:type},
						dataType: 'json',
						success:function(data){
							if(data != null){
								if(paramNumber==1){
									x = data.value;
								} else if(paramNumber==2){
									y = data.value;
								}
							}
						},
						error:function (XMLHttpRequest, textStatus, errorThrown) 
						{ 
							alert("error");
						} 
					});
				});
			});
		});
		paramArray.push(legendName);
		var temp = new Array();
		if(paramNumber==2){
			var xArr = x.split(',');
			var yArr = y.split(',');
			for(var i=0; i<xArr.length,i<yArr.length; i++){
				var xy = new Array();
				xy[0] = parseInt(xArr[i]);
				xy[1] = parseInt(yArr[i]);
				temp.push(xy);
			}
		}
		dataArray.push(temp);
	});
	showLineChart();
}


$(".main-menu li").click(function () {
	$("li[class='active']").removeAttr("class");
	$(this).addClass("active");

});

$(document).ready(function(){
	mainId = getUrlParam('id');
	versions = getUrlParam('version') + ",";
	type = getUrlParam('type');
	$("#chart").css('display','block'); 
});
