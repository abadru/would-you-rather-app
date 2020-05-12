import React from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/login";

const NavBar = (props) => {
  const { user, dispatch } = props;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>Would You Rather</Menu.Item>
        <Menu.Item name="Home" as={NavLink} to="/home" />
        <Menu.Item>
          <Button as={NavLink} to="/new" positive content="New Question" />
        </Menu.Item>
        <Menu.Item name="Leaderboard" as={NavLink} to="/leaderboard" />

        <Menu.Item position="right">
          <Image avatar spaced="right" src={"/assets/user.png"} />
          <Dropdown pointing="top left" text={user}>
            <Dropdown.Menu>
              <Dropdown.Item
                text="Logout"
                icon="power"
                onClick={() => {
                  dispatch(logout());
                  props.history.push("/");
                }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

function mapStateToProps({ login }) {
  return {
    user: login.userId,
  };
}

export default withRouter(connect(mapStateToProps)(NavBar));
