const topics = {

    "CABEÇA": [

      "Dor de cabeça",

      "Sensação de desmaio",

      "Tonturas",

      "Insônia"

    ],

    "OLHOS": [

      "Olhos lacrimejando ou coçando",

      "Olhos inchados, vermelhos ou com cílios colando",

      "Bolsas ou olheiras abaixo dos olhos",

      "Visão borrada ou em túnel"

    ],

    "OUVIDOS": [

      "Coceira nos ouvidos",

      "Dores de ouvido, infecções auditivas",

      "Retirada de fluido purulento de ouvido",

      "Zunido, perda de audição?"

    ],

    "NARIZ": [

      "Nariz entupido",

      "Problemas de seios nasais (Sinusite)",

      "Corrimento nasal, espirros, lacrimejamento e coceira dos olhos (juntos)",

      "Ataques de espirros",

      "Excessiva formação de muco"

    ],

    "BOCA E GARGANTA": [

      "Tosse crônica",

      "Frequente necessidade de limpar a garganta",

      "Dor de garganta, rouquidão ou perda de voz",

      "Língua, gengivas ou lábios inchados / descoloridos",

      "Aftas"

    ],

    "PELE": [

      "Acne",

      "Feridas que coçam, erupções, pele seca",

      "Perda de cabelo",

      "Vermelhidão na pele, calorões",

      "Suor excessivo"

    ],

    "CORAÇÃO": [

      "Batimentos cardíacos irregulares ou falhando",

      "Batimentos cardíacos rápidos demais",

      "Dor no peito"

    ],

    "PULMÕES": [

      "Congestão no peito",

      "Asma, bronquite",

      "Pouco fôlego",

      "Dificuldade para respirar"

    ],

    "TRATO DIGESTIVO": [

      "Náuseas, vômito",

      "Diarreia",

      "Constipação / prisão de ventre",

      "Sente-se inchado / com abdômen distendido",

      "Arrotos e/ou gases intestinais",

      "Azia/Pirose",

      "Dor estomacal / intestinal"

    ],

    "ARTICULAÇÕES/MÚSCULOS": [

      "Dores articulares",

      "Artrite / artrose",

      "Rigidez ou limitação dos movimentos",

      "Dores musculares",

      "Sensação de fraqueza ou cansaço"

    ],

    "ENERGIA/ATIVIDADE": [

      "Fadiga, moleza",

      "Apatia, letargia",

      "Hiperatividade",

      "Dificuldade em descansar, relaxar"

    ],

    "MENTE": [

      "Memória ruim",

      "Confusão mental, compreensão ruim",

      "Concentração ruim",

      "Fraca coordenação motora",

      "Dificuldade de tomar decisões",

      "Fala com repetição de sons ou palavras, com várias pausas involuntárias",

      "Pronuncia palavras de forma indistinta, confusa",

      "Problemas de aprendizagem"

    ],

    "EMOÇÕES": [

      "Mudanças de humor / mau humor matinal",

      "Ansiedade, medo, nervosismo",

      "Raiva, irritabilidade, agressividade",

      "Depressão"

    ],

    "OUTROS": [

      "Frequentemente doente",

      "Frequentemente ou urgente vontade de urinar",

      "Coceira genital ou corrimento",

      "Edema / Inchaço - Pés / Pernas / Mãos"

    ]

};



// Armazenar respostas do usuário e dados do paciente

const responses = {};

let patientData = {};



// Renderizar o questionário

function renderQuestionnaire() {
  const container = document.getElementById('questionnaire');
  Object.keys(topics).forEach(topic => {
    const topicDiv = document.createElement('div');
    topicDiv.classList.add('mb-6', 'rounded-md');

    const topicTitle = document.createElement('h2');
    topicTitle.classList.add('text-lg', 'font-semibold', 'mb-8', 'topic-title', 'flex', 'items-center', 'gap-2', 'justify-center', 'text-center');  // 'justify-center' e 'text-center' para centralizar

    // Adicionar o ícone
    const icon = document.createElement('img');
    icon.src = `./icons/${topic.toLowerCase().replace(/\s+/g, '-').replace('/', '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.svg`;
    icon.alt = `${topic} icon`;
    icon.classList.add('h-6', 'w-6'); // Tamanho do ícone

    // Adicionar o texto
    const textNode = document.createTextNode(topic);

    // Montar a estrutura
    topicTitle.appendChild(icon);
    topicTitle.appendChild(textNode);
    topicDiv.appendChild(topicTitle);

    topics[topic].forEach((question, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('mb-4', 'flex', 'items-center', 'justify-between', 'text-center');

      const questionLabel = document.createElement('p');
      questionLabel.classList.add('font-regular', 'flex-1', 'mr-4', 'mb-2', 'md:mb-0');
      questionLabel.textContent = question;

      const buttonGroup = document.createElement('div');
      buttonGroup.classList.add('flex', 'space-x-2');

      for (let i = 0; i <= 4; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('px-3', 'py-2', 'rounded-md', 'text-center', 'button-scale', 'bg-gray-500');
        button.dataset.question = `${topic}-${index}`;
        button.dataset.value = i;

        button.classList.add('transition-colors', 'duration-500');

        button.addEventListener('click', function (event) {
          event.preventDefault();
          selectOption(`${topic}-${index}`, i, topic);
        });

        buttonGroup.appendChild(button);
      }

      questionDiv.appendChild(questionLabel);
      questionDiv.appendChild(buttonGroup);
      topicDiv.appendChild(questionDiv);
    });

    container.appendChild(topicDiv);
  });
}



