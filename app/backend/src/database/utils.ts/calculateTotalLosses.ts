import Matches from '../models/Match';

export default async function calculateTotalLosses(id: number, type: string) {
  const allHomeTeamMatches = await Matches.findAll({ where: { homeTeam: id } });
  const finishedHomeTeamMatches = allHomeTeamMatches.filter((i) => i.inProgress === false);
  const homeTeamLosses = finishedHomeTeamMatches
    .filter((i) => i.homeTeamGoals < i.awayTeamGoals).length;
  const allAwayTeamMatches = await Matches.findAll({ where: { awayTeam: id } });
  const finishedAwayTeamMatches = allAwayTeamMatches.filter((i) => i.inProgress === false);
  const awayTeamLosses = finishedAwayTeamMatches
    .filter((i) => i.homeTeamGoals > i.awayTeamGoals).length;
  if (type === 'home') return homeTeamLosses;
  if (type === 'away') return awayTeamLosses;
  return homeTeamLosses + awayTeamLosses;
}
