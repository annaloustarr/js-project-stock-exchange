class Form {
  constructor(element) {
    this.element = element;
  }

  // class method to make input element in html
  // event listener is now here
  createInputElement() {
    let myInput = document.createElement("input");
    myInput.classList.add("form-control");
    myInput.classList.add("autocompletes");
    myInput.id = "myInput";
    myInput.type = "text";
    myInput.placeholder = "Start typing...";

    this.element.appendChild(myInput);

    let myButton = document.createElement("div");
    myButton.classList.add("input-group-append");
    myButton.id = "myButton";

    let theButton = document.createElement("button");
    theButton.id = "searchButton";
    theButton.type = "button";
    theButton.classList.add("btn");
    theButton.classList.add("btn-outline-secondary");
    theButton.textContent = "Search";
    // theButton.addEventListener("click", this.getCompanyData);

    myButton.appendChild(theButton);

    this.element.appendChild(myButton);
    console.log(myInput);
  }

  //   Will get company profile if search is not empty and call function to make list.
  getCompanyData() {
    console.log("this is working?");
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("searchResults").classList.remove("hidden");
    document.getElementById("noInput").classList.add("hidden");
    console.log("are these hidden?");
    let inputFromUser = document.getElementById("myInput");
    console.log(inputFromUser);
    let userInput = inputFromUser.value;
    console.log(userInput);
    if (userInput.length == 0) {
      document.getElementById("noInput").classList.remove("hidden");
    } else {
      fetch(
        `https://financialmodelingprep.com/api/v3/search?query=${userInput}&limit=10&exchange=NASDAQ`
      )
        .then(response => {
          console.log("hello");
          return response.json();
        })
        .then(data => {
          let companyList = data;
          console.log(companyList);
          //   makeCompanyList(companyList);
          return function() {
            return companyList;
          };
        });
    }
  }
}

let myForm = new Form(document.getElementById("form"));
myForm.createInputElement();

// myForm.getCompanyData();
