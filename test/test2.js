const assert = require('assert'); // Biblioteca de aserciones de Node.js 
const { describe, it } = require('mocha'); // Funciones de Mocha

describe('Operaciones Matemáticas', () => {
    const suma = (a, b) => a + b;
    const resta = (a, b) => a - b;
    const multiplicacion = (a, b) => a * b;
    const division = (a, b) => a / b;
    describe('Suma', () => {
        it('debería sumar dos números correctamente', () => {
            assert.equal(suma(2, 3), 5);
        });

        it('debería devolver NaN si no se le pasan números', () => {
            assert.ok(isNaN(suma('dos', 'tres')));
        });

        it('debería sumar múltiples números correctamente', () => {
            const numbers = [1, 2, 3, 4, 5];
            const result = numbers.reduce((acc, curr) => acc + curr, 0);
            assert.equal(suma(...numbers), result);
        });
    });

    describe('Resta', () => {
        it('debería restar dos números correctamente', () => {
            assert.equal(resta(5, 3), 2);
        });
    });

    describe('Multiplicación', () => {
        it('debería multiplicar dos números correctamente', () => {
            assert.equal(multiplicacion(3, 4), 12);
        });
    });

    describe('División', () => {
        it('debería dividir dos números correctamente', () => {
            assert.equal(division(10, 2), 5);
        });
        it('debería devolver Infinity si se divide entre 0', () => {
            assert.equal(division(5, 0), Infinity);
        });
    });
});
