var app = new Vue({
    el: '#app',
    data: {
        members: [],
        totalMembers: 0,
        results: {
            democrats: [],
            republicants: [],
            independents: [],
            total: []
      }
    }
  });
/* La variable url esta definida en una etiqueta script en el html
 * ya que esa fue la mejor forma que encontre de pasarle la url del
 * senado o de house y que trabajen con el mismo archivo de estadistica
 * y no tener en 2 archivos el mismo codigo
 */
fetch(url, {
    method: "GET", //estructura del JSON
    headers: new Headers({
        "X-API-Key": 'adZUIoKPgkk0ecKXE0ztm9ErLNJgARlsKHBhTBYa'
    }),
}).then(response => response.json())
    .then(data => {
        app.members = data.results[0].members;
        app.totalMembers = data.results[0].members.length * 0.1;
        tabla(app.members);
        
    });

function tabla(members) {
    ///Declaracion de variables////////////////////////////////////////////////////////
    var votosTotal = 0;
    var votosRep = 0;
    var votosDem = 0;
    var votosInd = 0;
    var republicanos = members.filter(republic => republic.party == "R");
    var democratas = members.filter(dem => dem.party == "D");
    var independientes = members.filter(ind => ind.party == "I");

    /////Recorro el array para calcular la cantidad de votos que tuvo cada partido
    for (var i = 0; i < members.length; i++) {
        
        votosTotal += members[i].votes_with_party_pct

        if (members[i].party == "R") {
            votosRep += members[i].votes_with_party_pct;
        } else if (members[i].party == "D") {
            votosDem += members[i].votes_with_party_pct;
        } else {
            votosInd += members[i].votes_with_party_pct;
        }
    }

    votosDem = porcentaje(votosDem, votosTotal);
    votosInd = porcentaje(votosInd, votosTotal);
    votosRep = porcentaje(votosRep, votosTotal);

    /* multiplico x 100 y divido por la cantidad de votos
     * saco el porcentaje de cada uno
     */
    function porcentaje(cantVotos, total) {
        cantVotos = (cantVotos * 100) / total;
        cantVotos = Math.round(cantVotos * 100) / 100;
        return cantVotos;
    }
    votosTotal = votosDem + votosInd + votosRep;

    /* Agrego todos los resultados anteriores al objeto result
     * para mostrarlos en la tabla con vue
     */

    app.results.democrats.push("Democrats", democratas.length,votosDem);
    app.results.republicants.push("Republicans", republicanos.length,votosRep);
    app.results.independents.push("Independents", independientes.length,votosInd);
    app.results.total.push("Total", app.members.length, votosTotal);

    //ordeno por el % de missed_votes_pct
    if(isLoyalty){
        app.members.sort(function (a, b) {
            if (a.votes_with_party_pct > b.votes_with_party_pct) {
                return 1;
            }
            if (a.votes_with_party_pct < b.votes_with_party_pct) {
                return -1;
            } else {
                return 0;
            }
        });
    }else {
        app.members.sort(function (a, b) {
            if (a.missed_votes_pct > b.missed_votes_pct) {
                return 1;
            }
            if (a.missed_votes_pct < b.missed_votes_pct) {
                return -1;
            } else {
                return 0;
            }
        });
    }
}
