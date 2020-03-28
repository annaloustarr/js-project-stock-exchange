class Compare {
  constructor(element) {
    this.element = element;
    this.count = 0;
    this.usp = new URLSearchParams();
    console.log(this.usp);
    this.queryString = "";
    console.log(this.queryString);
  }
  compareButtons(mySymbol, companyProfile) {
    this.count += 1;
    this.usp.append("symbol", mySymbol);
    console.log(this.usp.getAll("symbol"));
    this.queryString = this.usp.getAll("symbol").toString();
    console.log(this.queryString);

    if (this.count === 1) {
      document.getElementById(
        "companyLink"
      ).textContent = `compare ${this.count} company`;
    } else {
      document.getElementById(
        "companyLink"
      ).textContent = `compare ${this.count} companies`;
    }
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

    let theCompanyLink = document.createElement("a");
    theCompanyLink.href = `./compare.html?symbol=AAPL,AAON,AABA`;
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
    // let elem = document.getElementById("companyButton");
    childButton.parentNode.removeChild(childButton);
    this.count -= 1;

    document.getElementById(
      "companyLink"
    ).textContent = `compare ${this.count} companies`;
    if (this.count === 0) {
      document.getElementById("companyLink").classList.add("hidden");
    } else if (this.count === 1) {
      document.getElementById(
        "companyLink"
      ).textContent = `compare ${this.count} company`;
    }
  }
}

let myCompare = new Compare(document.getElementById("compareDiv"));
myCompare.compareLink();
