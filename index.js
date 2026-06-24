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
  const gameDetails = getGameDetailsById(id);
  response.json(gameDetails);
});

app.get("/top-rated", (request, response) => {
  const topRated = getTopRatedGames(15);
  response.json(topRated);
});

app.get("/random", (request, response) => {
  const getRandom = selectRandomGameId();
  response.json(getRandom);
});

app.get("/hidden-gems", (request, response) => {
  const hiddenGems = getHiddenGems();
  response.json(hiddenGems);
});

app.get("/genre/:genre", (request, response) => {
  const genre = getGamesByGenre(request.params.genre, 5);
  response.json(genre);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
