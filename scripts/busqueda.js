// busqueda.js

// Función para cargar datos de la base de datos
function cargarDatos() {
    return fetch("booksbd.json")
        .then(response => response.json())
        .then(data => {
            // Obtén un array plano de nombres de libros de la base de datos
            const nombresLibros = data.autores.flatMap(autor => autor.libros.map(libro => libro.titulo));
            return nombresLibros;
        });
}

// Función para mostrar resultados de la búsqueda
function mostrarResultadosBusqueda(texto, resultadosBusqueda, librosContainer) {
    // Verificar si el texto de búsqueda tiene caracteres
    if (texto.trim().length === 0) {
        // Si el texto está vacío, no hacemos nada
        resultadosBusqueda.innerHTML = "";
        return;
    }

    // Cargar datos y filtrar los libros que coinciden con el texto
    cargarDatos().then(nombresLibros => {
        const resultadosFiltrados = nombresLibros.filter(libro =>
            libro.toLowerCase().includes(texto.toLowerCase())
        );

        // Crear un contenedor para los resultados debajo de la barra de búsqueda
        const contenedorResultados = document.createElement("div");
        contenedorResultados.classList.add("contenedor-resultados");

        // Crea un elemento para cada resultado y añádelo al contenedor
        contenedorResultados.innerHTML = resultadosFiltrados.map(libro => `<p>${libro}</p>`).join("");

        // Muestra el contenedor de resultados si hay coincidencias, o lo oculta si no hay coincidencias
        contenedorResultados.style.display = resultadosFiltrados.length > 0 ? "block" : "none";

        // Limpia el contenedor de resultados y agrega el nuevo contenedor
        resultadosBusqueda.innerHTML = "";
        resultadosBusqueda.appendChild(contenedorResultados);

    });
}


// Exporta las funciones para poder utilizarlas en otros archivos
export { cargarDatos, mostrarResultadosBusqueda };
