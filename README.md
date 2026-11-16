# Pokedex Mobile

Aplicación desarrollada para la asignatura **Aplicaciones Móviles**, que permite explorar Pokémon, consultar sus características, reproducir sus sonidos y comparar sus estadísticas mediante el consumo de **PokéAPI**.

**Autor:** Dilan Obando  
**Repositorio:** [Dilanbkr7/pokeapp](https://github.com/Dilanbkr7/pokeapp)

## Capturas en celular

Nueve capturas reales tomadas en un teléfono Android, agrupadas por pantalla. Corresponden a la compilación debug.

### Nivel 1 · Catálogo, búsqueda y estadísticas

<table>
  <tr>
    <th>Catálogo principal</th>
    <th>Búsqueda de Vileplume</th>
    <th>Estadísticas y habilidades</th>
  </tr>
  <tr>
    <td><img src="docs/capturas/nivel-1-inicio.jpeg" alt="Catálogo de Pokémon con buscador en un celular Android" width="240"></td>
    <td><img src="docs/capturas/nivel-1-busqueda.jpeg" alt="Resultado de buscar vil: Vileplume número 045" width="240"></td>
    <td><img src="docs/capturas/nivel-1-estadisticas.jpeg" alt="Estadísticas base y sección de habilidades de Vileplume" width="240"></td>
  </tr>
</table>

### Nivel 2 · Ficha, sonido y galería

<table>
  <tr>
    <th>Ficha de Pikachu</th>
    <th>Control de sonido</th>
    <th>Galería de imágenes</th>
  </tr>
  <tr>
    <td><img src="docs/capturas/nivel-2-ficha.jpeg" alt="Ficha de Pikachu con tipo eléctrico, altura, peso y experiencia base" width="240"></td>
    <td><img src="docs/capturas/nivel-2-sonido.jpeg" alt="Botón para reproducir el sonido de Pikachu y comienzo de la galería" width="240"></td>
    <td><img src="docs/capturas/nivel-2-galeria.jpeg" alt="Galería de Pikachu con ocho vistas e ilustraciones visibles" width="240"></td>
  </tr>
</table>

### Nivel 3 · Comparación de Squirtle y Blastoise

<table>
  <tr>
    <th>Selección de Pokémon</th>
    <th>Resultado de la consulta</th>
    <th>Comparación de estadísticas</th>
  </tr>
  <tr>
    <td><img src="docs/capturas/nivel-3-seleccion.jpeg" alt="Selectores con Squirtle y Blastoise y botón Comparar Pokémon" width="240"></td>
    <td><img src="docs/capturas/nivel-3-resultado.jpeg" alt="Ilustración y nombre de Squirtle en los resultados de la comparación" width="240"></td>
    <td><img src="docs/capturas/nivel-3-estadisticas.jpeg" alt="Comparación de las seis estadísticas base de Squirtle y Blastoise" width="240"></td>
  </tr>
</table>

## Contenido

- [Capturas en celular](#capturas-en-celular)
- [Descripción](#descripción)
- [Funcionalidades por nivel](#funcionalidades-por-nivel)
- [Tecnologías](#tecnologías)
- [Instalación y ejecución](#instalación-y-ejecución)
- [APK release firmado](#apk-release-firmado)
- [Pruebas funcionales en Android](#pruebas-funcionales-en-android)
- [Uso de la API](#uso-de-la-api)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Estado y alcance](#estado-y-alcance)
- [Créditos](#créditos)

## Descripción

Pokedex Mobile presenta un catálogo de Pokémon mediante tarjetas con su número, nombre e ilustración. Desde el buscador se puede filtrar el catálogo y acceder a una ficha con información general, recursos multimedia, estadísticas y habilidades.

La interfaz utiliza un tema oscuro con acentos verdes, una cuadrícula adaptable y barras de colores para facilitar la lectura de las estadísticas. El proyecto incluye una plataforma Android configurada con Capacitor.

## Funcionalidades por nivel

### Nivel 1 · Búsqueda y detalles

- Catálogo inicial de los primeros **50 Pokémon**.
- Búsqueda por coincidencias parciales del nombre, sin distinguir mayúsculas y minúsculas.
- Ficha con ilustración, número de Pokédex y tipos.
- Altura en metros, peso en kilogramos y experiencia base.
- Estadísticas base: PS, ataque, defensa, ataque especial, defensa especial y velocidad.
- Visualización de habilidades, estados de carga y mensajes de error.

### Nivel 2 · Sonido y galería

- Reproducción y detención del sonido del Pokémon a partir de `cries.latest`.
- Mensajes cuando el sonido no está disponible o no puede reproducirse.
- Galería con ilustración oficial, vistas frontal y posterior, versiones variocolor e ilustraciones alternativas, según los recursos disponibles.
- Más de cinco imágenes visibles en la evidencia de Pikachu.
- Ampliación de imágenes al tocarlas y eliminación de URLs duplicadas al construir la galería.

### Nivel 3 · Comparación

- Selección de dos Pokémon del catálogo.
- Consulta simultánea de sus fichas con `forkJoin` de RxJS.
- Visualización de sus ilustraciones, nombres, números y tipos.
- Comparación de las seis estadísticas base mediante valores numéricos y barras de colores.
- Validación para evitar seleccionar dos Pokémon iguales o dejar la selección incompleta.

Las barras utilizan una escala visual de 200 puntos, limitada al 100 %. Un valor base mayor no garantiza ganar un combate.

## Tecnologías

Versiones declaradas en el `package.json` del repositorio:

| Tecnología | Versión | Uso en el proyecto |
| --- | --- | --- |
| Ionic Angular | 8 | Componentes de interfaz y distribución adaptable |
| Angular | 18 | Componentes, formularios, navegación y peticiones HTTP |
| TypeScript | 5.4 | Lógica de la aplicación y definición de interfaces |
| Capacitor | 6 | Integración del proyecto web con Android |
| RxJS | 7.8 | Manejo de observables y consultas simultáneas |
| Ionicons | 7 | Iconografía de la interfaz |
| HTML y SCSS | — | Plantillas, tema oscuro y estilos |
| PokéAPI | API v2 | Datos y referencias a recursos de los Pokémon |

## Instalación y ejecución

### Requisitos

- Git.
- Node.js y npm compatibles con Angular 18.
- Conexión a Internet para consultar los datos y cargar imágenes y sonidos.
- Android Studio, JDK 17, Android SDK Platform 34, Build-Tools 34.0.0 y Platform-Tools. El proyecto usa Gradle 8.2.1 y Android Gradle Plugin 8.2.1.

### Ejecutar en el navegador

```bash
git clone -b release/pokedex-mobile https://github.com/Dilanbkr7/pokeapp.git
cd pokeapp
npm ci
npm start
```

Abrir [http://localhost:4200](http://localhost:4200). La ruta inicial redirige a `/pokemon-list`.

### Probar desde el navegador del celular

Conectar el equipo y el celular a la misma red Wi-Fi y ejecutar:

```bash
npm start -- --host 0.0.0.0
```

En el celular, abrir `http://<IP_LOCAL_DEL_EQUIPO>:4200`, reemplazando el marcador por la dirección IP del equipo. Si la conexión no se establece, revisar que el firewall permita el acceso al servidor de desarrollo desde la red local.

### Ejecutar en Android

La carpeta `android/` ya está incluida en el repositorio:

```bash
npm run build
npx cap sync android
npx cap open android
```

En Android Studio, esperar la sincronización de Gradle, seleccionar un celular conectado con depuración USB habilitada y ejecutar la aplicación. Repetir la compilación y sincronización después de modificar el código web.

### Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la aplicación web en `www/` |
| `npm run watch` | Compila en modo desarrollo y observa cambios |
| `npm test` | Ejecuta las pruebas configuradas con Jasmine y Karma |
| `npm run lint` | Ejecuta el análisis estático con ESLint |

## APK release firmado

Identificador `com.pokedex.mobile`, versión `1.0.0`, código de versión `1`, Android mínimo API 22 y objetivo API 34.

1. Ejecutar `npm ci`, `npm run build` y `npx cap sync android` desde la raíz del repositorio.
2. Abrir `android/` con `npx cap open android`. En **Settings → Build, Execution, Deployment → Build Tools → Gradle**, seleccionar JDK 17 como **Gradle JDK**. Para usar el wrapper desde PowerShell, apuntar `JAVA_HOME` a JDK 17 y comprobar la versión con `.\gradlew.bat --version` desde `android/`.
3. Seleccionar **Build → Generate Signed App Bundle or APK → APK** y el módulo `app`. Para la primera versión, crear el keystore fuera del repositorio con el alias `pokedex-mobile`. Para actualizaciones, usar el mismo archivo y alias. Introducir las contraseñas en Android Studio y guardar una copia privada del keystore.
4. Seleccionar la variante **release** y una carpeta de salida. Localizar `app-release.apk` y ejecutar estos comandos desde su carpeta, con `ANDROID_HOME` apuntando al SDK y `JAVA_HOME` a JDK 17.

   ```powershell
   $appApk = '.\app-release.apk'
   & "$env:ANDROID_HOME\build-tools\34.0.0\apksigner.bat" verify --verbose --print-certs $appApk
   Get-FileHash -Algorithm SHA256 -LiteralPath $appApk
   & "$env:ANDROID_HOME\platform-tools\adb.exe" devices -l
   & "$env:ANDROID_HOME\platform-tools\adb.exe" install -r $appApk
   ```

5. Repetir las pruebas funcionales de la tabla con el APK release. Si Android rechaza la instalación porque la variante debug tiene otro certificado, usar un emulador o dispositivo limpio para conservar la instalación y los datos del teléfono.

Para enviar el APK a Uptodown, completar la ficha, adjuntar capturas reales y confirmar los derechos de distribución de los recursos de terceros. El estado **Pending** identifica un APK enviado a revisión.

## Pruebas funcionales en Android

El autor reportó **8 de 8 pruebas manuales superadas** con la compilación debug instalada en su teléfono. Este es el plan para repetirlas con la variante release.

| Prueba | Verificación | Resultado en debug |
| --- | --- | --- |
| Inicio | Abre la aplicación y carga el catálogo | Correcto |
| Buscador | Filtra el catálogo por nombre | Correcto |
| Detalles | Abre una ficha con características y estadísticas | Correcto |
| Sonido | Reproduce el sonido desde la ficha | Correcto |
| Galería | Muestra y amplía las imágenes | Correcto |
| Comparador | Compara dos Pokémon y sus estadísticas | Correcto |
| Validación | Detecta una selección inválida en el comparador | Correcto |
| Reapertura | La aplicación vuelve a abrir después de cerrarla | Correcto |

## Uso de la API

El servicio `PokemonService` centraliza las peticiones con `HttpClient` y devuelve observables.

| Consulta | Endpoint | Propósito |
| --- | --- | --- |
| Listado inicial | `GET https://pokeapi.co/api/v2/pokemon?limit=50&offset=0` | Obtener los nombres y URLs del catálogo |
| Detalles | `GET https://pokeapi.co/api/v2/pokemon/{nombre_o_id}` | Obtener tipos, medidas, estadísticas, habilidades, sprites y sonido |

El buscador filtra localmente los nombres del listado cargado. Al abrir una ficha se solicita su información completa y se construye la galería. En el comparador se consultan las dos fichas y se muestran sus valores base.

Las ilustraciones y los sprites se obtienen de los recursos de [PokeAPI/sprites](https://github.com/PokeAPI/sprites). La reproducción de audio utiliza la API de audio del navegador mediante `new Audio(...)`. No se requiere configurar una clave de API en el proyecto.

## Estructura del proyecto

```text
pokeapp/
├── android/                         # Proyecto nativo Android
├── src/
│   ├── app/
│   │   ├── app-routing.module.ts     # Ruta inicial y carga de la página
│   │   ├── home/                     # Página adicional incluida en el proyecto
│   │   ├── pages/pokemon-list/
│   │   │   ├── pokemon-list.page.ts   # Catálogo, fichas, multimedia y comparación
│   │   │   ├── pokemon-list.page.html # Plantilla de las vistas
│   │   │   └── pokemon-list.page.scss # Estilos de la página
│   │   └── services/
│   │       └── pokemon.service.ts     # Consultas a PokéAPI
│   ├── assets/                       # Recursos estáticos
│   ├── environments/                 # Configuración por entorno
│   ├── theme/                        # Variables de estilos
│   ├── global.scss                   # Estilos globales
│   └── main.ts                       # Arranque standalone de la aplicación
├── docs/capturas/                    # Evidencias de los tres niveles
├── angular.json                     # Configuración de Angular
├── capacitor.config.ts              # Configuración de Capacitor
└── package.json                     # Dependencias y comandos
```

## Estado y alcance

- El catálogo y los selectores trabajan con los primeros 50 Pokémon; no se implementa paginación en la interfaz actual.
- La cantidad de imágenes y la disponibilidad de sonido dependen de los recursos de cada Pokémon.
- El repositorio incluye configuración para pruebas automatizadas con Jasmine y Karma.

## Créditos

Desarrollado por **[Dilan Obando](https://github.com/Dilanbkr7)** como trabajo en clase de **Aplicaciones Móviles**.

Datos proporcionados por [PokéAPI](https://pokeapi.co/) y recursos visuales de [PokeAPI/sprites](https://github.com/PokeAPI/sprites). Pokémon y sus personajes pertenecen a sus respectivos titulares. Pokedex Mobile es un proyecto educativo independiente.
