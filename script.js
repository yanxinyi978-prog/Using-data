Papa.parse("data.csv", {
  download: true,
  header: true,
  skipEmptyLines: true,

  complete: function(results) {
    const tbody = document.querySelector("#dataTable tbody");

    const weeks = [];
    const interests = [];

    results.data.forEach(function(row) {
      // Add each week to the table.
      const tr = document.createElement("tr");

      const weekCell = document.createElement("td");
      weekCell.textContent = row.week;

      const interestCell = document.createElement("td");
      interestCell.textContent = row.interest;

      tr.appendChild(weekCell);
      tr.appendChild(interestCell);
      tbody.appendChild(tr);

      // Collect the same data for the chart.
      weeks.push(row.week);
      interests.push(Number(row.interest));
    });

    document.querySelector("#status").textContent =
      results.data.length + " weeks of data loaded.";

    // Keep the table available if Chart.js fails to load.
    if (typeof Chart === "undefined") {
      document.querySelector("#status").textContent +=
        " The chart could not load. Please refresh the page.";
      return;
    }

    // Draw the line chart.
    new Chart(document.getElementById("interestChart"), {
      type: "line",

      data: {
        labels: weeks,

        datasets: [{
          label: "TikTok search interest",
          data: interests,
          borderColor: "#20364d",
          backgroundColor: "#20364d",
          borderWidth: 2,
          pointRadius: 2,
          pointHoverRadius: 5,
          tension: 0,
          fill: false
        }]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
          x: {
            title: {
              display: true,
              text: "Week"
            },

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
  },

  error: function(error) {
    document.querySelector("#status").textContent =
      "Could not load the data. Check the CSV filename.";

    console.error(error);
  }
});
