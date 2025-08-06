const totalCards = 20;
const derechos = [
   "Conocer todos los trámites administrativos",
   "Ser informado de todo lo relacionado con su atención",
   "Recibir atención que salvaguarde su dignidad personal y respete sus valores",
   "Respetar su privacidad y confidencialidad",
   "Recibir un trato amable y cortés",
   "Conocer sobre la enfermedad y tratamientos",
   "Ser atendido por personal capacitado",
   "Recibir prescripción de medicamentos y explicación",
   "Aceptar o rechazar procedimientos",
   "Recibir atención según necesidades"
];

const deberes = [
   "Mantener el orden y aseo en la institución",
   "Cumplir las normas y actuar de buena fe",
   "Exponer su estado de salud y motivo de visita",
   "Seguir las recomendaciones médicas",
   "No solicitar servicios con información engañosa",
   "Brindar información para un buen servicio",
   "Informar actos que afecten a la clínica",
   "Cumplir citas y requerimientos",
   "Respetar al personal y a los usuarios",
   "Brindar un trato amable y digno"
];
let cards = [];
let selectedCards = [];
let valuesUsed = [];


let currentMove = 0;
let currentAttempts = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
   if (currentMove < 2) {
      
      if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active') ) {
         e.target.classList.add('active');
         selectedCards.push(e.target);

         if (++currentMove == 2) {

            currentAttempts++;
            document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

            if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
               selectedCards = [];
               currentMove = 0;
            }
            else {
               setTimeout(() => {
                  selectedCards[0].classList.remove('active');
                  selectedCards[1].classList.remove('active');
                  selectedCards = [];
                  currentMove = 0;
               }, 600);
            }
         }
      }
   }
}

let ultimoTipo = null;

function startGame(tipo) {
    ultimoTipo = tipo;
    document.querySelector('#game').innerHTML = '';
    cards = [];
    selectedCards = [];
    valuesUsed = [];
    currentMove = 0;
    currentAttempts = 0;
    document.querySelector('#stats').innerHTML = '0 intentos';

    const base = tipo === 'derechos' ? derechos : deberes;

    // Duplicar y mezclar
    const duplicated = [...base, ...base];
    const shuffled = duplicated.sort(() => 0.5 - Math.random());

    shuffled.forEach(text => {
        let div = document.createElement('div');
        div.innerHTML = cardTemplate;
        div.querySelector('.face').textContent = text;
        const card = div.querySelector('.card');
        card.addEventListener('click', activate);

        // ✅ Añadir animación aquí
        card.classList.add('animar');

        cards.push(div);
        document.querySelector('#game').appendChild(div);
    });
}

// Lógica para el botón de reinicio
document.getElementById('btn-reiniciar').onclick = function() {
    if (ultimoTipo) {
        startGame(ultimoTipo);
    } else {
        // Si no se ha seleccionado ningún tipo, puedes mostrar un mensaje o iniciar con un valor por defecto
        alert('Primero selecciona un modo de juego.');
    }
};
