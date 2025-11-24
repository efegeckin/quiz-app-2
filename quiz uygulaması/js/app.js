const soruListesi =[
    new Soru("1-Atatürk cumhuriyeti kaç yılında kurmuştur?", {a:"1920", b:"1923", c:"1938", d:"1945"}, "b"),
    new Soru("2- Türkiye'nin başkenti neresidir?", {a:"İstanbul", b:"Ankara", c:"İzmir", d:"Bursa"}, "b"),
    new Soru("3- Dünyanın en büyük okyanusu hangisidir?", {a:"Atlantik Okyanusu", b:"Hint Okyanusu", c:"Arktik Okyanusu", d:"Pasifik Okyanusu"}, "d"),
    new Soru("4- Hangi gezegen Güneş'e en yakın olanıdır?", {a:"Venüs", b:"Mars", c:"Merkür", d:"Dünya"}, "c")
];

const quiz = new Quiz(soruListesi);
const ui = new UI();

const nextBtn =document.getElementById("nextBtn");

function sonrakiSoru(){
    
    if(quiz.sorular.length != quiz.soruIndex){
        startTimer(10);
        startTimeLine();
        nextBtn.style.display = "block";
        ui.soruGoster(quiz.soruGetir());
        console.log(quiz.soruGetir());
        ui.kalanSoru();
        
    }else{
        nextBtn.textContent = "Quizi Bitir";
        nextBtn.addEventListener("click", function(){

            const main = document.getElementById("main");
            const sonucMain = document.getElementById("sonucMain");
            main.innerHTML = " ";
            main.style.display = "none";
            sonucMain.style.display = "flex";
            nextBtn.style.display = "none";

            if(quiz.dogruCevapSayisi <= 2){
                sonucMain.classList.add("sonucLow");
                sonucMain.querySelector(".high").innerHTML = "";
                sonucMain.querySelector("#skorTextP").innerHTML = 
                `
                Tekrar Deneyiniz! Quiz'i ${quiz.dogruCevapSayisi} doğru cevapla tamamladınız. Daha iyi olabilirsiniz! 
                `;
            }
            else{
                sonucMain.classList.add("sonucHigh");
                sonucMain.querySelector(".low").innerHTML = "";
                sonucMain.querySelector("#skorTextP").innerHTML =
                `
                Harika! Quiz'i ${quiz.dogruCevapSayisi} doğru cevapla tamamladınız. Başarılı bir performans sergilediniz! 
                `;
            }
            // ui.skorGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
        });
        
    }
};
nextBtn.addEventListener("click", sonrakiSoru);

document.getElementById("startBtn").addEventListener("click", function(){
    if(quiz.sorular.length != quiz.soruIndex){
        startTimer(10);
        startTimeLine();
        ui.soruGoster(quiz.soruGetir());
        console.log(quiz.soruGetir());
        ui.kalanSoru();
        
    }else{
        console.log("quiz bitti");
        

        
    }
});

function optionSelected(e){
    clearInterval(counterLine);
    clearInterval(counter);
    let selecetElement = e.target;
    if(selecetElement.nodeName == "SPAN"){
        selecetElement = selecetElement.parentElement;
    }
    const cevap = e.target.textContent[0];
    const soru = quiz.soruGetir();

    if(soru.cevapKontrol(cevap)){
        quiz.dogruCevapSayisi++;
        e.target.classList.add("correct");
        e.target.insertAdjacentHTML("beforeend", ui.correct);
    }else{

        e.target.classList.add("incorrect");
        e.target.insertAdjacentHTML("beforeend", ui.incorrect);
    }
    
    quiz.soruIndex++;
    ui.disableAllOption();     
}
let counter;

function startTimer(time){
    counter = setInterval(timer, 1000);

    function timer(){
        ui.remainingTime.textContent = " Kalan Süre : ";
        ui.secondTime.textContent = time;
        time--;

        if(time < 0){
            clearInterval(counter);
            ui.remainingTime.textContent = "Süre Bitti";
            quiz.soruIndex++;
            ui.disableAllOption();
        }
    }
}

let counterLine

function startTimeLine(){
    let lineWidth = 0;

    counterLine = setInterval(timer, 20);

    function timer(){
        lineWidth += 1;

        ui.timeLine.style.width = lineWidth + "px";

        if(lineWidth > 550){
            clearInterval(counterLine);
        }
    }
}