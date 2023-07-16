let targetNumbers = [];
let guessCount = 0;
const maxGuessCount = 10;

function generateTargetNumbers() {
  const numbers = [];
  while (numbers.length < 6) {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  targetNumbers = numbers;
}

function checkGuess() {
  const guessElements = document.getElementsByClassName("guess");
  const guess = Array.from(guessElements).map((element) => Number(element.value));

  if (!isValidGuess(guess)) {
    alert("Angka yang kamu masukkan tidak valid. Pastikan tidak ada angka yang sama.");
    return;
  }

  guessCount++;

  let correctCount = 0;
  let correctPositionCount = 0;
  let correctNumbers = [];

  for (let i = 0; i < guess.length; i++) {
    if (targetNumbers.includes(guess[i])) {
      correctCount++;
      correctNumbers.push(guess[i]);
    }
    if (targetNumbers[i] === guess[i]) {
      correctPositionCount++;
    }
  }

  const historyElement = document.getElementById("history");
  const guessString = guess.join(" ");
  const resultString = `${guessString} - Benar: ${correctCount}, Posisi Benar: ${correctPositionCount}`;
  const pElement = document.createElement("p");
  pElement.textContent = resultString;

  // Memasukkan tebakan terbaru di atas
  if (historyElement.firstChild) {
    historyElement.insertBefore(pElement, historyElement.firstChild);
  } else {
    historyElement.appendChild(pElement);
  }

  const remainingGuesses = maxGuessCount - guessCount;
  if (correctPositionCount === 6) {
    endGame(true);
  } else if (guessCount === maxGuessCount) {
    endGame(false);
  } else {
    resetGuess();
    if (correctNumbers.length > 0) {
      document.getElementById("result").textContent = `Angka yang benar dengan posisi benar: ${correctNumbers.join(", ")}. Kesempatan kamu tinggal ${remainingGuesses} lagi.`;
    } else {
      document.getElementById("result").textContent = `Kesempatan kamu tinggal ${remainingGuesses} lagi.`;
    }
  }
}

function isValidGuess(guess) {
  const uniqueGuess = [...new Set(guess)];
  return guess.length === uniqueGuess.length;
}

function resetGuess() {
  const guessElements = document.getElementsByClassName("guess");
  Array.from(guessElements).forEach((element) => (element.value = ""));
}

function resetGame() {
  guessCount = 0;
  resetGuess();
  const historyElement = document.getElementById("history");
  historyElement.innerHTML = "";
  document.getElementById("result").textContent = "";
  generateTargetNumbers();
}

function endGame(won) {
  const resultElement = document.getElementById("result");
  const guessElements = document.getElementsByClassName("guess");
  Array.from(guessElements).forEach((element) => (element.disabled = true));
  if (won) {
    resultElement.textContent = "Selamat, kamu berhasil menebak!";
  } else {
    resultElement.textContent = `Maaf, kamu kalah. Angka yang benar adalah ${targetNumbers.join(", ")}. Mau coba lagi?`;
  }
}

resetGame();
