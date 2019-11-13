///Declaracion de variables////////////////////////////////////////////////////////
var votosTotal = 0;
var votosRep = 0;
var votosDem = 0;
var votosInd = 0;
var members = data.results[0].members;

/////Recorro el array para sacar a todos los respublicanos, democratas y Independientes
for(var i = 0; i <members.length; i++){
    var republicanos = members.filter(republic => republic.party == "R");
    var democratas = members.filter(dem => dem.party == "D");
    var independientes = members.filter(ind => ind.party == "I");
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

//ordeno por el % de missed_votes_pct
members.sort(function (a, b) {
    if(a.missed_votes_pct > b.missed_votes_pct){
        return 1;
    }
    if (a.missed_votes_pct < b.missed_votes_pct){
        return -1;
    }else {
        return 0;
    }
});

/* Recorro el array y agrego los datos requeridos para la tabla:
 * el nombre, missed-votes y el % de missed-votes
 * multiplico el members.lenght * 0.1 para sacar el 10%
 */
for(var i = 0; i < members.length; i++){
    if(members[i].missed_votes_pct < members.length * 0.1){
        tablaBottom += "<tr><td> " + members[i].first_name + " </td>" +
            "<td align ='center'>" + members[i].missed_votes + "</td>" + 
            "<td align ='center'>" + members[i].missed_votes_pct + "%" + "</td></tr>";
    }
    if(members[i].missed_votes_pct > members.length * 0.1){
        tablaTop += "<tr><td> " + members[i].first_name + " </td>" +
            "<td align ='center'>" + members[i].missed_votes + "</td>" + 
            "<td align ='center'>" + members[i].missed_votes_pct + "%" + "</td></tr>";
    }
}
document.getElementById("missed-votes").innerHTML = tablaBottom;
document.getElementById("top-votes").innerHTML = tablaTop;



