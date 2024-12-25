let deck = [];
let playerScore = 0;
let roundWins = 0;
let dealerScore = 0;
let playerHand = [];
let dealerHand = [];
let gameOver = false;
let playerdone = false;

// Создаем массив deck с картами
// Функция для создания новой колоды
function newDeck() {
  const suits = ["C", "D", "H", "S"];
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  deck = []; // Очищаем колоду перед созданием новой

  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      let value;
      if (rank === "A") {
        value = 11; // Туз имеет значение 11
      } else if (["J", "Q", "K"].includes(rank)) {
        value = 10; // Карты с номиналом J, Q, K имеют значение 10
      } else {
        value = parseInt(rank); // Остальные карты имеют значение равное своему номиналу
      }

      deck.push({
        suit: suit,
        rank: rank,
        value: value,
        pass: `deck/${suit}${rank}.png`,
        isFaceDown: false,
      });
    });
  });
}

// Функция для выбора случайной карты и её удаления из колоды
function RandomCard() {
  if (deck.length === 0) {
    console.log("Колода пуста!");
    return null; // Возвращаем null, если колода пуста
  }
  // Выбираем случайный индекс карты
  const randomIndex = Math.floor(Math.random() * deck.length);
  // Удаляем карту из колоды и возвращаем её
  const drawnCard = deck.splice(randomIndex, 1)[0];
  return drawnCard;
}


function displayCard(card, containerId, isFaceDown) {
  const cardContainer = document.querySelector(containerId);
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  // Добавляем элемент для лицевой стороны карты
  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  cardFront.style.backgroundImage = `url(${card.pass})`;

  // Добавляем элемент для рубашки карты
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.style.backgroundImage = `url('/deck/back.png')`;

     // Устанавливаем порядок отображения в зависимости от isFaceDown
  if (card.isFaceDown) {
      cardElement.appendChild(cardFront); // Затем добавляем лицевую сторону
      cardElement.appendChild(cardBack); // Сначала добавляем рубашку
      
  } else {
      cardElement.appendChild(cardBack); // Затем добавляем рубашку
      cardElement.appendChild(cardFront); // Сначала добавляем лицевую сторону
      
  }

  cardContainer.appendChild(cardElement); // Добавляем карту в контейнер
}


function startGame() {
  newDeck(); // Создаем новую колоду
  playerScore = 0;
  dealerScore = 0;
  playerHand = [];
  dealerHand = [];
  gameOver = false;
  playerdone = false;
  clearTable();
  enableButtons();

  // Раздаем по две карты дилеру и игроку
  for (let i = 0; i < 2; i++) {
    const playerCard = RandomCard();
    const dealerCard = RandomCard();

    if (playerCard) {
      playerHand.push(playerCard);
      playerScore += playerCard.value;
      displayCard(playerCard, "#player-cards"); // Показываем карту игрока лицом вверх
    }

    if (dealerCard) {
      // Первая карта дилера перевернута
      if (i === 0) {
        dealerCard.isFaceDown = true; // Устанавливаем rotated в true для первой карты дилера
        dealerHand.push(dealerCard);
      }
      dealerScore += dealerCard.value;
      displayCard(dealerCard, "#dealer-cards"); // Отображаем карту дилера
    }
    
  }
  console.log("Dealler hand after creation:", dealerHand);
  checkGameStatus();
  updateScoreOnScreen();
}

function clearTable() {
  // Находим все элементы карт на игровом столе
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.remove());
}
// Функция для проверки текущего состояния игры
function checkGameStatus() {
  if (gameOver) return;

  const statusChecks = [
    {
      condition: () => playerScore === 21,
      message: "You win with 21 points!",
      actions: () => {
        roundWins++;
        updateScoreOnScreen();
      },
    },
    {
      condition: () => dealerScore === 21,
      message: "Dealer wins with 21 points!",
    },
    {
      condition: () => playerScore > 21,
      message: "You lose! You scored more than 21 points!",
    },
    {
      condition: () => dealerScore > 21,
      message: "You win! Dealer has more than 21 points!",
      actions: () => {
        roundWins++;
        updateScoreOnScreen();
      },
    },
    {
      condition: () => playerScore > dealerScore && playerdone === true && dealerScore >=17,
      message: `You win with a score of ${playerScore} against ${dealerScore}`,
      actions: () => {
        roundWins++;
        updateScoreOnScreen();
      },
    },
    {
      condition: () => playerScore < dealerScore && playerdone === true && dealerScore >=17,
      message: `Dealer wins with a score of ${dealerScore} against your ${playerScore}`,
    },
    {
      condition: () => playerScore === dealerScore && playerdone === true && dealerScore >=17,
      message: `It's a tie with a score of ${dealerScore} each`,
    },
  ];

  for (const check of statusChecks) {
    if (check.condition()) {
      console.log(check.message);
      showGameResult(check.message);
      if (check.actions) check.actions(); // Выполняем дополнительные действия, если указаны
      gameOver = true;
      return; // Завершаем выполнение функции после нахождения подходящего условия
    }
  }
}

function updateScoreOnScreen() {
  document.getElementById("score").textContent = playerScore;
  document.getElementById("roundWins").textContent = roundWins;
}

