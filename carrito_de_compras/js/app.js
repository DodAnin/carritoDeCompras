/*Variables generales */
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

/*funcion cargar el escuchador de enventos*/
cargarEventListeners();
function cargarEventListeners(){
    //cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    //vaciar carrito de compras
    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = []; //se recetea el arreglo
        
        limpiarHTML(); //se elimina todo el html
    } )
}

/*funciones*/
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains("agregar-carrito")) {
        const cursosSeleccionado = e.target.parentElement.parentElement;

        leerDatosCursos(cursosSeleccionado);
    }  
}

//funcion eliminar elementos del carrito

function eliminarCurso(e) {
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id");

        //elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId );

        carritoHTML(); //iteramos sobre el carrito de compras para actualizar cambios
    }
}

/* leer contenido del Html*/
function leerDatosCursos(curso) {
    //console.log(curso);
    //crear objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent, 
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    //Revisar si un elemento ya existe en el carrito de compra
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if (existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna los objetos que son duplicados
            }else {
                return curso; //retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    //agrega los elementos al carrito de compras
    //usaremos el espread operation otra opcion seria .push
    console.log(articulosCarrito);
    carritoHTML();
}

//muestra el carrito de compras en el html

function carritoHTML() {
    //limpiar HTML
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
             <td>${titulo}</td> 
             <td>${precio}</td>
             <td>${cantidad}</td>
             <td>
               <a href="#" class="borrar-curso" data-id="${id}">x</a>
             </td>
        `;
        //agregando el HTML en el carrito en la etiqueta tbody
        contenedorCarrito.appendChild(row);
    })
}

//elimina los cursos del tbody

function limpiarHTML() {
    //contenedorCarrito.innerHTML = "";
    //forma mas rapida 
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}