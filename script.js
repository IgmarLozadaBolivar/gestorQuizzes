// Mostrar ventana emergente de bienvenida 
Swal.fire({
    title: '¡Bienvenido!',
    text: 'Gracias por visitar nuestro sitio de Gestor de Quizzes.',
    icon: 'info',
    confirmButtonText: 'Aceptar'
});

class Pregunta {
    constructor(texto, opciones, respuestaCorrecta) {
        this.texto = texto;
        this.opciones = opciones;
        this.respuestaCorrecta = respuestaCorrecta;
    }

    verificarRespuesta(respuestaUsuario) {
        return respuestaUsuario === this.respuestaCorrecta;
    }
}

class Quiz {
    constructor(nombre) {
        this.nombre = nombre;
        this.preguntas = [];
    }

    agregarPregunta(pregunta) {
        this.preguntas.push(pregunta);
    }

    actualizarPregunta(indice, preguntaActualizada) {
        if (indice >= 0 && indice < this.preguntas.length) {
            this.preguntas[indice] = preguntaActualizada;
        }
    }

    eliminarPregunta(indice) {
        if (indice >= 0 && indice < this.preguntas.length) {
            this.preguntas.splice(indice, 1);
        }
    }

    obtenerPreguntasFormateadas() {
        let resultado = '';
        this.preguntas.forEach((pregunta, indice) => {
            resultado += `Pregunta ${indice + 1}: ${pregunta.texto}\n`;
            pregunta.opciones.forEach((opcion, opcionIndice) => {
                resultado += `${String.fromCharCode(97 + opcionIndice)}. ${opcion}\n`;
            });
            resultado += `Rta: ${pregunta.respuestaCorrecta}\n\n`;
        });
        return resultado;
    }
}

const quizzes = [];


function crearQuiz(nombre) {
    const nuevoQuiz = new Quiz(nombre);
    quizzes.push(nuevoQuiz);
    mostrarQuizzes();
    mostrarQuizzesList();
}

function agregarPregunta(indiceQuiz, pregunta) {
    if (indiceQuiz >= 0 && indiceQuiz < quizzes.length) {
        quizzes[indiceQuiz].agregarPregunta(pregunta);
        mostrarQuizzes();
    }
}

function mostrarQuizzes() {
    const quizzesContainer = document.getElementById('quizzes-container');
    quizzesContainer.innerHTML = '';

    quizzes.forEach((quiz, indiceQuiz) => {
        const quizElement = document.createElement('div');
        quizElement.classList.add('quiz');

        const nombreQuiz = document.createElement('h2');
        nombreQuiz.textContent = `Quiz: ${quiz.nombre}`;
        quizElement.appendChild(nombreQuiz);

        const agregarPreguntaForm = document.createElement('form');
        agregarPreguntaForm.innerHTML = `
            <h3>Agregar Pregunta</h3>
            <label for="pregunta-texto">Pregunta:</label>
            <input type="text" id="pregunta-texto" required>

            <label for="opcion1">Opcion A:</label>
            <input type="text" id="opcion1" required>

            <label for="opcion2">Opcion B:</label>
            <input type="text" id="opcion2" required><br>

            <label for="opcion3">Opcion C:</label>
            <input type="text" id="opcion3" required><br>

            <label for="opcion4">Opcion D:</label>
            <input type="text" id="opcion4" required><br>

            <label for="respuesta">Opcion Correcta:</label>
            <input type="text" id="respuesta" required><br>

            <button type="submit">Agregar</button>
        `;

        agregarPreguntaForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const preguntaNueva = new Pregunta(
                document.getElementById('pregunta-texto').value,
                [
                    document.getElementById('opcion1').value,
                    document.getElementById('opcion2').value,
                    document.getElementById('opcion3').value,
                    document.getElementById('opcion4').value
                ],
                document.getElementById('respuesta').value
            );

            const indiceQuiz = quizzes.length - 1;
            agregarPregunta(indiceQuiz, preguntaNueva);

            /* Ventana Emergente como Alerta! */
            Swal.fire('Exito', 'Las preguntas han sido agregadas exitosamente.', 'success');

            event.target.reset();
        });

        document.getElementById('quizzes-container').appendChild(agregarPreguntaForm);

        quizElement.appendChild(agregarPreguntaForm);

        const preguntasContainer = document.createElement('div');
        quiz.preguntas.forEach((pregunta, indicePregunta) => {
            const preguntaElement = document.createElement('div');
            preguntaElement.classList.add('pregunta');

            const preguntaTexto = document.createElement('p');
            preguntaTexto.textContent = pregunta.texto;
            preguntaElement.appendChild(preguntaTexto);

            pregunta.opciones.forEach((opcion, opcionIndice) => {
                const opcionElement = document.createElement('p');
                opcionElement.textContent = `${String.fromCharCode(97 + opcionIndice)}. ${opcion}`;
                preguntaElement.appendChild(opcionElement);
            });

            const respuestaCorrecta = document.createElement('p');
            respuestaCorrecta.textContent = `Rta: ${pregunta.respuestaCorrecta}`;
            preguntaElement.appendChild(respuestaCorrecta);

            const actualizarBtn = document.createElement('button');
            actualizarBtn.className = "actualizar"
            actualizarBtn.type = 'actualizar';
            actualizarBtn.textContent = 'Actualizar';
            actualizarBtn.addEventListener('click', () => {
                actualizarPregunta(indiceQuiz, indicePregunta);
            });
            preguntaElement.appendChild(actualizarBtn);

            const eliminarBtn = document.createElement('button');
            eliminarBtn.className = "eliminar"
            eliminarBtn.type = 'eliminar'
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.addEventListener('click', () => {
                eliminarPregunta(indiceQuiz, indicePregunta);
            });
            preguntaElement.appendChild(eliminarBtn);

            preguntasContainer.appendChild(preguntaElement);
        });

        quizElement.appendChild(preguntasContainer);

        quizzesContainer.appendChild(quizElement);
    });
}

