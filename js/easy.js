createPuzzle({
  image: "images/easy.jpg",
  size: 3,
  nextPage: "medium.html"
});

function createPuzzle(settings) {

  const container =
    document.getElementById("puzzle-container");

  container.innerHTML = "";

  const size = settings.size;

  container.style.gridTemplateColumns =
    `repeat(${size}, 1fr)`;

  container.style.gridTemplateRows =
    `repeat(${size}, 1fr)`;

  const totalPieces = size * size;

  const containerSize =
    container.offsetWidth;

  const pieceSize =
    containerSize / size;

  let correctOrder = [];

  for (let i = 0; i < totalPieces; i++) {
    correctOrder.push(i);
  }

  // RANDOMIZE
  let shuffled = [...correctOrder];

  shuffled = shuffleArray(shuffled);

  let draggedPiece = null;

  shuffled.forEach((pieceNumber, index) => {

    const piece =
      document.createElement("div");

    piece.classList.add("piece");

    piece.draggable = true;

    // CORRECT POSITION
    piece.dataset.correct = pieceNumber;

    // CURRENT POSITION
    piece.dataset.current = index;

    const row =
      Math.floor(pieceNumber / size);

    const col =
      pieceNumber % size;

    // PERFECT IMAGE SLICING
    piece.style.width =
      `${pieceSize}px`;

    piece.style.height =
      `${pieceSize}px`;

    piece.style.backgroundImage =
      `url(${settings.image})`;

    piece.style.backgroundSize =
      `${containerSize}px ${containerSize}px`;

    piece.style.backgroundPosition =
      `-${col * pieceSize}px -${row * pieceSize}px`;

    container.appendChild(piece);

    // DRAG START
    piece.addEventListener("dragstart", () => {
      draggedPiece = piece;
    });

    // ALLOW DROP
    piece.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    // DROP EVENT
piece.addEventListener("drop", () => {

  if (
    !draggedPiece ||
    draggedPiece === piece
  ) return;

  // SWAP BACKGROUND IMAGES
  const draggedBg =
    draggedPiece.style.backgroundPosition;

  const targetBg =
    piece.style.backgroundPosition;

  draggedPiece.style.backgroundPosition =
    targetBg;

  piece.style.backgroundPosition =
    draggedBg;

  // SWAP CORRECT DATA
  const draggedCorrect =
    draggedPiece.dataset.correct;

  draggedPiece.dataset.correct =
    piece.dataset.correct;

  piece.dataset.correct =
    draggedCorrect;

  checkWin();

});

  });

function checkWin() {

  const pieces =
    document.querySelectorAll(".piece");

  let solved = true;

  pieces.forEach((piece, index) => {

    if (
      parseInt(piece.dataset.correct)
      !== index
    ) {

      solved = false;

    }

  });

  if (solved) {

    setTimeout(() => {

      alert("Puzzle Complete ❤️");

      window.location.href =
        settings.nextPage;

    }, 600);

  }

}

}

// TRUE RANDOM SHUFFLE
function shuffleArray(array) {

  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] =
    [array[j], array[i]];

  }

  return array;

}

// BUTTONS
window.goHome = function () {
  window.location.href = "index.html";
};

window.resetPuzzle = function () {
  location.reload();
};

window.goBack = function () {

  const currentPage =
    window.location.pathname;

  if (
    currentPage.includes("medium")
  ) {

    window.location.href =
      "easy.html";

  }

  else if (
    currentPage.includes("hard")
  ) {

    window.location.href =
      "medium.html";

  }

  else {

    window.location.href =
      "index.html";

  }

};