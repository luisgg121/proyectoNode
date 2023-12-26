// function asyncOperation(callback) {
//     setTimeout(() => {
//         callback('OperaciÃ³n completada');
//     }, 2000);
// }

// asyncOperation((result) => {
//     console.log(result); // Imprime: ''OperaciÃ³n completada''
// });
// console.log('Esperando a la operaciÃ³n asincrÃ³nica...');

// function asyncOperation() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('OperaciÃ³n completada.');
//         }, 2000);
//     });
// }

// asyncOperation()
//     .then(result => {
//         console.log(result); // Imprime: 'OperaciÃ³n completada.'
//     })
//     .catch(error => {
//         console.log('Error: ', error);
//     });
// console.log('Esperando la operaciÃ³n asincrÃ³nica...');

function asyncOperation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Operación completada.');
        }, 2000);
    });
}
async function main() {
    try {
        const result = await asyncOperation(); // Imprime: 'Operación completada.'
    } catch (error) {
        console.error('Error: ', error);
    }
}
console.log('Esperando la operación asincrónica...');
main();