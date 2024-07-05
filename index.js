const apiUrl = 'https://6626e00db625bf088c06d1c4.mockapi.io/api/v1/tareas';
        const tareasContainer = document.getElementById('tareas-container');

        function cargarTareas() {
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => {
                    if (a.estado === 'finalizada' && b.estado !== 'finalizada') return 1;
                    if (a.estado !== 'finalizada' && b.estado === 'finalizada') return -1;
                    return new Date(b.fechacreacion) - new Date(a.fechacreacion);
                });

                tareasContainer.innerHTML = '';
                data.forEach((tarea, index) => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.dataset.descripcion = tarea.descripcion;

                    const fecha = new Date(tarea.fechacreacion);
                    const fechaFormateada = fecha.toLocaleString(); 

                    card.innerHTML = `
                        <div class="tarea-info">
                            <h3>${tarea.titulo}</h3>
                            <p>${fechaFormateada}</p>
                            <button class="btnEliminar" data-id="${tarea.id}">Eliminar</button>
                        </div>
                        <img src="${tarea.estado === 'finalizada' ? 'assets/tic-verde-icon.jpg' : tarea.estado === 'en progreso' ? 'assets/en-progreso.png' : 'assets/play-button-icon.jpg'}" alt="Play" class="play-button">
                    `;

                    tareasContainer.appendChild(card);

                    const img = card.querySelector('.play-button');
                    img.addEventListener('click', () => {
                        reproducirDescripcion(tarea.descripcion);
                    });

                    const btnEliminar = card.querySelector('.btnEliminar');
                    btnEliminar.addEventListener('click', () => {
                        eliminarTarea(tarea.id);
                    });

                    if (index === data.length - 1) {
                        card.style.marginBottom = '120px';
                    }
                });
            })
            .catch(error => console.error("Error al obtener los datos:", error));
        }

        function reproducirDescripcion(descripcion) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = descripcion || "Descripción no disponible.";

            const settings = JSON.parse(localStorage.getItem('configSettings')) || {
                voice: 'es-MX', 
                rate: 1
            };

            utterance.lang = settings.voice;
            utterance.rate = settings.rate; 

            speechSynthesis.speak(utterance);
        }

        function eliminarTarea(id) {
            fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        cargarTareas();
                    } else {
                        console.error('Error al eliminar la tarea');
                    }
                })
                .catch(error => console.error('Error al eliminar la tarea:', error));
        }

        cargarTareas();

        document.getElementById('menu-toggle').addEventListener('click', function() {
            document.body.classList.toggle('menu-open');
        });
