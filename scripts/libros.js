// libros.mjs

// Función para cargar libros desde la base de datos
function cargarLibros() {
    return fetch("scripts/booksbd.json")
        .then(response => response.json())
        .then(data => {
            // Mapear cada libro con su autor correspondiente
            return data.autores.flatMap(autor =>
                autor.libros.map(libro => ({
                    ...libro,
                    autor: autor.nombre, // Añadir el nombre del autor al libro
                }))
            );
        });
}

// Función para mostrar libros en el contenedor proporcionado
function mostrarLibros(libros, librosContainer) {
    // Limpiar el contenedor de libros
    librosContainer.innerHTML = "";

    // Mostrar los libros recibidos
    libros.forEach(libro => {
        const rutaImagen = `../Autores/${libro.autor}/${libro.titulo}/logo.png`;
        const rutaPDF = `../Autores/${libro.autor}/${libro.titulo}/${libro.titulo}.pdf`;

        const libroElement = document.createElement("div");
        libroElement.classList.add("libro");

        const enlaceElement = document.createElement("a");
        enlaceElement.href = rutaPDF;
        enlaceElement.target = "_blank"; // Abrir en una nueva pestaña

        const imagenElement = document.createElement("img");
        imagenElement.src = rutaImagen;
        imagenElement.alt = libro.titulo;

        const nombreElement = document.createElement("p");
        nombreElement.textContent = libro.titulo;

        enlaceElement.appendChild(imagenElement);
        enlaceElement.appendChild(nombreElement);
        libroElement.appendChild(enlaceElement);

        librosContainer.appendChild(libroElement);
    });
}

// Exportar ambas funciones
export { cargarLibros, mostrarLibros };
