const inputBox = document.getElementById("ustAlanInput");
const ekleBtn = document.getElementById("ekleBtn");
const araBtn = document.getElementById("araBtn");
const solListe = document.getElementById("solBlok");
const sagListe = document.getElementById("sagBlok");
const altAlan = document.getElementById("altAlan");

    inputBox.addEventListener("keyup", function(event) {
    if (inputBox.value != "") {
        if (event.keyCode == 13) {
        event.preventDefault();
        Listem.ekle();
        }
    } else {
        // inputBox.setAttribute("css","border: 2px solid red;");
        alert("kaydetmek için veri ekle");
    }
    });

var Listem = {
    data: JSON.parse(localStorage.getItem("Liste")) || [],
    ekle: function(){
        if(inputBox.value != ""){ 
            var inputValue = inputBox.value;
            this.data.push({
                myInput: inputValue,
                durum: true
            });
            this.setLcStorage();
            inputBox.value = "";
        }else{
            // inputBox.style("border: 2px solid red;");
            alert("veri ekle");
        }
    },
    setLcStorage: function(){
        localStorage.setItem("Liste",JSON.stringify(this.data));
        this.getLcStorage();
    },
    getLcStorage: function(){
        var ekleSol = "";
        var ekleSag = "";
        this.data.forEach((element,index) => {
            if (element.durum == true){
                    ekleSol += `
                        <div class="item">
                            <span id="solSpan${index}">${element.myInput}</span>
                            <button class="aktarBtn" onclick="Listem.sagaAktar(${index})">Sağa Ekle</button>
                        </div>`;
            }else{
                ekleSag += `
                        <div class="item">
                            <span id="sagSpan${index}">${element.myInput}</span>
                            <button class="aktarBtn" onclick="Listem.solaAktar(${index})">Sola Ekle</button>
                        </div>`;
            }
        });
        solListe.innerHTML = ekleSol;
        sagListe.innerHTML = ekleSag;
    },
    sagaAktar: function(element){
        this.data[element].durum = false;
        this.setLcStorage();
    },
    solaAktar: function(element){
        this.data[element].durum = true;
        this.setLcStorage();
    },
    ara: function (){
        var inputValue = inputBox.value;
        var arananElemanSol = "";
        var arananElemanSag = "";
        var dataSearch = this.data.filter(function(eleman){
            return eleman;
        });
        dataSearch.forEach(function(element,index){
                if (element.myInput.includes(inputValue)) {
                    solListe.innerHTML = "";
                    sagListe.innerHTML = "";
                    if (element.durum == true){
                        arananElemanSol += `
                            <div class="item">
                                <span id="solSpan${index}">${element.myInput}</span>
                                <button class="aktarBtn" onclick="Listem.sagaAktar(${index})">Sağa Ekle</button>
                            </div>`;
                }else{
                    arananElemanSag += `
                            <div class="item">
                                <span id="sagSpan${index}">${element.myInput}</span>
                                <button class="aktarBtn" onclick="Listem.solaAktar(${index})">Sola Ekle</button>
                            </div>`;
                }
                solListe.innerHTML = arananElemanSol;
                sagListe.innerHTML = arananElemanSag;
                }
        })
        inputBox.value = "";
    },
    temizle:function(){
        this.data = [];
        this.setLcStorage();
    }
}
Listem.getLcStorage();

