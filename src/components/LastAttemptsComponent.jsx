import React from "react";
import {Table} from 'react-bootstrap';

function LastAttemptsComponent(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>답안 ID</th>
          <th>사용자</th>
          <th>컴퓨터</th>
          <th>결과</th>
        </tr>
      </thead>
      <tbody>
        {props.lastAttempts.map((a) => (
          <tr key={a.id} style={{color: a.outcome === "승" ? "green" 
                                      : a.outcome === "패" ? "red" 
                                      : "black",
          }}>
            <td>{a.id}</td>
            <td>{a.user}</td>
            <td>{a.opponent}</td>
            <td>{a.outcome}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default LastAttemptsComponent;
