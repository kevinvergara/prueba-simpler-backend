# e-nesimo número fibonacci
Servicio que recibe un numero positivo entero y devuelve el e-nesimo numero de la serie fibonacci.

Se implemento un servidor con node.js, en conjunto con express.
Se levanta en el puerto :8080
La url para del servicio es 'serie-fibo-n'.

El servicio es tipo post, y recibe como parametro la letra n, donde es numero positivo entero.
Esto retorna un objeto con dos parametros, estatus, que es tipo boolean, donde retorna true si el procesos fue correcto,
y false si el procesos fue corrupto. Tambien está la variable resultado, donde viene el resultado de la operación.

# dependencias
1.- node v6 o más

# instrucciones de uso
1.- hacer pull del repo <br>
2.- <b>'npm install'</b> para instalar dependencias <br>
3.- <b>'npm start'</b> para levantar servidor <br>