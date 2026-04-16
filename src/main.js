import './style.css';
import { Alumno } from './clases/alumno.js';
import { Grupo } from './clases/grupo.js';

// 1. Inicializar el estado (Servidor simulado)
const miGrupo = new Grupo();
miGrupo.agregarAlumno(new Alumno("201", "Hatsune Miku"));
miGrupo.agregarAlumno(new Alumno("202", "Hoshimachi Suisei"));
miGrupo.agregarAlumno(new Alumno("203", "Garcia Cesar"));

// 2. Simulador de API
// Lo hacemos global para que el HTML pueda acceder a él si es necesario, 
// aunque en módulos modernos es mejor añadir los eventos desde JS.
window.apiSimulator = (method, route) => {
    // Ruta: GET /alumnos
    if (method === 'GET' && route === '/alumnos') {
        renderList(miGrupo.obtenerTodos());
    } 
    // Ruta: DELETE /alumnos/:id
    else if (method === 'DELETE' && route.startsWith('/alumnos/')) {
        const id = route.split('/')[2];
        miGrupo.eliminarPorId(id);
        window.apiSimulator('GET', '/alumnos'); // Refrescar la vista
    }
};

// 3. Función auxiliar para renderizar en el HTML
function renderList(alumnos) {
    const container = document.getElementById('lista-alumnos');
    container.innerHTML = "";
    
    alumnos.forEach(al => {
        const div = document.createElement('div');
        div.className = 'alumno-card';
        div.innerHTML = `
            <span><strong>${al.cuenta}</strong> - ${al.nombre}</span>
            <button class="btn-eliminar" data-id="${al.cuenta}">Eliminar</button>
        `;
        container.appendChild(div);
    });

    // Agregar listeners a los botones generados
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            window.apiSimulator('DELETE', `/alumnos/${id}`);
        });
    });
}

// 4. Configurar el botón principal y carga inicial
document.getElementById('btn-cargar').addEventListener('click', () => {
    window.apiSimulator('GET', '/alumnos');
});

// Cargar la lista al iniciar
window.onload = () => window.apiSimulator('GET', '/alumnos');