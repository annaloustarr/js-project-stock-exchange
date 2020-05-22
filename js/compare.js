class Compare {
  constructor(element) {
    this.element = element;
    this.count = 0;
    this.urlsymbols = [];
  }
  // Renders compare company buttons after clicking compare button in the company List
  // called in RESULTS CLASS
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

      let companyButtonSpan = document.createElement("span");
      companyButtonSpan.classList.add("company-button");
      companyButtonSpan.id = "companyButton";

      let companyButton = document.createElement("button");
      companyButton.id = `${mySymbol}`;
      companyButton.type = "button";
      companyButton.classList.add("btn");
      companyButton.classList.add("btn-outline-secondary");
      companyButton.classList.add("compare-button");
      companyButton.textContent = `${mySymbol} x`;
      companyButton.addEventListener("click", () => {
        this.removeCompareButtons(mySymbol, companyProfile);
      });
      companyButtonSpan.appendChild(companyButton);
      this.element.appendChild(companyButtonSpan);
    }
  }
  // Removes rendered company compare buttons when clicked again
  // called above in comareButtons
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
  // Rendered company companies link
  compareLink() {
    let companyLinkSpan = document.createElement("span");
    companyLinkSpan.classList.add("company-link");

    let companyLink = document.createElement("a");
    this.fullURL = `./compare.html?symbol=AAPL,AAON,AABA`;
    companyLink.href = `./compare.html?symbol=${this.urlsymbols}`;
    companyLink.id = "theCompanyLink";
    companyLink.classList.add("the-link");
    companyLink.classList.add("hidden");
    companyLink.id = "companyLink";
    companyLink.textContent = `compare companies`;
    companyLinkSpan.appendChild(companyLink);
    this.element.appendChild(companyLinkSpan);
  }
}

let comparing = new Compare(document.getElementById("compareDiv"));
comparing.compareLink();
