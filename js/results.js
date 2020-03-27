class Results {
  constructor(element) {
    this.element = element;
    this.companyProfile = [];
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

  // This draws the list
  makeCompanyList(companyList) {
    this.clearList();

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

          let listDiv = document.getElementById("dataList");
          let li = document.createElement("li");

          let inputFromUser = document.getElementById("myInput");
          let searchTerm = inputFromUser.value;

          let companySymbol = document.createElement("a");
          companySymbol.href = `./company.html?symbol=${mySymbol}`;
          let symbolString = " (" + mySymbol + ")";

          let highlightSS = symbolString.replace(
            new RegExp(searchTerm, "gi"),
            match => `<span class="yellow">${match}</span>`
          );

          companySymbol.innerHTML = highlightSS;

          let companyName = document.createElement("a");
          companyName.href = `./company.html?symbol=${mySymbol}`;
          let nameString = companyProfile.companyName;

          let highlightNS = nameString.replace(
            new RegExp(searchTerm, "gi"),
            match => `<span class="yellow">${match}</span>`
          );
          companyName.innerHTML = highlightNS;
          companyName.classList.add("company-name");

          let companyImage = companyProfile.image;
          let companyChanges = companyProfile.changes;
          let companyChangesPercentage = companyProfile.changesPercentage;

          let myImg = document.createElement("IMG");
          myImg.setAttribute("src", companyImage);
          myImg.setAttribute("height", "30px");

          let changesText = document.createElement("span");
          changesText.textContent = companyChangesPercentage;

          if (companyChanges >= 0) {
            changesText.classList.add("lightgreen");
          } else {
            changesText.classList.add("red");
          }

          let compareButton = document.createElement("span");
          compareButton.classList.add("compare-button");
          compareButton.id = "compareButton";

          let theCompareButton = document.createElement("button");
          theCompareButton.id = `${mySymbol}compareButton`;
          theCompareButton.type = "button";
          theCompareButton.classList.add("btn");
          theCompareButton.classList.add("btn-outline-secondary");
          theCompareButton.classList.add("half-curved");
          theCompareButton.textContent = "Compare";
          theCompareButton.addEventListener("click", () => {
            myCompare.compareButtons(mySymbol, companyProfile);
          });
          compareButton.appendChild(theCompareButton);

          li.append(
            myImg,
            companyName,
            companySymbol,
            changesText,
            theCompareButton
          );
          listDiv.appendChild(li);
        });
    });

    document.getElementById("loader").classList.add("hidden");
  }
}
class Compare {
  constructor(element) {
    this.element = element;
    this.count = 0;
  }
  compareButtons(mySymbol, companyProfile) {
    this.count += 1;
    document.getElementById(
      "companyLink"
    ).textContent = `compare ${this.count} companies`;
    console.log(this.count);
    console.log(companyProfile);

    document.getElementById("companyLink").classList.remove("hidden");
    this.element.classList.add("compare-div");

    let companyButton = document.createElement("span");
    companyButton.classList.add("company-button");
    companyButton.id = "companyButton";

    let theCompanyButton = document.createElement("button");
    theCompanyButton.id = `${mySymbol}`;
    theCompanyButton.type = "button";
    theCompanyButton.classList.add("btn");
    theCompanyButton.classList.add("btn-outline-secondary");
    theCompanyButton.classList.add("compare-button");
    theCompanyButton.textContent = `${mySymbol} x`;
    theCompanyButton.addEventListener("click", () => {
      this.removeCompareButtons(mySymbol, companyProfile);
    });
    companyButton.appendChild(theCompanyButton);
    this.element.appendChild(companyButton);
  }
  compareLink() {
    let companyLink = document.createElement("span");
    companyLink.classList.add("company-link");
    // companyLink.classList.add("hidden");

    let theCompanyLink = document.createElement("a");
    // theCompanyLink.href = `./compare.html?symbols=${mySymbol},${mySymbol},${mySymbol}`;
    theCompanyLink.href = `./compare.html?symbols=`;
    theCompanyLink.id = "theCompanyLink";
    theCompanyLink.classList.add("the-link");
    theCompanyLink.classList.add("hidden");
    theCompanyLink.id = "companyLink";
    theCompanyLink.textContent = `compare companies`;
    companyLink.appendChild(theCompanyLink);
    this.element.appendChild(companyLink);
  }

  removeCompareButtons(mySymbol, companyProfile) {
    let childButton = document.getElementById(`${mySymbol}`);
    let elem = document.getElementById("companyButton");
    childButton.parentNode.removeChild(childButton);
    this.count -= 1;
    document.getElementById(
      "companyLink"
    ).textContent = `compare ${this.count} companies`;
    if (this.count === 0) {
      document.getElementById("companyLink").classList.add("hidden");
    }
    console.log(this.count);
  }
}

let myResults = new Results(document.getElementById("results"));
myResults.createResultsElement();

let myCompare = new Compare(document.getElementById("compareDiv"));
myCompare.compareLink();
