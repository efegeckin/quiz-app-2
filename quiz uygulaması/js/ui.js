

function UI(){
    this.main=document.querySelector("main");
    this.incorrect = `
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
    `;
    this.correct = `
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
        </svg>
    `;
    this.remainingTime = document.getElementById("remainingTime");
    this.secondTime = document.getElementById("secondTime");
    this.timeLine = document.querySelector(".time-line");

}

UI.prototype.soruGoster = function(soru){
    
    const app = document.querySelector(".app");
    const startBtn = document.getElementById("startBtn");
    
    app.style.display = "block";
    startBtn.textContent = "Sıfırla";

    startBtn.addEventListener("click", function(){
        window.location.reload();
    });

    const main = document.getElementById("main");
    main.innerHTML = "";

    const soruText = document.createElement("h3");
    soruText.id = "soruText";
    soruText.className = "soru";
    soruText.textContent = soru.soruMetni;

    const cevapDiv = document.createElement("div");
    cevapDiv.id = "cevapDiv";
    cevapDiv.className = "cevapDiv";

    for(let [key, value] of Object.entries(soru.cevapSecenekleri)){
        const option = document.createElement("button");
        option.classList = "option";
        option.addEventListener("click", optionSelected);

        const span = document.createElement("span");

        span.textContent = key + ") " + value;

        option.appendChild(span);
        cevapDiv.appendChild(option);
    }
    main.appendChild(soruText);
    main.appendChild(cevapDiv);
};

UI.prototype.disableAllOption = function() {
    const options = document.querySelectorAll(".option");
    for(let option of options){
        option.classList.add("disabled");
    }
    const nextBtn = document.getElementById("nextBtn");
    nextBtn.style.display = "block";
};

UI.prototype.kalanSoru = function() {   
    const kalanSoru = document.getElementById("kalanSoru");
    kalanSoru.textContent = `${quiz.soruIndex + 1} / ${quiz.sorular.length}`;
};

// UI.prototype.skorGoster = function(dogruCevap, toplamSoru) {
//     const etiket = `Toplam ${toplamSoru} sorudan ${dogruCevap} doğru cevap verdiniz.`;
//     const skorText = document.getElementById("skorText");
//     skorText.textContent = etiket;  

// }