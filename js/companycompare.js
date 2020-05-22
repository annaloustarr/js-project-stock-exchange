let apiKey = "9b9e24c6bc1f1a8dd94de27a361bc77a";

class Companycompare {
  constructor(element, urlString) {
    this.element = element;
    this.urlString = urlString;
  }

  createCompanyElement() {
    this.element.classList.add("side-by-side");
    let companyTitle = document.createElement("div");
    companyTitle.classList.add("company-title");
    this.element.appendChild(companyTitle);

    let companyLogo = document.createElement("span");
    companyLogo.id = `companyLogo${this.urlString}`;
    companyLogo.classList.add("company-logo");
    companyTitle.appendChild(companyLogo);

    let companyName = document.createElement("span");
    companyName.id = `companyName${this.urlString}`;
    companyName.classList.add("company-name");
    companyTitle.appendChild(companyName);

    let pricesDiv = document.createElement("div");
    this.element.appendChild(pricesDiv);

    let stockPrice = document.createElement("span");
    stockPrice.id = `stockPrice${this.urlString}`;
    stockPrice.classList.add("stock-price");
    pricesDiv.appendChild(stockPrice);

    let stockChanges = document.createElement("span");
    stockChanges.id = `stockChanges${this.urlString}`;
    stockChanges.classList.add("stock-changes");
    pricesDiv.appendChild(stockChanges);

    let companyDesc = document.createElement("div");
    companyDesc.id = `description${this.urlString}`;
    companyDesc.classList.add("description2");
    this.element.appendChild(companyDesc);

    let loader = document.createElement("div");
    loader.id = `loader2${this.urlString}`;
    loader.classList.add("loader2");
    this.element.appendChild(loader);

    let chartDiv = document.createElement("div");
    chartDiv.classList.add("chart-size");
    this.element.appendChild(chartDiv);

    let canvas = document.createElement("canvas");
    canvas.id = `myChart${this.urlString}`;
    chartDiv.appendChild(canvas);

    this.getCompanyProfile(this.urlString);
    this.getCompanyStockHistory(this.urlString);
  }

  // get company profile and fill html elements
  getCompanyProfile(symbolString) {
    document
      .getElementById(`loader2${this.urlString}`)
      .classList.remove("hidden");
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

        let imageSpan = document.getElementById(`companyLogo${this.urlString}`);
        let myImg = document.createElement("IMG");
        myImg.setAttribute("src", companyImage);
        myImg.setAttribute("width", "40px");
        myImg.setAttribute("alt", "The logo");
        imageSpan.appendChild(myImg);

        document.getElementById(
          `companyName${this.urlString}`
        ).textContent = companyName;
        document.getElementById(`stockPrice${this.urlString}`).textContent =
          "Stock Price: $" + companyStockPrices;
        let changesText = companyChangesPercentage;
        document.getElementById(
          `stockChanges${this.urlString}`
        ).textContent = changesText;
        document.getElementById(
          `description${this.urlString}`
        ).textContent = companyDescription;

        if (companyChanges >= 0) {
          document
            .getElementById(`stockChanges${this.urlString}`)
            .classList.add("lightgreen");
        } else {
          document
            .getElementById(`stockChanges${this.urlString}`)
            .classList.add("red");
        }
        document
          .getElementById(`loader2${this.urlString}`)
          .classList.add("hidden");
      });
  }

  // get company stock price history and pass it to chart drawing function
  getCompanyStockHistory(symbolString) {
    document
      .getElementById(`loader2${this.urlString}`)
      .classList.remove("hidden");
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
    let ctx = document
      .getElementById(`myChart${this.urlString}`)
      .getContext("2d");
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
      options: {
        legend: {
          display: false,
        },
      },
    });
  }
}

function windowOnLoad() {
  let qs = document.location.search.substring(
    1,
    document.location.search.length
  );
  let qs1 = qs.split("=");
  let qsSymbol = qs1[1].split(",");
  let symbolString1 = qsSymbol[0];
  let symbolString2 = qsSymbol[1];
  let symbolString3 = qsSymbol[2];

  let newCompanyOne = new Companycompare(
    document.getElementById("company"),
    symbolString1
  );
  newCompanyOne.createCompanyElement();

  let newCompanyTwo = new Companycompare(
    document.getElementById("companytwo"),
    symbolString2
  );
  newCompanyTwo.createCompanyElement();

  let newCompanyThree = new Companycompare(
    document.getElementById("companythree"),
    symbolString3
  );
  newCompanyThree.createCompanyElement();
}
windowOnLoad();
