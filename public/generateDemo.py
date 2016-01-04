import json

f = file("data/thumbPics.json")
jsonData = json.load(f)		

body = ("<html>\n"
"<head>\n"
"	<title>Demo</title>\n"
"	<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/>\n"
"	<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
"	<link type=\"text/css\" href=\"css/3.0.3-bootstrap.min.css\" rel=\"stylesheet\">\n"
"	<script src=\"js/1.4.2-jquery.min.js\"></script>\n"
"	<script src=\"js/myScript.js\"></script>\n"
	
		
"	<link type=\"text/css\" href=\"css/jquery.ui.theme.css\" rel=\"stylesheet\" />\n"
"	<link type=\"text/css\" href=\"css/jquery.ui.core.css\" rel=\"stylesheet\" />\n"
"    <link type=\"text/css\" href=\"css/jquery.ui.slider.css\" rel=\"stylesheet\" />\n"
"	<link rel=\"stylesheet\" href=\"css/style.css\" type=\"text/css\" media=\"screen\"/>\n"
"	<link rel=\"stylesheet\" href=\"css/font.css\" type=\"text/css\" media=\"screen\"/>\n"

"</head>\n"

"<body >\n"
"	<div class=\"container-fluid\">\n"
"		<div class=\"page-header \" style=\"text-align:center; margin-top:1%;\">\n"
"			<h1 style=\"margin-top:0; font-weight: bold; font-size: 30px; font-family: champagne__limousines-webfont;\">Image Description Generation based on Deep Models</h1>\n"
"			<img   src=\"images/logo.png\" style=\"height:50px; box-sizing: border-box; float:right; margin: -50px 50px 0 0;\"/>\n"
"		</div>\n"
"	</div>\n"
"	<div class=\"container\">\n"
	
"		<div class=\"row\" >\n"
"			<div class=\"input-group\" style=\"margin:0 0 0 20px\">\n"
"				<input id=\"picLink\" type=\"text\" class=\"form-control\" placeholder=\"Search for...\" onblur=\"checkJPG()\"/>\n"
"				<span class=\"input-group-btn\">\n"
"					<button class=\"btn btn-default\" type=\"button\" onclick=\"changePic()\" style=\"margin-right:100px;\">Go!</button>\n"
"				</span>\n"
"				<span class=\"input-group-btn\">\n"
"					<a href=\"More.html\"><input type=\"button\" class=\"btn btn-primary\" value=\"learn more\"></input></a>\n"
"				</span>\n"
"			</div>\n"
"		</div>\n"
				
"		<div id=\"fp_thumbContainer\">\n"
"			<div class=\"ca-nav\">\n"
"				<span class=\"ca-nav-prev\" id=\"ca-nav-prev\">Previous</span>\n"
"				<span class=\"ca-nav-next\" id=\"ca-nav-next\">Next</span>\n"
"			</div>\n"
"			<div id=\"fp_thumbScroller\">\n"
"				<div class=\"images_container\" id=\"thumbContainer\">\n"

);

for i in range(0, len(jsonData["thumbs"])):
	body += ("					<div class=\"content\">\n"
"						<div><a href=\"#\"><img src=\"images/testPic/" + jsonData["thumbs"][i][1] + "\" alt=\"images/testPic/"+ jsonData["thumbs"][i][1] + "\" class=\"thumb\" /></a></div>\n"
"					</div>\n")

body += ("				</div>\n"		
"			</div>\n"
"		</div>\n"
						
"		<div class=\"row \" style=\"margin: 10px 0\">\n"
"			<div id=\"picDiv\" class=\"col-md-6\" style=\"height:auto\">\n"
"				<img id=\"targetPic\" src=\"images/testPic/"+ jsonData["thumbs"][0][1] + "\" class=\"img-responsive img-thumbnail\" alt=\"Responsive image\" style=\"height:300px;\" onload=\"changePosition();\">\n"
"			</div>\n"
"			<div id=\"resultDiv\" class=\"col-md-6\" >\n"
"				<h1  style=\"font-weight:bold; font-family:champagne__limousines-webfont;\">Image Caption</h1>\n"
"				<p id=\"result\" style=\"font-weight: 500; font-size: 25px; font-family:champagne__limousines-webfont;\">" + jsonData["thumbs"][0][0] + "</p>\n"
"			</div>\n"
"			<script type=\"text/javascript\"> // Set equal height.\n"
"				$( document ).ready(function() {\n"
"					var heights = $(\".col-md-6\").map(function() {\n"
"						return $(this).height();\n"
"					}).get(),\n"
"					maxHeight = Math.max.apply(null, heights);\n"
"					$(\".col-md-6\").height(maxHeight);\n"
"				});\n"
"			</script>\n"
"		</div>\n"
"	</div>\n"
	
	
"	<script type=\"text/javascript\" src=\"js/1.7.2-jquery-ui.min.js\"></script>\n"
"	<script type=\"text/javascript\" src=\"js/jquery.easing.1.3.js\"></script>\n"	   

"</body>\n"


"</html>\n"			)


file_object = open('Demo.html', 'w')
file_object.write(body)
file_object.close()
	  
