package Methods;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import sun.net.www.http.HttpClient;

public class MyGet {

	/** 
     * 模拟GET请求 
     * @param client 
     * @param url 
     * @throws IOException 
     * @throws ClientProtocolException 
     */  
	public String get(String urlstr){   
	    StringBuffer readOneLineBuff = new StringBuffer();   
	    String content ="";   
	    try {   
	        URL url = new URL(urlstr);   
	        URLConnection conn = url.openConnection();   
	        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));          
	        String line = "";   
	        while ((line = reader.readLine()) != null) {   
	            readOneLineBuff.append(line);   
	        }   
	         content = readOneLineBuff.toString();   
	        reader.close();   
	    } catch (MalformedURLException e) {   
	        e.printStackTrace();   
	    } catch (IOException e2) {   
	        e2.printStackTrace();   
	    }      
	    return content;   
	}

}
