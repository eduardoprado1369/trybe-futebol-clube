import Matches from '../models/Match';

async function calculateHomeTeamPoints(matches: Matches[]) {
  let points = 0;
  matches.forEach((i) => {
    if (i.homeTeamGoals > i.awayTeamGoals) {
      points += 3;
      return points;
    }
    if (i.homeTeamGoals === i.awayTeamGoals) {
      points += 1;
      return points;
    }
  });
  return points;
}

async function calculateAwayTeamPoints(matches: Matches[]) {
  let points = 0;
  matches.forEach((i) => {
    if (i.awayTeamGoals > i.homeTeamGoals) {
      points += 3;
      return points;
    }
    if (i.homeTeamGoals === i.awayTeamGoals) {
      points += 1;
      return points;
    }
  });
  return points;
}

export default async function calculatePoints(id: number) {
  const allHomeTeamMatches = await Matches.findAll({ where: { homeTeam: id } });
  const finishedHomeTeamMatches = allHomeTeamMatches.filter((i) => i.inProgress === false);
  const homeTeamPoints = await calculateHomeTeamPoints(finishedHomeTeamMatches);
  const allAwayTeamMatches = await Matches.findAll({ where: { awayTeam: id } });
  const finishedAwayTeamMatches = allAwayTeamMatches.filter((i) => i.inProgress === false);
  const awayTeamPoints = await calculateAwayTeamPoints(finishedAwayTeamMatches);
  const points = homeTeamPoints + awayTeamPoints;
  return points;
}
