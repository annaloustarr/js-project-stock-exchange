let apiKey = "9b9e24c6bc1f1a8dd94de27a361bc77a";

class Company {
  constructor(element) {
    this.element = element;
  }

  createCompanyElement() {
    let companyTitle = document.createElement("div");
    companyTitle.classList.add("company-title");
    this.element.appendChild(companyTitle);

    let companyLogo = document.createElement("span");
    companyLogo.id = "companyLogo";
    companyLogo.classList.add("company-logo");
    companyTitle.appendChild(companyLogo);

    let companyName = document.createElement("span");
    companyName.id = "companyName";
    companyName.classList.add("company-name");
    companyTitle.appendChild(companyName);

    let pricesDiv = document.createElement("div");
    this.element.appendChild(pricesDiv);

    let stockPrice = document.createElement("span");
    stockPrice.id = "stockPrice";
    stockPrice.classList.add("stock-price");
    pricesDiv.appendChild(stockPrice);

    let stockChanges = document.createElement("span");
    stockChanges.id = "stockChanges";
    stockChanges.classList.add("stock-changes");
    pricesDiv.appendChild(stockChanges);

    let stockDesc = document.createElement("div");
    stockDesc.id = "description";
    stockDesc.classList.add("description");
    this.element.appendChild(stockDesc);

    let loader = document.createElement("div");
    loader.id = "loader2";
    loader.classList.add("loader2");
    this.element.appendChild(loader);

    let chartDiv = document.createElement("div");
    chartDiv.classList.add("chart-size");
    this.element.appendChild(chartDiv);

    let canvas = document.createElement("canvas");
    canvas.id = "myChart";
    chartDiv.appendChild(canvas);

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
      `https://financialmodelingprep.com/api/v3/company/profile/${symbolString}?apikey=${apiKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let companyProfile = data.profile;

        let companyImage = companyProfile.image;
        let companyName = companyProfile.companyName;
        let companyDescription = companyProfile.description;
        let companyLink = companyProfile.website;
        let companyStockPrices = companyProfile.price;
        let companyChanges = companyProfile.changes;
        let companyChangesPercentage = companyProfile.changesPercentage;

        let imageSpan = document.getElementById("companyLogo");
        let compLogo = document.createElement("IMG");
        compLogo.setAttribute("src", companyImage);
        compLogo.setAttribute("height", "50px");
        compLogo.setAttribute("alt", "The logo");
        imageSpan.appendChild(compLogo);

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
      `https://financialmodelingprep.com/api/v3/historical-price-full/${symbolString}?serietype=line&apikey=${apiKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
            data: dataPointsArray,
          },
        ],
      },
      options: {},
    });
  }
}

let newCompany = new Company(document.getElementById("company"));
newCompany.createCompanyElement();
