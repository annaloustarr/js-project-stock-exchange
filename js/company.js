class Company {
  constructor(element) {
    this.element = element;
  }

  createCompanyElement() {
    let myCompanyTitle = document.createElement("div");
    myCompanyTitle.classList.add("company-title");
    this.element.appendChild(myCompanyTitle);

    let myCompanyLogo = document.createElement("span");
    myCompanyLogo.id = "companyLogo";
    myCompanyLogo.classList.add("company-logo");
    myCompanyTitle.appendChild(myCompanyLogo);

    let myCompanyName = document.createElement("span");
    myCompanyName.id = "companyName";
    myCompanyName.classList.add("company-name");
    myCompanyTitle.appendChild(myCompanyName);

    let thePricesDiv = document.createElement("div");
    this.element.appendChild(thePricesDiv);

    let myStockPrice = document.createElement("span");
    myStockPrice.id = "stockPrice";
    myStockPrice.classList.add("stock-price");
    thePricesDiv.appendChild(myStockPrice);

    let myStockChanges = document.createElement("span");
    myStockChanges.id = "stockChanges";
    myStockChanges.classList.add("stock-changes");
    thePricesDiv.appendChild(myStockChanges);

    let myDescription = document.createElement("div");
    myDescription.id = "description";
    myDescription.classList.add("description");
    this.element.appendChild(myDescription);

    let myLoader = document.createElement("div");
    myLoader.id = "loader2";
    myLoader.classList.add("loader2");
    this.element.appendChild(myLoader);

    let myChartDiv = document.createElement("div");
    myChartDiv.classList.add("chart-size");
    this.element.appendChild(myChartDiv);

    let myCanvas = document.createElement("canvas");
    myCanvas.id = "myChart";
    myChartDiv.appendChild(myCanvas);
    this.windowOnLoad();
  }

  // get the query string when window opens
  windowOnLoad() {
    document.getElementById("loader2").classList.add("hidden");
    let qs = document.location.search.substring(
      1,
      document.location.search.length
    );
    let qsSymbol = qs.split("=");
    let symbolString = qsSymbol[1];
    this.getCompanyProfile(symbolString);
    this.getCompanyStockHistory(symbolString);
  }

  // get company profile and fill html elements
  getCompanyProfile(symbolString) {
    document.getElementById("loader2").classList.remove("hidden");
    fetch(
      `https://financialmodelingprep.com/api/v3/company/profile/${symbolString}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let companyProfile = data.profile;

        let companyImage = companyProfile.image;
        let companyName = companyProfile.companyName;
        let companyDescription = companyProfile.description;
        let companyLink = companyProfile.website;
        let companyStockPrices = companyProfile.price;
        let companyChanges = companyProfile.changes;
        let companyChangesPercentage = companyProfile.changesPercentage;

        let imageSpan = document.getElementById("companyLogo");
        let myImg = document.createElement("IMG");
        myImg.setAttribute("src", companyImage);
        myImg.setAttribute("height", "50px");
        myImg.setAttribute("alt", "The logo");
        imageSpan.appendChild(myImg);

        document.getElementById("companyName").textContent = companyName;
        document.getElementById("stockPrice").textContent =
          "Stock Price: $" + companyStockPrices;
        let changesText = companyChangesPercentage;
        document.getElementById("stockChanges").textContent = changesText;
        document.getElementById("description").textContent = companyDescription;

        if (companyChanges >= 0) {
          document.getElementById("stockChanges").classList.add("lightgreen");
        } else {
          document.getElementById("stockChanges").classList.add("red");
        }
        document.getElementById("loader2").classList.add("hidden");
      });
  }

  // get company stock price history and pass it to chart drawing function
  getCompanyStockHistory(symbolString) {
    document.getElementById("loader2").classList.remove("hidden");
    fetch(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${symbolString}?serietype=line`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let companyStockData = data.historical;

        let datalabelsArray = [];
        let dataPointsArray = [];

        for (let i = 0; i < companyStockData.length; i++) {
          let datalabels = companyStockData[i].date;
          datalabelsArray.push(datalabels);
          let dataPoints = companyStockData[i].close;
          dataPointsArray.push(dataPoints);
        }

        this.drawChart(datalabelsArray, dataPointsArray);
      });
  }
  // Draw the chart with the stock price history
  drawChart(datalabelsArray, dataPointsArray) {
    let ctx = document.getElementById("myChart").getContext("2d");
    let chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: datalabelsArray,
        datasets: [
          {
            label: "Stock Price History",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            fill: false,
            data: dataPointsArray
          }
        ]
      },
      options: {}
    });
  }
}

let myNewCompany = new Company(document.getElementById("company"));
myNewCompany.createCompanyElement();
// myNewCompany.windowOnLoad();
