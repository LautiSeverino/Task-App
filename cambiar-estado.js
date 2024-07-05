const apiUrl = 'https://6626e00db625bf088c06d1c4.mockapi.io/api/v1/tareas';
const tareasContainer = document.getElementById('tareas-container');
const accionesContainer = document.getElementById('acciones-container');
let tareaSeleccionada = null;
let nuevoEstadoSeleccionado = null;

function cargarTareas() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion));
        
        tareasContainer.innerHTML = '';
        data.forEach(tarea => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div>
                    <h3>${tarea.titulo}</h3>
                    <h4>${tarea.descripcion}<h4>
                    <p>${tarea.fechacreacion}</p>
                </div>
                <select onchange="seleccionarEstado(${tarea.id}, this.value)">
                    <option value="pendiente" ${tarea.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                    <option value="en progreso" ${tarea.estado === 'en progreso' ? 'selected' : ''}>En progreso</option>
                    <option value="finalizada" ${tarea.estado === 'finalizada' ? 'selected' : ''}>Finalizada</option>
                </select>
            `;
            tareasContainer.appendChild(card);
        });
    })
    .catch(error => console.error("Error al obtener los datos:", error));
}

function seleccionarEstado(id, nuevoEstado) {
    tareaSeleccionada = id;
    nuevoEstadoSeleccionado = nuevoEstado;
}

function guardarCambios() {
    if (tareaSeleccionada !== null && nuevoEstadoSeleccionado !== null) {
        const fechaconclusion = nuevoEstadoSeleccionado === 'finalizada' ? new Date().toISOString() : null;
        fetch(`${apiUrl}/${tareaSeleccionada}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                estado: nuevoEstadoSeleccionado,
                fechaconclusion: fechaconclusion
            })
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'index.html';
        })
        .catch(error => console.error("Error al cambiar el estado:", error));
    }
}

function cancelarCambios() {
    window.location.href = 'index.html';
}

document.getElementById('guardar-btn').addEventListener('click', guardarCambios);
document.getElementById('cancelar-btn').addEventListener('click', cancelarCambios);

cargarTareas();
