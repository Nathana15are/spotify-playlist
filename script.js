let mode = 'classic';
let score = 0;
let bestScores = JSON.parse(localStorage.getItem("bestScores") || "[]");

function startGame(m) {
  mode = m;
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("leaderboard").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("game-title").innerText = (mode === 'classic') ? "🎮 Mode Classique" : "⚔️ Mode 1v1";
  resetGame();
}

function resetGame(){
  score = 0;
  document.getElementById("score").innerText = score;
  renderGrid();
}

function renderGrid(){
  let container = document.getElementById("game-container");
  container.innerHTML = "";
  for(let i=0;i<16;i++){
    let div = document.createElement("div");
    div.className = "tile";
    div.innerText = Math.random()>0.8 ? 2 : "";
    container.appendChild(div);
  }
}

function goToMenu(){
  document.getElementById("menu").classList.remove("hidden");
  document.getElementById("game").classList.add("hidden");
  document.getElementById("leaderboard").classList.add("hidden");
}

function showWinner(player){
  const overlay = document.createElement("div");
  overlay.id = "winner-overlay";
  overlay.innerHTML = `
    <div class="winner-box">
      <h1 class="rainbow">🏆 Joueur ${player} a gagné !</h1>
      <p class="score-text">Score final : ${score}</p>
      <button onclick="shareScore(${player}, ${score})">📤 Partager mon score</button>
      <button onclick="saveScore(${score}); goToMenu();">↩️ Retour menu</button>
    </div>`;
  document.body.appendChild(overlay);
}

function shareScore(player, score){
  const text = `🎮 J’ai gagné au 2048 Ultra Deluxe vs Joueur ${player} avec un score de ${score} ! 🔥`;
  navigator.clipboard.writeText(text).then(() => {
    alert("✅ Score copié ! Colle-le sur Discord/Twitter/etc.");
  });
}

function saveScore(s){
  bestScores.push(s);
  bestScores.sort((a,b)=>b-a);
  bestScores = bestScores.slice(0,5);
  localStorage.setItem("bestScores", JSON.stringify(bestScores));
}

function showLeaderboard(){
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("leaderboard").classList.remove("hidden");
  let list = document.getElementById("score-list");
  list.innerHTML = "";
  bestScores.forEach(sc => {
    let li = document.createElement("li");
    li.innerText = sc;
    list.appendChild(li);
  });
}
