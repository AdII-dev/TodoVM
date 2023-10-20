//Figyelem felkeltő Title módosítás, amennyiben nem ez az oldal az aktív
window.onload = function() {

  let pageTitle = document.title;
  let attentionMessage = 'Ne netezz, csináld a dolgod!';
  let blinkEvent = null;

  document.addEventListener('visibilitychange', function(e) {
    let isPageActive = !  document.hidden;
    if(!isPageActive){
      blink();
    }else {
      document.title = pageTitle;
      clearInterval(blinkEvent);
    }
  });

  function blink(){
    blinkEvent = setInterval(function() {
      if(document.title === attentionMessage){
        document.title = pageTitle;
      }else {
        document.title = attentionMessage;
      }
    }, 100);
  }
};


let allapot = JSON.parse(localStorage.getItem('myUL')) || {
  elemek:[
      {
          tartalom: "Hit the gym"
      },
      {
          tartalom: "Pay bills"
      },
      {
          tartalom: "Meet George"
      },
      {
          tartalom: "buy eggs"
      },
      {
          tartalom: "Read a book"
      },
      {
          tartalom: "Organize office"
      }
  ]
};

function mentesLocalStoragebe(){
  localStorage.setItem("myUL", JSON.stringify(allapot));
}
function renderElemek(){
  
  let ElemHTML = "";
  
  allapot.elemek.forEach((elem, index) => {
    ElemHTML += `<li>${elem} <button onclick="kesz(${index})">Kész</button> <button onclick="torles(${index})">X</button></li>`


    })

  document.getElementById("csoki-lista").innerHTML = CsokiHTML;
}



// Létrehozunk egy bezárás gombot minden elemhez.
let myNodelist = document.getElementsByTagName("LI");
let i;
for (i = 0; i < myNodelist.length; i++) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Kattintásra eltüntetjük az adott elemet.
let close = document.getElementsByClassName("close");
let j;
for(j = 0; i < close.length; j++) {
  close[j].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
  }
}

// Hozzáadunk egy "kész" szimbólumot amikor rá kattintunk a lista elemére.
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Létrehozunk egy új lista elemet amikor rákattintunk a "Hozzáadás" gombra.
function newElement() {
  let li = document.createElement("li");
  let inputValue = document.getElementById("myInput").value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Valamit be kell írnod!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      let div = this.parentElement;
      div.style.display = "none";
    }
  }
}

