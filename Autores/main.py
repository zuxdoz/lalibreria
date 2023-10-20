import os
import fitz  # PyMuPDF
from PIL import Image

def convertir_pdf_a_imagen(pdf_path, imagen_path, width, height):
    # Abre el archivo PDF
    pdf_document = fitz.open(pdf_path)
    # Abre la primera página del PDF
    primera_pagina = pdf_document.load_page(0)

    # Obtiene las dimensiones de la página
    dimensiones = primera_pagina.rect

    # Convierte la página a una imagen
    imagen_pil = Image.frombytes("RGB", (int(dimensiones.width), int(dimensiones.height)), primera_pagina.get_pixmap().samples)

    # Redimensiona la imagen a las dimensiones deseadas
    imagen_redimensionada = imagen_pil.resize((width, height))

    # Guarda la imagen
    imagen_redimensionada.save(imagen_path)

    # Cierra el archivo PDF
    pdf_document.close()

def main():
    # Directorio actual
    directorio_actual = os.getcwd()

    # Busca archivos PDF en el directorio actual
    archivos_pdf = [archivo for archivo in os.listdir(directorio_actual) if archivo.endswith(".pdf")]

    if archivos_pdf:
        # Toma el primer archivo PDF encontrado
        primer_archivo_pdf = archivos_pdf[0]

        # Ruta completa del archivo PDF
        ruta_pdf = os.path.join(directorio_actual, primer_archivo_pdf)

        # Ruta completa para la imagen de salida
        ruta_imagen_salida = os.path.join(directorio_actual, "logo.png")

        # Tamaño deseado de la imagen
        ancho_deseado = 150
        alto_deseado = 200

        # Convierte el primer PDF a una imagen y guarda la imagen con el nombre "logo"
        convertir_pdf_a_imagen(ruta_pdf, ruta_imagen_salida, ancho_deseado, alto_deseado)

        print(f"Imagen creada exitosamente: {ruta_imagen_salida}")
    else:
        print("No se encontraron archivos PDF en el directorio actual.")

if __name__ == "__main__":
    main()
