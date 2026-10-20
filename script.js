Papa.parse("data.csv", {
  download: true,
  header: true,
  skipEmptyLines: true,

  complete: function(results) {
    const tbody = document.querySelector("#dataTable tbody");

    results.data.forEach(function(row) {
      const tr = document.createElement("tr");

      const weekCell = document.createElement("td");
      weekCell.textContent = row.week;

      const interestCell = document.createElement("td");
      interestCell.textContent = row.interest;

      tr.appendChild(weekCell);
      tr.appendChild(interestCell);
      tbody.appendChild(tr);
    });

    document.querySelector("#status").textContent =
      results.data.length + " weeks of data loaded.";
  },

  error: function(error) {
    document.querySelector("#status").textContent =
      "Could not load the data.";

    console.error(error);
  }
});
