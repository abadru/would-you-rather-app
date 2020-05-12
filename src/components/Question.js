import * as React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Question = (props) => {
  const { question, users } = props;

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="small"
          src={users[question.author].avatarURL}
        />
        <Card.Header>{users[question.author].name}</Card.Header>
        <Card.Meta>@{users[question.author].id}</Card.Meta>
        <Card.Description>
          Asks <strong>would you rather</strong>
          <br />
          <p>{question.optionOne.text.substring(0, 20)} ...</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui one center aligned buttons">
          <Button basic color="green" as={Link} to={`/question/${question.id}`}>
            View Poll
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}
export default connect(mapStateToProps)(Question);
