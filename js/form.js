let formDiv = document.getElementById("form");

class Form {
  constructor(element) {
    this.element = element;
  }

  // class method to make input element in html
  createInputElement() {
    let myInput = document.createElement("input");
    myInput.classList.add("form-control");
    myInput.id = "myInput";
    myInput.type = "text";
    myInput.placeholder = "Start typing...";
    this.element.appendChild(myInput);
  }

  // class method to make button element in html
  createButtonElement() {
    let myButton = document.createElement("div");
    myButton.classList.add("input-group-append");
    myButton.id = "myButton";

    let theButton = document.createElement("button");
    theButton.id = "searchButton";
    theButton.type = "button";
    theButton.classList.add("btn");
    theButton.classList.add("btn-outline-secondary");
    theButton.textContent = "Search";
    myButton.appendChild(theButton);

    this.element.appendChild(myButton);
  }
}

let myForm = new Form(formDiv);
myForm.createInputElement();
myForm.createButtonElement();
