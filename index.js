const express = require("express");
const path = require("path");
const { VideoGames, Genres } = require("./utils/data");
const {
  getGameDetailsById,
  getGamesByGenre,
  getTopRatedGames,
  selectRandomGameId,
  getHiddenGems,
} = require("./utils/gameUtils");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render("index");
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
  const gameGenre = foundGame.genre;
  const sameGenreGames = VideoGames.filter(
    (game) => gameGenre === game.genre && game.id !== foundGame.id,
  );

  const recommendedGames = sameGenreGames.slice(0, 3);

  response.render("game-details", {
    game: foundGame,
    recommendedGames: recommendedGames,
  });
});

app.get("/top-rated", (request, response) => {
  const topRated = getTopRatedGames();

  response.render("top-rated", { topRated: topRated });
});

app.get("/random", (request, response) => {
  const getRandomID = selectRandomGameId();
  const getRandomGame = getGameDetailsById(getRandomID);

  response.render("random", { randomGame: getRandomGame });
});

app.get("/hidden-gems", (request, response) => {
  const hiddenGems = getHiddenGems();

  response.render("hidden-gems", { hiddenGems: hiddenGems });
});

app.get("/genre/:genre", (request, response) => {
  const foundGenre = getGamesByGenre(request.params.genre, 5);
  if (foundGenre.length === 0) {
    return response.status(404).send("Genre not found");
  }

  response.render("genre", { genre: foundGenre });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
