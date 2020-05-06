import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { Paper, TextField, IconButton } from "@material-ui/core"
import SendIcon from '@material-ui/icons/Send';
import SnackbarContent from '@material-ui/core/SnackbarContent';




const styles = {
  paper: {
      width: '100vw',
      height: '80vh',
      maxWidth: '800px',
      maxHeight: '700px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative'
  },
  paper2: {
      width: '80vw',
      maxWidth: '400px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative'
  },
  container: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  },
  record: {
      width: '95%',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      margin: 10
  },
  record1: {
      width: '95%',
      display: 'flex',
      alignItems: 'center',
      margin: 10
  },
  logOut: {
      position: 'absolute',
      top: 10,
      right: 10
  },
  messagesBody: {
      width: 'calc( 100% - 20px )', 
      margin: 10,
      overflowY: 'scroll', 
      height: 'calc( 100% - 80px )'
  },
  message: {
      padding: 10,
      display: 'flex',
      justifyContent: 'space-between'
  }
};

const ChatBox = (props) => {
  var stompClient = null;

  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [chanelConnected, setChanelConnected] = useState(false);
  const [roomNotification, setRoomNotification] = useState([]);
  const [broadcastMessage, setBroadcastMessage] = useState([]);
  const [error, setError] = useState('');
  const [bottom, setBottom] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [openNotifications, setOpenNoftifications] = useState(false);
  const [bellRing, setBellRing] = useState(false);

  const handleSendClick = () => {
    console.log(message);
    sendMessage('CHAT',message);
    setMessage('');
  }

  const  handleTyping = (event) => {
        setMessage(event.target.value);
        sendMessage('TYPING',message);
  }

   const connect = (userName) => {
       console.log(`From connect user is: ${username}`);
       console.log(localStorage.getItem('accessToken'));

    if (userName) {

      const Stomp = require('stompjs')

      var SockJS = require('sockjs-client')

      SockJS = new SockJS('/ws')

      stompClient = Stomp.over(SockJS);

      stompClient.connect({}, onConnected, onError);

      setUsername(userName);
    }
  }

  const onConnected = () => {

    setChanelConnected(true);

    // Subscribing to the public topic
    stompClient.subscribe('/topic/pubic',onMessageReceived);

    // Registering user to server as a public chat user
    stompClient.send("/app/addUser", {}, JSON.stringify({ sender: username, type: 'JOIN' }))

  }

  const  sendMessage = (type, value) => {

    if (stompClient) {
      var chatMessage = {
        sender: username,
        content: type === 'TYPING' ? value : value,
        type: type

      };
      // send public message
      stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
    }
  }


  
  React.useEffect(() => connect(localStorage.getItem('accessToken'),false), []);


  const onMessageReceived = (payload) => {

    var message = JSON.parse(payload.body);

    if (message.type === 'JOIN') {

      roomNotification.push({ 'sender': message.sender + " ~ joined", 'status': 'online', 'dateTime': message.dateTime })
      
      setRoomNotification(roomNotification);
      setBellRing(true);
     

    }
    else if (message.type === 'LEAVE') {
      roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " ~ joined") {
          notification.status = "offline";
          notification.sender = message.sender + " ~ left";
          notification.dateTime = message.dateTime;
        }
      })
        
      setRoomNotification(roomNotification);
      setBellRing(true);
     
    }
    else if (message.type === 'TYPING') {

      roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " ~ joined") {
          if (message.content)
            notification.status = "typing...";
          else
            notification.status = "online";
        }

      })
     
      setRoomNotification(roomNotification);
     
    }
    else if (message.type === 'CHAT') {

      roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " ~ joined") {
          notification.status = "online";
        }
      })
      broadcastMessage.push({
        message: message.content,
        sender: message.sender,
        dateTime: message.dateTime
      })
      
        setBroadcastMessage(broadcastMessage);

    }
    else {
      // do nothing...
    }
  }

  const onError = (error) => {

    setError('Could not connect you to the Chat Room Server. Please refresh this page and try again!')
    
  }

   useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
    
    
  }, [])


  return (
      
    <div>
                        <Paper style={styles.paper} zDepth={2} >
                            <Paper id="style-1" style={styles.messagesBody}>
                                {/* {
                                    this.state.messages.map(el => TODO: Izvlačit poruke iz baze
                                        ( */}
                                            {/* <div style={styles.message}>
                                                <SnackbarContent
                                                message={
                                                'I love candy. I love cookies. I love cupcakes. \
                                                 I love cheesecake.'
                                                    } action={ 
                                                    <Button color="primary" size="small">
                                                   User3
                                                  </Button>}
                                              />
                                            </div> */}
                                        <div>
                                           {
                                               broadcastMessage.map((msg,i) => 
                                                username === msg.sender ?
                                                   <div style={styles.message}>
                                                <SnackbarContent
                                                message={msg.message} 
                                                action={ 
                                                    <Button color="primary" size="small">
                                                   {msg.sender}
                                                  </Button>}
                                              />
                                               </div> :

                                                <div style={styles.message}>
                                                <SnackbarContent
                                                message={msg.message} 
                                                action={ 
                                                    <Button color="primary" size="small">
                                                   {msg.sender}
                                                  </Button>}
                                              />
                                               </div>
                                               

                                               )
                                           };
                                           </div>
                                           
                                
                            </Paper>
                            <div style={styles.record}>
                                {/* <TextField
                                    id="input"
                                    multiline
                                    rows={2}
                                    value={message}
                                    onKeyPress={ e=>setMessage(e.target.value)}
                                    hintText="Full width"
                                    
                                /> */}
                                <TextField id="standard-basic" 
                                label="Standard"
                                multiline
                                rows={2}
                                //value={message}
                                onKeyPress={ e=>setMessage(e.target.value)}
                                 />
                                <IconButton  id="btn" className="micBtn" style={styles.MicBtn} onClick={handleSendClick} onChange={handleTyping}>
                                    <SendIcon/>
                                </IconButton>
                            </div>
                        </Paper>
                    </div>
  );
}
export default ChatBox;