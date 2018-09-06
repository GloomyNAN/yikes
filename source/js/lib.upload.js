if ($('.uplod_img').length>0) {
	var container = document.createElement('script');
	$(container).attr('type','text/plain').attr('id','img_editor');
	$("body").append(container);
	_editor = UE.getEditor('img_editor');
	_editor.ready(function () {
		_editor.hide();
		$(".uplod_img").bind('click',function(){
			object = $(this);
			_editor.getDialog("insertimage").open();
			_editor.addListener('beforeInsertImage', function (t, arg) {
				object.attr("value", arg[0].src);
				//if($('#meta_worth_img').length>0){
				//	$('#meta_worth_img').attr("value",1);
				//	$('#meta_worth_img').next('.imgcheck').addClass("imgcheck-on");
				//}
			});
		});
	});
}