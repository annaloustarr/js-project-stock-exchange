// function to make element is html to add list to
function createMarqueeElement() {
  let marqueediv = document.getElementById("marquee");
  let div = document.createElement("div");
  div.classList.add("marquee-content");
  let ul = document.createElement("ul");
  ul.id = "marqueeList";
  ul.classList.add("list-inline");
  div.appendChild(ul);
  marqueediv.appendChild(div);
}

createMarqueeElement();

// function to make list for marquee
function createMarqueeList() {
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
        symbolText.innerHTML = companySymbol;
        let priceText = document.createElement("span");
        priceText.innerHTML = " $" + companyPrice;
        priceText.classList.add("lightgreen");
        li.append(symbolText, priceText);

        marqueeDiv.appendChild(li);
      }
    });
}
createMarqueeList();

//   keep map here incase I want all 10000+
//   stockList.map(item => {
//     let companySymbol = item.symbol;
//     let companyPrice = item.price;
//   });
