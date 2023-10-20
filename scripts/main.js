// main.mjs

import { cargarLibros, mostrarLibros } from './libros.js';
import { cargarDatos, mostrarResultadosBusqueda } from './busqueda.js';

document.addEventListener("DOMContentLoaded", async function () {
    const librosContainer = document.getElementById("libros-container");
    const searchInput = document.querySelector(".search-input");
    const resultadosBusqueda = document.getElementById("resultados-busqueda");

    // Cargar libros al cargar la página
    const libros = await cargarLibros();

    // Mostrar los libros cargados
    mostrarLibros(libros, librosContainer);

    // Evento de entrada en la barra de búsqueda
    searchInput.addEventListener("input", function () {
        const textoBusqueda = this.value;
        console.log("Texto de búsqueda:", textoBusqueda);
        // Utilizar la función de búsqueda
        mostrarResultadosBusqueda(textoBusqueda, resultadosBusqueda, librosContainer);
    });

    
    // Otro código...
});


