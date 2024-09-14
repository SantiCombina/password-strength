# Password Strength Tester

Este proyecto es una aplicación simple desarrollada en React para evaluar la fortaleza de contraseñas, conforme a los requisitos del trabajo práctico #2 de la materia de Desarrollo de Software. La aplicación permite ingresar una contraseña, clasificar su fortaleza, copiarla al portapapeles, y generar contraseñas aleatorias con opciones personalizables.

## Objetivo

El objetivo de esta aplicación es demostrar la capacidad para aplicar conceptos básicos de React, como diseño orientado a componentes, parametrización y manejo de estado. 

## Requisitos Técnicos Generales

- **Componentes:**
  - La aplicación cuenta con varios componentes y se utiliza la biblioteca [shadcn](https://ui.shadcn.com/) para la interfaz de usuario.
  
- **Propiedades:**
  - `GeneratorMenu` recibe propiedades (`password`, `setPassword`) y utiliza el estado para gestionar la contraseña generada.

- **Estado:**
  - El componente `App` utiliza el estado para manejar la visibilidad de la contraseña, la contraseña actual y la confirmación de copiado.

## Requisitos Técnicos Específicos

- **Entrada de texto:**
  - Permite al usuario ingresar una contraseña.

- **Botón de mostrar/ocultar contraseña:**
  - Un botón para alternar la visibilidad de la contraseña ingresada.

- **Clasificación de fortaleza de contraseña:**
  - La fortaleza de la contraseña se clasifica en "Very Weak", "Weak", "Fair", "Good", "Strong" en función de criterios como longitud y diversidad de caracteres.

- **Cálculo de fortaleza:**
  - La fortaleza se evalúa utilizando la librería [zxcvbn](https://github.com/dropbox/zxcvbn), que proporciona una evaluación detallada y profesional basada en la longitud, la diversidad de caracteres y la complejidad de la contraseña.

## Power Ups Implementados

- **Copiar al portapapeles:**
  - Un botón para copiar la contraseña al portapapeles, con un mensaje de confirmación que desaparece automáticamente después de 3 segundos.

- **Generar contraseña aleatoria:**
  - Un panel avanzado para configurar los parámetros de generación de contraseñas:
    - Largo de la contraseña.
    - Inclusión de letras minúsculas, mayúsculas, números y caracteres especiales.

## Despliegue

La aplicación está desplegada en Vercel. Puedes probar la aplicación directamente desde este enlace: [Password Strength Tester](https://password-strength-ruby.vercel.app/)
