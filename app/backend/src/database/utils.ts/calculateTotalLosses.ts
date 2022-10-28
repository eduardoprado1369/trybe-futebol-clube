import Matches from '../models/Match';

export default async function calculateTotalLosses(id: number) {
  const allHomeTeamMatches = await Matches.findAll({ where: { homeTeam: id } });
  const finishedHomeTeamMatches = allHomeTeamMatches.filter((i) => i.inProgress === false);
  const homeTeamLosses = finishedHomeTeamMatches
    .filter((i) => i.homeTeamGoals < i.awayTeamGoals).length;
  const allAwayTeamMatches = await Matches.findAll({ where: { awayTeam: id } });
  const finishedAwayTeamMatches = allAwayTeamMatches.filter((i) => i.inProgress === false);
  const awayTeamLosses = finishedAwayTeamMatches
    .filter((i) => i.homeTeamGoals > i.awayTeamGoals).length;
  const numberOfLosses = homeTeamLosses + awayTeamLosses;
  return numberOfLosses;
}
