//new class to change the Html file
class ChatUI {
    constructor(list) {
        this.list = list;

    }

    //to clear the previous messages
    clear() {
        this.list.innerHTML = "";
    }

    //function to get the data from getChats fucntion and put it in the render fucntion to update the messages
    render(data) {
        const when = dateFns.distanceInWordsToNow(data.time.toDate(), { addSuffix: true });
        const html = `
        <li style="background-color:#717171;" "class="list-group-item">
        <span class="author">${data.author}</span> <span class="time">${when}</span><br>
        <span class="message">${data.message}</span>
        
        </li>
        `;
        this.list.innerHTML += html;
        //console.log("success");
    }
}