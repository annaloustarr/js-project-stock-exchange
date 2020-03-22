class Results {
  constructor(element) {
    this.element = element;
  }

  // class method to make input element in html
  createResultsElement() {
    let myResults = document.createElement("div");
    myResults.classList.add("search-results");
    myResults.id = "searchResults";
    myResults.textContent = "Search Results";
    this.element.appendChild(myResults);

    let myLoader = document.createElement("div");
    myLoader.classList.add("loader");
    myLoader.id = "loader";
    this.element.appendChild(myLoader);

    let myError = document.createElement("div");
    myError.classList.add("no-search-input");
    myError.id = "noInput";
    myError.textContent = "Your search is empty! Type something!";
    this.element.appendChild(myError);

    let myResultsList = document.createElement("div");
    myResultsList.classList.add("results-list");
    myResultsList.id = "resultsList";
    let resultsUL = document.createElement("ul");
    resultsUL.classList.add("data-list");
    resultsUL.id = "dataList";
    myResultsList.appendChild(resultsUL);
    this.element.appendChild(myResultsList);

    document.getElementById("loader").classList.add("hidden");
    document.getElementById("searchResults").classList.add("hidden");
    document.getElementById("noInput").classList.add("hidden");
  }

  // Clears list when called before refreshing list
  clearList() {
    let listDiv = document.getElementById("dataList");
    let child = listDiv.lastElementChild;
    while (child) {
      listDiv.removeChild(child);
      child = listDiv.lastElementChild;
    }
  }
  // Will get company profile if search is not empty and call function to make list.
  getCompanyData() {
    console.log("this is working?");
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("searchResults").classList.remove("hidden");
    document.getElementById("noInput").classList.add("hidden");
    console.log("are these hidden?");

    let inputFromUser = document.getElementById("myInput");
    console.log(inputFromUser);
    console.log(inputFromUser.value);
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
          this.makeCompanyList(companyList);
        });
    }
  }

  // This draws the list
  makeCompanyList(companyList) {
    this.clearList();
    console.log(companyList);
    // for (let i = 0; i < companyList.length; i++) {
    //   let mySymbol = companyList[i].symbol;

    companyList.map(item => {
      let mySymbol = item.symbol;

      fetch(
        `https://financialmodelingprep.com/api/v3/company/profile/${mySymbol}`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          let companyProfile = data.profile;

          let li = document.createElement("li");

          let companySymbol = document.createElement("a");
          companySymbol.href = `./company.html?symbol=${mySymbol}`;
          companySymbol.textContent = " (" + mySymbol + ")";

          let companyName = document.createElement("a");
          companyName.href = `./company.html?symbol=${mySymbol}`;
          companyName.textContent = companyProfile.companyName;
          companyName.classList.add("company-name");

          let companyImage = companyProfile.image;
          let companyChanges = companyProfile.changes;
          let companyChangesPercentage = companyProfile.changesPercentage;
          companyChanges.id = "stockChanges";
          companyChanges.class = "changes-size";

          let myImg = document.createElement("IMG");
          myImg.setAttribute("src", companyImage);
          myImg.setAttribute("height", "25px");

          let changesText = document.createElement("span");
          changesText.innerHTML = companyChangesPercentage;

          if (companyChanges >= 0) {
            changesText.classList.add("lightgreen");
          } else {
            changesText.classList.add("red");
          }

          li.append(myImg, companyName, companySymbol, changesText);
          listDiv.appendChild(li);
        });
    });
    document.getElementById("loader").classList.add("hidden");
  }
}

let myResults = new Results(document.getElementById("results"));
myResults.createResultsElement();
// myResults.getCompanyData();
// myResults.makeCompanyList();
