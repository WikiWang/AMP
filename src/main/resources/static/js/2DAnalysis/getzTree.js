var type = "dataArea";
var id = null;
var param_tree;

/** TreeNodeDrag*/
var MoveTest = {
		errorMsg: "放错了...请拖拽到正确位置！",
		curTarget: null,
		curTmpTarget: null,
		noSel: function() {
			try {
				window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
			} catch(e){}
		},
		dragTree2Dom: function(treeId, treeNodes) {
			return !treeNodes[0].isParent;
		},
		prevTree: function(treeId, treeNodes, targetNode) {
			return !targetNode.isParent && targetNode.parentTId == treeNodes[0].parentTId;
		},
		nextTree: function(treeId, treeNodes, targetNode) {
			return !targetNode.isParent && targetNode.parentTId == treeNodes[0].parentTId;
		},
		innerTree: function(treeId, treeNodes, targetNode) {
			return targetNode!=null && targetNode.isParent && targetNode.tId == treeNodes[0].parentTId;
		},
		dragMove: function(e, treeId, treeNodes) {
		},
		dropTree2Dom: function(e, treeId, treeNodes, targetNode, moveType) {
			var targetId=e.target.id;
			var parentNode = treeNodes[0];
			while( parentNode.getParentNode() != null){
				parentNode = parentNode.getParentNode();
			}
			if (moveType == null && targetId.indexOf("dom_1") >= 0) {
				
				$("#" + targetId + "").empty();
				$("#" + targetId + "").append("<span class='domBtn' domId='" + treeNodes[0].id + "' mName='" + parentNode.name + "' name='" + treeNodes[0].version + "'>" + treeNodes[0].name + "</span>");
			
			} else if(moveType == null && targetId.indexOf("dom_2") >= 0){

				$("#" + targetId + "").empty();
				$("#" + targetId + "").append("<span class='domBtn' domId='" + treeNodes[0].id + "' mName='" + parentNode.name + "' name='" + treeNodes[0].version + "'>" + treeNodes[0].name + "</span>");

			} else {
				alert(MoveTest.errorMsg);
			}
		},
		bindDom: function() {
			$(".domBtnDiv").bind("mousedown", MoveTest.bindMouseDown);
		},
		bindMouseDown: function(e) {
			var target = e.target;
			if (target!=null && target.className=="domBtn") {
				var doc = $(document), target = $(target),
				docScrollTop = doc.scrollTop(),
				docScrollLeft = doc.scrollLeft();
				target.addClass("domBtn_Disabled");
				target.removeClass("domBtn");
				curDom = $("<span class='dom_tmp domBtn'>" + target.text() + "</span>");
				curDom.appendTo("body");

				curDom.css({
					"top": (e.clientY + docScrollTop + 3) + "px",
					"left": (e.clientX + docScrollLeft + 3) + "px"
				});
				MoveTest.curTarget = target;
				MoveTest.curTmpTarget = curDom;

				doc.bind("mousemove", MoveTest.bindMouseMove);
				doc.bind("mouseup", MoveTest.bindMouseUp);
				doc.bind("selectstart", MoveTest.docSelect);
			}
			if(e.preventDefault) {
				e.preventDefault();
			}
		},
		bindMouseMove: function(e) {
			MoveTest.noSel();
			var doc = $(document), 
			docScrollTop = doc.scrollTop(),
			docScrollLeft = doc.scrollLeft(),
			tmpTarget = MoveTest.curTmpTarget;
			if (tmpTarget) {
				tmpTarget.css({
					"top": (e.clientY + docScrollTop + 3) + "px",
					"left": (e.clientX + docScrollLeft + 3) + "px"
				});
			}
			return false;
		},
		bindMouseUp: function(e) {
			var doc = $(document);
			doc.unbind("mousemove", MoveTest.bindMouseMove);
			doc.unbind("mouseup", MoveTest.bindMouseUp);
			doc.unbind("selectstart", MoveTest.docSelect);

			var target = MoveTest.curTarget, tmpTarget = MoveTest.curTmpTarget;
			if (tmpTarget) tmpTarget.remove();

			var targetId=e.target.id;
			if (targetId.indexOf("dom_1") >= 0 || targetId.indexOf("dom_2") >= 0) {
				if (target) {
					target.removeClass("domBtn_Disabled");
					target.addClass("domBtn");
				}
			}else{
				if (target) {
					target.remove();
				}
				MoveTest.curTarget = null;
				MoveTest.curTmpTarget = null;
			}
		},
		bindSelect: function() {
			return false;
		}
};

/**
 * param tree setting start
 */
var paramCurStatus = "param_init", paramCurAsyncCount = 0, paramAsyncForAll = false, paramGoAsync = false;
var setting_paramTree = {
		edit: {
			enable: true,
			showRemoveBtn: false,
			showRenameBtn: false,
			drag: {
//				prev: MoveTest.prevTree,
//				next: MoveTest.nextTree,
//				inner: MoveTest.innerTree
				prev: false,
				next: false,
				inner: false
			}
		},
		data: {
			keep: {
				parent: true,
				leaf: true
			},
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: 0
			},
			key: {
				name: "name"
			}
		},
		check: {
			enable: false
		},
		async: {
			autoParam:["id=parentId","name", "version", "level=lv"],  
			enable: true,
			url:getParamUrl,
			otherParam:{"otherParam":"zTreeAsyncTest"},
			dataFilter: filter2
		},
		view: {
			selectedMulti: false
		},
		callback : {    
			beforeAsync: paramZTreebeforeAsync,
			onAsyncSuccess: paramZTreeonAsyncSuccess,
			onAsyncError: paramZTreeonAsyncError,
			beforeDrag: MoveTest.dragTree2Dom,
			onDrop: MoveTest.dropTree2Dom,
			onDragMove: MoveTest.dragMove
		}    

};

