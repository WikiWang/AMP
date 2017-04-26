function addPanelModal() {
	$('#addPanel').modal('show');
}

function addPanel() {
	var panelName = $("#panelName").val();
	if(panelName == ""){
		alert("请输入仪表盘名称！");
	}else{
		$.ajax({
			type: 'GET',
			url: "/Panel/addPanel",
			async: false,
			data: {panelName:panelName},
			dataType: 'json',
			success:function(data){
				alert("添加仪表盘成功!");
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				alert("添加仪表盘失败！");
			}
		});
		$('#addPanel').modal('hide');
		window.location.reload(true);
	}
}