function showGameResult(message) {
  document.getElementById("game-result").style.opacity = "1";
  const gameResult = document.getElementById("game-result");

  // Очищаем содержимое gameResult, чтобы можно было обновить текст и кнопку
  gameResult.innerHTML = "";

  // Создаем элемент для текста сообщения
  const messageText = document.createElement("p");
  messageText.textContent = message;

  // Создаем кнопку "New Game"
  const newGameButton = document.createElement("button");
  newGameButton.className = "button";
  newGameButton.textContent = "New Game";

  // Добавляем обработчик события для кнопки
  newGameButton.addEventListener("click", function () {
    // Логика перезапуска игры или скрытия панели
    gameResult.style.opacity = "0";
    setTimeout(() => {
      gameResult.classList.add("hidden");
      startGame(); // метод перезапуска игры
    }, 500);
  });

  // Добавляем элементы на панель
  gameResult.appendChild(messageText);
  gameResult.appendChild(newGameButton);

  // Показываем панель с результатом игры
  gameResult.classList.remove("hidden");
  setTimeout(() => {
    gameResult.style.opacity = "1"; // Анимация появления
  }, 25);
}

function finishRound() {
  while (dealerScore < 17 && !gameOver) {
    const dealerCard = RandomCard();
    
    dealerHand.push(dealerCard);
    
    dealerScore += dealerCard.value;
    
    displayCard(dealerCard, "#dealer-cards");
    
    checkGameStatus();
    if (gameOver) break;
  }
  if (!gameOver) {
    checkGameStatus(); // Финальная проверка, если dealerScore >= 17
  }
}

// Вызываем функцию для отображения карт
const getCardButton = document.getElementById("getCardButton");
getCardButton.addEventListener("click", () => {
  const card = RandomCard();
  if (card) {
    displayCard(card, "#player-cards");
    playerScore += card.value;
    updateScoreOnScreen();
    checkGameStatus();
  } else {
    console.error("Карта не найдена!");
  }
});

function disableButtons() {
  // Находим все кнопки на экране
  const buttons = document.querySelectorAll("button");

  // Проходим по каждой кнопке
  buttons.forEach((button) => {
    // Проверяем, является ли кнопка кнопкой "New Game"
    if (button.id !== "newGame") {
      // Если это не кнопка "New Game", отключаем её
      button.disabled = true;
    }
  });
}
function enableButtons() {
  // Находим все кнопки на экране
  const buttons = document.querySelectorAll("button");

  // Проходим по каждой кнопке
  buttons.forEach((button) => {
    // Включаем кнопку, снимая атрибут disabled
    button.disabled = false;
  });
}

function flipDealerCard(dealerHand) {
  // Находим первую карту в массиве, у которой isFaceDown === true
  const faceDownCard = dealerHand.find(card => card.isFaceDown);

  if (!faceDownCard) {
    console.log("Нет перевёрнутых карт у дилера.");
    return;
  }

  // Найдём элемент карты в DOM (предполагается, что порядок массива соответствует DOM)
  const dealerCardsContainer = document.getElementById("dealer-cards");
  const cardElements = dealerCardsContainer.querySelectorAll(".card");

  if (!cardElements.length) {
    console.error("Карты дилера не найдены в DOM.");
    return;
  }

  // Первая перевёрнутая карта всегда соответствует индексу
  const faceDownCardIndex = dealerHand.indexOf(faceDownCard);
  const cardElement = cardElements[faceDownCardIndex];

  // Если карта найдена, переворачиваем её
  if (cardElement) {
    flipCard(cardElement); // Вызываем предыдущую функцию для переворота
    faceDownCard.isFaceDown = false; // Обновляем состояние карты в массиве
  } else {
    console.error("Не удалось найти соответствующую карту в DOM.");
  }
}
function flipCard(cardElement) {
  // Находим дочерние элементы карты
  const cardFront = cardElement.querySelector('.card-front');
  const cardBack = cardElement.querySelector('.card-back');

  if (cardFront && cardBack) {
    // Удаляем элементы из DOM
    cardElement.removeChild(cardFront);
    cardElement.removeChild(cardBack);

    // Добавляем их обратно в обратном порядке
    cardElement.appendChild(cardBack);
    cardElement.appendChild(cardFront);
  } else {
    console.error("Не найдены элементы .card-front или .card-back.");
  }
}

const openCardsButton = document.getElementById("openCardsButton");
openCardsButton.addEventListener("click", () => {
  playerdone = true;
  flipDealerCard(dealerHand);
  disableButtons();
  finishRound();
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("newGame").addEventListener("click", function () {
    // После завершения анимации показываем стол
    setTimeout(() => {
      document.getElementById("table").style.opacity = "1"; // Показываем стол
      document.getElementById("game-result").style.opacity = "0";
    }, 500); // Ждем завершения анимации
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.getElementsByClassName("card");

  // Перебираем все элементы с классом "card" и добавляем обработчик событий
  Array.from(cards).forEach((card) => {
    card.addEventListener("click", function () {
      // Переключаем состояние карты
      
    });
  });
});

startGame();
