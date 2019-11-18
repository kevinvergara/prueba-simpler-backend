const respuesta = require('../../stubs/products');

jest.setMock('../../controllers/redis', {
    getRedis: (params) => {
        if(params==='data-all'){
            return JSON.stringify(respuesta);
        }
        if(params!=='data-all'){
            return undefined;
        }
    }
});


const { getProducts } = require('../../controllers/consultaapi');

describe('probar consulta de todos los productos', () => {
    it('json con productos', async () => {
        const jsonProductos = await getProducts();
        expect(jsonProductos).toBe(JSON.stringify(respuesta));
    });
});