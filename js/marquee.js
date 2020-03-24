class Marquee {
  constructor(element) {
    this.element = element;
  }

  // class method to make element in html to add list to
  createMarqueeElement() {
    let innerDiv = document.createElement("div");
    innerDiv.classList.add("marquee-content");
    let ul = document.createElement("ul");
    ul.id = "marqueeList";
    ul.classList.add("list-inline");
    innerDiv.appendChild(ul);
    this.element.appendChild(innerDiv);
  }

  // class method to make list for marquee
  createMarqueeList() {
    fetch(`https://financialmodelingprep.com/api/v3/stock/real-time-price`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let stockList = data.stockList;
        let marqueeDiv = document.getElementById("marqueeList");
        for (let i = 0; i < 250; i++) {
          let companySymbol = stockList[i].symbol;
          let companyPrice = stockList[i].price;

          let li = document.createElement("li");
          let symbolText = document.createElement("span");
          symbolText.textContent = companySymbol;
          let priceText = document.createElement("span");
          priceText.textContent = ` $${companyPrice}`;
          priceText.classList.add("lightgreen");
          li.append(symbolText, priceText);

          marqueeDiv.appendChild(li);
        }
      });
  }
}

let myMarquee = new Marquee(document.getElementById("marquee"));
myMarquee.createMarqueeElement();
myMarquee.createMarqueeList();

//   keep map here incase I want all 10000+
//   stockList.map(item => {
//     let companySymbol = item.symbol;
//     let companyPrice = item.price;
//   });
