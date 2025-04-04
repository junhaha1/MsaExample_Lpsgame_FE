import React, { useState, useEffect } from "react";
import GameApiClient from "../services/GameApiClient";
import {Table, Stack, Badge} from 'react-bootstrap';

const StatsComponent = (props) => {
  const [userId, setUserID] = useState("");
  const [score, setScore] = useState("");
  const [badges, setBadges] = useState([]);

  const getBadgeStyle = (b) => {
    switch(b){
      case "BRONZE_RPS":
        return {
          backgroundColor: "#B87333", 
          color: "white", 
          border: "2px solid #8B4513",};
      case "SILVER_RPS":
        return {
          backgroundColor: "#B0B0B0", 
          color: "black",
          border: "2px solid #808080"
        };
      case "GOLD_RPS":
        return {
          backgroundColor: "#FFEB99", 
          color: "black",
          border: "2px solid #DAA520",
        };
      case "FIRST_CHALLENGE":
        return {
          backgroundColor: "#87CEEB", 
          color: "black",
          border: "2px solid #4682B4",
        };
      default:
        return { 
          backgroundColor: "#e0e0e0", 
          color: "black",
          border: "2px solid #bbb",
        };
    }
  }

  let refreshStats = (id) => {
    console.log(id);
    GameApiClient.getState(id).then((res) => {
      if (res.ok) {
        res.json().then((json) => {
          setUserID(json.userId);
          setScore(json.score);
          setBadges(json.badges);
        });
      } else {
        console.log("Error mapping user id");
        setScore("serverError");
      }
    });
  };

  useEffect(() => {
    refreshStats(props.id);
  }, [props.flag]);

  if (score == "serverError") {
    return (
      <div>
        We're sorry, but we can't display game statistics at this moment.
      </div>
    );
  }

  return (
    <div>
      <h3>통계</h3>
      <Table>
        <tbody>
          <tr>
            <td>사용자 ID:</td>
            <td>{userId}</td>
          </tr>
          <tr>
            <td>점수:</td>
            <td>{score}</td>
          </tr>
          <tr>
            <td>배지:</td>
            <td>
              <Stack direction="horizontal" gap={2}>
                {badges.map((b) => (
                  <Badge bg="" key={b} style={getBadgeStyle(b)}>{b}</Badge>
                ))}
              </Stack>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default StatsComponent;
