import Matches from '../models/Match';

export default async function calculateTotalDraws(id: number) {
  const allHomeTeamMatches = await Matches.findAll({ where: { homeTeam: id } });
  const finishedHomeTeamMatches = allHomeTeamMatches.filter((i) => i.inProgress === false);
  const homeTeamDraws = finishedHomeTeamMatches
    .filter((i) => i.homeTeamGoals === i.awayTeamGoals).length;
  const allAwayTeamMatches = await Matches.findAll({ where: { awayTeam: id } });
  const finishedAwayTeamMatches = allAwayTeamMatches.filter((i) => i.inProgress === false);
  const awayTeamDraws = finishedAwayTeamMatches
    .filter((i) => i.homeTeamGoals === i.awayTeamGoals).length;
  const numberOfDraws = homeTeamDraws + awayTeamDraws;
  return numberOfDraws;
}
