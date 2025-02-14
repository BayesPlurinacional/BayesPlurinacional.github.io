# 📌 Bayes Plurinacional - Proyecto Web

## 🚀 **Estructura del Proyecto**
Este proyecto está construido utilizando **HTML, CSS, Bootstrap y Web Components** para facilitar la reutilización de código y mejorar la mantenibilidad.

```
📂 _assets
 ├── 📂 _css
 │   ├── global.css   👈 Estilos globales
 │   ├── navbar.css   👈 Estilos específicos del navbar
 │   ├── footer.css   👈 Estilos específicos del footer
 │
📂 _components
 ├── 📂 es
 │   ├── navbar.js   👈 Web Component del navbar (dinámico)
 │   ├── footer.js   👈 Web Component del footer (dinámico)
 │   ├── header.js   👈 Web Component para manejar navbar + footer
 │
📂 _data
 ├── navbar.json    👈 Configuración dinámica del navbar
 ├── secondary.json 👈 Configuración específica de eventos
 ├── footer.json    👈 Configuración dinámica del footer
 │
📂 _pages
 ├── 📂 es
    ├── ...
 ├── 📂 en
    ├── ...
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

📌 **Ejemplo de `index.html`**
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bayes Plurinacional</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/_assets/_css/global.css">
    <script src="/_components/es/navbar.js" defer></script>
    <script src="/_components/es/footer.js" defer></script>
    <script src="/_components/es/header.js" defer></script>
</head>
<body>
    <custom-header>
        <main class="container mt-4">
            <h1>Bienvenido a Bayes Plurinacional</h1>
            <p>Esta es la página principal.</p>
        </main>
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
      "Eventos": {
        "Presencial": {
          "Evento 2023": "/_pages/{idioma}/2023/index.html",
          "Evento 2024": "/_pages/{idioma}/2024/index.html",
          "Evento 2025": "/_pages/{idioma}/2025/index.html"
        },
        "Galeria": {
          "Evento 2023": "/_pages/{idioma}/2023/galeria.html",
          "Evento 2024": "/_pages/{idioma}/2024/galeria.html",
          "Evento 2025": "/_pages/{idioma}/2025/galeria.html"
        }
      },
      "Seminarios Virtuales": "/_pages/{idioma}/Seminarios.html",
      "Comunidad": "/_pages/{idioma}/Comunidad.html",
      "Auspiciantes": "/_pages/{idioma}/Auspiciantes.html",
      "Contacto": {
        "Redes Sociales": "/_pages/{idioma}/RedesSociales.html",
        "Conducta": "/_pages/{idioma}/Conducta.html"
      }
    }
  }
}
```

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

## 📌 **Próximos Pasos**
✅ Completar el contenido de cada sección en `_pages/es/`.  
✅ Agregar las páginas de los congresos en `_pages/es/congresos/`.  
✅ Mejorar la accesibilidad y optimización para SEO.  
✅ Implementar un sistema de galería de imágenes con filtros.  