function actualizarPregunta(indiceQuiz, indicePregunta) {
    if (indiceQuiz >= 0 && indiceQuiz < quizzes.length) {
        const quiz = quizzes[indiceQuiz];
        const preguntaActualizada = prompt(`Ingrese la opcion actualizada:`);
        const opcionesActualizadas = [];

        for (let i = 0; i < quiz.preguntas[indicePregunta].opciones.length; i++) {
            const opcion = prompt(`Ingrese la opcion ${i + 1}:`);
            opcionesActualizadas.push(opcion);
        }

        const respuestaCorrectaActualizada = prompt(`Ingrese la opcion correcta:`);

        const preguntaActualizadaObj = new Pregunta(preguntaActualizada, opcionesActualizadas, respuestaCorrectaActualizada);
        quiz.actualizarPregunta(indicePregunta, preguntaActualizadaObj);

        mostrarQuizzes();
    }
}

// Funcion para eliminar una pregunta de un quiz en especifico
function eliminarPregunta(indiceQuiz, indicePregunta) {
    if (indiceQuiz >= 0 && indiceQuiz < quizzes.length) {
        const confirmacion = confirm(`¿Estas seguro/a de eliminar la pregunta?`);

        if (confirmacion) {
            quizzes[indiceQuiz].eliminarPregunta(indicePregunta);
            mostrarQuizzes();
        }
    }
}

// Funcion para mostrar la lista de quizzes creados
function mostrarQuizzesList() {
    const quizzesList = document.getElementById('quizzes-list');
    quizzesList.innerHTML = '';

    quizzes.forEach((quiz, indiceQuiz) => {
        const listItem = document.createElement('li');
        listItem.textContent = quiz.nombre;

        const seleccionarBtn = document.createElement('button');
        seleccionarBtn.className = "seleccionar";
        seleccionarBtn.textContent = 'Inspeccionar';
        seleccionarBtn.addEventListener('click', () => {
            /* Ventana Emergente como Alerta! */
            Swal.fire({
                title: quiz.nombre,
                html: `<pre>${quiz.obtenerPreguntasFormateadas()}</pre>`,
                confirmButtonText: 'OK',
            });
        });
        listItem.appendChild(seleccionarBtn);

        quizzesList.appendChild(listItem);
    });
}

const crearQuizForm = document.getElementById('crear-quiz-form');
crearQuizForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombreQuizInput = document.getElementById('nombre-quiz');
    const nombreQuiz = nombreQuizInput.value.trim();

    if (nombreQuiz === '') {
        /* Ventana Emergente como Alerta! */
        Swal.fire('Error', 'Debes ingresar un nombre para el quiz.', 'error');
        return;
    }

    const nuevoQuiz = new Quiz(nombreQuiz);
    quizzes.push(nuevoQuiz);
    mostrarQuizzes();
    mostrarQuizzesList();

    /* Ventana Emergente como Alerta! */
    Swal.fire('Exito', 'El quiz ha sido creado exitosamente.', 'success');

    event.target.reset();
});

mostrarQuizzes();
mostrarQuizzesList();