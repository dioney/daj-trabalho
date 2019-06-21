var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "pt-BR";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var saida = document.querySelector(".output");
var arrayClass =  ['es', 'bo','ca','pro','cl','pr'];
var arrayElemento = [];
for(var i=0; i < arrayClass.length; i++) {
    var elemento = {};
    elemento.Id = arrayClass[i];
    elemento.Classe = arrayClass[i];
    arrayElemento.push(elemento);
}

var listener = () => {
 recognition.start();
};

document.body.addEventListener("click", listener);

recognition.addEventListener("speechend", () => {
  recognition.stop();
});
recognition.addEventListener("error", event => {
  saida.textContent = "Erro no reconhecimento do texto: " + event.error;
});

recognition.onresult = function(event) {
  var last = event.results.length - 1;
  var texto = event.results[last][0].transcript;
  saida.textContent = "Resultado recebido: " + texto + ".";
  disparaEvento(texto);
};

var g_Controller = false;
var g_Controller_count = 0;
var g_promessa_count = 0;

//1-IMPLEMENTAR..... FUNCAO QUE IRA DISPARAR A ACAO CORRESPONDENTE A PALAVRA
function disparaEvento(palavra) {
 /* if (palavra =="1") {
  horario();
  }
  if (palavra =="2") {
    antihorario();
    }
    else */
    
    if (palavra == "escopo") {
      if (g_Controller == false) {
        g_Controller = true;
      } else {
      g_Controller = false;
    }
    console.log(g_Controller);
  } else if (palavra == "promessa") {
    promessa();
  } else if (palavra == "borbulhamento") {
    click();
  } else {
    g_Controller_count++;
    if (g_Controller_count == 2) {
      document.body.removeEventListener("click", listener);
      console.log("bloqueado");
    }
    console.log(palavra);
    console.log(g_Controller_count);
  }
}

//2-IMPLEMENTAR FUNCAO DA PROMESSA
function promessa(palavra) {
  let p = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (g_Controller == true) {
        g_promessa_count++;
        resolve(resolverPromessa());
      }
      if (g_Controller == false) reject(alert("Houve rejeição da PROMESSA"));
    }, 4000);
  });
}

//4 -INCLUIR OS EVENTOS DE CLICK NOS ELEMENTOS <TD> E <TR> DA PAGINA
function click() {
  console.log("CLICK!!");
}
function resolverPromessa(){
  if(g_promessa_count % 2 === 0){
    horario();
  }
  else{
    antihorario();
  }
}
//5 -METODO PARA ALTERAR O BACKGROUND DAS CELULAS AAA AAA
function horario() {
  console.log("HORÁRIO");
  //es bo ca pro cl pr
  for(var i=0; i < arrayElemento.length; i++) {
    
    var elemento = arrayElemento[i];
    var novaClasse = alterarBackGround(elemento.Id, elemento.Classe, true);
    arrayElemento[i].Classe = novaClasse;
  }
}

function antihorario() {
  console.log("ANTIHORÁRIO");
  for(var i=0; i < arrayElemento.length; i++) {
    
    var elemento = arrayElemento[i];
    var novaClasse = alterarBackGround(elemento.Id, elemento.Classe, false);
    arrayElemento[i].Classe = novaClasse;
  }
}

function alterarBackGround(elemento, classe, isHorario)
{
  var novaClasse = classe;
  document.getElementById(elemento).classList.remove(classe);
  var idArray = arrayClass.indexOf(classe);
  if(isHorario){
    idArray++;
  }
  else{
    idArray--;
  }

  if(idArray < 0){
    idArray = 5;
  }
  else if(idArray >5){
    idArray = 0;
  }
  novaClasse = arrayClass[idArray];
  document.getElementById(elemento).classList.add(novaClasse);
  return novaClasse;
}
