var panelId="001";

function addChartModal() {
	$('#addChartModal').modal('show');
}


function addChart() {
	var id = $("#chatList").val();
	$.ajax({
		type: 'GET',
		url: "/Panel/addChart",
		async: false,
		data: {id:id, panelId:panelId},
		dataType: 'json',
		success:function(data){
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("添加失败！");
		}
	});
	$('#addChartModal').modal('hide');
	$("#chart_panel").empty();
	initPanel(panelId,0);
	
}
