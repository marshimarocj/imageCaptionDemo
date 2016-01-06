<%@ page language="java" import="java.util.*" pageEncoding="UTF8"%>
<%@ page language="java" import="Methods.*"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String picurl = (String) request.getParameter("url");
String model = (String) request.getParameter("model");
String search = (String) request.getParameter("search");
String result = "";
int downloadflag = 0;
if (picurl != null){
	try{
		DownloadImage download = new DownloadImage();
		//download.download(picurl, "test.jpg", "C:\\Users\\THINK\\Desktop\\");
		download.download(picurl, "temp.jpg", "/home/qjin/data/Image2SentenceDemo/temp/");
		downloadflag = 1;
	}catch (Exception e){
		downloadflag = 0;
	}

	MyGet myget = new MyGet();
	
	String url = "http://222.29.195.82:8001/path?path=/data/Image2SentenceDemo/temp/temp.jpg";
	if ("model1".equals(model)){
		url = "http://222.29.195.82:8000/path?path=/data/Image2SentenceDemo/temp/temp.jpg";
	}
	url += "&search="+search;
	
	result = myget.get(url);
	//result = url+"\t"+model+"\t"+search;
}

out.println("var jsp_result=\'"+result+"\'; var jsp_download="+downloadflag+";");
%>
