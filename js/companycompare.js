class Companycompare {
  constructor(element, urlString) {
    this.element = element;
    this.urlString = urlString;
  }

  createCompanyElement() {
    let myCompanyTitle = document.createElement("div");
    myCompanyTitle.classList.add("company-title");
    this.element.appendChild(myCompanyTitle);
    console.log(this.element);

    let myCompanyLogo = document.createElement("span");
    myCompanyLogo.id = `companyLogo${this.urlString}`;
    myCompanyLogo.classList.add("company-logo");
    myCompanyTitle.appendChild(myCompanyLogo);

    let myCompanyName = document.createElement("span");
    myCompanyName.id = `companyName${this.urlString}`;
    myCompanyName.classList.add("company-name");
    myCompanyTitle.appendChild(myCompanyName);

    let thePricesDiv = document.createElement("div");
    this.element.appendChild(thePricesDiv);

    let myStockPrice = document.createElement("span");
    myStockPrice.id = `stockPrice${this.urlString}`;
    myStockPrice.classList.add("stock-price");
    thePricesDiv.appendChild(myStockPrice);

    let myStockChanges = document.createElement("span");
    myStockChanges.id = `stockChanges${this.urlString}`;
    myStockChanges.classList.add("stock-changes");
    thePricesDiv.appendChild(myStockChanges);

    let myDescription = document.createElement("div");
    myDescription.id = `description${this.urlString}`;
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
    myCanvas.id = `myChart${this.urlString}`;
    myChartDiv.appendChild(myCanvas);

    this.getCompanyProfile(this.urlString);
    this.getCompanyStockHistory(this.urlString);
  }

  // get company profile and fill html elements
  getCompanyProfile(symbolString) {
    console.log(symbolString);
    document.getElementById("loader2").classList.remove("hidden");
    fetch(
      `https://financialmodelingprep.com/api/v3/company/profile/${symbolString}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let companyProfile = data.profile;
        console.log(companyProfile);

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
        myImg.setAttribute("height", "50px");
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
            data: dataPointsArray
          }
        ]
      },
      options: {}
    });
  }
}

function windowOnLoad() {
  // let usp = new URLSearchParams(document.location.search.substring(1));
  // usp.get(symbol).toString();
  // console.log(usp.getAll("symbol"));

  let qs = document.location.search.substring(
    1,
    document.location.search.length
  );
  let qs1 = qs.split("=");
  let qsSymbol = qs1[1].split(",");
  let symbolString1 = qsSymbol[0];
  let symbolString2 = qsSymbol[1];
  let symbolString3 = qsSymbol[2];

  let myNewCompany = new Companycompare(
    document.getElementById("company"),
    symbolString1
  );
  myNewCompany.createCompanyElement();
  console.log(symbolString1);

  let myNewCompanytwo = new Companycompare(
    document.getElementById("companytwo"),
    symbolString2
  );
  myNewCompanytwo.createCompanyElement();
  console.log(symbolString2);

  let myNewCompanythree = new Companycompare(
    document.getElementById("companythree"),
    symbolString3
  );
  myNewCompanythree.createCompanyElement();
  console.log(symbolString3);
}
windowOnLoad();
