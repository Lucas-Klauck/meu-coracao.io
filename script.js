const users = {
    Mylife: {
        charadasUsuario: ["1- um apelido seu","2- em um aplicativo d reels","3- representa vc pra mim"],
        charadasSenha: ["1- um dia aleatório alguem manda msg","2- em um app incomum","3- final de um mês e começo de uma história"],
        usuario: "Mylife",
        senha: "30112025",
        redirect: "heart.html"
    },
    Mywife: {
        charadasUsuario: ["1- um apelido futuramente","2- apartir de um ato de amor diante de todos","3- apartir de uma letra todo o sentido muda","4- necessita dde um pedido e um anel","5- onde nossos nomes se tornam um só"],
        charadasSenha: ["1- uma promessa","2- um ato de carinho","3- um desejo constante de ambos como uma intensidade alta","4- estar proximo não será o suficiente","5- só um abraço é pouco"],
        usuario: "Mywife",
        senha: "abracoUrso",
        redirect: "flowers.html"
    }
};

let fase = "usuario"; // ou "senha"
let atual = users.Mylife;

// Detecta Mywife via query string
const params = new URLSearchParams(window.location.search);
if(params.get("user") === "Mywife") atual = users.Mywife;

const charadasContainer = document.getElementById("charadas-container");
const respostaInput = document.getElementById("resposta");
const submitBtn = document.getElementById("submit-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const message = document.getElementById("message");

// Mostra charadas
function mostrarCharadas(){
    charadasContainer.innerHTML = "";
    let arr = fase === "usuario" ? atual.charadasUsuario : atual.charadasSenha;
    arr.forEach(c => {
        const p = document.createElement("p");
        p.innerText = c;
        charadasContainer.appendChild(p);
    });
    respostaInput.value = "";
    respostaInput.focus();
}

// Verifica resposta final
function verificarResposta(){
    let valor = respostaInput.value.trim();
    if(fase === "usuario"){
        if(valor.toLowerCase() === atual.usuario.toLowerCase()){
            fase = "senha";
            message.innerText = "";
            mostrarCharadas();
        } else {
            message.innerText = "Usuário incorreto, tente novamente!";
            charadasContainer.classList.add("shake");
            setTimeout(()=> charadasContainer.classList.remove("shake"), 500);
        }
    } else {
        if(valor === atual.senha){
            window.location.href = atual.redirect;
        } else {
            message.innerText = "Senha incorreta, tente novamente!";
            charadasContainer.classList.add("shake");
            setTimeout(()=> charadasContainer.classList.remove("shake"), 500);
        }
    }
}

// Shuffle charadas
shuffleBtn.addEventListener("click", ()=>{
    function shuffleArray(array) {
        for (let i = array.length -1; i>0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffleArray(atual.charadasUsuario);
    shuffleArray(atual.charadasSenha);
    mostrarCharadas();
    message.innerText = "Charadas trocadas!";
});

submitBtn.addEventListener("click", verificarResposta);
respostaInput.addEventListener("keypress", (e)=>{ if(e.key==="Enter") verificarResposta(); });

mostrarCharadas();
