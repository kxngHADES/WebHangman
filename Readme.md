# 2-Player Web Hangman

Welcome to the 2-Player Hangman game! This is a simple multiplayer Hangman game where two players can join a room and take turns guessing letters to uncover a hidden word.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This Hangman game allows two players to:
- Create or join a room.
- Set a word for the other player to guess.
- Guess letters to reveal the hidden word.
- Determine the winner based on correct guesses.

The project uses Node.js with Express and Socket.IO for real-time communication between clients.

## Installation

To get started, follow these steps:

1. **Clone the repository:**

    ```bash
    https://github.com/kxngHADES/WebHangman.git
    cd WebHangman
    ```

2. **Install dependencies:**

    Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

    ```bash
    npm install
    ```

3. **Start the server:**

    ```bash
    npm start
    ```

    The server will run on [http://localhost:3000](http://localhost:3000).

4. **Open the game:**

    Navigate to [http://localhost:3000](http://localhost:3000) in your browser to start playing.

## Usage

1. **Creating a Room:**
   - Click the "Create Room" button.
   - Share the generated Room ID with the other player.

2. **Joining a Room:**
   - Enter the Room ID provided by the other player.
   - Click the "Join Room" button.

3. **Setting a Word:**
   - The first player to join the room will be prompted to set a word.
   - Enter the word and click "Set Word".

4. **Guessing Letters:**
   - Both players can enter a letter to guess and click "Guess".

5. **Winning and Losing:**
   - The game will automatically determine the winner based on correct guesses.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy coding and enjoy your Hangman game!
