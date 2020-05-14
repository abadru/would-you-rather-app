import React from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout, logout } from "../actions/login";

const NavBar = (props) => {
  const { userId, dispatch, users } = props;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>Would You Rather</Menu.Item>
        <Menu.Item name="Home" as={NavLink} to="/home" />
        <Menu.Item>
          <Button as={NavLink} to="/add" positive content="New Question" />
        </Menu.Item>
        <Menu.Item name="Leaderboard" as={NavLink} to="/leaderboard" />

        <Menu.Item position="right">
          <Image
            avatar
            spaced="right"
            src={(users && users[userId].avatarURL) || "/assets/user.png"}
          />
          <Dropdown pointing="top left" text={users[userId].name}>
            <Dropdown.Menu>
              <Dropdown.Item
                text="Logout"
                icon="power"
                onClick={() => {
                  handleLogout(dispatch, () => {
                    props.history.push("/");
                  });
                }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

function mapStateToProps({ login, users }) {
  return {
    userId: login.userId,
    users,
  };
}

export default withRouter(connect(mapStateToProps)(NavBar));
