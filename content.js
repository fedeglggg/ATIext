// Verificar que whatsapp cargó la página
// Prueba encontrar el panel cargado cada x milisegundos de intervalo
let interval_id = window.setInterval(function() {
	let panel = document.getElementById("pane-side");
	if (panel) {
    // Al clickear algo en el panel se agrega un boton en el header 2
		panel.addEventListener("click", add_tecnom_button);
		add_modal();
    window.clearInterval(interval_id);
    /* console.log('carga completada'); */
	} else {
		/* console.log('cargando cada 500ms'); */
	}
}, 500); // 500 milisegundos para el intervalo (0.5 segundo)


function add_tecnom_button() {
	if (document.getElementById('tecnom_button')) {
		/* console.log('ya existe un botton'); */
	} else {
		/* console.log('agregando boton...'); */
		let targetElement = document.getElementsByClassName("_23P3O")[0];
		let button = document.createElement("button");
		button.innerHTML = "Enviar a Tecnom";
		button.setAttribute('id','tecnom_button');
		button.onclick = show_form;
		button.setAttribute('data-bs-toggle','modal');
		button.setAttribute('data-bs-target','#modal'); 
		targetElement.append(button);

    /* Los valores del modal los seteo despues de haber clickeado en un usuario */
    set_nombre_modal();
    set_numero_modal();
    set_descripcion_modal();
    
	}
}

function show_form() {
  document.getElementById("tecnom_button").click();
}

function add_modal() {
	let add_html = `
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
  <form id="modal_form" action="http://www.localhost:8000/api/" method="POST">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="exampleModalLabel">Enviar lead de whatsapp a tecnom</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
          <div class="mb-3">
            <input type="text" class="form-control" id="nombre-modal" name="nombre" placeholder="Nombre">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="whatsapp-modal" name="whatsapp" placeholder="Whatsapp">
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Descripción</label>
            <textarea class="form-control" id="descripcion-modal" name="text-data" style="height: 300px;"></textarea>
          </div>  
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </div>
     
    </div>
    </form>
  </div>
  </div>
  `;
  
  let div = document.createElement("div");
  div.setAttribute('id','modal-wrapper');
  document.body.append(div);
  let div2 = document.getElementById('modal-wrapper');
  div2.insertAdjacentHTML('afterend', add_html);
}

function set_nombre_modal(){
  let name_div = document.getElementsByClassName("_21nHd")[0];
  let name_span = name_div.childNodes[0];
  document.getElementById("nombre-modal").value = name_span.innerHTML;
}
function set_numero_modal(){
  /* Interval para evitar cargar el numero sin tener los div cargados */
  let interval_id = window.setInterval(function() {
    if (document.getElementsByClassName("message-in")){
      /* Los mensajes tienen el numero en el atributo data-id */
      let user_img_src = document.getElementsByClassName("message-in")[0].getAttribute('data-id');
      window.clearInterval(interval_id);
      let re = /\d[0-9]{9,14}/
      let result = re.exec(user_img_src);
      let numero_whatsapp = result[0].substring(2);
      document.getElementById("whatsapp-modal").value = numero_whatsapp;
    }
  }, 500); 
}

function set_descripcion_modal(){
  /* El problema es que no siempre carga lo suficientemente rapido los mensajes clickeando en distintos usuarios -> wait */
  let interval_id = window.setInterval(function() {
    let lasts_msgs_in = document.getElementsByClassName("message-in");
    window.clearInterval(interval_id);
    if (lasts_msgs_in) {
      let descripcion = "";
      for (const last_msg of lasts_msgs_in) {
        const new_description = last_msg.getElementsByClassName("copyable-text");
        if (new_description.length > 0){
          descripcion = descripcion === "" ? new_description[0].textContent : descripcion + "\n" + new_description[0].textContent
        }
      }
      document.getElementById("descripcion-modal").value = descripcion;
    }
  }, 500); 
}