function getParamUrl(){
	return "/2DAnalysis/TreeNodeParam?type=" + type + "&id=" + id +"&versions=" + versions;
}

function filter2(treeId, parentNode, childNodes) {
	if (!childNodes) return null;
	for (var i=0, l=childNodes.length; i<l; i++) {
		childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	}
	return childNodes;
}

function paramZTreebeforeAsync() {
	paramCurAsyncCount++;
}

function paramZTreeonAsyncSuccess(event, treeId, treeNode, msg) {
	paramCurAsyncCount--;
	if (paramCurStatus == "param_expand") {
		if(treeNode.children.length==0){
			treeNode.isParent = false;
			param_tree.updateNode(treeNode);
		}else{
			paramExpandNodes(treeNode.children);
		}
	} else if (paramCurStatus == "param_async") {
		paramAsyncNodes(treeNode.children);
	} else if(paramCurStatus == "param_init"){
		paramExpandAll();
	}

	if (paramCurAsyncCount <= 0) {
		if (paramCurStatus != "param_init" && paramCurStatus != "") {
			paramAsyncForAll = true;
		}
		paramCurStatus = "";
	}
}

function paramZTreeonAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
	paramCurAsyncCount--;

	if (paramCurAsyncCount <= 0) {
		paramCurStatus = "";
		if (treeNode!=null) paramAsyncForAll = true;
	}
}


function paramExpandAll() {
	if (!paramCheck()) {
		return;
	}
	if (paramAsyncForAll) {
		param_tree.expandAll(true);
	} else {
		paramExpandNodes(param_tree.getNodes());
		if (!paramGoAsync) {
			paramCurStatus = "";
		}
	}
}
function paramExpandNodes(nodes) {
	if (!nodes) return;
	paramCurStatus = "param_expand";

	for (var i=0, l=nodes.length; i<l; i++) {
		param_tree.expandNode(nodes[i], true, false, false);
		if (nodes[i].isParent && nodes[i].zAsync) {
			if(nodes[i].children.length==0){
				nodes[i].isParent = false;
				param_tree.updateNode(treeNode);
			}else{
				paramExpandNodes(nodes[i].children);
			}
		} else {
			paramGoAsync = true;
		}
	}
}

function paramAsyncAll() {
	if (!paramCheck()) {
		return;
	}
	if (!paramAsyncForAll) {
		paramAsyncNodes(param_tree.getNodes());
		if (!paramGoAsync) {
			paramCurStatus = "";
		}
	}
}
function paramAsyncNodes(nodes) {
	if (!nodes) return;
	paramCurStatus = "param_async";
	for (var i=0, l=nodes.length; i<l; i++) {
		if (nodes[i].isParent && nodes[i].zAsync) {
			paramAsyncNodes(nodes[i].children);
		} else {
			paramGoAsync = true;
			param_tree.reAsyncChildNodes(nodes[i], "refresh", true);
		}
	}
}


function paramCheck() {
	if (paramCurAsyncCount > 0) {
		return false;
	}
	return true;
}
/**
 * param tree setting end
 */

/** search start **/
var lastValue = "", nodeList = [], fontCss = {}, firstSearch = true;
var hideNodes, showNodes;
function focusKey(e) {
	if (key.hasClass("empty")) {
		key.removeClass("empty");
	}
}

function blurKey(e) {
	if (key.get(0).value === "") {
		key.addClass("empty");
	}
}

function searchNode(e) {
	var value = $.trim(key.get(0).value);
	var keyType = "name";
	if (key.hasClass("empty")) {
		value = "";
	}
	if (lastValue === value) return;
	lastValue = value;
	if (value === "") {
		showNodes = param_tree.getNodesByParam("isHidden", true);
		param_tree.showNodes(showNodes);
		return;
	}
//	updateNodes(false);

	nodeList = param_tree.getNodesByParamFuzzy(keyType, value);

	updateNodes(true);

}

function updateNodes(highlight) {
	hideNodes = param_tree.getNodesByParam("isHidden", false);
	param_tree.hideNodes(hideNodes);
	var changeNodes = nodeList;
	for( var i=0, l=nodeList.length; i<l; i++) {
		var tempNode = nodeList[i];
		while(tempNode!=null){
			changeNodes.push(tempNode);
			tempNode = tempNode.getParentNode();
		}
	}
	param_tree.showNodes(changeNodes);
}

function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}
/** search end **/


$(document).ready(function(){
	type = getUrlParam('type');
	var leftParentNodes;
	id= getUrlParam('id');
	versions = getUrlParam('version');
	if(id == null){
		alert("id不能为空！");
	}else if(versions == null){
		alert("version不能为空！");
	}else{
		$.fn.zTree.init($("#param_list_tree"), setting_paramTree);
		param_tree = $.fn.zTree.getZTreeObj("param_list_tree");
		key = $("#key");
		key.bind("focus", focusKey)
		.bind("blur", blurKey)
		.bind("propertychange", searchNode)
		.bind("input", searchNode);
	}
	MoveTest.bindDom();
});
