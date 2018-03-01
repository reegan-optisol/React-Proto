
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/session';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import LoginForm from 'grommet/components/LoginForm';
import Footer from 'grommet/components/Footer';
import Logo from './Logo';
import Promo from './Promo';

class Login extends Component {

  constructor () {
    super();
    this._onSubmit = this._onSubmit.bind(this);

    this.state = { busy: false };
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.busy) {
      this.setState({ busy: false });
    }
  }

  _onSubmit (fields) {
    this.setState({ busy: true });
    this.props.dispatch(login(fields.username, fields.password));
  }

  render () {
    const { session } = this.props;

    var loginError = session.error;
    var errors = [];
    if (loginError) {
      var message;
      var resolution;
      message = loginError.message;
      errors.push(message);
      if (loginError.resolution) {
        resolution = loginError.resolution;
        errors.push(resolution);
      }
    }

    return (
      <Split flex="left" separator={true}>
        <Promo />
        <Sidebar justify="between" align="center" pad="none" size="large">
          <span></span>
          <LoginForm align="start"
            logo={<Logo size="large" busy={this.state.busy} />}
            title={this.props.productName}
            onSubmit={this.state.busy ? null : this._onSubmit}
            errors={errors}
            usernameType="text" />          
        </Sidebar>
      </Split>
    );
  }
}

Login.propTypes = {
  session: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string,
      resolution: PropTypes.string
    })
  })
};

let select = (state) => ({
  productName: state.settings.productName.short,
  session: state.session
});

export default connect(select)(Login);
