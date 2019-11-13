function renderRows(data) {
    var html = getRowsHtml(data);
    document.getElementById("house-data").innerHTML = html;
    }
    renderRows(data);
    function getRowsHtml(data){
    return data.results[0].members.map(function(congress113_data) { 
        return "<tr><td>" +  ((congress113_data.url != "") ? "<a href=\"" + congress113_data.url 
        + "\">" : "") + ((congress113_data.last_name != null)   ? congress113_data.last_name   : " ")     +  ", "    +
        "" +  ((congress113_data.first_name != null) ? congress113_data.first_name  : " ")     +  " "    +
        "" +  ((congress113_data.middle_name != null) ? congress113_data.middle_name : " ")     +  "<a></td>"    +
        "<td>" +  ((congress113_data.party != null) ? congress113_data.party       : " ")     +  "</td>"    +
        "<td>" +  ((congress113_data.state != null) ? congress113_data.state       : " ")     +  "</td>"    +
        "<td>" +  ((congress113_data.seniority != null) ? congress113_data.seniority   : " ")     +  "</td>"    +
        "<td>" +  ((congress113_data.votes_with_party_pct != null) ? congress113_data.votes_with_party_pct + "%" : " ")
        +  "</td></tr>" ; }).join("");
    }