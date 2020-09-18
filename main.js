var tankWidth = document.getElementsByClassName("tanksTable")[0].style.width;
var tankPlayers = new Map();
var tankHeroes = new Array();
var tankTables = document.getElementsByClassName("tanksTable");
var hitscanWidth = document.getElementsByClassName("hitscansTable")[0].style.width;
var hitscanPlayers = new Map();
var hitscanHeroes = new Array();
var hitscanTables = document.getElementsByClassName("hitscansTable");
var projectileWidth = document.getElementsByClassName("projectilesTable")[0].style.width;
var projectilePlayers = new Map();
var projectileHeroes = new Array();
var projectileTables = document.getElementsByClassName("projectilesTable");
var supportWidth = document.getElementsByClassName("supportsTable")[0].style.width;
var supportPlayers = new Map();
var supportHeroes = new Array();
var supportTables = document.getElementsByClassName("supportsTable");

rowToArray(tankTables,tankHeroes);
rowToArray(hitscanTables, hitscanHeroes);
rowToArray(supportTables, supportHeroes);
rowToArray(projectileTables, projectileHeroes);

for (var i = 0; i < tankHeroes.length; i++) {
    tankPlayers.set(tankHeroes[i], new Set());
}
for (var i = 0; i < hitscanHeroes.length; i++) {
    hitscanPlayers.set(hitscanHeroes[i], new Set());
}
for (var i = 0; i < supportHeroes.length; i++) {
    supportPlayers.set(supportHeroes[i], new Set());
}
for (var i = 0; i < projectileHeroes.length; i++) {
    projectilePlayers.set(projectileHeroes[i], new Set());
}
for (var i = 0; i < csv.length; i++) {
    checkRole(csv[i],tankHeroes,tankPlayers);
    checkRole(csv[i],hitscanHeroes,hitscanPlayers);
    checkRole(csv[i],supportHeroes,supportPlayers);
    checkRole(csv[i],projectileHeroes,projectilePlayers);
}

for (var j = 0; j < tankPlayers.get(tankHeroes[0]).size; j++) {
    var row = new Array;
    for (var i = 0; i < tankHeroes.length; i++) {
        if (tankPlayers.get(tankHeroes[i]).size > j) {
            //row.push(Array.from(tankPlayers.get(tankHeroes[i]))[j]+"@"+tankHeroes[i]);
            addOneRow(tankTables[i],Array.from(tankPlayers.get(tankHeroes[i]))[j]+"@"+tankHeroes[i]);
        } else 
            addOneRow(tankTables[i],"-");
    }
    //addRow(document.getElementById("tanksTable"),row);
}
for (var j = 0; j < hitscanPlayers.get(hitscanHeroes[0]).size; j++) {
    var row = new Array;
    for (var i = 0; i < hitscanHeroes.length; i++) {
        if (hitscanPlayers.get(hitscanHeroes[i]).size > j)
            addOneRow(hitscanTables[i],Array.from(hitscanPlayers.get(hitscanHeroes[i]))[j]+"@"+hitscanHeroes[i]);
        else 
            addOneRow(hitscanTables[i],"-");
    }
}
for (var j = 0; j < supportPlayers.get(supportHeroes[0]).size; j++) {
    var row = new Array;
    for (var i = 0; i < supportHeroes.length; i++) {
        if (supportPlayers.get(supportHeroes[i]).size > j)
            addOneRow(supportTables[i],Array.from(supportPlayers.get(supportHeroes[i]))[j]+"@"+supportHeroes[i]);
        else 
            addOneRow(supportTables[i],"-");
    }
}
for (var j = 0; j < projectilePlayers.get(projectileHeroes[0]).size; j++) {
    var row = new Array;
    for (var i = 0; i < projectileHeroes.length; i++) {
        if (projectilePlayers.get(projectileHeroes[i]).size > j)
            addOneRow(projectileTables[i],Array.from(projectilePlayers.get(projectileHeroes[i]))[j]+"@"+projectileHeroes[i]);
        else 
            addOneRow(projectileTables[i],"-");
    }
}


for (tank of tankTables)
    tank.style.display = "none";
