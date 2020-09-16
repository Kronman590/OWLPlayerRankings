var tankPlayers = new Map();
var dpsPlayers = new Map();
var supportPlayers = new Map();
var tankHeroes = new Array();
var dpsHeroes = new Array();
var supportHeroes = new Array();
rowToArray(document.getElementById("tanksTable").rows[0].cells,tankHeroes);
rowToArray(document.getElementById("dpsTable").rows[0].cells,dpsHeroes);
rowToArray(document.getElementById("supportTable").rows[0].cells,supportHeroes);
REDIPS.drag.dropMode = 'switching';
for (var i = 0; i < tankHeroes.length; i++) {
    tankPlayers.set(tankHeroes[i], new Set());
}
for (var i = 0; i < dpsHeroes.length; i++) {
    dpsPlayers.set(dpsHeroes[i], new Set());
}
for (var i = 0; i < supportHeroes.length; i++) {
    supportPlayers.set(supportHeroes[i], new Set());
}
for (var i = 0; i < csv.length; i++) {
    checkRole(csv[i],tankHeroes,tankPlayers);
    checkRole(csv[i],dpsHeroes,dpsPlayers);
    checkRole(csv[i],supportHeroes,supportPlayers);
}
for (var j = 0; j < tankPlayers.get(tankHeroes[0]).size; j++) {
    var row = new Array;
    for (var i = 0; i < tankHeroes.length; i++) {
        if (tankPlayers.get(tankHeroes[i]).size > j)
            row.push(Array.from(tankPlayers.get(tankHeroes[i]))[j]+"@"+tankHeroes[i]);
        else 
            row.push("-");
    }
    addRow(document.getElementById("tanksTable"),row);
}
for (var j = 0; j < dpsPlayers.get(dpsHeroes[0]).size; j++) {
    var row = new Array;
    for (var i = 0; i < dpsHeroes.length; i++) {
        if (dpsPlayers.get(dpsHeroes[i]).size > j)
            row.push(Array.from(dpsPlayers.get(dpsHeroes[i]))[j]+"@"+dpsHeroes[i]);
        else 
            row.push("-");
    }
    addRow(document.getElementById("dpsTable"),row);
}
for (var j = 0; j < supportPlayers.get(supportHeroes[0]).size; j++) {
    var row = new Array;
    for (var i = 0; i < supportHeroes.length; i++) {
        if (supportPlayers.get(supportHeroes[i]).size > j)
            row.push(Array.from(supportPlayers.get(supportHeroes[i]))[j]+"@"+supportHeroes[i]);
        else 
            row.push("-");
    }
    addRow(document.getElementById("supportTable"),row);
}
document.getElementById("tanksTable").style.display = "none";
document.getElementById("dpsTable").style.display = "none";
document.getElementById("supportTable").style.display = "none";
changeTable();
function changeTable() {
    if (location.hash == "#Tanks") {
        document.getElementById("dpsTable").style.display = "none";
        document.getElementById("supportTable").style.display = "none";
        document.getElementById("tanksTable").style.display = "table";
    } else if (location.hash == "#Supports") {
        document.getElementById("dpsTable").style.display = "none";
        document.getElementById("supportTable").style.display = "table";
        document.getElementById("tanksTable").style.display = "none";
    } else if (location.hash == "#Damage") {
        document.getElementById("dpsTable").style.display = "table";
        document.getElementById("supportTable").style.display = "none";
        document.getElementById("tanksTable").style.display = "none";
    }
}
function addRow(table,vals) {
    var row = table.insertRow(-1);
    for (var i=0; i<vals.length; i++) {
        var cell = row.insertCell(i);
        if (vals[i] == "-") {
            cell.innerHTML = " -- ";
            cell.style.backgroundColor = "black";
            cell.style.color = "white";
        } else {
            var val = vals[i].split("@");
            val[2] = val[2].replace(" ","_");
            cell.innerHTML = "<div id=" + val[0]+val[2] + " class=\"redips-drag\">"+val[0]+"</div>";
            var colors = getTeamColors(val[1]);
            document.getElementById(val[0]+val[2]).style.backgroundColor = colors[0];
            document.getElementById(val[0]+val[2]).style.color = colors[1];
        }
        cell.style.fontWeight = "bold";
        //cell.classList.add("draggable");
    }
}
function rowToArray(cells,array) {
    for (var i=0; i<cells.length; i++) {
        array.push(cells[i].innerHTML);
    }
}

function checkRole(player,heroesList,playersList) {
    var checkDupe;
    for (var i=1; i<heroesList.length; i++) {
        if (player[2].includes(heroesList[i])) {
            playersList.get(heroesList[i]).add(player[0] + player[3]);
            playersList.get(heroesList[0]).add(player[0] + player[3]);
        }
    }
}
function getTeamColors(team) {
    switch(team) {
        case "ATLReign":
            return ["#C4C4C4","#910F1B"];
        case "BostonUprising":
            return ["#174B97","#F2DF00"];
        case "ChengduHunters":
            return ["#ffb400","#000000"];
        case "DallasFuel":
            return ["#0C2340","#858585"];
        case "FLMayhem":
            return ["#000000","#cf4691"];
        case "GZCharge":
            return ["#1c364d","#67a2b2"];
        case "Hangzhou_Spark":
            return ["#FB7299","#ffffff"];
        case "Outlaws":
            return ["#000000","#97D700"];
        case "LAValiant":
            return ["#1888c6","#ffd100"];
        case "LAGladiators":
            return ["#3C1053","#ffffff"];
        case "Spitfire":
            return ["#59CBE8","#bf4513"];
        case "NYXL":
            return ["#0038ff","#000000"];
        case "ParisEternal":
            return ["#303D56","#63001e"];
        case "Fusion":
            return ["#000000","#F99F29"];
        case "SFShock":
            return ["#000000","#a6aeb0"];
        case "ShanghaiDragons":
            return ["#D22630","#fce300"];
        case "SeoulDynasty":
            return ["#7e5900","#000000"];
        case "TorontoDefiant":
            return ["#C10021","#000000"];
        case "VancouverTitans":
            return ["#09226B","#2FB228"];
        case "WashJustice":
            return ["#990034","#FFFFFF"];
        default:
            return ["#000000","#FFFFFF"];
    }
}