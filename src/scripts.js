//1_) Adding a new item to the list of items:
let todoList = (function () {
  // Our global variables
  let textInput = $("#input");
  let addButton = $("#button");
  let map = { enter: false, control: false };

  function newItem() {
    let inputValue = textInput.val();
    //Creating a new li element
    let li = $("<li></li>");
    li.append(inputValue);

    if (inputValue === "") {
      alert("You must write something");
    } else {
      $("#list").append(li);
    }
    //2) Crossing out an item from the list of items:
    function crossOut() {
      li.toggleClass("strike");
    }

    li.on("dblclick", crossOut());

    // 3)(i) Adding the delete button
    let crossOutButton = $("<crossOutButton> </crossOutButton");
    crossOutButton.append($('<input type="checkbox" value="checkbox">'));
    li.append(crossOutButton);
    if (li.css("background")[5] === "0") {
      crossOutButton.addClass("grey-hover");
    }

    crossOutButton.on("click", deleteListItem);
    function deleteListItem() {
      li.fadeOut(250);
    }
    // 4) Reordering the items
    $("#list").sortable();
  }

  // fires and indicates which keys are pressed
  textInput.on("keydown", (e) => {
    // if there is keys in map then return true
    if (e.key in map) {
      map[e.key] = true;
    }
    if (Object.values(map).filter((v) => v === true).length === 2) {
      newItem();
    }
  });

  textInput.on("keyup", (e) => {
    if (Object.values(map).filter((v) => v === true).length === 2) {
      textInput.val(); // gets textInput values
    }

    if (e.key in map) {
      map[e.key] = false;
    }
  });

  addButton.on("click", (e) => {
    textInput.val("");
    textInput.focus();
  });

  return { newItem: newItem };
})();
