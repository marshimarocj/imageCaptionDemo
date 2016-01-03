import socket   #socket module
import time

ISOTIMEFORMAT='%Y-%m-%d %X'

# run the script
def processPic(picPath):
	return picPath

# loading the model	and etc.
def init():
	return 'init done'
	
def socketServer():
	init()
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	sock.bind(('127.0.0.1', 8001))
	sock.listen(5)
	print 'begin to listening on http://127.0.0.1:8001'
	while True:
		connection,address = sock.accept()
		print 'request accept.'
		#time.sleep(5)
		try:
			connection.settimeout(5)
			# receive the path of the picture
			picPath = connection.recv(2048)
			result = processPic(picPath)
			#print picPath
			curTime = time.strftime( ISOTIMEFORMAT, time.localtime( time.time() ) )
			connection.send(result + ' ' + curTime)
		except socket.timeout:
			print 'time out'
	connection.close()


socketServer()
	
