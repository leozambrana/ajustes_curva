const yValues = [];
const xValues = [];

const pairs = [];

const generateChart = () => {
  var options = {
    chart: {
      type: 'line',
        height: 500,
    },
    series: [{
      name: 'Y',
      data: yValues
    }],
    xaxis: {
      categories: xValues
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

  const yValue = lastInputContainer.querySelector('.input-y').value;
  const xValue = lastInputContainer.querySelector('.input-x').value;

  yValues.push(yValue);
  xValues.push(xValue);

  renderFunctionOrder();

  generateChart();
}

const calcFunctionOrder = () => {
  if (yValues.length < 2) {
    console.log("Not enough data points to determine the function order.");
    return;
  }

  let firstOrder = true;
  let secondOrder = true;
  let thirdOrder = true;

  for (let i = 1; i < yValues.length; i++) {
    if (yValues[i] <= yValues[i - 1]) {
      firstOrder = false;
    }
    if (i > 1 && (yValues[i] - yValues[i - 1]) * (yValues[i - 1] - yValues[i - 2]) >= 0) {
      secondOrder = false;
    }
    if (yValues[i] / yValues[i - 1] !== yValues[1] / yValues[0]) {
      thirdOrder = false;
    }
  }

  if (firstOrder) {
    return "The function is first order.";
  } else if (secondOrder) {
    return "The function is second order.";
  } else if (thirdOrder) {
    return "The function is third order.";
  } else {
    return "The function does not fit any of the specified orders.";
  }
};

const renderFunctionOrder = () => {
  console.log(calcFunctionOrder())
  document.querySelector('.function-order-container').innerHTML = calcFunctionOrder();
}

generateChart();
// var elt = document.getElementById('calculator');
// var calculator = Desmos.GraphingCalculator(elt, {
//   keypad: false,
//   // graphpaper: false
//   expressions: false
// });