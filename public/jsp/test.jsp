<%@ page language="java" import="java.util.*" pageEncoding="UTF8"%>
<%@ page language="java" import="Methods.*"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String picurl = (String) request.getParameter("url");
String result = "";
if (picurl != null){
	MyGet myget = new MyGet();
	
	String url = "http://222.29.195.82:8001/path?path=/data/Image2SentenceDemo/temp/temp.jpg";
	result = myget.get(url);
	
	DownloadImage download = new DownloadImage();
	// download.download(picurl, "test.jpg", "C:\\Users\\THINK\\Desktop\\");
	download.download(picurl, "temp.jpg", "/home/qjin/data/Image2SentenceDemo/temp/");
}

out.println("var jsp_result=\'"+result+"\'");
%>
