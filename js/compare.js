class Compare {
  constructor(element) {
    this.element = element;
    this.count = 0;
    this.urlsymbols = [];
  }
  compareButtons(mySymbol, companyProfile) {
    let link = document.getElementById("companyLink");
    if (this.urlsymbols.length < 3 && !this.urlsymbols.includes(mySymbol)) {
      this.count += 1;
      this.urlsymbols.push(mySymbol);

      link.href = `./compare.html?symbol=${this.urlsymbols}`;

      if (this.count === 1) {
        link.textContent = `compare ${this.count} company`;
      } else {
        link.textContent = `compare ${this.count} companies`;
      }

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
  }
  removeCompareButtons(mySymbol, companyProfile) {
    let childButton = document.getElementById(`${mySymbol}`);
    childButton.parentNode.removeChild(childButton);
    this.count -= 1;
    let index = this.urlsymbols.indexOf(mySymbol);
    this.urlsymbols.splice(index, 1);

    let link = document.getElementById("companyLink");
    link.href = `./compare.html?symbol=${this.urlsymbols}`;

    link.textContent = `compare ${this.count} companies`;
    if (this.count === 0) {
      link.classList.add("hidden");
    } else if (this.count === 1) {
      link.textContent = `compare ${this.count} company`;
    }
  }
  compareLink() {
    let companyLink = document.createElement("span");
    companyLink.classList.add("company-link");

    let theCompanyLink = document.createElement("a");
    this.fullURL = `./compare.html?symbol=AAPL,AAON,AABA`;
    theCompanyLink.href = `./compare.html?symbol=${this.urlsymbols}`;
    theCompanyLink.id = "theCompanyLink";
    theCompanyLink.classList.add("the-link");
    theCompanyLink.classList.add("hidden");
    theCompanyLink.id = "companyLink";
    theCompanyLink.textContent = `compare companies`;
    companyLink.appendChild(theCompanyLink);
    this.element.appendChild(companyLink);
  }
}

let myCompare = new Compare(document.getElementById("compareDiv"));
myCompare.compareLink();
