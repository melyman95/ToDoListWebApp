var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = document.getElementById("AddItem");
    addItem.onclick = main;
};
function main() {
    if (isValid() == true) {
        var itemKey = "item";
        var item = getItem();
        var itemStr = JSON.stringify(item);
        localStorage.setItem(itemKey, itemStr);
        var resItem = localStorage.getItem(itemKey);
        var myItem = JSON.parse(resItem);
        console.log(myItem);
        displayItem(item);
    }
}
function isValid() {
    var text = document.getElementById("Task").value;
    if (text == "" || text.length == 0 || text == null) {
        alert("Task cannot be empty.");
        return false;
    }
    return true;
}
function getItem() {
    var newItem = new ToDoItem();
    var itemName = getInput("Task");
    newItem.Name = itemName.value;
    var dueDate = getInput("Due");
    newItem.dateDue = new Date(dueDate.value);
    var isCompleted = getInput("is-Complete");
    newItem.Completed = isCompleted.checked;
    return newItem;
}
function displayItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.Name;
    var itemDate = document.createElement("p");
    itemDate.innerText = item.dateDue.toString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markComplete;
    itemDiv.classList.add("To-Do");
    if (item.Completed) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.Completed) {
        var completeItems = document.getElementById("completed-items");
        completeItems.appendChild(itemDiv);
    }
    else if (!item.Completed) {
        var incompleteItems = document.getElementById("incomplete-items");
        incompleteItems.appendChild(itemDiv);
    }
}
function getInput(id) {
    return document.getElementById(id);
}
function markComplete() {
    var itemDiv = this;
    itemDiv.classList.add("completed");
    var completeItems = document.getElementById("completed-items");
    completeItems.appendChild(itemDiv);
}
