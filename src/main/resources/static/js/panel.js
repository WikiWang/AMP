
var panelStatus = "normal"; 
function setPanel() {
	if(panelStatus == "normal"){
		panelStatus = "setting";
		$("#setPanel").text("保存仪表盘");
		$(".box").removeClass("boxFilter");
		$(".coor").removeClass("coorFilter");
		$(".delete").removeClass("deleteFilter");
	}else{
		panelStatus = "normal";
		savePanel();
		$("#setPanel").text("设置仪表盘");
		$(".box").addClass("boxFilter");
		$(".coor").addClass("coorFilter");
		$(".delete").addClass("deleteFilter");
	}
}

function savePanel() {
	var chartArray = [];
	$('.box').each(function(i){
		var id = this.id;
		var left = $(this).position().left;
		var top = $(this).position().top;
		var width = parseInt($(this).css('width'));
		var height = parseInt($(this).css('height'));
		var jsonobj = {"id":id, "left":left, "top":top, "width":width, "height":height};
		chartArray.push(jsonobj);
	})
//	alert(chartArray.length);
	
	$.ajax({
		type: 'POST',
		url: "/Panel/savePanel",
		async: false,
		data: JSON.stringify(chartArray),
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		success:function(data){
			alert("保存成功!");
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("保存失败!");
		}
	});
	$('#deleteChartModal').modal('hide');
}
