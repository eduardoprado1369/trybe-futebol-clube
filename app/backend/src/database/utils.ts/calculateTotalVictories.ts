import Matches from '../models/Match';

export default async function calculateTotalVictories(id: number, type: string) {
  const allHomeTeamMatches = await Matches.findAll({ where: { homeTeam: id } });
  const finishedHomeTeamMatches = allHomeTeamMatches.filter((i) => i.inProgress === false);
  const homeTeamVictories = finishedHomeTeamMatches
    .filter((i) => i.homeTeamGoals > i.awayTeamGoals).length;
  const allAwayTeamMatches = await Matches.findAll({ where: { awayTeam: id } });
  const finishedAwayTeamMatches = allAwayTeamMatches.filter((i) => i.inProgress === false);
  const awayTeamVictories = finishedAwayTeamMatches
    .filter((i) => i.homeTeamGoals < i.awayTeamGoals).length;
  if (type === 'home') return homeTeamVictories;
  if (type === 'away') return awayTeamVictories;
  return homeTeamVictories + awayTeamVictories;
}
