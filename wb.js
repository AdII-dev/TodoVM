// A local storageből kiolvassuk az adatokat amelyeket a csokiAllapot kulcs érték párjaként eétárolunk.
let allapot = JSON.parse(localStorage.getItem('csokiAllapot')) || {
    csokik:[
        {
            nev: "Étcsoki",
            ara: 2500,
            raktaron:true
        },
        {
            nev: "Fehér csoki",
            ara: 3500,
            raktaron:false
        },
        {
            nev: "Lyukas csoki",
            ara: 1500,
            raktaron:true
        }
    ]
};
// A csoki állapot mentése a localStorage-be.
function mentesLocalStoragebe(){
    localStorage.setItem("csokiAllapot", JSON.stringify(allapot));
}
//https://www.msn.com/hu-hu/hirek/other/%C3%ADgy-n%C3%A9zett-ki-j%C3%A9zus-a-mesters%C3%A9ges-intelligencia-szerint/ar-AA1hhFf9?ocid=winp1taskbar&cvid=f3f778bb9fd042d79b1eab48acf3d9b8&ei=24

//Read művelet: kiolvassuk az adatokat az allapot.csokik objektumból.
function renderCsokik(){
    /* Elősször dekraláltam a csoki html változót és inicalizáltam egy üres string értékkel. Ez azért fontos, 
    mivel ha nem adunk neki értéket, akésőbbiekben, amikor összefűzésre kerülnek az elemek, meg jelenítené az
    undefined értéket a böngészőben. */
    let CsokiHTML = "";
    // Az allapot objektum csokik tömbjén a ForEach metódussal iterálunk végig. 
    allapot.csokik.forEach((csoki, index) => {
        //Tesztelés: Ellenőrzöm, hogy az iterátor segítségével vissza kapom-e az értékeket:
        //console.log(csoki.nev)
        /*Az elemek összefűzéséhez úgynevezett template literalt használtam, ami lehetővé teszi, 
        hogy a html elemek között változókat jelenítsek meg. */
        CsokiHTML += `
        <div class ="${csoki.raktaron ? "bg-success" : "bg-danger"} p-4 m-4">
        <h2>${csoki.nev}</h2>
        <p> A termék ára: ${csoki.ara} Ft</p>
        <button class="btn btn-danger" onclick="torles(${index})">
        Törlés</button>
        <button class="btn btn-succes" onclick="update(${index})">
        Módosítás</button>
        </div>`
    })

    document.getElementById("csoki-lista").innerHTML = CsokiHTML;
}

document.getElementById("ujtermek").onclick = () =>{
    console.log("On click test")

    let newFormHTML = `
    <h4>Új csoki hozzáadása</h4>
    <form id="uj-csoki" class="p-5">
    <label class="w-100">
    <h5>Termék neve:</h5>
    <input type="text" name="nev" class="form-control">
    </label>

    <label class="w-100">
    <h5>Termék ára:</h5>
    <input type="number" name="ara" class="form-control">
    </label>

    <label class="w-100">
    <h5>Van-e raktáron?</h5>
    <input type="checkbox" name="raktaron" class="form-control">
    </label>

    <button class="btn btn-primary" type="submit">Felvitel</button>

    </form>
    `;


document.getElementById("uj").innerHTML = newFormHTML;

document.getElementById("uj-csoki").onsubmit = function(event){
    event.preventDefault();
    
    let nev = event.target.elements.nev.value
    console.log(nev)
    let ara = event.target.elements.ara.value
    console.log(ara)
    let raktaron = event.target.elements.raktaron.value
    console.log(raktaron)
    //a csokik tömbhöz hozzáadásra kerül az új termék
    allapot.csokik.push(
        {           
            nev: nev,
            ara: ara,
            raktaron: raktaron
        }
        )
        document.getElementById('uj').innerHTML = "";
        document.getElementById('ujtermek').style.display = "block";
        
        
        mentesLocalStoragebe();
        renderCsokik();
}
}
//Törlés funkció
function torles(index){
   // document.getElementById("csoki-lista").innerHTML = allapot;
    allapot.csokik.splice(index, 1); //Törlés az index alapján
    mentesLocalStoragebe();//Mentés LocalStoregabe
    renderCsokik();//Frissítés
}

//Módosítás funkció
function update(index) {
    let csoki = allapot.csokik[index];
    console.log(csoki);
    let modositasFormHTML =
 `
    <h4>Új csoki hozzáadása</h4>
    <form id="modosit-csoki" class="p-5">
    <label class="w-100">
    <h5>Termék neve:</h5>
    <input class="form-control" type="text" name="nev" value="${csoki.nev}">
    </label>

    <label class="w-100">
    <h5>Termék ára:</h5>
    <input type="number" name="ara" class="form-control" value="${csoki.ara}">
    </label>

    <label class="w-100">
    <h5>Van-e raktáron?</h5>
    <input class="form-control" type="checkbox"  name="raktaron"
    ${csoki.raktaron ? 'checked' : ''}>
    </label>

    <button class="btn btn-primary" type="submit">Felvitel</button>

    </form>
    `;
    document.getElementById("uj").innerHTML = modositasFormHTML;

    document.getElementById("modosit-csoki").onsubmit = function(event){
    event.preventDefault();
        let nev = event.target.elements.nev.value;
        console.log(nev);
        let ara = event.target.elements.ara.value;
        console.log(ara);
        let raktaron = event.target.elements.raktaron.checked;
        console.log(raktaron);
        allapot.csokik[index] = {  
            nev: nev, 
            ara: ara, 
            raktaron: raktaron
        }
    document.getElementById('uj').innerHTML = "";
    document.getElementById('ujtermek').style.display = "block";

    mentesLocalStoragebe();
    renderCsokik();
}
}


window.onload = renderCsokik();