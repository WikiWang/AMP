var id;
var parentDiv;
var maxHeight = 0;
//var panelId = "001";
$(function() {
	var chartPanelX = $("#chart_panel").offset().left;
	var chartPanelY = $("#chart_panel").offset().top;
	$(document).mousemove(function(e) {
		if (!!this.move) {
			var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
					callback = document.call_down || function() {
				$(this.move_target).css({
					'top': e.pageY - posix.y-chartPanelY,
					'left': e.pageX - posix.x-chartPanelX
				});
			};

			callback.call(this, e, posix);
		}
	}).mouseup(function(e) {
		if (!!this.move) {
			var callback = document.call_up || function(){};
			callback.call(this, e);
			$.extend(this, {
				'move': false,
				'move_target': null,
				'call_down': false,
				'call_up': false
			});
		}
	});
//	initPanel("001", maxHeight);
});

function initPanel(panelId, maxHeight){

	var urls = [];
	$.ajax({
		type: 'GET',
		url: "/Panel/getCharts",
		async: false,
		data: {panelId:panelId},
		dataType: 'json',
		success:function(data){
			for(var i=0; i<data.length; i++){
				var boxdiv=$('<div></div>');        //创建一个父div
				boxdiv.attr('id','box_'+data[i].id);        	//给父div设置id
				boxdiv.addClass('box');  
				boxdiv.addClass('boxFilter');  //添加css样式
				var left = 10;
				var top = maxHeight + 20;
				var width = 400;
				var height = 350;
				if(!(data[i].left == 0 && data[i].top == 0)){
					left = data[i].left;
					top = data[i].top;
				}
				if(!(data[i].width == 0 && data[i].height == 0)){
					width = data[i].width;
					height = data[i].height;
				}
				boxdiv.css({'left':left+'px','top':top+'px'});
				boxdiv.css({'width':width+'px','height':height+'px'});
				if((top+height) > maxHeight){
					maxHeight = top+height;
				}
				var iframe = document.createElement("iframe");
				iframe.src=data[i].url;
				iframe.className="frame";
				iframe.id="iframe"+i;
				$(iframe).prependTo(boxdiv);
				
				var deletediv=$('<div></div>');       //创建一个子div，右上角删除
				deletediv.attr('id',data[i].id);       //给子div设置id
				deletediv.addClass('delete');
				deletediv.addClass('glyphicon');
				deletediv.addClass('glyphicon-remove');
				deletediv.addClass('deleteFilter');
				deletediv.appendTo(boxdiv);        	//将子div添加到父div中
				
				var coordiv=$('<div></div>');       //创建一个子div,右下角放缩按钮
				coordiv.attr('id','coor_'+i);       //给子div设置id
				coordiv.addClass('coor'); 
				coordiv.addClass('coorFilter'); 	//添加css样式
				coordiv.appendTo(boxdiv);        	//将子div添加到父div中

				var $box = boxdiv.mousedown(function(e) {
					var offset = $(this).offset();

					this.posix = {'x': e.pageX - offset.left, 'y': e.pageY - offset.top};
					$.extend(document, {'move': true, 'move_target': this});
				}).on('mousedown', '#coor_'+i, function(e) {
					var id = this.closest('.box').id;
					var $boxi = $(document.getElementById(id));
					var posix = {
							'w': $boxi.width(), 
							'h': $boxi.height(), 
							'x': e.pageX, 
							'y': e.pageY
					};
					$.extend(document, {'move': true, 'call_down': function(e) {
						var boxi = document.getElementById(id);
						boxi.style.width = Math.max(30, e.pageX - posix.x + posix.w)+"px";
						boxi.style.height = Math.max(30, e.pageY - posix.y + posix.h)+"px";
					}});
					return false;
				});
				boxdiv.appendTo($('#chart_panel')); //将父div添加到panel中
			}
		}
	});
	$(".delete").click(function (){
		id = this.id;
		parentDiv = $(this).parent();
		$('#deleteSure').text("确定删除?");
		$('#deleteChartModal').modal('show');
	});
}

function deleteChart() {
	$.ajax({
		type: 'GET',
		url: "/Panel/deleteChart",
		async: false,
		data: {id:id},
		dataType: 'json',
		success:function(data){
			if(data.status == "success!"){
				$('#deleteSure').text("删除成功！");
				parentDiv.remove();
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$('#deleteSure').text("删除失败！");
			parentDiv.remove();
		}
	});
	$('#deleteChartModal').modal('hide');
}
