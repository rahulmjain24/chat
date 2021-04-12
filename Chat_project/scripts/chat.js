//created new class Chatroom and stored all the fucntions into it
class Chatroom {
    constructor(author, room) {
        this.author = author;
        this.room = room;
        this.chats = db.collection("chat");
        this.unsub;
    }

    //fucntion too created the message object with message, author, time, and room and send it to database
    async addChat(message) {
        const now = new Date();
        const chat = {
            author: this.author,
            room: this.room,
            message,
            time: firebase.firestore.Timestamp.fromDate(now)
        };
        const response = await this.chats.add(chat);
        return this;
    }

    //fucntion to sget the chat from database and show it on the document
    getChats(callback) {
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy("time")
            .onSnapshot(snaphot => {
                snaphot.docChanges().forEach(change => {
                    const id = change.doc.id;
                    if (change.type === "added") {
                        callback(change.doc.data());
                    }
                });
            });
    }

    //function to update the author name
    upAuthor(author) {
        this.author = author;
        localStorage.setItem("author", author)
    }

    //fucntion to update the chat room
    upRoom(room) {
        this.room = room;
        if (this.unsub) {
            this.unsub();
        }
    }
}


