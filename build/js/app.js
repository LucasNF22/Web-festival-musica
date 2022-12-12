document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    navFija();
    crearGaleria();
    scrollNav();
}

function navFija(){
    const barra = document.querySelector('.header');
    const barraNav = document.querySelector('.navegacion-principal');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body')

    window.addEventListener('scroll', function(){
        if( sobreFestival.getBoundingClientRect().top < 0 && window.outerWidth < 768 ) {
            barraNav.classList.add('fijo');

        }else if(sobreFestival.getBoundingClientRect().top < 0 && window.outerWidth >= 768 ) {
            barra.classList.add('fijo');
            barraNav.classList.remove('fijo');
        }
        else {
            barra.classList.remove('fijo');
            barraNav.classList.remove('fijo');
        }
    })
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();

            const secctionScroll = e.target.attributes.href.value;
            const secction = document.querySelector(secctionScroll);
            secction.scrollIntoView({ behavior: 'smooth' });
        })
    })
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