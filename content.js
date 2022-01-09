// Verificar que whatsapp cargó la página
// Prueba encontrar el panel cargado cada x milisegundos de intervalo
let interval_id = window.setInterval(function() {
	let panel = document.getElementById("pane-side");
	if (panel) {
    // Al clickear algo en el panel se agrega un boton en el header 2
		panel.addEventListener("click", add_tecnom_button);
		add_modal();
    window.clearInterval(interval_id);
    console.log('carga completada');
	} else {
		console.log('cargando cada 500ms');
	}
}, 500); // 500 milisegundos para el intervalo (0.5 segundo)


function add_tecnom_button() {
	if (document.getElementById('tecnom_button')) {
		console.log('ya existe un botton');
	} else {
		console.log('agregando boton...');
		let targetElement = document.getElementsByClassName("_23P3O")[0];
		console.log(targetElement);
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
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="exampleModalLabel">Enviar lead de whatsapp a tecnom</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="modal_form" action="/">
          <div class="mb-3">
            <input type="text" class="form-control" id="nombre-modal" name="nombre" placeholder="Nombre">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="whatsapp-modal" name="whatsapp" placeholder="Whatsapp">
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Descripción</label>
            <textarea class="form-control" id="descripcion-modal"></textarea>
          </div>  
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Enviar</button>
      </div>
    </div>
  </div>
  </div>
  `;
  
  let div = document.createElement("div");
  div.setAttribute('id','modal-wrapper');
  document.body.append(div);
  let div2 = document.getElementById('modal-wrapper');
  div2.insertAdjacentHTML('afterend', add_html);
  console.log('modal agregado');
}

function set_nombre_modal(){
  let name_div = document.getElementsByClassName("_21nHd")[0];
  let name_span = name_div.childNodes[0];
  console.log(name_span.innerHTML);
  document.getElementById("nombre-modal").value = name_span.innerHTML;
  console.log('nombre asignado');
}

function set_numero_modal(){
  /* Img src tiene el numero y despues aplico regex */
  let user_img_src = document.getElementsByTagName("header")[1].getElementsByTagName('img')[0].src;
  let re = /u=[0-9]*/
  /* let re = /u=(.*)%4/;  */ // REGEX alternativo
  let result = re.exec(user_img_src);
  console.log("regex output");
  console.log(result);
  let numero_whatsapp = result[0].substring(2);
  // numero_whatsapp = "+" + numero_whatsapp.substring(0, 2) + " " + numero_whatsapp.substring(2, 3) + " " + numero_whatsapp.substring(3, numero_whatsapp.length);
  document.getElementById("whatsapp-modal").value = numero_whatsapp;
  console.log('numero asignado');
}

function set_descripcion_modal(){
  /* El problema es que no siempre carga lo suficientemente rapido los mensajes clickeando en distintos usuarios -> wait */
  let interval_id = window.setInterval(function() {
    let lasts_msgs_in = document.getElementsByClassName("message-in");
    let last_msg_in = lasts_msgs_in[lasts_msgs_in.length-1]
    if (last_msg_in) {
      console.log('ultimo mensaje recivido encontrado');
      console.log(last_msg_in);
      window.clearInterval(interval_id);
      document.getElementById("descripcion-modal").value = last_msg_in.getElementsByClassName("copyable-text")[0].textContent;
      console.log('descripcion asignada');
    } else {
      console.log("no se encontro el ultimo mensaje recivido todavia");
    }
  }, 500); 
}
