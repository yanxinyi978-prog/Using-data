Papa.parse("data.csv", {
  download: true,
  header: true,
  skipEmptyLines: true,

  complete: function(results) {
    const labels = [];
    const values = [];

    results.data.forEach(function(row) {
      labels.push(row.week);
      values.push(Number(row.interest));
    });

    new Chart(document.getElementById("interestChart"), {
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
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: "Relative search interest"
            }
          },

          x: {
            ticks: {
              maxTicksLimit: 8
            }
          }
        }
      }
    });
  }
});
