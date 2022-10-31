import ILeaderboard from '../interfaces/Leaderboard';

export default function orderLeaderboard(leaderboard: ILeaderboard[]) {
  leaderboard.sort((a, b) => (
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
     || b.goalsBalance - a.goalsBalance
     || b.goalsFavor - a.goalsFavor
     || a.goalsOwn - b.goalsOwn
  ));
  return leaderboard;
}
