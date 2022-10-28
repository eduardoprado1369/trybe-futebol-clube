import Matches from '../models/Match';

export default async function calculateGoalsOwn(id: number) {
  const allHomeTeamMatches = await Matches.findAll({ where: { homeTeam: id } });
  const finishedHomeTeamMatches = allHomeTeamMatches.filter((i) => i.inProgress === false);
  const homeTeamGoals = finishedHomeTeamMatches
    .reduce((acc, i) => acc + i.awayTeamGoals, 0);
  const allAwayTeamMatches = await Matches.findAll({ where: { awayTeam: id } });
  const finishedAwayTeamMatches = allAwayTeamMatches.filter((i) => i.inProgress === false);
  const awayTeamGoals = finishedAwayTeamMatches
    .reduce((acc, i) => acc + i.homeTeamGoals, 0);
  const numberOfGoalsOwn = homeTeamGoals + awayTeamGoals;
  return numberOfGoalsOwn;
}
