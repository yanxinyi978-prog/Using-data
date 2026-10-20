let allData = [];
let chart = null;

const yearFilter = document.getElementById("yearFilter");

Papa.parse("data.csv", {
  download: true,
  header: true,
  skipEmptyLines: true,

  complete: function(results) {
    allData = results.data;

    populateFilter();
    drawPage(allData);

    yearFilter.disabled = false;
    yearFilter.addEventListener("change", filterData);
  },

  error: function(error) {
    document.getElementById("status").textContent =
      "Could not load data.csv.";

    console.error(error);
  }
});

function getYear(row) {
  return row.week.trim().slice(0, 4);
}


function populateFilter() {
  const years = [];

  allData.forEach(function(row) {
    const year = getYear(row);

    if (!years.includes(year)) {
      years.push(year);
    }
  });

  years.sort();

  years.forEach(function(year) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  });
}


function filterData() {
  const selectedYear = yearFilter.value;

  const filteredData = allData.filter(function(row) {
    return selectedYear === "all" ||
      getYear(row) === selectedYear;
  });

  drawPage(filteredData);
}

function drawPage(data) {
  const tbody = document.querySelector("#dataTable tbody");


  tbody.innerHTML = "";

  const labels = [];
  const values = [];

  data.forEach(function(row) {
    const tr = document.createElement("tr");

    const weekCell = document.createElement("td");
    weekCell.textContent = row.week;

    const interestCell = document.createElement("td");
    interestCell.textContent = row.interest;

    tr.appendChild(weekCell);
    tr.appendChild(interestCell);
    tbody.appendChild(tr);

    labels.push(row.week);
    values.push(Number(row.interest));
  });

  document.getElementById("status").textContent =
    "Showing " + data.length + " of " + allData.length + " weeks.";

  if (typeof Chart === "undefined") {
    document.getElementById("status").textContent +=
      " The chart library could not load.";
    return;
  }

  if (chart !== null) {
    chart.destroy();
  }

  chart = new Chart(document.getElementById("interestChart"), {
    type: "line",

    data: {
      labels: labels,
      datasets: [{
        label: "TikTok search interest",
        data: values,
        borderColor: "#20364d",
        borderWidth: 2,
        pointRadius: 2,
        fill: false
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        x: {
          ticks: {
            maxTicksLimit: 8
          }
        },

        y: {
          min: 0,
          max: 100,
          title: {
            display: true,
            text: "Relative search interest (0–100)"
          }
        }
      }
    }
  });
}
