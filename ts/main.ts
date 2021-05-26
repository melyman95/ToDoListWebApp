
class ToDoItem {
    Name:string;
    dateDue:Date;
    Completed:boolean;
}

window.onload = function () {
    let addItem = document.getElementById("AddItem");
    addItem.onclick = main;
}

function main() {
    if (isValid() == true) {
    const itemKey = "item";
    let item = getItem();
    let itemStr = JSON.stringify(item);
    localStorage.setItem(itemKey, itemStr);

    let resItem = localStorage.getItem(itemKey);
    let myItem:ToDoItem = JSON.parse(resItem);
    
    console.log(myItem);
    displayItem(item);
    }
}

function isValid():boolean {
    let text = (<HTMLInputElement>document.getElementById("Task")).value;
    if (text == "" || text.length == 0 || text == null) {
        alert("Task cannot be empty.");
        return false;
    }
    return true;
}

function getItem():ToDoItem {
    let newItem = new ToDoItem();
    let itemName = getInput("Task");
    newItem.Name = itemName.value;
    // Item name

    let dueDate = getInput("Due");
    newItem.dateDue = new Date(dueDate.value);
    // Item due date

    let isCompleted = getInput("is-Complete");
    newItem.Completed = isCompleted.checked;
    return newItem;
}

function displayItem(item:ToDoItem):void {
    let itemText = document.createElement("h3");
    itemText.innerText = item.Name;
    // item name text

    let itemDate = document.createElement("p");
    itemDate.innerText = item.dateDue.toString();

    let itemDiv = document.createElement("div");
    itemDiv.onclick = markComplete;
    itemDiv.classList.add("To-Do");

    if (item.Completed) {
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if (item.Completed) {
        let completeItems = document.getElementById("completed-items");
        completeItems.appendChild(itemDiv);
    }
    else if (!item.Completed) {
        let incompleteItems = document.getElementById("incomplete-items");
        incompleteItems.appendChild(itemDiv);
    }
}

function getInput(id):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

function markComplete() {
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("completed");

    let completeItems = document.getElementById("completed-items");
    completeItems.appendChild(itemDiv);
}