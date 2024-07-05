const apiUrl = 'https://6626e00db625bf088c06d1c4.mockapi.io/api/v1/tareas';

document.getElementById('aceptar-btn').addEventListener('click', function() {
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const estado = document.getElementById('estado').value;
    const fechaCreacion = new Date().toISOString();

    if (titulo && descripcion && estado) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo,
                descripcion: descripcion,
                estado: estado,
                fechacreacion: fechaCreacion
            })
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'index.html';
        })
        .catch(error => console.error("Error al crear la tarea:", error));
    } else {
        alert("Todos los campos son obligatorios.");
    }
});

document.getElementById('cancelar-btn').addEventListener('click', function() {
    window.location.href = 'index.html';
});

