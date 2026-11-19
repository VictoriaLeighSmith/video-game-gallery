# Video Game Gallery

A full-stack video game gallery built with Node.js, Express, and EJS. Users can browse a collection of games, explore different genres, discover hidden gems, and view personalized game recommendations.

## Features

- Browse a randomized selection of games on the homepage
- Explore top-rated games and hidden gems
- Filter games by genre
- Discover a randomly selected game
- View individual game details and related recommendations
- Access game data through REST API endpoints

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, HTML, CSS, JavaScript
- **Testing:** Jest

## Getting Started

1. Clone the repository:
   `git clone https://github.com/VictoriaLeighSmith/video-game-gallery.git`
2. Navigate into the project directory:
   `cd video-game-gallery`
3. Install dependencies:
   `npm install`
4. Start the application:
   `npm start`

Open `http://localhost:3000` in your browser.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/games` | Retrieve all games |
| GET | `/api/games/top-rated` | Retrieve the top 10 rated games |
| GET | `/api/games/genre/:genre` | Retrieve games by genre |
| GET | `/api/games/:id` | Retrieve a specific game |
| GET | `/api/games/:id/recommendations` | Retrieve recommended games |

## Contributors

Developed collaboratively by **Victoria Smith** and **Megan Hickey** as part of the Software Development program at Keyin College.
