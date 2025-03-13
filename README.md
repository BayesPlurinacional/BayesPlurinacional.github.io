# 📌 Bayes Plurinacional - Proyecto Web

## 🚀 **Estructura del Proyecto**
Este proyecto está diseñado para gestionar la información del evento Bayes Plurinacional de manera modular y dinámica. Utiliza Web Components para hacer que el código sea reutilizable y fácil de mantener.

```
📂 _assets
 ├── 📂 _css
 │   ├── global.css        👈 Estilos globales para toda la web
 │   ├── navbar.css        👈 Estilos específicos del navbar principal
 │   ├── secondary-navbar.css 👈 Estilos del navbar secundario
 │   ├── footer.css        👈 Estilos específicos del footer
 │
📂 _components
 ├── navbar.js             👈 Web Component del navbar principal
 ├── secondary-navbar.js   👈 Web Component del navbar secundario (dinámico por año)
 ├── footer.js             👈 Web Component del footer
 ├── header.js             👈 Componente que une navbar, footer y secondary-navbar
 │
📂 _data
 ├── navbar.json           👈 Configuración dinámica del navbar principal
 ├── secundario.json       👈 Configuración del navbar secundario
 ├── footer.json           👈 Datos dinámicos para el footer
 │
📂 _pages
 ├── 📂 es
 │   ├── 2025              👈 Secciones del evento 2025
 │   │   ├── index.html    👈 Página principal del evento 2025
 │   │   ├── organizacion.html 👈 Información de organizadores
 │   │   ├── disertantes.html 👈 Lista de disertantes
 │   │   ├── cronograma.html 👈 Cronograma del evento
 │── 📂 en
 │   ├──  ...
📂 _static
 ├── 📂 img
 ├── 📂 logos

```

---

## 📌 **Uso de Web Components**
Para optimizar la reutilización de código, hemos implementado **Web Components** para el **navbar** y el **footer**, asegurando que todas las páginas usen la misma estructura sin necesidad de duplicar código.

### 🛠 **Componentes Principales**
#### 📌 `navbar.js` (ahora dinámico con JSON)
Ubicación: `_components/es/navbar.js`

- Genera el navbar dinámicamente a partir del archivo `navbar.json`.
- Mapea **eventos** de forma automática, separando **presencial, virtual y galería**.
- Soporta **selector de idiomas**, modificando rutas y enlaces en la navegación.

#### 📌 `footer.js` (con últimos eventos dinámicos)
Ubicación: `_components/es/footer.js`

- Se conecta a `footer.json` para cargar enlaces de **Sobre Nosotros, Contacto y Redes Sociales**.
- Extrae automáticamente los **últimos 3 eventos** de `navbar.json` para mostrarlos en la sección "Últimos Eventos".
- Integra íconos dinámicos de redes sociales.

#### 📌 `header.js` (navbar + footer en una sola línea)
Ubicación: `_components/es/header.js`

- Este componente **agrupa navbar y footer automáticamente**, permitiendo que todas las páginas tengan la misma estructura.

---

## 📌 **Cómo Usarlo en una Página HTML**
Para utilizar la nueva estructura en cualquier página, simplemente incluimos los scripts de los componentes y usamos `<custom-header>`.

📌 **Ejemplo de Uso en una Página HTML**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Evento 2025 | Bayes Plurinacional</title>
  <link rel="stylesheet" href="/_assets/_css/global.css">
  <script type="module" src="/_components/header.js"></script>
</head>
<body>

  <custom-header data-event-type="Presencial" data-event-key="Evento 2025" data-lang="es">
    <section class="hero text-center">
      <h1>¡Nos Preparamos para Bogotá 2025!</h1>
      <p>Del 15 al 17 de octubre en la Universidad Externado de Colombia.</p>
    </section>
  </custom-header>

</body>
</html>
```

---

## 📌 **📂 Explicación de los Archivos JSON**
Ahora el sistema utiliza **JSON dinámicos** en lugar de escribir HTML manualmente. Aquí está su función:

### 📌 **`navbar.json`**
Ubicación: `_data/navbar.json`

- Contiene **toda la estructura del navbar** con enlaces generales.
- Permite la **carga dinámica de eventos y categorías**.
- Soporta selector de idiomas (`{idioma}` se reemplaza por `es` o `en` automáticamente).

📌 **Ejemplo:**
```json
{
  "navbar": {
    "global": {
      "Blog": "/_pages/{idioma}/blog.html"  // 🔥 Se agrega aquí
    }
  }
}

```

### 📌 Modificar el Navbar Secundario (secundario.json)
#### 📍 Ubicación: _data/secundario.json
Si queremos agregar una nueva pestaña para un evento, editamos secundario.json.

📌 Ejemplo: Agregar "Cronograma" en Evento 2025

```json
{
  "Evento": {
    "Presencial": {
      "Evento 2025": {
        "Inicio": "index.html",
        "Organización": "organizacion.html",
        "Disertantes": "disertantes.html",
        "Cronograma": "cronograma.html"  // 🔥 Agregado aquí
      }
    }
  }
}

```
💡 No es necesario modificar secondary-navbar.js, ya que carga automáticamente las secciones del JSON.

---

## 📌 **🔧 Estilos Globales**
Ubicación: `_assets/_css/global.css`

Para mantener una apariencia uniforme, utilizamos **Bootstrap** y definimos una paleta de colores y tipografías en este archivo.

### 🎨 **Colores Definidos**
```css
:root {
    --color-primario: #2A2D6F;
    --color-secundario: #E67E22;
    --color-texto: #333;
}
```

### 🔠 **Tipografías**
```css
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;700&family=Manrope:wght@400;600&display=swap');
```

---
# 📌 🔗 Conclusión
- ✅ Web Components permiten modularidad y mantenimiento fácil.
- ✅ El navbar.js, secondary-navbar.js y header.js crean una estructura dinámica.
- ✅ Modificar navbar.json y secundario.json permite agregar o quitar secciones sin tocar código JS.
- ✅ Cada evento (2025, 2024, etc.) tiene su propio navbar secundario y estructura independiente.