for (hitscan of hitscanTables)
    hitscan.style.display = "none";
for (sup of supportTables)
    sup.style.display = "none";
for (proj of projectileTables)
    proj.style.display = "none";
changeTable();
function changeTable() {
    if (location.hash == "#Tanks") {
        setVisibility(hitscanTables,document.getElementsByClassName("hitscanTable"),"none","none");
        setVisibility(supportTables,document.getElementsByClassName("supportTable"),"none","none");
        setVisibility(tankTables,document.getElementsByClassName("tankTable"),"table","left");
        setVisibility(projectileTables,document.getElementsByClassName("projectileTable"),"none","none");
    } else if (location.hash == "#Supports") {
        setVisibility(hitscanTables,document.getElementsByClassName("hitscanTable"),"none","none");
        setVisibility(supportTables,document.getElementsByClassName("supportTable"),"table","left");
        setVisibility(tankTables,document.getElementsByClassName("tankTable"),"none","none");
        setVisibility(projectileTables,document.getElementsByClassName("projectileTable"),"none","none");
    } else if (location.hash == "#Hitscan") {
        setVisibility(hitscanTables,document.getElementsByClassName("hitscanTable"),"table","left");
        setVisibility(supportTables,document.getElementsByClassName("supportTable"),"none","none");
        setVisibility(tankTables,document.getElementsByClassName("tankTable"),"none","none");
        setVisibility(projectileTables,document.getElementsByClassName("projectileTable"),"none","none");
    } else if (location.hash == "#Projectile") {
        setVisibility(hitscanTables,document.getElementsByClassName("hitscanTable"),"none","none");
        setVisibility(supportTables,document.getElementsByClassName("supportTable"),"none","none");
        setVisibility(tankTables,document.getElementsByClassName("tankTable"),"none","none");
        setVisibility(projectileTables,document.getElementsByClassName("projectileTable"),"table","left");
    }
}
function setVisibility(tables1,tables2,value1,value2) {
    for (x of tables1) 
        x.style.display = value1;
    for (y of tables2) 
        y.style.float = value2;
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
            cell.innerHTML = "<div id=" + val[0]+val[2] + " class='redips-drag " + val[2] + "'>"+val[0]+"</div>";
            var colors = getTeamColors(val[1]);
            document.getElementById(val[0]+val[2]).style.backgroundColor = colors[0];
            document.getElementById(val[0]+val[2]).style.color = colors[1];
        }
        cell.style.fontWeight = "bold";
        //cell.classList.add("draggable");
    }
}
function addOneRow(table,vals) {
    var row = table.insertRow(-1);
    var cell = row.insertCell(0);
    if (vals == "-") {
        cell.innerHTML = " -- ";
        cell.style.backgroundColor = "black";
        cell.style.color = "white";
    } else {
        var val = vals.split("@");
        val[2] = val[2].replace(" ","_");
        cell.innerHTML = "<div id=" + val[0]+val[2] + " class='redips-drag " + val[2] + "'>"+val[0]+"</div>";
        var colors = getTeamColors(val[1]);
        document.getElementById(val[0]+val[2]).style.backgroundColor = colors[0];
        document.getElementById(val[0]+val[2]).style.color = colors[1];
    }
    cell.style.fontWeight = "bold";
}
function rowToArray(cells,array,check) {
    for (var i=0; i<cells.length; i++) {
        array.push(cells[i].rows[0].cells[0].innerHTML);
            //array.push(cells[i].innerHTML);
    }
}
function hideTable(id) {
    var hide = document.getElementById(id).rows;
    var state = "collapse";
    console.log(hide[1])
    if (hide[1].style.visibility == "collapse") {
        state = "visible";
        if (tankHeroes.includes(id.replace("_"," ")))
            width = tankWidth;
        else if (hitscanHeroes.includes(id.replace("_"," ")))
            width = hitscanWidth;
        else if (projectileHeroes.includes(id.replace("_"," ")))
            width = projectileWidth;
        else
            width = supportWidth;
    }
    for (var i=1; i<hide.length; i++) {
        hide[i].style.visibility  = state;
    }
}
function checkRole(player,heroesList,playersList) {
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