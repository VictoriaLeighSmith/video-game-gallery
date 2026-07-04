const { VideoGames } = require("../../utils/data");
const {
  getGamesByGenre,
  getTopRatedGames,
  getGameDetailsById,
  selectRandomGameId,
  getHiddenGems,
  getRecommendationsByGameId,
} = require("../../utils/gameUtils");

describe("Game Utility Functions", () => {
  // ---------- getGamesByGenre Tests ----------
  describe("getGamesByGenre", () => {
    test("Make sure that only games of the specified genre are returned", () => {
      const games = getGamesByGenre("Role-Playing Game", 10);
      const allMatchGenre = games.every(
        (game) => game.genre === "Role-Playing Game",
      );

      expect(allMatchGenre).toBe(true);
    });

    test("Make sure that exact number of games returned of genre if enough exist", () => {
      const games = getGamesByGenre("Action", 7);

      expect(games).toHaveLength(7);
    });

    test("Make sure that less than number of games specified are returned if not enough exist", () => {
      const games = getGamesByGenre("Adventure", 100);

      expect(games.length).toBeLessThan(100);
    });

    test("Make sure an empty array is returned if the specified genre does not exist", () => {
      const games = getGamesByGenre("Cool Games", 15);

      expect(games).toHaveLength(0);
    });

    test("Make sure that an empty array is returned if the user has specified a length of 0", () => {
      const games = getGamesByGenre("Puzzle", 0);

      expect(games).toHaveLength(0);
    });

    test("Make sure genre matching isn't case sensitive", () => {
      const games = getGamesByGenre("adventure", 5);
      const adventureGamesCheck = games.every(
        (game) => game.genre === "Adventure",
      );

      expect(games.length).toBeGreaterThan(0);
      expect(adventureGamesCheck).toBe(true);
    });
  });

  // ---------- getTopRatedGames Tests ----------
  describe("getTopRatedGames", () => {
    test("Make sure that exact number of specified games is returned", () => {
      const games = getTopRatedGames(12);

      expect(games).toHaveLength(12);
    });

    test("Test that games have been sorted from highest to lowest rating", () => {
      const games = getTopRatedGames(7);
      const gamesSorted = games.every((game, index, array) => {
        return (
          index === array.length - 1 ||
          game.averageRating >= array[index + 1].averageRating
        );
      });

      expect(gamesSorted).toBe(true);
    });

    test("Test that no unrated games are returned", () => {
      const games = getTopRatedGames(15);
      const nullCheck = games.every((game) => game.averageRating !== null);

      expect(nullCheck).toBe(true);
    });

    test("Test that an empty array is returned when user has specified length as 0", () => {
      const games = getTopRatedGames(0);

      expect(games).toHaveLength(0);
    });
  });

  // ---------- getGameDetailsById Tests ----------
  describe("getGameDetailsById", () => {
    test("Test that correct game is returned with matching id", () => {
      const game = getGameDetailsById(1);

      expect(game.id).toBe(1);
      expect(game.title).toBe("The Legend of Zelda: Breath of the Wild");
    });

    test("Test that undefined is returned when an invalid id is provided", () => {
      const game = getGameDetailsById(99);

      expect(game).toBe(undefined);
    });

    test("Test that undefined is returned when an id of zero is provided", () => {
      const game = getGameDetailsById(0);

      expect(game).toBe(undefined);
    });
  });

  // ---------- selectRandomGameId Tests ----------
  describe("selectRandomGameId", () => {
    test("Test that an integer is returned", () => {
      const gameId = selectRandomGameId();

      expect(Number.isInteger(gameId)).toBe(true);
    });

    test("Test that a valid id between 1 and VideoGames.length is returned", () => {
      const gameId = selectRandomGameId();

      expect(gameId).toBeLessThanOrEqual(VideoGames.length);
      expect(gameId).toBeGreaterThanOrEqual(1);
    });
  });

  // ---------- getHiddenGems Tests ----------
  describe("getHiddenGems", () => {
    test("Test that only games with an average rating of 9.0 and higher are returned", () => {
      const games = getHiddenGems();
      const nineOrHigher = games.every((game) => game.averageRating >= 9);

      expect(nineOrHigher).toBe(true);
    });

    test("Test that only games with 1000 reviews or less are returned", () => {
      const games = getHiddenGems();
      const thousandOrLess = games.every(
        (game) => game.numberOfReviews <= 1000,
      );

      expect(thousandOrLess).toBe(true);
    });

    test("Test that no unrated games are returned", () => {
      const games = getHiddenGems();
      const nullCheck = games.every((game) => game.averageRating !== null);

      expect(nullCheck).toBe(true);
    });

    test("Test that games returned are sorted highest to lowest", () => {
      const games = getHiddenGems();
      const gamesSorted = games.every((game, index, array) => {
        return (
          index === array.length - 1 ||
          game.averageRating >= array[index + 1].averageRating
        );
      });

      expect(gamesSorted).toBe(true);
    });
  });

  // ---------- getRecommendationsByGameId Tests ----------
  describe("getRecommendationsByGameId", () => {
    test("Test that the original game id is not included in the recommendations", () => {
      const originalId = 2;
      const games = getRecommendationsByGameId(originalId, 3);
      const includesOriginalGame = games.some((game) => game.id === originalId);

      expect(includesOriginalGame).toBe(false);
    });

    test("Test that recommended games match the same genre as the original", () => {
      const games = getRecommendationsByGameId(1, 3);
      const allMatchGenre = games.every((game) => game.genre === "Adventure");

      expect(allMatchGenre).toBe(true);
    });

    test("Test that 3 games are returned by default", () => {
      const recommendedGames = getRecommendationsByGameId(4);
      const recommendedGamesLength = recommendedGames.length;

      expect(recommendedGamesLength).toBe(3);
    });

    test("Test that an invalid id returns null", () => {
      const invalidId = -1;
      const games = getRecommendationsByGameId(invalidId, 3);

      expect(games).toBe(null);
    });
  });
});
