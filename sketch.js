// largura e altura do canvas
let canvaW = 400;
let canvaH = 400
//controles da cobra
let cobraX = 50;
let cobraY = 40;
let cobraW = 15;
let cobraH = 15;

let partes = 0;
let rabo = [];

let velocidade = 5;
let direcao = "right";
let ponto = 0;

//comida
let comidaX = 12;
let comidaY = 90;

reposicionarComida();

function setup() {
  createCanvas(400, 400);
  frameRate(10);
}

function draw() {
  background("#6fb376");
  desenharCobrinha();
  desenharComida();
  controleMovimentação();
  desenharParedes();
  colidirParedes();
  comer();
  pegarPosicaoAtual();
  pontos();
}

function desenharCobrinha(){
  fill("#923944");
  rect(cobraX, cobraY, cobraW, cobraH);
  if (rabo.length> 0){
    for (let i = 0; i<rabo.length; i++){
      rect(rabo[i][0], rabo[i][1], cobraW, cobraH);
    };
  }
  
}

function desenharComida(){
  fill("#230122");
  circle(comidaX, comidaY, 10);
}

function reposicionarComida(){
  comidaX = Math.floor(Math.random()*350)+10;
  comidaY = Math.floor(Math.random()*350)+10;
}
function controleCobra(){
  if(keyIsDown(LEFT_ARROW)){
    return "left";
  }
  if(keyIsDown(RIGHT_ARROW)){
    return "right";
  }
  if(keyIsDown(UP_ARROW)){
    return "up";
  }
  if(keyIsDown(DOWN_ARROW)){
    return "down";
  }
}
function controleMovimentação(){
  //console.log(controleCobra());
  if(controleCobra()){ // se retornar vai executar
    direcao = controleCobra();
  }
  if(direcao == "right"){
    cobraX += velocidade;
  }
  if(direcao == "left"){
    cobraX -= velocidade;
  }
  if(direcao == "up"){
    cobraY -= velocidade;
  }
  if(direcao == "down"){
    cobraY += velocidade;
  }
}
// Esquerda e Direita Paredes
let posXParE = 0;
let posYParE = 0;
let posXParD = 390;
let posYParD = 0;
let WParED = 10;
let HParED = 400;
// Cima e Baixo Paredes
let posXParC = 0;
let posYParC = 0;
let posXParB = 0;
let posYParB = 390;
let WParCB = 400;
let HParCB = 10;

function desenharParedes(){
  rect(posXParE, posYParE, WParED, HParED);
  rect(posXParD, posYParD, WParED, HParED);
  rect(posXParC, posYParC, WParCB, HParCB);
  rect(posXParB, posYParB, WParCB, HParCB);
}
let colisaoCima, colisaoBaixa, colisaoDireita, colisaoEsquerda

function colidirParedes(){
  colisaoCima = collideRectRect(cobraX, cobraY, cobraW, cobraH, posXParC, posYParC,WParCB, HParCB )
  colisaoBaixa = collideRectRect(cobraX, cobraY, cobraW, cobraH, posXParB, posYParB,WParCB, HParCB )
  colisaoDireita = collideRectRect(cobraX, cobraY, cobraW, cobraH, posXParD, posYParD,WParED, HParED )
  colisaoEsquerda = collideRectRect(cobraX, cobraY, cobraW, cobraH, posXParE, posYParE,WParED, HParED )
  if (colisaoBaixa == true || colisaoCima == true || colisaoEsquerda == true || colisaoDireita == true  ) {
    cobraX = 200
    cobraY = 200
    ponto = 0
    partes = 0
    rabo = []
  }
}

function collisaoComida(){
    colidirComida = collideRectCircle(cobraX, cobraY, cobraW, cobraH, comidaX, comidaY, 10)
    return colidirComida
}
function comer(){
   if (collisaoComida()) {
      reposicionarComida()
      ponto++
      partes++

   }
}
function pontos(){
  document.getElementById("pontos").innerHTML = "Pontos: " + ponto
}

function pegarPosicaoAtual(){
  rabo.push([cobraX, cobraY])
  if (rabo.length> partes) {
    rabo.shift()
  }
}



