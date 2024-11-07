const generateChart = () => {
  var options = {
    chart: {
      type: 'line',
        height: 500,
    },
    series: [{
      name: 'sales',
      data: [30,40,35,50,49,60,70,91,125]
    }],
    xaxis: {
      categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
    }
  }
  
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  
  chart.render();
};

const addInputHandler = () => {
  const allInputContainers = document.querySelectorAll('.input-container');
  const lastInputContainer = allInputContainers[allInputContainers.length - 1];
  
  // Add new input container
  const newInputContainer = lastInputContainer.cloneNode(true);
  document.querySelector('.input-list-container').appendChild(newInputContainer);
  newInputContainer.querySelectorAll('.input').forEach(input => input.value = '');

  // Remove add button from last input container
  lastInputContainer.removeChild(lastInputContainer.querySelector('.add-btn'));

  // Disable last inputs
  lastInputContainer.querySelectorAll('.input').forEach(input => input.disabled = true);
}

var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt, {
  keypad: false,
  // graphpaper: false
  expressions: false
});