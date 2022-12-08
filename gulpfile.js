const { src, dest, watch, parallel } = require( 'gulp' );

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require( 'gulp-plumber' );

// Imagenes
const imagemin = require( 'gulp-imagemin' );
const cache = require( 'gulp-cache' );
const webp = require( 'gulp-webp' );
const avif = require( 'gulp-avif' ); 

function css( done ) {
    
    src('src/scss/**/*.scss')            // Identificar archivo de SASS
        .pipe( plumber() ) 
        .pipe( sass() )                 // Compilar
        .pipe( dest( "build/css" ) )    // Guardar


    done();
};

function imagenes ( done ) {

    const opciones = {
        optimizationLevel: 3 
    }
    src( 'src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin( opciones ) ) )
        .pipe(dest( "build/img" ))
    done();
}

function versionWebp ( done ) {
    
    const opciones = {
        quality: 50
    }  
    src( 'src/img/**/*.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe ( dest ( 'build/img' ))
    done();
}

function versionAvif ( done ) {
    
    const opciones = {
        quality: 50
    }
    src( 'src/img/**/*.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe ( dest ( 'build/img' ))
    done();
}

function javascript( donde ) {

    src('src/js/**/*.js')
        .pipe( dest('build/js') );

    donde();
}

function dev( done ) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript)
    done();
};


exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev ) ;