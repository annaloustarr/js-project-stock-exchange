document.getElementById("loader").classList.add("hidden");
document.getElementById("searchResults").classList.add("hidden");
document.getElementById("noInput").classList.add("hidden");

let listDiv = document.getElementById("dataList");

// Clears list when called before refreshing list
function clearList() {
  let child = listDiv.lastElementChild;
  while (child) {
    listDiv.removeChild(child);
    child = listDiv.lastElementChild;
  }
}
// Will get company profile if search is not empty and call function to make list.
function getCompanyData(x) {
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
        makeCompanyList(companyList);
      });
  }
}

// This draws the list
function makeCompanyList(companyList) {
  clearList();

  // for (let i = 0; i < companyList.length; i++) {
  //   let mySymbol = companyList[i].symbol;

  companyList.map(item => {
    let mySymbol = item.symbol;

    let li = document.createElement("li");

    let companySymbol = document.createElement("a");
    companySymbol.setAttribute("href", `/company.html?symbol=${mySymbol}`);
    companySymbol.textContent = " (" + mySymbol + ")";

    fetch(
      `https://financialmodelingprep.com/api/v3/company/profile/${mySymbol}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let companyProfile = data.profile;

        let companyName = document.createElement("a");
        companyName.setAttribute("href", `/company.html?symbol=${mySymbol}`);
        companyName.textContent = companyProfile.companyName;
        companyName.classList.add("company-name");

        let companyImage = companyProfile.image;
        let companyChanges = companyProfile.changes;
        companyChanges.id = "stockChanges";
        companyChanges.class = "changes-size";

        let myImg = document.createElement("IMG");
        myImg.setAttribute("src", companyImage);
        myImg.setAttribute("height", "25px");

        let changesText = document.createElement("span");
        changesText.innerHTML = "(" + companyChanges + "%)";

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

// make array of all the companies

document
  .getElementById("searchButton")
  .addEventListener("click", getCompanyData);
