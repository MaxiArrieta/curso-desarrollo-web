const app = new Vue({
    el: '#app',
    data : {
        members:[]

    }
})
/* La variable url esta definida en una etiqueta script en el html
 * ya que esa fue la mejor forma que encontre de pasarle la url del
 * senado o de house y que trabajen con el mismo archivo para hacer
 * la tabla y no tener en 2 archivos el mismo codigo
 */
fetch(url, {
    method: "GET",
    headers: new Headers({
        "X-API-Key": 'adZUIoKPgkk0ecKXE0ztm9ErLNJgARlsKHBhTBYa'
    }),
}).then(response => response.json())
.then(data => {
   app.members = data.results[0].members;
});