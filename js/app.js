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
      fila.innerHTML = `<td>${proyecto.nombre}</td><td>${proyecto.descripcion}</td><td>${proyecto.presupuesto}</td><td>${proyecto.fechaInicio}</td><td><button class="btn btn-danger btn-sm" onclick="borrarProyecto(${proyecto.id},this)">Borrrar</button></td>`;
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


/*
fetch("http://localhost:8080/proyectos")
  .then((response) => response.json())
  .then((datos) => console.log(datos))
  .then((datos) => {
    console.log(datos);
  })
  .catch((error) => console.error(error));
*/