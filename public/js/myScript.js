var thumbsData = {};
var dataroot="data/thumbPics.json";
$.getJSON(dataroot, function(data){ 
	thumbsData["thumbs"]=data["thumbs"]; 
});

function changeShow(imgUrl, sentence){
	displayImg(imgUrl);
	displayCaption(sentence);
}

function displayImg(imgUrl){
	document.getElementById("targetPic").src = imgUrl;	
}

function displayCaption(sentence){
	var result = sentence.split("\t");
	
	sentence = "<ul>";
	for (var i = 0; i < result.length; i++){
		sentence += "<li>"+result[i]+"</li>";
	}
	sentence += "</ul>";
	document.getElementById("result").innerHTML = sentence;
}

function changePosition(){
	var divWidth = $('#picDiv').width();
	var imageWidth = $('#targetPic').width();
	if((imageWidth - 50) >= divWidth)
		return;
	$("#targetPic").css("marginLeft",(divWidth - imageWidth)/2);
}
function checkJPG(){
	var url = document.getElementById("picLink").value;
	if(url == ""){
		return false;
	}
	parts = url.toLowerCase().split('.');
	if(parts[parts.length-1] != "jpg" && parts[parts.length-1] != "JPG" && parts[parts.length-1] != "jpeg" && parts[parts.length-1] != "JPEG"){
		alert("Picture type has to be 'jpg'");
		return false;
	}
	return true;
}

function changeThumbsResult(picUrl){
	var temp = picUrl.split('/');
	var picName = temp[temp.length-1];
	$.each(thumbsData.thumbs,function(i,value){
		if(picName == thumbsData.thumbs[i][1]){
			displayCaption(thumbsData.thumbs[i][0]);
			return;
		}
	});
}
	
function changePicSlider($obj){
	var picUrl = $obj.children("div").children("a").children("img").attr("src");
	displayImg(picUrl);
	$(".col-md-6").height(document.getElementById("targetPic").height);	
	changePosition();
	changeThumbsResult(picUrl);
}
	
function loading(){
	document.getElementById("result").innerHTML += '. ';
}
function changePic(){
	if(!checkJPG())
		return;
		
	var picUrl = $("#picLink").val();
	displayImg(picUrl);
	$(".col-md-6").height(document.getElementById("targetPic").height);
	changePosition();
	
	var model = $("#model-select option:selected").val();
	var search = $("#search-select option:selected").val();
	
	// document.getElementById("result").innerHTML = 'Please wait, loading ';
	// var B = setInterval('loading()',1000);
	
	//TODO
	//jQuery.getScript("http://localhost:8080/test/test.jsp?url="+picUrl+"&model="+model+"&search="+search, 
	jQuery.getScript("jsp/test.jsp?url="+picUrl+"&model="+model+"&search="+search, 
        function(){    
			if (jsp_download == 0)
				alert("下载失败！！");
			displayCaption(jsp_result);
			// clearInterval(B);
        });
}
	
/***************************About slider******************************/
function Slide(rootEle, d, param, processFunc)
{
  rootId = rootEle.attr('id');
  rootEle.append('<ul id="slide"></ul>');
  $.each(d, function(i, field) {
    rootEle.children("ul").append(processFunc(field));
  });
  var autoplaySlider = $('#slide').lightSlider({
	item: 3,
	easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
	auto:true,
	loop:true,
	pauseOnHover: true,
	responsive : [
	   ],
	onBeforeSlide: function (el) {
	  $('#current').text(el.getCurrentSlideCount());
	}
  });
  $('#total').text(autoplaySlider.getTotalSlideCount());
}