// Aplicar cor conforme o valor escolhido

function applyColor(button, value) {

  button.classList.remove('bg-green-500', 'bg-yellow-400', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'text-white');



  if (value === 0) button.classList.add('bg-green-500', 'text-white');

  else if (value === 1) button.classList.add('bg-yellow-400', 'text-white');

  else if (value === 2) button.classList.add('bg-yellow-500', 'text-white');

  else if (value === 3) button.classList.add('bg-orange-500', 'text-white');

  else if (value === 4) button.classList.add('bg-red-500', 'text-white');

}



// Selecionar opção e armazenar resposta

function selectOption(questionIndex, value, topic) {

  document.querySelectorAll(`[data-question="${questionIndex}"]`).forEach(button => {

    applyColor(button, null);

  });



  const selectedButton = document.querySelector(`[data-question="${questionIndex}"][data-value="${value}"]`);

  applyColor(selectedButton, value);



  if (!responses[topic]) {

    responses[topic] = [];

  }

  responses[topic][questionIndex] = value;

}



// Função para calcular os resultados

function calculateResults() {

  const sectionSums = {};

  let totalSum = 0;



  Object.keys(topics).forEach(topic => {

    const topicScores = topics[topic].map((_, index) => responses[topic] && responses[topic][`${topic}-${index}`] !== undefined ? responses[topic][`${topic}-${index}`] : 0);

    const sectionSum = topicScores.reduce((sum, score) => sum + score, 0);

    sectionSums[topic] = sectionSum;

    totalSum += sectionSum;

  });



  return { sectionSums, totalSum };

}



// Obter a classe de cor conforme o valor

function getColorClass(value) {

  switch (value) {

    case 0: return 'bg-green-500 text-white';

    case 1: return 'bg-yellow-400 text-white';

    case 2: return 'bg-yellow-500 text-white';

    case 3: return 'bg-orange-500 text-white';

    case 4: return 'bg-red-500 text-white';

    default: return 'bg-gray-200 text-black';

  }

}



// Capturar os dados do paciente

function capturePatientData() {

  patientData.nome = document.getElementById("nome").value;

  patientData.idade = document.getElementById("idade").value;

  patientData.idade = document.getElementById("peso").value;

  patientData.idade = document.getElementById("altura").value;

  patientData.data = document.getElementById("data").value;

}



// Exibir a página de resultados

function showResultsPage() {

  capturePatientData();

  const { sectionSums, totalSum } = calculateResults();

  const resultWindow = window.open("", "_blank");

  resultWindow.document.write(`

    <html lang="pt-BR">

    <head>

      <meta charset="UTF-8">

      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>Resultados do Questionário Metabólico</title>

      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

      <link rel="stylesheet" href="css/styles.css">

    </head>

    <body class="bg-[#250A2C]">
  <nav class="bg-[#250A2C] bg-opacity-90 backdrop-blur-sm top-0 left-0 w-full z-50 flex justify-center h-24 md:h-32 separador md:mt-0 mt-2 mb-4">
    <img src="http://lp.saudeavancada.com.br/fsaneo/img/logo-fsa-horizontal.svg" class="h-18 md:h-24 max-w-xs md:ml-6 md:mt-5">
    <!-- <img src="https://lp.saudeavancada.com.br/aescolha/assets/img/logotipo-a-escolha.svg" class="h-24 max-w-xs md:mr-8"> -->
  </nav>
   <div class="text-center mt-24">
   
      <p class="text-xl text-center quest mx-auto rounded p-1 inline-block pl-4 pr-4">Questionário de</p>
      <h1 class="text-5xl font-bold mb-8 mt-2 text-center mx-auto text-white">Rastreamento Metabólico</h1>
      <p class="text-2xl text-center mx-auto rounded p-1 inline-block pl-4 pr-4">Confira seus resultados.</p>
    </div>

        <div class="max-w-5xl mx-auto mb-6 p-4">

          <p><strong>Nome:</strong> ${patientData.nome}</p>

          <p><strong>Idade:</strong> ${patientData.idade}</p>

          <p><strong>Peso:</strong> ${patientData.peso}</p>

          <p><strong>Altura:</strong> ${patientData.altura}</p>

          <p><strong>Data:</strong> ${patientData.data}</p>

        </div>

        <div id="results" class="max-w-5xl mx-auto space-y-8">

  `);



  Object.keys(topics).forEach(topic => {

    resultWindow.document.write(`

      <div class="mb-6 p-4 rounded-md">

        <h2 class="text-base text-white font-semibold mb-4 topic-title">${topic} - Total: ${sectionSums[topic]}</h2>

    `);



    topics[topic].forEach((question, index) => {

      const score = responses[topic] && responses[topic][`${topic}-${index}`] !== undefined ? responses[topic][`${topic}-${index}`] : "Sem resposta";

      const colorClass = getColorClass(score);



      resultWindow.document.write(`

        <div class="flex justify-between items-center mb-2">

          <p class="flex-1">${question}</p>

          <span class="px-3 py-1 rounded-md ${colorClass}">${score}</span>

        </div>

      `);

    });



    resultWindow.document.write(`</div>`);

  });



  resultWindow.document.write(`

        </div>

        <div class="text-center mt-8">

          <h3 class="text-xl font-bold">Soma Total: ${totalSum}</h3>

        </div>

        <div class="flex justify-center mt-6">

          <button onclick="window.print()" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Gerar PDF</button>

        </div>

      </div>

    </body>

    </html>

  `);



  resultWindow.document.close();

}



document.getElementById('showResults').addEventListener('click', showResultsPage);

renderQuestionnaire();