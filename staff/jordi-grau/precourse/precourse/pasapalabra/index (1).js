// variables
var player ;
var answeredQuestions = 0;
var match = 0;
var mistakes = 0;
var counter = 0;
var nexTurn = true;
var test = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churrumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},
    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
    { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"},
    { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},
    { letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo"},
    { letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
    { letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia"},
    { letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
    { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    { letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
    { letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
    { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor"},
    { letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
    { letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
    { letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
    { letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
    { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
    { letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"},
    { letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
    { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
]



var players = []
var player = players.push (new CreatePlayer("Scarlet Johanson", 20));
var player = players.push (new CreatePlayer("M. Rajoy", 3));
var player = players.push (new CreatePlayer("Jose Fernandez", 12));
var player = players.push (new CreatePlayer('Mi cuñao', 1));
var player = players.push (new CreatePlayer('Jo', 24));
var player = players.push (new CreatePlayer('Tu', 0));


// funcions

//crear els jugadors
function CreatePlayer (name, points, ranking){
    this.name = name;
    this.points = points;  
}

//partida
function game(){
    for (var i = 0;  i < 27 ; i++){  
        if (test[i].status == 0 && nexTurn == true){ //bucle per passar per les preguntes, descartant les ja contestades
            console.log(test[i].question)
            var userAnswer = prompt('Escribe tu respuesta ...:'+ '\n pulsa CANCELAR o escribe END para salir del juego');
            if (userAnswer == null){ //en cas de clicar en "cancelar" finalitza la partida.
                nexTurn = false;
                answeredQuestions = 27;
                break;
            }
            else { 
                 userAnswer = userAnswer.toLowerCase();
                switch (userAnswer){
                case test[i].answer :
                test[i].status = 1; 
                console.log('correcto');
                match++;
                answeredQuestions++;
                break;
                case 'pasapalabra':
                console.log('pasamos a la siguiente pregunta');
                break;
                case "end":   //terminar partida en cas d'escriure "end".
                nexTurn = false;
                answeredQuestions = 27; 
                break
                default :
                    console.log('Has fallado. La respuesta es: ' + test[i].answer + '.');
                    test[i].status = 1;
                    mistakes++;
                    answeredQuestions++;
                    break;
                }                
            }
        }
    }
}
//terminar les preguntes a on s'ha escrit "pasapalabra".
function fullRound(){ 
    do{game()}
    while (answeredQuestions < 27 );
}
fullRound()
//mostrar puntuacio
function yourScore (){
    players[5].points = match;
    console.log('Has obtingut: ' + match + ' encerts.' +  ' i ' + mistakes + ' errors.')
}

//mostrar ranking, nomes en cas d'haver acabat la partida
var a = 1;
function yourRanking(){
    if (nexTurn == false){
        yourScore()
        console.log('Fins aviat...');
    }
    else if (nexTurn == true){ 
        yourScore()
     players.sort(function (a, b){ //endreça els jugadors segons la seva puntuacio.
     return (b.points - a.points);
        });
        for (var i = 0; i < players.length; i++){
        var ranking = players[i].name
        console.log('Posició ' +  a + ' : ' + ranking +   ' amb: ' + players[i].points + ' punts.' )
        a++
        }
    }
}
yourRanking()