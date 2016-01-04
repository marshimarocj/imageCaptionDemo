	var thumbsData = {};
	var dataroot="data/thumbPics.json";
	$.getJSON(dataroot, function(data){ 
		thumbsData["thumbs"]=data["thumbs"]; 
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
				url: 'http://localhost:6001/getResult',
				type: 'post',
				dataType: 'JSON',
				data: {url:picUrl},
				timeout: 60000, // 1 min
				success:function(msg){
					document.getElementById("result").innerHTML = msg;
					clearInterval(B);
				},
				error:function(data){
					alert('error');
					clearInterval(B);
				}
			});
			
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
		

function changePicSlider($obj){
	var picUrl = $obj.children("div").children("a").children("img").attr("src");
	document.getElementById("targetPic").src = picUrl;
	$(".col-md-6").height(document.getElementById("targetPic").height);	
	changePosition();
	changeThumbsResult(picUrl);
}

/***************************About slider******************************/

$(function() {
				//caching
				//the main wrapper of the gallery
				var $fp_gallery			= $('#fp_gallery')
				//image loading status
				var $fp_loading			= $('#fp_loading');
				//the next and previous buttons
				var $fp_next			= $('#fp_next');
				var $fp_prev			= $('#fp_prev');
				//the close button
				var $fp_close			= $('#fp_close');
				//the main container for the thumbs structure
				var $fp_thumbContainer 	= $('#fp_thumbContainer');
				//wrapper of jquery ui slider
				var $fp_scrollWrapper	= $('#fp_scrollWrapper');
				//total number of images
				var nmb_images=0;
				//which gallery is clicked (index)
				var gallery_idx=0;
				//scroller wrapper
				var $fp_thumbScroller	= $('#fp_thumbScroller');
				//jquery ui slider
				var $slider				= $('#slider');
				//the links of the galleries (the cities)
				var $fp_galleries		= $('#fp_galleryList > li');
				//current image being viewed
				var current				= 0;
				
				//some control flags:
				//prevent fast clicks on next and previous
				var photo_nav			= true;
				

				//opens a gallery after cliking on a city / gallery
				function openGallery(){
					//current gets reseted
					current				= 0;				  
					//wrapper of each content div, where each image is
					var $fp_content_wrapper = $fp_thumbContainer.find('.images_container:nth-child('+parseInt(gallery_idx+1)+')');
					//hide all the other galleries thumbs wrappers
					$fp_thumbContainer.find('.images_container').not($fp_content_wrapper).hide();
					//and show this one
					$fp_content_wrapper.show();
					//total number of images
					nmb_images			= $fp_content_wrapper.children('div').length;
					//calculate width,
					//padding left 
					//and padding right for content wrapper
					var w_width 	= 0;
					var padding_l	= 0;
					var padding_r	= 0;
					//center of screen
					var center		= $(window).width()/2;
					var one_divs_w  = 0;
					/*
					Note:
					the padding left is the center minus half of the width of the first content div
					the padding right is the center minus half of the width of the last content div
					*/
					$fp_content_wrapper.children('div').each(function(i){
						var $div 		= $(this);
						var div_width	= $div.width(); 
						w_width			+=div_width;
						//if first one, lets calculate the padding left
						if(i==0)
							//padding_l = center - (div_width/2);
							//To start with the first pic.
							padding_l = 0;
						//if last one, lets calculate the padding right
						if(i==(nmb_images-1)){
							//padding_r = center - (div_width/2);
							padding_r = 0;
							one_divs_w= div_width;
						}	
					}).end().css({
						'width'				: w_width + 'px',
						'padding-left' 		: padding_l + 'px',
						'padding-right' 	: padding_r + 'px'
					});
					
					//scroll all left;
					$fp_thumbScroller.scrollLeft(w_width);
					
					//innitialize the slider
					$slider.slider('destroy').slider({
						orientation	: 'horizontal',
						max			: w_width -one_divs_w,//total width minus one content div width
						min			: 0,
						value		: 0,
						slide		: function(event, ui) {
							$fp_thumbScroller.scrollLeft(ui.value);
						},
						stop: function(event, ui) {
							//when we stop sliding 
							//we may want that the closest picture to the center 
							//of the window stays centered. Uncomment the following line
							//if you want that behaviour
							checkClosest();
						}
					});
					//open the gallery and show the slider
					$fp_thumbContainer.animate({'height':'240px'},200,function(){
						$(this).data('opened',true);
						$fp_scrollWrapper.fadeIn();
					});
					
					//scroll all right;
					$fp_thumbScroller.stop()
									 .animate({'scrollLeft':'0px'},2000,'easeInOutExpo');

					//User clicks on a content div (image)
					$fp_content_wrapper.find('.content')
									 .bind('click',function(e){
						var $current 	= $(this);
						//track the current one
						current			= $current.index();
						//center and show this image
						//the second parameter set to true means we want to 
						//display the picture after the image is centered on the screen
						centerImage($current,true,600);
						e.preventDefault();
					});					
				}
				
				//while the gallery scrolls we want that the slider scrolls as well
				$fp_thumbScroller.scroll(function(){
					$slider.slider('value',parseInt($fp_thumbScroller.scrollLeft(),10));
				});
								
				//User clicks next button (thumbs)
				$('#ca-nav-next').click(function(){
					slideThumb(1);
				});
				
				//User clicks previous button (thumbs)
				$('#ca-nav-prev').click(function(){
					slideThumb(0);
				});	

				
				//centers an image and opens it if open is true
				function centerImage($obj,open,speed){
					//the offset left of the element
					var obj_left 			= $obj.offset().left;
					//the center of the element is its offset left plus 
					//half of its width
					var obj_center 			= obj_left + ($obj.width()/2);
					//the center of the window
					var center				= $(window).width()/2;
					//how much the scroller has scrolled already
					var currentScrollLeft 	= parseFloat($fp_thumbScroller.scrollLeft(),10);
					//so we know that in order to center the image,
					//we must scroll the center of the image minus the center of the screen,
					//and add whatever we have scrolled already
					var move 				= currentScrollLeft + (obj_center - center);
					if(move != $fp_thumbScroller.scrollLeft()) //try 'easeInOutExpo'
						$fp_thumbScroller.stop()
										 .animate({scrollLeft: move}, speed,function(){
							if(open){
								//enlarge($obj);
								//alert("do something I want.");
								changePicSlider($obj);
							}
						});
					else if(open){
						//enlarge($obj);
						//alert("do something I want.");
						changePicSlider($obj);
					}
				}
												
				function getFinalValues($image){
					var widthMargin		= 0
					var heightMargin 	= 20;
					var $window			= $(window);
					var windowH      	= $window.height()-heightMargin;
					var windowW      	= $window.width()-widthMargin;
					var theImage     = new Image();
					theImage.src     = $image.attr("src");
					var imgwidth     = theImage.width;
					var imgheight    = theImage.height;

					if((imgwidth > windowW)||(imgheight > windowH)){
						if(imgwidth > imgheight){
							var newwidth = windowW;
							var ratio = imgwidth / windowW;
							var newheight = imgheight / ratio;
							theImage.height = newheight;
							theImage.width= newwidth;
							if(newheight>windowH){
								var newnewheight = windowH;
								var newratio = newheight/windowH;
								var newnewwidth =newwidth/newratio;
								theImage.width = newnewwidth;
								theImage.height= newnewheight;
							}
						}
						else{
							var newheight = windowH;
							var ratio = imgheight / windowH;
							var newwidth = imgwidth / ratio;
							theImage.height = newheight;
							theImage.width= newwidth;
							if(newwidth>windowW){
								var newnewwidth = windowW;
								var newratio = newwidth/windowW;
								var newnewheight =newheight/newratio;
								theImage.height = newnewheight;
								theImage.width= newnewwidth;
							}
						}
					}
					$image.data('width',theImage.width);
					$image.data('height',theImage.height);
				}
				
				//slides the scroller one picture 
				//to the right or left
				function slideThumb(way){
					if(way==1){						
						++current;
						if(current < 3)
							current = 3;
						var $next = $fp_thumbScroller.find('.images_container:nth-child('+parseInt(gallery_idx+1)+')')
													 .find('.content:nth-child('+parseInt(current+1)+')');
						if($next.length > 0)
							centerImage($next,false,600);
						else{
							--current;
							return;
						}	
					}
					else{
						--current;
						var $prev = $fp_thumbScroller.find('.images_container:nth-child('+parseInt(gallery_idx+1)+')')
													 .find('.content:nth-child('+parseInt(current+1)+')');
						if($prev.length > 0)
							centerImage($prev,false,600);
						else{
							++current;
							return;
						}	
					}					
				}
				
				//when we stop sliding 
				//we may want that the closest picture to the center 
				//of the window stays centered
				function checkClosest(){
					var center 				= $(window).width()/2;
					var current_distance 	= 99999999;
					var idx					= 0;	
					$container				= $fp_thumbScroller.find('.images_container:nth-child('+parseInt(gallery_idx+1)+')');
					$container.find('.content').each(function(i){
						var $obj 		= $(this);
						//the offset left of the element
						var obj_left 	= $obj.offset().left;
						//the center of the element is its offset left plus 
						//half of its width
						var obj_center 	= obj_left + ($obj.width()/2);
						var distance	= Math.abs(center-obj_center);
						if(distance < current_distance){
							current_distance 	= distance;
							idx					= i;
						}	
					});
					var $new_current 	= $container.find('.content:nth-child('+parseInt(idx+1)+')');
					current 			= $new_current.index();
					centerImage($new_current,false,200);
				}
				//var $gallery 		= $(this);
				//	$gallery.addClass('current');
				openGallery();

			});
