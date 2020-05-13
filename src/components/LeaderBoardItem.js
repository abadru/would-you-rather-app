import * as React from "react";
import { Card, Divider, Image } from "semantic-ui-react";
import { Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const LeaderBoardItem = (props) => {
  const { user } = props;

  const asked = user.questions.length;
  const answered = Object.keys(user.answers).length;

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="medium"
          src={user.avatarURL || "/assets/user.png"}
        />
        <Card.Header>{user.name}</Card.Header>
        <Card.Description>
          <p>
            Asked Questions = <strong>{asked}</strong>
          </p>
          <p>
            Answered Questions =<strong>{answered}</strong>
          </p>
        </Card.Description>
      </Card.Content>
      <Divider vertical></Divider>
      <Card.Content>
        <Button variant="primary">
          SCORE = <Badge variant="light">{asked + answered}</Badge>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default LeaderBoardItem;
