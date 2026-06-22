const { VideoGames, Genres } = require("./data");

/**
 * Get `x` games by genre
 * @param {string} genre - The genre of the games
 * @param {number} x - The number of games to retrieve
 * @returns {*} - An array of games matching the genre
 */
function getGamesByGenre(genre, x) {
  // Use filter to filter the games by the specified genre
  const videoGameByGenre = VideoGames.filter((game) => game.genre === genre);

  // Display the amount of games specified by the user
  return videoGameByGenre.slice(0, x);
}

/**
 * Get the `x` top-rated games, ordered by rating
 * @param {number} x - The number of top-rated games to retrieve
 * @returns {*} - An array of top-rated games
 */
function getTopRatedGames(x) {
  // First, get rid of the unreleased games that don't have an average rating
  const unratedGamesRemoved = VideoGames.filter(
    (game) => game.averageRating !== null,
  );

  // Then sort by highest rated to lowest rated
  const topRatedGames = unratedGamesRemoved.toSorted(
    (a, b) => b.averageRating - a.averageRating,
  );

  // Return the amount of top rated games specified by the user
  return topRatedGames.slice(0, x);
}

/**
 * Get the details of a game by its ID
 * @param {number} id - The ID of the game
 * @returns {*} - The game object
 */
function getGameDetailsById(id) {
  // Use find to find the game with matching specified id
  const videoGameById = VideoGames.find((game) => game.id === id);

  return videoGameById;
}

/**
 * Select a random game ID
 * @returns {*} - A random game ID
 */
function selectRandomGameId() {
  // Generate a random id
  const randomId = Math.floor(Math.random() * VideoGames.length) + 1;

  return randomId;
}

/**
 * Get "Hidden Gems" - games that are highly rated but not widely reviewed
 * @returns {*} - An array of hidden gem games
 */
function getHiddenGems() {
  // We've defined hidden gems as a game with 1000 reviews or less, with a rating of 9.0 or higher.
  // Filter out unrated games, and keep only those games with 1000 reviews or less with 9.0 or higher rating to match our criteria
  const hiddenGems = VideoGames.filter(
    (game) =>
      game.averageRating !== null &&
      game.averageRating >= 9.0 &&
      game.numberOfReviews <= 1000,
  );

  // Sort by highest rating before displaying
  const hiddenGemsSorted = hiddenGems.toSorted(
    (a, b) => b.averageRating - a.averageRating,
  );

  return hiddenGemsSorted;
}

// Export the functions to be used in other modules
module.exports = {
  getGamesByGenre,
  getTopRatedGames,
  getGameDetailsById,
  selectRandomGameId,
  getHiddenGems,
};

// Tests
// console.log(getGameDetailsById(0));
// console.log(getGamesByGenre("Adventure", 7));
// console.log(getTopRatedGames(12));
// console.log(getHiddenGems());
// console.log(selectRandomGameId());
