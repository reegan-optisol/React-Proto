
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Anchor from 'grommet/components/Anchor';
import history from '../RouteHistory';

class NavAnchor extends Component {

  constructor () {
    super();
    this._onClick = this._onClick.bind(this);
  }

  _onClick (event) {
    event.preventDefault();
    history.push(this.props.path);
  }

  render () {
    const { path, route: {pathname} } = this.props;
    let className = this.props.className || '';
    if (path === pathname.slice(0, path.length)) {
      className += ' active';
    }
    let href = history.makeHref(path);
    return (
      <Anchor {...this.props} className={className} href={href}
        onClick={this._onClick} />
    );
  }
};

NavAnchor.propTypes = {
  path: PropTypes.string.isRequired
};

let select = (state, props) => {
  return {
    route: state.route
  };
};

export default connect(select)(NavAnchor);
