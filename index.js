const express = require("express");
const path = require("path");
const { VideoGames } = require("./utils/data");
const {
  getGameDetailsById,
  getGamesByGenre,
  getTopRatedGames,
  selectRandomGameId,
  getHiddenGems,
  getRecommendationsByGameId,
} = require("./utils/gameUtils");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/", (request, response) => {
  const randomGames = [];

  while (randomGames.length < 9) {
    const randomId = selectRandomGameId();
    const randomGame = getGameDetailsById(randomId);

    if (!randomGame) {
      continue;
    }

    const alreadyAdded = randomGames.some((game) => game.id === randomGame.id);

    if (randomGame && !alreadyAdded) {
      randomGames.push(randomGame);
    }
  }

  response.render("index", {
    randomGames,
  });
});

app.get("/game/:id", (request, response) => {
  const id = parseInt(request.params.id, 10);

  if (isNaN(id) || id <= 0) {
    return response.status(400).send("Invalid ID");
  }

  const foundGame = getGameDetailsById(id);

  if (!foundGame) {
    return response.status(404).send("Game not found");
  }

  const recommendedGames = getRecommendationsByGameId(id, 3);

  response.render("game-details", {
    game: foundGame,
    recommendedGames,
  });
});

app.get("/top-rated", (request, response) => {
  const topRatedGames = getTopRatedGames(15);

  response.render("top-rated", {
    games: topRatedGames,
  });
});

app.get("/random", (request, response) => {
  const randomId = selectRandomGameId();

  response.redirect(`/game/${randomId}`);
});

app.get("/hidden-gems", (request, response) => {
  const hiddenGemGames = getHiddenGems();

  response.render("hidden-gems", {
    games: hiddenGemGames,
  });
});

app.get("/genre/:genre", (request, response) => {
  const genre = request.params.genre.trim();
  const numToDisplay = parseInt(request.query.limit, 10) || 9;

  if (!genre) {
    return response.status(400).send("Invalid genre");
  }

  const genreGames = getGamesByGenre(genre, numToDisplay);

  if (genreGames.length === 0) {
    return response.status(404).send("Genre not found");
  }

  response.render("genre", {
    games: genreGames,
  });
});

// REST API routes

app.get("/api/games", (request, response) => {
  const games = VideoGames.map((game) => {
    return {
      title: game.title,
      genre: game.genre,
      releaseYear: game.releaseYear,
      rating: game.averageRating,
    };
  });

  response.json({
    data: games,
  });
});

app.get("/api/games/top-rated", (request, response) => {
  const games = getTopRatedGames(10);

  response.json({
    data: games,
  });
});

app.get("/api/games/genre/:genre", (request, response) => {
  const games = getGamesByGenre(request.params.genre, VideoGames.length);

  if (games.length === 0) {
    return response.status(404).json({
      error: "No games found for this genre",
    });
  }

  response.json({
    data: games,
  });
});

app.get("/api/games/:id/recommendations", (request, response) => {
  const id = parseInt(request.params.id, 10);

  if (isNaN(id) || id <= 0) {
    return response.status(400).json({
      error: "Invalid ID",
    });
  }

  const foundGame = getGameDetailsById(id);

  if (!foundGame) {
    return response.status(404).json({
      error: "Game not found",
    });
  }

  const recommendedGames = getRecommendationsByGameId(id, 3);

  response.json({
    data: recommendedGames,
  });
});

app.get("/api/games/:id", (request, response) => {
  const id = parseInt(request.params.id, 10);

  if (isNaN(id) || id <= 0) {
    return response.status(400).json({
      error: "Invalid ID",
    });
  }

  const foundGame = getGameDetailsById(id);

  if (!foundGame) {
    return response.status(404).json({
      error: "Game not found",
    });
  }

  response.json({
    data: foundGame,
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
