import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - we've looked everywhere but couldn't find this. (404)
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/" primary>
          Login to Would You Rather Home Page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;