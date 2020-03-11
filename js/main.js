let first = 0;
let second = 1;
let y;
let x;

// function fibRecursive(x) {
//   if (x < 2) return x;
//   return fibRecursive(x - 1) + fibRecursive(x - 2);
// }

document.getElementById("loader").classList.add("hidden");
document.getElementById("errorBox").classList.add("hidden");
document.getElementById("Y").classList.add("hidden");
let inputRed = document.querySelector(".input-red");
inputRed.classList.remove("input-red");

function clickReset() {
  document.getElementById("thrownError").classList.add("hidden");
  document.getElementById("errorBox").classList.add("hidden");
  inputRed.classList.remove("inputRed");
  document.getElementById("Y").classList.add("hidden");
  document.getElementById("meaningOfLife").classList.add("hidden");
}

function fibonacci(x) {
  for (let i = 2; i <= x; i++) {
    y = first + second;
    first = second;
    second = y;
    document.getElementById("Y").innerHTML = y;
    document.getElementById("Y").classList.remove("hidden");
  }
}

function getFibonacci(x) {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("thrownError").classList.add("hidden");
  fetch(`http://localhost:5050/fibonacci/${x}`).then(response => {
    if (response.status === 400) {
      response.text().then(function(text) {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("meaningOfLife").classList.remove("hidden");
        document.getElementById("meaningOfLife").innerHTML = text;
      });
    } else {
      return response.json().then(function(data) {
        let y = data.result;
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("Y").classList.remove("hidden");
        document.getElementById("Y").innerHTML = y;
        listFibonacci();
      });
    }
  });
}

function validateX(x) {
  try {
    if (x == "") throw "empty";
    if (isNaN(x)) throw "not a number";
    x = Number(x);
    if (x > 50) throw "Can't be larger than 50";
  } catch (error) {
    document.getElementById("thrownError").innerHTML = error;
    document.getElementById("thrownError").classList.remove("hidden");
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("errorBox").classList.remove("hidden");
    inputRed.classList.add("inputRed");
    document.getElementById("meaningOfLife").innerHTML = text;
  }
}

function buttonClicked() {
  clickReset();
  let x = document.getElementById("X").value;
  validateX(x);
  let myCheckbox = document.querySelector("#saveCalc");
  if (myCheckbox.checked == true) {
    getFibonacci(x);
  } else {
    fibonacci(x);
  }
}

document.getElementById("myButton").addEventListener("click", buttonClicked);

function listFibonacci() {
  fetch(`http://localhost:5050/getFibonacciResults`).then(response => {
    return response.json().then(function(dataList) {
      let myList = dataList;
      let listArray = myList.results;
      console.log(listArray);

      let listDiv = document.getElementById("dataList");
      document.getElementById("dataList").innerHTML = "";
      listArray.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );

      for (let i = 0; i < listArray.length; i++) {
        let myDate = new Date(listArray[i].createdDate);
        let li = document.createElement("li");
        li.innerHTML =
          "The Fibonacci of <b>" +
          listArray[i].number +
          "</b> is <b>" +
          listArray[i].result +
          "</b>. Created at: " +
          myDate;
        listDiv.appendChild(li);
      }
      document.getElementById("loader2").classList.add("hidden");
    });
  });
}

function myDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}
document.getElementById("dropButton").addEventListener("click", myDropdown);

// Close the dropdown if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches(".dropbtn")) {
//     let dropdowns = document.getElementsByClassName("dropdown-content");
//     let i;
//     for (i = 0; i < dropdowns.length; i++) {
//       let openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// };

// function sortList() {
//   console.log("sorting...");
//   var list, i, switching, b, shouldSwitch;
//   list = document.getElementById("dataList");
//   switching = true;
//   while (switching) {
//     switching = false;
//     b = list.getElementsByTagName("li");
//     for (i = 0; i < b.length - 1; i++) {
//       shouldSwitch = false;
//       if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
//         shouldSwitch = true;
//         break;
//       }
//     }
//     if (shouldSwitch) {
//       b[i].parentNode.insertBefore(b[i + 1], b[i]);
//       switching = true;
//     }
//   }
// }

// function sortListAsc(ul) {
//   console.log("sorting list");
//   let newul = ul.cloneNode(false);
//   console.log(newul);

//   let lis = [];
//   for (let i = ul.childNodes.length; i--; ) {
//     if (ul.childNodes[i].nodeName === "li") lis.push(ul.childNodes[i]);
//     console.log(lis);
//   }
//   lis.sort(function(a, b) {
//     return (
//       parseInt(a.childNodes[0].data, 10) - parseInt(b.childNodes[0].data, 10)
//     );
//   });
//   for (var i = 0; i < lis.length; i++) newul.appendChild(lis[i]);
//   ul.parentNode.replaceChild(newul, ul);
// }

// document.getElementById("numAsc").addEventListener("click", sortList);
// .addEventListener("click", sortListAsc(document.getElementById("dataList")));

document.addEventListener("DOMContentLoaded", listFibonacci);

// async function getFibonacci(x) {
//   const response = await fetch(`http://localhost:5050/fibonacci/:number`);
//   const y = await response.y();
//   document.getElementById("Y").innerHTML = y;
