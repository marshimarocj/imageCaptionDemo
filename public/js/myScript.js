	var thumbsData = {"thumbs":[]};
	var dataroot="thumbPics.json";
	$.getJSON(dataroot, function(data){ 
		thumbsData.thumbs=data.thumbs; 
		var thumbsContainer = $("#thumbContainer");
		$.each(thumbsData.thumbs,function(n,value){
			var div = $("<div class=\"content\">").appendTo(thumbsContainer);
			var div2 = $("<div>").appendTo(div);
			var a = $("<a href=\"#\">").appendTo(div2);
			var name = value.name;
			var imgStr = "<img src=\"images/testPic/" + value[1] + "\" alt=\"images/testPic/" + value[1] + "\" class=\"thumb\" /></a></div></div>"; 
			var img = $(imgStr).appendTo(a);
		});
	});
	
	function changeThumbsResult(picUrl){
		var temp = picUrl.split('/');
		var picName = temp[temp.length-1];
		$.each(thumbsData.thumbs,function(i,value){
			if(picName == thumbsData.thumbs[i][1]){
				document.getElementById("result").innerHTML = thumbsData.thumbs[i][0];
				return;
			}
		});
	}
			
		
		
		
		function changePosition(){
			var divWidth = $('#picDiv').width();
			var imageWidth = $('#targetPic').width();
			if((imageWidth - 50) >= divWidth)
				return;
			$("#targetPic").css("marginLeft",(divWidth - imageWidth)/2);
		}
		
		function loading(){
			document.getElementById("result").innerHTML += '. ';
		}
		function changePic(){
			if(!checkJPG())
				return;
				
			var picUrl = $("#picLink").val();
			document.getElementById("targetPic").src = picUrl;
			$(".col-md-6").height(document.getElementById("targetPic").height);
			changePosition();
			
			
			document.getElementById("result").innerHTML = 'Please wait, loading';
			var B = setInterval('loading()',1000);
			

			$.ajax({
				url: 'http://222.29.195.82:6001/getResult',
				type: 'post',
				dataType: 'JSON',
				data: {url:picUrl},
				timeout: 60000, // 1 min
				success:function(msg){
					document.getElementById("result").innerHTML = msg;
					clearInterval(B);
				},
				error:function(e){
					alert(e);
					clearInterval(B);
				}
			});
			
		}
		
		function checkJPG(){
			var url = document.getElementById("picLink").value;
			if(url == "")
				return false;
			parts = url.toLowerCase().split('.');
			if(parts[parts.length-1] != "jpg" && parts[parts.length-1] != "JPG"){
				alert("Picture type has to be 'jpg'");
				return false;
			}
			return true;
		}
		

function changePicSlider($obj){
	var picUrl = $obj.children("div").children("a").children("img").attr("src");
	document.getElementById("targetPic").src = picUrl;
	$(".col-md-6").height(document.getElementById("targetPic").height);	
	changePosition();
	changeThumbsResult(picUrl);
}
