# 🎮 Tic-Tac-Toe Game

A dynamic, browser-based Tic-Tac-Toe game built with vanilla JavaScript, HTML, and CSS. Two players compete to score 3 wins first, with animated strike-throughs and customizable player names and symbols.

---

## 🚀 Features

- 🧑‍🤝‍🧑 Two-player mode with name input
- ❌⭕ Symbol selection (X or O)
- 🧠 Smart turn switching and win detection
- 🎯 Strike animations for winning combos (horizontal, vertical, diagonal)
- 🏆 Score tracking — first to 3 wins the game
- 🔄 New game and round reset logic
- 🎨 CSS-driven UI with dynamic highlights

---

## 🛠 Tech Stack

- **JavaScript**: Game logic, DOM manipulation, event handling
- **HTML**: Structure and form inputs
- **CSS**: Styling, transitions, and strike animations

---

## 📦 File Structure

```
├── index.html
├── style.css
└── script.js
```

---

## 🧩 How It Works

1. Players enter their names and choose a symbol (X or O).
2. The game board initializes with 9 clickable cells.
3. Players take turns placing their symbol.
4. The game checks for winning combinations after each move.
5. A strike animation highlights the winning line.
6. First player to reach 3 wins is declared the overall winner.

---

## 🧪 Game Logic Highlights

- **Board State**: Stored as an array of 9 elements.
- **Player Switching**: Controlled via `Utils.isPlayer1`.
- **Win Detection**: Uses predefined combinations and `every()` checks.
- **Symbol Assignment**: Dynamically set via `choosePlayer(symbol)` after form submission.
- **Overlay & Reset**: Game overlay appears on win/draw, with reset options.

---

## 🖼️ Screenshots

![screenshot](https://raw.githubusercontent.com/amit03210/Tic-Tac-Toe/refs/heads/main/asset/screenshot.png)

---

## 📋 To-Do / Ideas

- Add AI opponent mode
- Mobile responsiveness
- Sound effects for moves and wins
- Score history or leaderboard

---

## 🧑‍💻 Author

Built by Amit - inspired by classic games and DOM wizardry.

---

## 📄 License

MIT License. Feel free to fork, remix, and improve!
