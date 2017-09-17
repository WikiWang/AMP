$("#chart").css("height", $(window).height()-80);
$("#chart").css("width", $(window).width());

$(window).resize(function() {
	$("#chart").css("height", $(window).height()-80);
	$("#chart").css("width", $(window).width());
	myChart.resize();
});

var myChart = echarts.init(document.getElementById('chart')); 
var name;
var ids;
var min;
var max;
var series = [];
var interval = null;

$(document).ready(function(){
	name = getUrlParam('name');
	ids = getUrlParam('ids');
	min = parseInt(getUrlParam('min'));
	max = parseInt(getUrlParam('max'));
	$("#min").val(min);
	$("#max").val(max);
	myChart.setOption(gaugeChart,true);
	myChart.showLoading({
        text : '数据获取中',
        effect: 'whirling'
    });
	interval = setInterval(setSeriexData, 5000);
	$("#rang1-1").val(0);
	$("#rang1-2").val(getUrlParam('rang12'));
	$("#rang2-1").val(getUrlParam('rang12'));
	$("#rang2-2").val(getUrlParam('rang23'));
	$("#rang3-1").val(getUrlParam('rang23'));
	$("#rang3-2").val(100);
	$("#color1").css('background-color', getUrlParam('rgb1'));
	$("#color2").css('background-color', getUrlParam('rgb2'));
	$("#color3").css('background-color', getUrlParam('rgb3'));
});

window.onresize = myChart.resize;      

var gaugeChart = {
		title : {
	        text: name,
	    },
		tooltip : {
	        formatter: "{a} <br/>{b} : {c}"
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    series : [
	        {
	            name:'仪表盘',
	            type:'gauge',
	            splitNumber: 10,       // 分割段数，默认为5
	            axisLine: {            // 坐标轴线
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']], 
	                    width: 8
	                }
	            },
	            axisTick: {            // 坐标轴小标记
	                splitNumber: 10,   // 每份split细分多少段
	                length :12,        // 属性length控制线长
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: 'auto'
	                }
	            },
	            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto'
	                }
	            },
	            splitLine: {           // 分隔线
	                show: true,        // 默认显示，属性show控制显示与否
	                length :30,         // 属性length控制线长
	                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: 'auto'
	                }
	            },
	            pointer : {
	                width : 5
	            },
	            title : {
	                show : true,
	                offsetCenter: [0, '-40%'],       // x, y，单位px
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    fontWeight: 'bolder'
	                }
	            },
	            detail : {
	                formatter:'{value}',
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto',
	                    fontWeight: 'bolder'
	                }
	            },
	            data:[{value: 50, name: '完成率'}]
	        }
	    ]
};

function refresh() {

	min = parseInt($("#min").val());
	max = parseInt($("#max").val());
	myChart.showLoading({
        text : '数据获取中',
        effect: 'whirling'
    });
	interval = setInterval(setSeriexData, 5000);
}

function setSeriexData(){

	var item;
	if(ids != ''){
		$.ajax({
			type: 'GET',
			url: "/Monitoring/queryRealTimeData",
			async: false,
			data: {id:ids},
			dataType: 'json',
			success:function(data){
				item = {
					name:name,
					value:data.value
				};
			}
		});
	}
	gaugeChart.series[0].data[0] = item;
	gaugeChart.series[0].min = min;
	gaugeChart.series[0].max = max;
	var rang1 = parseFloat($("#rang1-2").val())/100;
	var rang2 = parseFloat($("#rang2-2").val())/100;
	var rang3 = parseFloat($("#rang3-2").val())/100;
	var rgb1 = $("#color1").css('background-color'); 
	var rgb2 = $("#color2").css('background-color'); 
	var rgb3 = $("#color3").css('background-color'); 
	var colorArray = [[rang1, rgb1],[rang2, rgb2],[rang3, rgb3]];
	gaugeChart.series[0].axisLine.lineStyle.color = colorArray;
//	gaugeChart.series[0].data[0].value = dataValue[0];
	myChart.setOption(gaugeChart,true);
	myChart.hideLoading();
	$("#colorpick").show();
}

