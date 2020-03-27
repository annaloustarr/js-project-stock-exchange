class Form {
  constructor(element) {
    this.element = element;
  }

  // class method to make input element in html
  // event listener is now here - really important!
  createInputElement() {
    let myInput = document.createElement("input");
    myInput.classList.add("form-control");
    myInput.classList.add("autocompletes");
    myInput.id = "myInput";
    myInput.type = "text";
    myInput.placeholder = "Start typing...";
    myInput.addEventListener("focus", this.clearInput);
    window.addEventListener("load", this.clearInput);

    this.element.appendChild(myInput);

    let myButton = document.createElement("div");
    myButton.classList.add("input-group-append");
    myButton.id = "myButton";

    let theButton = document.createElement("button");
    theButton.id = "searchButton";
    theButton.type = "button";
    theButton.classList.add("btn");
    theButton.classList.add("btn-outline-secondary");
    theButton.classList.add("purple-button");
    theButton.textContent = "Search";
    theButton.addEventListener("click", this.getCompanyData);
    // theButton.addEventListener("click", myResults.highlightText);

    myButton.appendChild(theButton);
    this.element.appendChild(myButton);
  }

  //   Will get company profile if search is not empty and call function FROM RESULTS CLASS to make list.
  getCompanyData() {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("searchResults").classList.remove("hidden");
    document.getElementById("noInput").classList.add("hidden");
    let inputFromUser = document.getElementById("myInput");
    let userInput = inputFromUser.value;
    if (userInput.length == 0) {
      document.getElementById("noInput").classList.remove("hidden");
    } else {
      fetch(
        `https://financialmodelingprep.com/api/v3/search?query=${userInput}&limit=10&exchange=NASDAQ`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          let companyList = data;
          myResults.makeCompanyList(companyList);
        });
    }
  }

  // clear input onfocus
  clearInput() {
    let inputFromUser = document.getElementById("myInput");
    if (inputFromUser.value != "") {
      inputFromUser.value = "";
    }
  }
}

let myForm = new Form(document.getElementById("form"));
myForm.createInputElement();
