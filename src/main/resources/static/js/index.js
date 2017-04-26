var userId = "admin";
var panelId = "001";
$(function() {

	$.ajax({
		type: 'GET',
		url: "/Panel/getPanels",
		async: false,
		data: {userId:userId},
		dataType: 'json',
		success:function(data){
			for(var i=0; i<data.length; i++){
//				var ul=$('panels');    
//		        var li= document.createElement("li");    
//		        var href_a = document.createElement("a");  
//		            href_a.href="#";  
//		            href_a.innerHTML = data[i].name;  
//		            li.id=data[i].id;  
//		            li.appendChild(href_a);  
//		            ul.appendChild(li);
		            $("#panels").append("<li id=\""+ data[i].id +"\" name=\""+ data[i].name +"\"><a href=\"#\">" + data[i].name + "</a></li>");
			}
		}
	});
});

//$('#panels li a').click(function(){
//	alert("aaa");
//	var con=$(this).parents("li").attr("id");			  			
//	alert(con);
//	
//});
//
//$("#panels li").each(function(index){
//    $(this).click(function(){
//    	alert("aaa");
//    })
//  });

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}

$('.accordion > a').click(function (e) {
    e.preventDefault();
    var $ul = $(this).siblings('ul');
    var $li = $(this).parent();
    if ($ul.is(':visible')) {
//    	$li.removeClass('active');
    }
    else{
//    	$li.addClass('active');
    }
    $ul.slideToggle();
});

$('.accordion li.active:first').parents('ul').slideDown();

$("#panels").on("click","li", function() {
	panelId=$(this).attr("id");
	$("#title").text($(this).attr("name"));
	$("#chart_panel").empty();
	initPanel(panelId, 0);
});

function deletePanelModal(){
	if(panelId == "001"){
		alert("默认仪表盘无法删除！");
	}else{
		$('#deletePanelModal').modal('show');
	}
}

function deletePanel() {
	$.ajax({
		type: 'GET',
		url: "/Panel/deletePanel",
		async: false,
		data: {panelId:panelId},
		dataType: 'json',
		success:function(data){
			if(data.status == "success!"){
				$('#deletePanelSure').text("删除成功！");
				window.location.reload(true);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$('#deleteSure').text("删除失败！");
		}
	});
	$('#deleteChartModal').modal('hide');
}