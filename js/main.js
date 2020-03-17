document.getElementById("loader").classList.add("hidden");
document.getElementById("searchResults").classList.add("hidden");

let listDiv = document.getElementById("dataList");

function clearList() {
  let child = listDiv.lastElementChild;
  while (child) {
    listDiv.removeChild(child);
    child = listDiv.lastElementChild;
  }
}

function getCompanyData(x) {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("searchResults").classList.remove("hidden");
  let userInput = document.getElementById("myInput").value;
  console.log(userInput);
  fetch(
    `https://financialmodelingprep.com/api/v3/search?query=${userInput}&limit=10&exchange=NASDAQ`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      let companyList = data;
      console.log(companyList);
      clearList();

      for (let i = 0; i < companyList.length; i++) {
        let li = document.createElement("li");

        let mySymbol = companyList[i].symbol;

        let companyName = document.createElement("a");
        companyName.setAttribute("href", `/company.html?symbol=${mySymbol}`);
        companyName.innerText = companyList[i].name;
        companyName.classList.add("search-page-company-name");

        let companySymbol = document.createElement("a");
        companySymbol.setAttribute("href", `/company.html?symbol=${mySymbol}`);
        companySymbol.innerText = " (" + companyList[i].symbol + ")";

        fetch(
          `https://financialmodelingprep.com/api/v3/company/profile/${mySymbol}`
        )
          .then(response => {
            return response.json();
          })
          .then(data => {
            let companyProfile = data.profile;

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
      }
      document.getElementById("loader").classList.add("hidden");
    });
}

document
  .getElementById("searchButton")
  .addEventListener("click", getCompanyData);
