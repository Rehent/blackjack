Blackjack Game

Introduction
This is a browser-based implementation of the classic card game Blackjack, also known as "21." The objective of the game is to compete against the dealer by drawing cards that add up to a value as close to 21 as possible without exceeding it.
The game is built using JavaScript, HTML, and CSS, and demonstrates the application of fundamental web development concepts such as DOM manipulation, event handling, and animations.

Features
Dynamic Card Deck Creation:
Cards are dynamically generated with suits, ranks, and values, ensuring fairness and randomness in each game.
Dealer Mechanics:
The dealer automatically draws cards until reaching a score of at least 17, adhering to standard Blackjack rules.
Interactive User Interface:
Real-time score updates for the player and dealer.
Cards are dynamically displayed on the game table using DOM elements.
Includes a card flip animation for the dealer's hidden card.

Game State Management:
Tracks player and dealer scores.
Determines and displays game outcomes (win, lose, or tie).
Handles game reset and replay functionality.

Visual Enhancements:
Card graphics and animations for an engaging user experience.
Responsive design for different screen sizes.

Technologies Used
JavaScript: Implements the core game logic, event handling, and state management.
HTML: Provides the structure and layout of the game interface.
CSS: Handles the styling and animations, including the card flip effect.

How to Run the Project
Clone this repository to your local machine:
git clone <repository-url>
Navigate to the project folder.
Open the index.html file in any modern web browser.

Enjoy the game!

How to Play
Press the "New Game" button to start a new round. The game will deal two cards to both the player and the dealer. One of the dealer's cards will remain face-down.
You can:
Press "Hit" to draw another card.
Press "Stand" to end your turn and let the dealer play.
Once you press "Stand", the dealer will reveal their hidden card and play according to the rules.
The game determines the winner based on the final scores:
A score closer to 21 wins.
Scores exceeding 21 result in a loss.

Future Improvements
Implementing multiplayer support.
Adding advanced dealer logic for customizable difficulty levels.
Introducing audio effects for enhanced player engagement.
Mobile-friendly optimizations for touch-based interactions.

