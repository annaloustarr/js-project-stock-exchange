class Form {
  constructor(element) {
    this.element = element;
  }

  // class method to make input element in html
  // event listener is now here - really important!
  createInputElement() {
    let searchInput = document.createElement("input");
    searchInput.classList.add("form-control");
    searchInput.classList.add("autocompletes");
    searchInput.id = "myInput";
    searchInput.type = "text";
    searchInput.placeholder = "Start typing...";
    searchInput.addEventListener("focus", this.clearInput);
    window.addEventListener("load", this.clearInput);

    this.element.appendChild(searchInput);

    let searchButtonDiv = document.createElement("div");
    searchButtonDiv.classList.add("input-group-append");
    searchButtonDiv.id = "myButton";

    let searchButton = document.createElement("button");
    searchButton.id = "searchButton";
    searchButton.type = "button";
    searchButton.classList.add("btn");
    searchButton.classList.add("btn-outline-secondary");
    searchButton.classList.add("purple-button");
    searchButton.textContent = "Search";
    searchButton.addEventListener("click", this.getCompanyData);
    // theButton.addEventListener("click", myResults.highlightText);

    searchButtonDiv.appendChild(searchButton);
    this.element.appendChild(searchButtonDiv);
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
        `https://financialmodelingprep.com/api/v3/search?query=${userInput}&limit=10&exchange=NASDAQ&apikey=${apiKey}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let companyList = data;
          companyResults.makeCompanyList(companyList);
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

let searchForm = new Form(document.getElementById("form"));
searchForm.createInputElement();
