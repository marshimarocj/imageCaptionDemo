import json

f = file("data/morePics.json")
jsonData = json.load(f)		

body = ("<html>\n"  
"<head>\n" 
"	<title>Demo</title>\n"
"	<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/>\n"
"	<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
"	<link type=\"text/css\" href=\"css/3.0.3-bootstrap.min.css\" rel=\"stylesheet\">\n"
"	<link rel=\"stylesheet\" href=\"css/font.css\" type=\"text/css\" media=\"screen\"/>\n"
"</head>\n"
"<body style=\"zoom:1.3\">\n"
"	<div class=\"container-fluid\">\n"
"		<div class=\"page-header \" style=\"text-align:center; margin-top:1%;\">\n"
"			<h1 style=\"margin-top:0; font-weight: bold; font-size: 30px; font-family:champagne__limousines-webfont;\">Image Description Generation based on Deep Models</h1>\n"
"			<span>\n"
"				<img   src=\"images/logo.png\" style=\"height:50px; box-sizing: border-box; float:right; margin: -50px 50px 0 0;\"/>\n"
"			</span>\n"
"		</div>\n"
"	</div>\n"
"<div class=\"container main-container\">\n"
"<div role=\"tabpanel\">\n"
"	<!-- Nav tabs -->\n"
"	<ul class=\"nav nav-tabs\" role=\"tablist\">\n");

		
for i in range(len(jsonData.keys())):
	if i == 0 :
		body = body + "      <li role=\"presentation\" class=\"active\"><a href=\"#panel-1\" aria-controls=\"panel-1\" role=\"tab\" data-toggle=\"tab\" style=\"font-size:20px; font-weight:bold; font-family:champagne__limousines-webfont;\">" + jsonData.keys()[i] +"</a></li>\n"
	else :
		body = body + "      <li role=\"presentation\"><a href=\"#panel-" + str(i+1) + "\" aria-controls=\"panel-"+ str(i+1) + "\" role=\"tab\" data-toggle=\"tab\" style=\"font-size:20px; font-weight:bold; font-family:champagne__limousines-webfont;\">" + jsonData.keys()[i] +"</a></li>\n"

body += ("    </ul>\n"	
"	<form class=\"form-inline col-md-1\" action=\"Demo.html\" style=\"float:right;margin:-4% 0 0 0\">\n"
"				<div class=\"form-group\">\n"
"					<button id=\"picButton\" class=\"btn btn-primary\" >Go back</button>\n"
"				</div>\n"
"				</form>\n"
"    <!-- Tab panes -->\n"
"	<div class=\"tab-content\">\n")

for i in range(len(jsonData.keys())):
	if i == 0:
		body += "      <div role=\"tabpanel\" class=\"tab-pane active\" id=\"panel-" + str(i+1) + "\">\n"
	else:
		body += "      <div role=\"tabpanel\" class=\"tab-pane \" id=\"panel-" + str(i+1) + "\">\n"
	body += "        <div class=\"row masonry-container\">\n"
	for j in range(0, len(jsonData[jsonData.keys()[i]])):
		body += ("		  <div class=\"col-md-4 col-sm-6 item\">\n"
"            <div class=\"thumbnail\">\n"
"              <img src=\"images/testPic/" + jsonData[jsonData.keys()[i]][j][1] + "\" alt=\"\">\n"
"              <div class=\"caption\">\n"
"                <p style=\"font-family:champagne__limousines-webfont; font-size:21px; font-weight:bold;\">" + jsonData[jsonData.keys()[i]][j][0] + "</p>\n"
"              </div>\n"
"            </div>\n"
"          </div>\n"
"          <!--/.item  -->\n"	)
	body += ("        </div>\n"
"        <!--/.masonry-container  -->\n"
"      </div>\n"
"      <!--/.tab-panel -->\n")


body += ("</div>\n"
"    <!--/.tab-content -->\n"

"  </div>\n"
"  <!--/.tab-panel  -->\n"

"</div>\n"
"<!-- /.container -->\n"

"</body>\n"

"<script src=\"js/2.1.3-jquery.min.js\"></script>\n"
"<script src=\"js/bootstrap.min.js\"></script>\n"
"<script src=\"js/imagesLoaded.js\"></script>\n"
"<script src=\"js/masonry.js\"></script>\n"
"<script>\n"
"	(function( $ ) {\n"

"		var $container = $('.masonry-container');\n"
"		$container.imagesLoaded( function () {\n"
"			$container.masonry({\n"
"				columnWidth: '.item',\n"
"				itemSelector: '.item'\n"
"			});\n"
"		});\n"
		
"		//Reinitialize masonry inside each panel after the relative tab link is clicked - \n"
"		$('a[data-toggle=tab]').each(function () {\n"
"			var $this = $(this);\n"

"			$this.on('shown.bs.tab', function () {\n"
			
"				$container.imagesLoaded( function () {\n"
"					$container.masonry({\n"
"						columnWidth: '.item',\n"
"						itemSelector: '.item'\n"
"					});\n"
"				});\n"

"			}); //end shown\n"
"		});  //end each\n"
	
"	})(jQuery);\n"
"</script>\n"
"</html>\n")

file_object = open('More.html', 'w')
file_object.write(body)
file_object.close()
	  
#print body
