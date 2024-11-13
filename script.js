const yValues = [];
const xValues = [];

const pairs = [];

const generateChart = () => {
  var options = {
    layout: {
      padding: 20
    },
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
  //CONSTANTE
  const isConstant = yValues.every(y => y === yValues[0]);
  if (isConstant) {
    return "A função é constante";
  }


  //FUNÇÃO DE PRIMEIRO GRAU
  let isFirstOrder = true;
  const firstDifference = yValues[1] - yValues[0];
  for (let i = 2; i < yValues.length; i++) {
    if ((yValues[i] - yValues[i - 1]) !== firstDifference) {
      isFirstOrder = false;
      break;
    }
  }
  if (isFirstOrder) {
    return "Função de primeiro grau";
  }

  //FUNÇÃO DE SEGUNDO GRAU
  let isSecondOrder = false;
  let signChanges = 0;
  for (let i = 1; i < yValues.length - 1; i++) {
    const diff1 = yValues[i] - yValues[i - 1];
    const diff2 = yValues[i + 1] - yValues[i];
    if ((diff1 > 0 && diff2 < 0) || (diff1 < 0 && diff2 > 0)) {
      signChanges++;
    }
  }
  if (signChanges === 1) {
    isSecondOrder = true;
  }
  if (isSecondOrder) {
    return "Função de segundo grau";
  }

  //EXPONENCIAL
  const isExponential = yValues.every((y, i) => i === 0 || y / yValues[i - 1] === yValues[1] / yValues[0]);
  if (isExponential) {
    return "Função exponencial";
  }
 
   return "A função não corresponde a nenhum dos tipos especificados.";
};

const renderFunctionOrder = () => {
  console.log(calcFunctionOrder())
  document.querySelector('.function-order-container').innerHTML = calcFunctionOrder();
}

generateChart();