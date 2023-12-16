const assert = require('assert'); // Biblioteca de aserciones de Node.js 
const { describe, it } = require('mocha'); // Funciones de Mocha

describe('Función Suma', () => {
    it('debería sumar dos números correctamente', () => {
        const suma = (a, b) => a + b;
        assert.equal(suma(2, 3), 5);
    });
    
    it('debería devolver NaN si no se le pasan números', () => {
        const suma = (a, b) => a + b;
        assert.ok(isNaN(suma('dos', 'tres')));
    });
});