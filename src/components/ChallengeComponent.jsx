import React, { use, useEffect, useState } from "react";
import RpsApiClient from "../services/RpsApiClient";
import LastAttemptsComponent from "./LastAttemptsComponent";
import StatsComponent from "./StatsComponent";
import LeaderboardComponent from "./LeaderBoardComponent";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

const ChallengeComponent = () => {
  const [userChoice, setUserChoice] = useState("");
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [lastAttempts, setLastAttempts] = useState([]);
  const [userId, setUserId] = useState("");
  const [actionFlag, setActionFlag] = useState(1);

  const[resultStyle, setResultStyle] = useState({});

  let handleChangeName = (event) => {
    setUser(event.target.value);
  };

  let updateMessage = (s, m) => {
    setResultStyle({
      backgroundColor: s,
    });
    setMessage(m);
  };

  let getImageSource = (index) => {
    let img_src = "";
    switch (index) {
      case "0":
        img_src = "/image/rps.png";
        break;
      case "가위":
        img_src = "/image/scissors.png";
        break;
      case "바위":
        img_src = "/image/rock.png";
        break;
      case "보":
        img_src = "/image/paper.png";
        break;
      default:
        img_src = "/image/rps.png";
    }
    return img_src;
  };

  let handleChangeImage = () => {
    let choice = document.querySelector("#rps");
    let user_image = document.querySelector("#userImage");
    user_image.src = getImageSource(choice.options[choice.selectedIndex].value);
    setUserChoice(choice.options[choice.selectedIndex].value);
  };

  let handleChangeOpponentImage = (oppChoice) => {
    let oppo_image = document.querySelector("#opponentImage");
    oppo_image.src = getImageSource(oppChoice);
  };

  let handleSubmitResult = (event) => {
    RpsApiClient.sendChoice(user, userChoice).then((res) => {
      if (res.ok) {
        res.json().then((json) => {
          setUserId(json.userId);
          setActionFlag(actionFlag * -1); //플래그로 사용하기 위해 부호를 계속 바꾸어 줌.

          if (json.outcome === "승") {
            updateMessage("#D6ECFF", "이겼습니다!");
          } else if (json.outcome === "패") {
            updateMessage("#F8D7DA", "졌습니다! 그래도 포기하지 마세요!");
          } else {
            updateMessage("#F0F0F0", "비겼습니다! 다시 한 번 도전해 보세요!");
          }
          handleChangeOpponentImage(json.opponent);
          updateLastAttempts(user);
        });
      } else {
        updateMessage("Error: server error or not available");
      }
    });
  };

  let updateLastAttempts = (userAlias) => {
    RpsApiClient.getAttempts(userAlias).then((res) => {
      if (res.ok) {
        let attempts = [];
        res.json().then((data) => {
          data.forEach((item) => {
            attempts.push(item);
          });
          setLastAttempts(attempts);
        });
      }
    });
  };

  useEffect(() => {
    //처음 렌더링될 때 호출되는 훅 => 첫번째 화면 초기화
    let choice = document.querySelector("#rps");
    let user = document.querySelector("#user");
    choice.selectedIndex = "0";
    user.value = "";
    let user_image = document.querySelector("#userImage");
    user_image.src = "/image/rps.png";
    let computer_choice = document.querySelector("#opponentImage");
    computer_choice.src = "/image/rps.png";
  }, []);

  return (
    <Container
    style={{
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "2rem",
      height: "90vh",           // 화면의 90%만 차지
      overflowY: "auto",        // 넘칠 경우만 스크롤
    }}
    >
      <Row>
        <Col md={6}>
          <div>
            <h1>가위 바위 보 게임</h1>
            <h2>오늘의 도전</h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <label htmlFor="rps">당신의 선택: </label>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <img
                    id="userImage"
                    src=""
                    width="55"
                    height="65"
                    alt="사용자선택"
                  />
                  <Form.Select
                    aria-label="Default select example"
                    name="rps_choice"
                    id="rps"
                    onChange={handleChangeImage}
                  >
                    <option value="0">선택</option>
                    <option value="가위">가위</option>
                    <option value="바위">바위</option>
                    <option value="보">보</option>
                  </Form.Select>
                </div>
                <label htmlFor="opponentImage">컴퓨터 선택: </label>
                <img
                  id="opponentImage"
                  src=""
                  width="55"
                  height="65"
                  alt="컴퓨터선택"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <label>닉네임: </label>
                <div style={{ flex: 1 }}>
                  <InputGroup className="w-50">
                    <Form.Control
                      type="text"
                      name="user-alias"
                      id="user"
                      value={user}
                      onChange={handleChangeName}
                    />
                    <Button onClick={handleSubmitResult}>확인</Button>
                  </InputGroup>
                </div>
              </div>
            <hr />
            <div style={resultStyle}>
              <h3>
                <span>결과</span>
              </h3>
              <span >{message}</span>
            </div>
            <hr/>
            <StatsComponent id={userId} flag={actionFlag} />
          </div>
        </Col>
        <Col md={6}>
          <div>
            <LeaderboardComponent flag={actionFlag} />
            <hr />
            <h2>최근 답안</h2>
            {lastAttempts.length > 0 && (
              <LastAttemptsComponent lastAttempts={lastAttempts} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChallengeComponent;
