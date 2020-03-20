let symbolString;
document.getElementById("loader2").classList.add("hidden");

// get the query string when window opens
window.onload = function() {
  let qs = document.location.search.substring(
    1,
    document.location.search.length
  );
  let qsSymbol = qs.split("=");
  let symbolString = qsSymbol[1];
  getCompanyProfile(symbolString);
  getCompanyStockHistory(symbolString);
};

// get company profile and fill html elements
function getCompanyProfile(symbolString) {
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

      let imageSpan = document.getElementById("companyLogo");
      let myImg = document.createElement("IMG");
      myImg.setAttribute("src", companyImage);
      // myImg.setAttribute("width", "50px");
      myImg.setAttribute("height", "50px");
      myImg.setAttribute("alt", "The logo");
      imageSpan.appendChild(myImg);

      document.getElementById("companyName").innerHTML = companyName;
      document.getElementById("stockPrice").innerHTML =
        "Stock Price: $" + companyStockPrices;
      let changesText = companyChangesPercentage;
      document.getElementById("stockChanges").innerHTML = changesText;
      document.getElementById("description").innerHTML = companyDescription;

      if (companyChanges >= 0) {
        document.getElementById("stockChanges").classList.add("lightgreen");
      } else {
        document.getElementById("stockChanges").classList.add("red");
      }
      document.getElementById("loader2").classList.add("hidden");
    });
}

// get company stock price history and pass it to chart drawing function
function getCompanyStockHistory(symbolString) {
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

      drawChart(datalabelsArray, dataPointsArray);
    });
}

// Draw the chart with the stock price history
function drawChart(datalabelsArray, dataPointsArray) {
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
