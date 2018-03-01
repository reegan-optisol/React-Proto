
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { navActivate } from '../actions/nav';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Logo from './Logo';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import CloseIcon from 'grommet/components/icons/base/Close';
import SessionMenu from './SessionMenu';
import NavAnchor from './NavAnchor';

class NavSidebar extends Component {

  constructor() {
    super();
    this._onClose = this._onClose.bind(this);
  }

  _onClose() {
    this.props.dispatch(navActivate(false));
  }

  render() {
    const { nav: {items}, instanceName } = this.props;
    var links = items.map((page) => {
      return (
        <NavAnchor key={page.label} path={page.path} label={page.label} />
      );
    }, this);

    return (
      <Sidebar colorIndex="neutral-1" fixed={true}>
        <Header size="large" justify="between" pad={{horizontal: 'medium'}}>
          <Title onClick={this._onClose} a11yTitle="Close Menu">
            <Logo inverse={true} />
            {instanceName}
          </Title>
          <Button icon={<CloseIcon />} onClick={this._onClose}
            a11yTitle="Close Menu" />
        </Header>
        <Menu primary={true}>
          {links}
        </Menu>
        <Footer pad={{horizontal: 'medium', vertical: 'small'}}>
          <SessionMenu dropAlign={{bottom: 'bottom'}} colorIndex="neutral-1-a" />
        </Footer>
      </Sidebar>
    );
  }

}

NavSidebar.propTypes = {
  nav: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      label: PropTypes.string
    }))
  }),
  onClose: PropTypes.func,
  pathname: PropTypes.string, // unused, see note below
  productName: PropTypes.string
};

// We don't use the pathname explicitly, but we rely on this connection to
// trigger resetting the active Link state.
let select = (state) => ({
  instanceName: state.settings.settings.name,
  nav: state.nav,
  pathname: state.route.pathname
});

export default connect(select)(NavSidebar);
