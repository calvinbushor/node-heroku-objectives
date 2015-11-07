Application: nodeJSChat

Author: Micah Stamper

Profile: https://github.com/mstamper01/

Description: This project is a simple web chat application. It exchanges messages between webpages from the webserver.

How to run this program:
  1. Make sure node.js is installed on your computer
  2. Download this program
  3. Navigate to the root folder of this program
  4. Simply type "node index.js"
  5. Navigate your web browser to "localhost:3000/"
  6. You can then enter your messages into the chat box and exchange messages

Updates to come:
  1. Log messages to a file to keep chats stored
  2. Log clients to a file to keep in case of server failure
  3. On startup check if clients still attached to prevent failure
  
Updates implemented:
  1. Broadcast a message to connected users when someone connects or disconnects
  2. Add support for nicknames DONE
  3. Add "{user} is typing..." ability DONE
