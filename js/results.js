class Results {
  constructor(element) {
    this.element = element;
    this.companyProfile = [];
  }

  // class method to make input element in html
  createResultsElement() {
    let stockResults = document.createElement("div");
    stockResults.classList.add("search-results");
    stockResults.id = "searchResults";
    stockResults.textContent = "Search Results";
    this.element.appendChild(stockResults);

    let spinner = document.createElement("div");
    spinner.classList.add("loader");
    spinner.id = "loader";
    this.element.appendChild(spinner);

    let searchError = document.createElement("div");
    searchError.classList.add("no-search-input");
    searchError.id = "noInput";
    searchError.textContent = "Your search is empty! Type something!";
    this.element.appendChild(searchError);

    let resultsList = document.createElement("div");
    resultsList.classList.add("results-list");
    resultsList.id = "resultsList";
    let resultsUL = document.createElement("ul");
    resultsUL.classList.add("data-list");
    resultsUL.id = "dataList";
    resultsList.appendChild(resultsUL);
    this.element.appendChild(resultsList);

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
    companyList.map((item) => {
      let companySymbol = item.symbol;

      fetch(
        `https://financialmodelingprep.com/api/v3/company/profile/${companySymbol}?apikey=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          //destructuring
          // let {image, changes, changesPercentage, companyName} = data.profile
          let companyProfile = data.profile;

          let listDiv = document.getElementById("dataList");
          let li = document.createElement("li");

          let inputFromUser = document.getElementById("myInput");
          let searchTerm = inputFromUser.value;

          let companySymbol = document.createElement("a");
          companySymbol.href = `./company.html?symbol=${companySymbol}`;
          let symbolString = " (" + companySymbol + ")";

          let highlightSS = symbolString.replace(
            new RegExp(searchTerm, "gi"),
            (match) => `<span class="yellow">${match}</span>`
          );

          companySymbol.innerHTML = highlightSS;

          let companyName = document.createElement("a");
          companyName.href = `./company.html?symbol=${companySymbol}`;
          let nameString = companyProfile.companyName;

          let highlightNS = nameString.replace(
            new RegExp(searchTerm, "gi"),
            (match) => `<span class="yellow">${match}</span>`
          );
          companyName.innerHTML = highlightNS;
          companyName.classList.add("company-name");

          let companyImage = companyProfile.image;
          let companyChanges = companyProfile.changes;
          let companyChangesPercentage = companyProfile.changesPercentage;

          let logoImg = document.createElement("IMG");
          logoImg.setAttribute("src", companyImage);
          logoImg.setAttribute("width", "40px");

          let changesText = document.createElement("span");
          changesText.textContent = companyChangesPercentage;

          if (companyChanges >= 0) {
            changesText.classList.add("lightgreen");
          } else {
            changesText.classList.add("red");
          }

          let compareButtonSpan = document.createElement("span");
          compareButtonSpan.classList.add("compare-button");
          compareButtonSpan.id = "compareButton";

          let compareButton = document.createElement("button");
          compareButton.id = `${companySymbol}compareButton`;
          compareButton.type = "button";
          compareButton.classList.add("btn");
          compareButton.classList.add("btn-outline-secondary");
          compareButton.classList.add("half-curved");
          compareButton.textContent = "Compare";
          compareButton.addEventListener("click", () => {
            comparing.compareButtons(companySymbol, companyProfile);
          });
          compareButtonSpan.appendChild(compareButton);

          li.append(
            logoImg,
            companyName,
            companySymbol,
            changesText,
            compareButton
          );
          listDiv.appendChild(li);
        });
    });

    document.getElementById("loader").classList.add("hidden");
  }
}

let companyResults = new Results(document.getElementById("results"));
companyResults.createResultsElement();
