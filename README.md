# 📌 Bayes Plurinacional - Proyecto Web

## 🚀 Estructura del Proyecto
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
 │   ├── navbar.js   👈 Web Component del navbar
 │   ├── footer.js   👈 Web Component del footer
 │   ├── header.js   👈 Web Component para manejar navbar + footer
 │
📂 _pages
 ├── 📂 es
 │   ├── index.html
 │   ├── somos.html
 │   ├── contacto.html
 │   ├── galeria.html
 │   ├── 📂 congresos
 │   │   ├── 2025.html
 │   │   ├── 2024.html
 │   │   ├── 2023.html
 │
📂 _static
 ├── 📂 img
 ├── 📂 logos
```

## 📌 Uso de Web Components
Para optimizar la reutilización de código, hemos implementado **Web Components** para el **navbar** y el **footer**, asegurando que todas las páginas usen la misma estructura sin necesidad de duplicar código.

### 🛠 **Componentes Principales**
#### 📌 `navbar.js`
Ubicación: `_components/es/navbar.js`

Este componente carga la barra de navegación.

#### 📌 `footer.js`
Ubicación: `_components/es/footer.js`

Este componente carga el pie de página.

#### 📌 `header.js`
Ubicación: `_components/es/header.js`

Este componente agrupa **navbar + footer** automáticamente para que todas las páginas tengan la misma estructura.

### 🔧 **Cómo Usarlo en una Página HTML**
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

## 📌 Estilos Globales
Ubicación: `_assets/_css/global.css`

Para mantener una apariencia uniforme, utilizamos **Bootstrap** y definimos una paleta de colores y tipografías en este archivo.

### 🔥 **Colores Definidos**
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

### 🔹 **Navbar y Footer**
Los estilos del **navbar** y **footer** están en archivos separados (`navbar.css` y `footer.css`), pero se aplican globalmente.

## 📌 **Próximos Pasos**
✅ Completar el contenido de cada sección en `_pages/es/`.
✅ Agregar las páginas de los congresos en `_pages/es/congresos/`.
✅ Mejorar la accesibilidad y optimización para SEO.
✅ Implementar un sistema de galería de imágenes con filtros.

📌 **Esta estructura nos permite agregar más funcionalidades fácilmente sin perder organización.** 🚀