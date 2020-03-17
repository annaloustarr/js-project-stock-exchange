let symbolString;
window.onload = function() {
  let qs = document.location.search.substring(
    1,
    document.location.search.length
  );
  let qsSymbol = qs.split("=");
  let symbolString = qsSymbol[1];
  console.log(symbolString);
};

function getCompanyProfile(symbolString) {
  fetch(
    // `https://financialmodelingprep.com/api/v3/company/profile/${symbolString}`
    `https://financialmodelingprep.com/api/v3/company/profile/AAPL`
  )
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      let companyProfile = data.profile;
      console.log(companyProfile);
      let companyImage = companyProfile.image;
      console.log(companyImage);
      let companyName = companyProfile.companyName;
      console.log(companyName);
      let companyDescription = companyProfile.description;
      console.log(companyDescription);
      let companyLink = companyProfile.website;
      console.log(companyLink);
      let companyStockPrices = companyProfile.prices;
      console.log(companyStockPrices);
      let companyChanges = companyProfile.changes;
      console.log(companyChanges);
    });
}
getCompanyProfile(symbolString);