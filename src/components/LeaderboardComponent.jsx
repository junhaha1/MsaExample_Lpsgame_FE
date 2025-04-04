import React, { useEffect, useState } from 'react';
import GameApiClient from '../services/GameApiClient';
import {Table} from 'react-bootstrap';

function LeaderboardComponent(props) {
    const [topTenList, setTopTenList] = useState([]);

    let getFirstTenUsers = () => {
        GameApiClient.leaderBoard().then(res => {
            if (res.ok) {
                let boardList = [];
                res.json().then(data => {
                    data.forEach(item => {
                        boardList.push(item);
                    });
                    setTopTenList(boardList);
                })
            }
        })
    }

    useEffect(() => {
        getFirstTenUsers();
    }, [props.flag]);

    return (
      <div>
        <h2>
          LeaderBoard
        </h2>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>사용자</th>
                <th>점수</th>
            </tr>
            </thead>
            <tbody>
            {topTenList.map(a =>
                <tr key={a.userId}>
                    <td>{a.alias}</td>
                    <td>{a.totalScore}</td>
                </tr>
            )}
            </tbody>
        </Table>
        </div>
    );
}

export default LeaderboardComponent;