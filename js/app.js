const empleadosDialog = document.getElementById("empleadosDialog");
const cerrarModalBtn = document.getElementById("cerrarModalBtn");
cerrarModalBtn.addEventListener("click", ()=>{
  empleadosDialog.close();
})
async function verEmpleados(id) {
  try {
    document.getElementById("TableBodyEmpleados").innerHTML = "";
    const response = await fetch(`http://localhost:8080/proyectos/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener los empleados del proyecto");
    }
    const proyectos = await response.json();
    const empleados = proyectos.empleados;
    console.log(proyectos.empleados);
    empleados.forEach(empleado => {
      const fila = document.createElement("tr");
      fila.setAttribute("empleado-id",empleado.id);
      fila.innerHTML = `<td>${empleado.nombre}</td><td>${empleado.apellidos}</td><td>${empleado.email}</td><td></td>`;
      document.getElementById("TableBodyEmpleados").appendChild(fila);
    })
    empleadosDialog.showModal();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function obtenerProyectos() {
  try {
    document.getElementById("TableBody").innerHTML = "";
    const response = await fetch("http://localhost:8080/proyectos");
    if (!response.ok) {
      throw new Error("Error al obtener los proyectos");
    }
    const proyectos = await response.json();
    console.log(proyectos);
    proyectos.forEach(proyecto => {
      const fila = document.createElement("tr");
      fila.setAttribute("data-id",proyecto.id);
      fila.innerHTML = `<td>${proyecto.nombre}</td><td>${proyecto.descripcion}</td><td>${proyecto.presupuesto}</td><td>${proyecto.fechaInicio}</td><td><button class="btn btn-dark border btn-sm" onclick="borrarProyecto(${proyecto.id},this)">Borrar</button><button class="btn btn-light btn-sm mx-2" onclick="editarProyecto(${proyecto.id},this)">Editar</button><button class="btn btn-dark border btn-sm" onclick="verEmpleados(${proyecto.id},this)">Ver Empleados</button></td>`;
      document.getElementById("TableBody").appendChild(fila);
    })
  } catch (error) {
    console.error("Error:", error);
  }
}
obtenerProyectos();
async function borrarProyecto(id, elemento){
    try{
        const response = await fetch(`http://localhost:8080/proyectos/${id}`, {method: 'DELETE'});
        //obtenerProyectos();
        elemento.parentNode.parentNode.remove();
        if(!response.ok){
            throw new Error(`Error al eliminar el proyecto ${id}`);
        }
    }catch(error){
        console.error("Error:", error);
    }
}
async function editProyecto(id, elemento){
  try{
      const response = await fetch(`http://localhost:8080/proyectos/${id}`, {method: 'PUT'});
      //obtenerProyectos();

      elemento.parentNode.parentNode.remove();
      if(!response.ok){
          throw new Error(`Error al eliminar el proyecto ${id}`);
      }
  }catch(error){
      console.error("Error:", error);
  }
}
document.getElementById("nuevoProyectoBtn").addEventListener("click", nuevoProyecto);
const addProyectoDialog = document.getElementById("nuevoProyectoDialog");
document.getElementById("openDialogAddProyectoBtn").addEventListener("click", ()=>{
  addProyectoDialog.showModal();
})
document.getElementById("cancelarProyectoBtn").addEventListener("click", ()=>{
  addProyectoDialog.close();
})

async function nuevoProyecto() {
  const nombre = document.getElementById("nombreProyecto").value;
  const descripcion = document.getElementById("descripcionProyecto").value;
  const presupuesto = document.getElementById("presupuestoProyecto").value;
  const fechaInicio = document.getElementById("fechaProyecto").value;
  const proyecto = {nombre,descripcion,presupuesto,fechaInicio};
  try{
    const response = await fetch("http://localhost:8080/proyectos", {
    method: 'POST',
    headers:{
      'content-Type' : 'application/json'
    },
    body: JSON.stringify(proyecto)
  })
  if(!response.ok){throw new Error("Error al insertar")}
  //Capturo la respuesta para coger el id
  const proyectoInsertado = await response.json();
  //Pintar el nuevo proyecto 
  const fila = document.createElement("tr");
      fila.id ="filaProyecto_"+proyectoInsertado.id;
      fila.innerHTML = `<td>${proyectoInsertado.nombre}</td><td>${proyectoInsertado.descripcion}</td><td>${proyectoInsertado.presupuesto}</td><td>${proyectoInsertado.fechaInicio}</td><td><button class="btn btn-dark border btn-sm" onclick="borrarProyecto(${proyectoInsertado.id},this)">Borrar</button><button class="btn btn-light btn-sm mx-2" onclick="editarProyecto(${proyectoInsertado.id},this)">Editar</button><button class="btn btn-dark border btn-sm" onclick="verEmpleados(${proyectoInsertado.id},this)">Ver Empleados</button></td>`;
      document.getElementById("TableBody").appendChild(fila);
      //Limpiar el formulario despues de insertar
      document.getElementById("nombreProyecto").value = '';
      document.getElementById("descripcionProyecto").value = '';
      document.getElementById("presupuestoProyecto").value = '';
      document.getElementById("fechaProyecto").value = '';
      addProyectoDialog.close();
  }catch (error){
    console.log(error);
  }
}

/*
fetch("http://localhost:8080/proyectos")
  .then((response) => response.json())
  .then((datos) => console.log(datos))
  .then((datos) => {
    console.log(datos);
  })
  .catch((error) => console.error(error));
*/