import React, { Component, Fragment } from "react";
import { Container, Segment, Header, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { openModal } from "../actions/modal";
import LoginPage from "./LoginPage";
import { handleGetUsers } from "../actions/users";

class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetUsers());
  }

  render() {
    const { dispatch } = this.props;
    const doOpenModal = (content) => {
      dispatch(openModal(content));
    };
    return (
      <Segment inverted textAlign="center" vertical className="masthead">
        <Container text>
          <Header as="h1" inverted>
            Welcome To Would You Rather
          </Header>

          <Fragment>
            <Button
              size="huge"
              inverted
              onClick={() => doOpenModal(<LoginPage />)}
            >
              Login
            </Button>
          </Fragment>
        </Container>
      </Segment>
    );
  }
}

export default connect()(HomePage);
