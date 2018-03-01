
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/session';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import UserIcon from 'grommet/components/icons/base/User';

class SessionMenu extends Component {

  constructor() {
    super();
    this._onLogout = this._onLogout.bind(this);
  }

  _onLogout(event) {
    event.preventDefault();
    this.props.dispatch(logout());
  }

  render() {
    const { dropAlign, colorIndex, userName } = this.props;
    return (
      <Menu icon={<UserIcon />} dropAlign={dropAlign}
        colorIndex={colorIndex} a11yTitle="Session">
        <Box pad="medium">
          <Heading tag="h3" margin="none">{userName}</Heading>
        </Box>
        <Anchor href="#" onClick={this._onLogout} label="Logout" />
      </Menu>
    );
  }

}

SessionMenu.propTypes = {
  colorIndex: PropTypes.string,
  dropAlign: Menu.propTypes.dropAlign,
  userName: PropTypes.string
};

SessionMenu.defaultProps = {
  direction: 'down'
};

let select = (state) => ({
  userName: state.session.userName
});

export default connect(select)(SessionMenu);
