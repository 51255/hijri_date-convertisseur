function convert() {
  const gDate = document.getElementById("gregorian-date").value;
  const date = new Date(gDate);
  const timestamp = date.getTime();
  const hijriDate = new HijriDate(timestamp);
  const hDate = hijriDate.getDate() + "/" + hijriDate.getMonth() + "/" + hijriDate.getFullYear();
  document.getElementById("hijri-date").innerHTML = hDate;
}

function HijriDate(time) {
  this.time = time;
  this.date = new Date(time);

  var adjustments = [
    0, 2, 2, 3, 4, -1, 0, 1, 1, 2, 2, 3
  ];

  var hDay = Math.ceil((this.date.getTime() - new Date(this.date.getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24));
  var hYear = this.date.getFullYear();
  var hMonth;

  for (var i = 0; i < adjustments.length; i++) {
    if (hDay > adjustments[i]) {
      hDay -= adjustments[i];
      hMonth = i + 1;
    } else {
      break;
    }
  }

  return {
    getDate: function() {
      return hDay;
    },
    getMonth: function() {
      return hMonth;
    },
    getFullYear: function() {
      return hYear;
    }
  };
}
