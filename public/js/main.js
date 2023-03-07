const chatContanier = document.querySelector(".chat-messages");
const chatForm = document.querySelector("#chat-form");

const socket = io();
socket.on("message", (msg) => {
  outputMsg(msg);
  chatContanier.scrollTop = chatContanier.scrollHeight;
});

socket.on("username", (user) => {
  console.log(user);
  joinMsg(user);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  socket.emit("chat", msg);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputMsg(msg) {
  let msgHtml = `
  <div class="message">
            <p class="meta">${msg.userName} <span>${msg.date}</span></p>
            <p class="text">
             ${msg.text}
            </p>
          </div>
  `;
  chatContanier.insertAdjacentHTML("beforeend", msgHtml);
}

function joinMsg(user) {
  let msgHtml = `
    <div class="message">
           
              <p class="text">
              ${user} has joined the chat
              </p>
            </div>
    `;
  chatContanier.insertAdjacentHTML("beforeend", msgHtml);
}
