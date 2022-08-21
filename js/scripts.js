const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // o que foi digfitado à operação atual
  addDigit(digit) {
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return undefined;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // processa todas as operações
  processOperations(operation) {
    // checa se o visor de baixo está vazio
    if (this.currentOperationText.innerText === "" && operation != "C") {
      // checa se o visor de cima está vazio, se não estiver, mudamos a operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation)
      }
      // se os dois estiverem vazios, não faz nada
      return undefined;
    }

    // pega o valor atual e o anterior
    let operationValue;

    // converte pra number com o + e atribúi o valor à variável
    const previous = + this.previousOperationText.innerText.split(" ")[0];
    const current = + this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDeleteLastDigit()
        break;
      case "CE":
        this.processClearCurrentOperation()
        break;
      case "C":
        this.processClearAllOperations()
        break;
      case "=":
        this.processEqualsOperator()
        break;
      default:
        return undefined;
    }
  }

  // muda o valor na tela, os valores são iniciados com null
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {

    if (operation === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // se for zero, atribui o valor atual
      if (previous === 0) {
        operationValue = current;
      }
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // muda a operação
  changeOperation(operation) {
    // operações numéricas
    const mathOperations = ["*", "/", "+", "-"];

    //checa se é uma operação numérica, as não numéricas são [CE, C, DEL]
    if (!mathOperations.includes(operation)) {
      // se não for operação numérica, não faz nada
      return undefined;
    }
    // atribui um slice do índice 0 até o final - 1 removendo a operação antiga e concatenando a operação nova
    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // deleta o ultimo dígito
  processDeleteLastDigit() {
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
  }

  // apaga a operação atual (de baixo)
  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }

  // limpa tudo
  processClearAllOperations() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  processEqualsOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];
    console.log(this.previousOperationText.innerText.split(" "))
    this.processOperations(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach(btn => {
  btn.addEventListener("click", (evt) => {
    let value = evt.target.innerText;
    // Checagem se a tecla presionada é um número ou ponto
    // Se value for um número, será possível convertê-lo de string pra number e comparar com o zero
    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperations(value);
    }
  });
});