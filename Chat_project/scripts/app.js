const list = document.querySelector(".chat-list");
const sendMsg = document.querySelector(".new-chat");
const upName = document.querySelector(".new-name");
const suc = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");
const newUser = localStorage.author ? localStorage.author : "Rahul";


const ui = new ChatUI(list);
const chatroom = new Chatroom(newUser, "general");

//calling getChats to print the messages on the document
chatroom.getChats(data => ui.render(data));

//added event listener to update the room
upName.addEventListener("submit", e => {
    e.preventDefault();
    const newName = upName.name.value;
    chatroom.upAuthor(newName);
    upName.reset();
    suc.innerText = `Your name has been updated to ${newName}`;
    setInterval(() => suc.innerText = "", 3000);
})

//event listener to send the messages to firebase
sendMsg.addEventListener("submit", e => {
    e.preventDefault();
    const msg = sendMsg.message.value.trim();
    chatroom.addChat(msg).then(() => sendMsg.reset()).catch(err => console.log(err));
});

//event listener to change the room
rooms.addEventListener("click", e => {
    e.preventDefault();
    console.log(e.target.id);
    if (e.target.tagName === "BUTTON") {
        ui.clear();
        chatroom.upRoom(e.target.id);
        chatroom.getChats(chat => ui.render(chat));
    }
});