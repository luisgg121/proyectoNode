// Ejemplo de una función asínrona

const ts = 3; // tiempo en segundos que va a ocupar el setTimeout()

function makePromise(x) { 
    return new Promise(resolve => {
      setTimeout(() => { resolve(x)}, x * 1000);
    });
  }
  
  async function asyncFunc() {
    var x = makePromise(ts);
    console.log('inicio');
    return x;
  }
  
  const returnedProm = asyncFunc(); //  la función asíncrona retorna una promesa.

  returnedProm.then((x) => console.log(`Fin en ${x*1000} ms`));
  // La promesa es cumplida con el valor retornado desde la función asíncrona, entoces esta línea despliega los mili segundos
  // que la función tardó en cumplir su promesa.

  // Podemos ver que, aunque la llamada a la función makePromise(x) se encuentra en el código antes que el console.log('inicio'),
  // este console.log se despliega antes que el console.log(`Fin en ${x*1000} ms`) el cual es ejecutado al cumplirse la promesa.



  
