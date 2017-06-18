var id = 2;
function addLine() {

	$("#paramLine").append('<div class="AxisSelectPanel"> <div class="Axis"> <label>X轴：</label></div><div class="domBtnDivX" id="domX_'+id+'"><div id="dom_'+id+'_1" class="categoryDiv"></div></div><div class="Axis"><label>Y轴：</label></div><div class="domBtnDivX" id="domY_'+id+'"><div id="dom_'+id+'_2" class="categoryDiv"></div></div><div class="Axis"><a class="glyphicon glyphicon-minus" href="#" name="rmlink""></a></div>');
	bindListener();
}

function bindListener(){
	var targetId = "domX_"+id;
//	$("#" + targetId + "").unbind().click(function(){
//        $(this).parent().remove();
//    })
	$("a[name=rmlink]").unbind().click(function(){
        $(this).parent().parent().remove();
    });
	id++;
}