import React, { Component } from 'react';
import axios from 'axios';

export default class Rankings extends Component {
  constructor() {
    super();
    this.state = {
      RankingsList: [],
    };
  }
  componentWillMount() {
    axios.get('/games').then(({ data }) => {
      const winners = data.reduce((prev, cur) => prev.concat(cur.winner), []);
      const allWinners = winners.reduce((prev, cur) => {
        prev[cur] = prev[cur] + 1 || 1;
        return prev;
      }, {});

      const winnersByName = [];
      Object.entries(allWinners).map(winner =>
        axios.get('/findUserById', {
          params: {
            _id: winner[0],
          },
        }).then(({ data: user }) => {
          const pureWinner = winner.slice();
          if (user.username) {
            pureWinner[2] = user.username.split('@')[0];
          } else {
            pureWinner[2] = '<user deleted>';
          }
          winnersByName.push(pureWinner);
          this.setState({ RankingsList: winnersByName.sort((a, b) => b[1] - a[1]) });
        }),
      );
    });
  }

  render() {
    const RankingsList = this.state.RankingsList.map((e, i) => (
      <li key={e[0]} className="RankList">
        <p>
          <b> {i + 1}. </b>
          <span> {e[2]} Wins: {e[1]}</span>
        </p>
      </li>
    ));
    return (
      <div className="DashBoardThird">
        <div className="ListTitle">
          <h1> General Rankings </h1>
        </div>
        <ul className="DashBoardList">
          {RankingsList}
        </ul>
      </div>
    );
  }
}
