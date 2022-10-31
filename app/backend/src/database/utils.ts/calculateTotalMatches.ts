import Matches from '../models/Match';

export default async function calculateTotalMatches(id: number, type: string) {
  const allHomeTeamMatches = await Matches.findAll({ where: { homeTeam: id } });
  const finishedHomeTeamMatches = allHomeTeamMatches.filter((i) => i.inProgress === false);
  const homeTeamMatches = finishedHomeTeamMatches.length;
  const allAwayTeamMatches = await Matches.findAll({ where: { awayTeam: id } });
  const finishedAwayTeamMatches = allAwayTeamMatches.filter((i) => i.inProgress === false);
  const awayTeamMatches = finishedAwayTeamMatches.length;
  if (type === 'home') return homeTeamMatches;
  if (type === 'away') return awayTeamMatches;
  return homeTeamMatches + awayTeamMatches;
}
