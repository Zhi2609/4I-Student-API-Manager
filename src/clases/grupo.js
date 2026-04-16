export class Grupo {
  constructor() {
    this.alumnos = [];
  }

  agregarAlumno(alumno) {
    this.alumnos.push(alumno);
  }

  obtenerTodos() {
    return this.alumnos;
  }

  obtenerPorId(id) {
    return this.alumnos.find((a) => a.cuenta === id);
  }

  eliminarPorId(id) {
    this.alumnos = this.alumnos.filter((a) => a.cuenta !== id);
    return true;
  }
}
