document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i<=12; i++ ){
       const imagen = document.createElement('PICTURE');

       imagen.innerHTML = `
            <source srcset="/build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="/build/img/thumb/${i}.webp" type="image/webp">

            <img width="200" height="300" loading="lazy" src="/build/img/thumb/${i}.jpg" alt="Imagen galería">
        `;

        imagen.onclick = function(){
            abrirImagen(i);
        }

       galeria.appendChild(imagen);
    }   
}

function abrirImagen(id) {
    const imagen = document.createElement('PICTURE');

       imagen.innerHTML = `
            <source srcset="/build/img/grande/${id}.avif" type="image/avif">
            <source srcset="/build/img/grande/${id}.webp" type="image/webp">

            <img width="200" height="300" loading="lazy" src="/build/img/grande/${id}.jpg" alt="Imagen galería">
        `;

        // Crea el overlay con la imagen
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');

        // Boton para cerrar Modal
        const cerrarModal = document.createElement('DIV')
        cerrarModal.textContent= 'X'
        cerrarModal.classList.add('btn-cerrar')
        overlay.appendChild(cerrarModal);

        cerrarModal.onclick = function(){

            body.classList.remove('fijar-body')
            overlay.remove();
        }

        // Se añade al HTML
        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('fijar-body');

}