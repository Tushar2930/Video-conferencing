import helpers from './helpers.js';

window.addEventListener('load', ()=>{
    //When the chat icon is clicked
    document.querySelector('#toggle-chat-pane').addEventListener('click', (e)=>{
        let chatElem = document.querySelector('#chat-pane');
        let mainSecElem = document.querySelector('#main-section');

        if(chatElem.classList.contains('chat-opened')){
            chatElem.setAttribute('hidden', true);
            mainSecElem.classList.remove('col-md-9');
            mainSecElem.classList.add('col-md-12');
            chatElem.classList.remove('chat-opened');
        }

        else{
            chatElem.attributes.removeNamedItem('hidden');
            mainSecElem.classList.remove('col-md-12');
            mainSecElem.classList.add('col-md-9');
            chatElem.classList.add('chat-opened');
            document.getElementById('chat-input').focus();
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout(()=>{
            if(document.querySelector('#chat-pane').classList.contains('chat-opened')){
                helpers.toggleChatNotificationBadge();
            }
        }, 300);
    });


    //When the video frame is clicked. This will enable picture-in-picture
    document.getElementById('local').addEventListener('click', ()=>{
        if (!document.pictureInPictureElement) {
            document.getElementById('local').requestPictureInPicture()
            .catch(error => {
                // Video failed to enter Picture-in-Picture mode.
                alert('Cannot Enter Picture In Picture Mode. Error: ' + error);
            });
        }

        else {
            document.exitPictureInPicture()
            .catch(error => {
                // Video failed to leave Picture-in-Picture mode.
                alert('Failed to exit picture in picture mode. Error: ' + error);
            });
        }
    });


    //When the 'Create room" is button is clicked
    document.getElementById('create-room').addEventListener('click', (e)=>{
        e.preventDefault();

        if (/\S/.test(document.querySelector('#room-name').value) && /\S/.test(document.querySelector('#your-name').value)){
            let roomName = document.querySelector('#room-name').value;
            let yourName = document.querySelector('#your-name').value;

            if (roomName && yourName) {
                //remove error message, if any
                document.querySelector('#err-msg').innerHTML = "";

                //save the user's name in sessionStorage
                sessionStorage.setItem('username', yourName);

                //create room link
                let roomLink = `${location.origin}?room=${roomName.trim().replace(' ', '_')}_${helpers.generateRandomString()}`;

                //show message with link to room
                document.querySelector('#room-created').innerHTML = `<font style="color: green">Conference successfully created.</font><br>Share the room link with your members (click <a href="#" onclick="copier('${roomLink}');">here</a> to copy).<br>Click <a href='${roomLink}'>here</a> to enter room.`;
    
                //empty the values
                document.querySelector('#room-name').value = '';
                document.querySelector('#your-name').value = '';
            }

            else {
                document.querySelector('#err-msg').innerHTML = "Room Name And Your Name Are Required. No Blank Spaces.";
            }
        }
        
        else {
            document.querySelector('#err-msg').innerHTML = "Room Name And Your Name Are Required. No Blank Spaces.";
        }
    });

    //When the 'Enter room' button is clicked.
    document.getElementById('enter-room').addEventListener('click', (e)=>{
        e.preventDefault();

        let name = document.querySelector('#username').value;

        if(name){
            //remove error message, if any
            document.querySelector('#err-msg-username').innerHTML = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem('username', name);

            //reload room
            location.reload();
        }

        else{
            document.querySelector('#err-msg-username').innerHTML = "Please input your name";
        }
    });


    document.addEventListener('click', (e)=>{
        if(e.target && e.target.classList.contains('expand-remote-video')){
            helpers.maximiseStream(e);
        }

        else if(e.target && e.target.classList.contains('mute-remote-mic')){
            helpers.singleStreamToggleMute(e);
        }
    });


    document.getElementById('closeModal').addEventListener('click', ()=>{
        helpers.toggleModal('recording-options-modal', false);
    });
})