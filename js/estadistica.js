///Declaracion de variables////////////////////////////////////////////////////////
var votosTotal = 0;
var votosRep = 0;
var votosDem = 0;
var votosInd = 0;
var members = data.results[0].members;
var republicanos = members.filter(republic => republic.party == "R");
var democratas = members.filter(dem => dem.party == "D");
var independientes = members.filter(ind => ind.party == "I");

/////Recorro el array para sacar a todos los respublicanos, democratas y Independientes
for(var i = 0; i <members.length; i++){
    votosTotal += members[i].votes_with_party_pct

////sumo la cantidad de votos
    if(members[i].party == "R"){
        votosRep += members[i].votes_with_party_pct;
    }else if(members[i].party == "D"){
        votosDem += members[i].votes_with_party_pct;
    }else {
        votosInd += members[i].votes_with_party_pct;
    }
    
}

votosDem = porcentaje(votosDem,votosTotal);
votosInd = porcentaje(votosInd,votosTotal);
votosRep = porcentaje(votosRep,votosTotal);

/* multiplico x 100 y divido por la cantidad de votos
 * saco el porcentaje de cada uno
 */
function porcentaje(cantVotos, total){
    cantVotos = (cantVotos * 100) / total;
    cantVotos = Math.round(cantVotos * 100) / 100;
    return cantVotos;
}
    votosTotal = votosDem + votosInd + votosRep;

//////////////Tabla de democratas, republicanos y Independientes//////////////////////////////

    var tabla ="<tr><th> Party </th> <th> Nro of Reps  </th><th> % Votes w/Party </th></tr>" + 
        "<tr><td> Democrats </td> <td align ='center'>" + democratas.length + "</td> <td align ='center'>" + votosDem + "% </td></tr>" +
        "<tr><td> Republicans </td> <td align ='center'>" + republicanos.length + "</td> <td align ='center'>" + votosRep + "% </td></tr>" +
        "<tr><td> Independents </td> <td align ='center'>" + independientes.length + "</td> <td align ='center'>" + votosInd + "% </td></tr>" + 
        "<tr><td> Total </td> <td align ='center'>" + data.results[0].members.length + "</td> <td align ='center'>" + votosTotal + "% </td></tr>";
    
    document.getElementById("table-data").innerHTML = tabla;

/////////////////////////////////missed votes 10% bottom y 10% top///////////////////////////////////////
/////////////////////////////////party votes 10% bottom y 10% top////////////////////////////////////////

//inicializo el tbody de las tablas.. Tabla 10% bottom y top 10%
var tablaBottom = "";
var tablaTop = "";

/* La variable isLotalty es una variable booleana esta definida en el html
 * Si es true ordena por los Least Loyal y con el for carga la tabla
 * en las variables tablaBottom y tablaTop.
 * Si la variable isLoyalty es false entonces ordenas por los missed_votes_pcy
 * y carga con el for las varbles tablaBottom y tablaTop.
 */
if(isLoyalty){
    members.sort(function (a, b) {
        if (a.votes_with_party_pct > b.votes_with_party_pct) {
            return 1;
        }
        if (a.votes_with_party_pct < b.votes_with_party_pct) {
            return -1;
        } else {
            return 0;
        }
    });
    for(var i = 0; i < members.length; i++){
        if(i < members.length * 0.1){
            tablaBottom += "<tr><td> " + members[i].first_name + " "
                + ((members[i].middle_name) != null ? members[i].middle_name : "") + " "
                + ((members[i].last_name) != null ? members[i].last_name : "") + " </td>" +
                "<td align ='center'>" + Math.round((members[i].total_votes * members[i].votes_with_party_pct) / 100) + "</td>" + 
                "<td align ='center'>" + members[i].votes_with_party_pct + "%" + "</td></tr>";
        }
    }
    members.reverse(); /* este reverse lo que hace es invertir de la forma que fue ordenada
                        * para que las tablas se visualicen como pide el ejercicio
                        * En el if saco el 10% de members y como di vuelta la tabla 
                        * los que aparecen en la primeras posiciones son los mostLoyal
                        */
        for(var i = 0; i < members.length; i++){
            if(i < members.length * 0.1){
            tablaTop += "<tr><td> " + members[i].first_name + " "
                + ((members[i].middle_name) != null ? members[i].middle_name : "") + " "
                + ((members[i].last_name) != null ? members[i].last_name : "") + " </td>" +
                "<td align ='center'>" + Math.round((members[i].total_votes * members[i].votes_with_party_pct) / 100) + "</td>" + 
                "<td align ='center'>" + members[i].votes_with_party_pct + "%" + "</td></tr>";
        }
    }
}else {
    members.sort(function (a, b) {
        if (a.missed_votes_pct > b.missed_votes_pct) {
            return 1;
        }
        if (a.missed_votes_pct < b.missed_votes_pct) {
            return -1;
        } else {
            return 0;
        }
    });
    for(var i = 0; i < members.length; i++){
        if(i < members.length * 0.1){
            tablaBottom += "<tr><td> " + members[i].first_name + " "
                + ((members[i].middle_name) != null ? members[i].middle_name : "") + " "
                + ((members[i].last_name) != null ? members[i].last_name : "") + " </td>" +
                "<td align ='center'>" + members[i].missed_votes + "</td>" + 
                "<td align ='center'>" + members[i].missed_votes_pct + "%" + "</td></tr>";
        }
    }
    members.reverse();
    for(var i = 0; i < members.length; i++){
        if(i < members.length * 0.1){
            tablaTop += "<tr><td> " + members[i].first_name + " "
                + ((members[i].middle_name) != null ? members[i].middle_name : "") + " "
                + ((members[i].last_name) != null ? members[i].last_name : "") + " </td>" +
                "<td align ='center'>" + members[i].missed_votes + "</td>" + 
                "<td align ='center'>" + members[i].missed_votes_pct + "%" + "</td></tr>";
        }
    }
}

/* Recorro el array y agrego los datos requeridos para la tabla:
 * el nombre, missed-votes y el % de missed-votes
 * multiplico el members.lenght * 0.1 para sacar el 10%
 */

document.getElementById("missed-votes").innerHTML = tablaBottom;
document.getElementById("top-votes").innerHTML = tablaTop;