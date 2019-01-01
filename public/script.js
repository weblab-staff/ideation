// let xhttp = new XMLHttpRequest();
let socket = io();

function send() {
  let inputValue = sanitize($("#ideainput").val());
  socket.emit("user input", inputValue);
  $("#ideainput").val("");
  $("#ideainput").focus();
}

$(document).keypress(function(e) {
  if (e.which == 13 && $(document.activeElement)[0] == $("#ideainput")[0]) {
    send();
  }
});

socket.on("new idea", ideaPartial => {
  $("#ideas").append($(ideaPartial));
  bottomScroll();
});

function bottomScroll() {
  let height = 0;
  let ideas = document.getElementById("ideas");

  if (ideas) {
    let height = ideas.scrollHeight;
    ideas.scrollTop = height;
  }
}
// sanitize inputs
// citation: https://github.com/cure53/DOMPurify
function sanitize(dirty) {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["b", "em", "marquee", "img", "a"],
    FORBID_TAGS: ["style", "script"]
  });
}
