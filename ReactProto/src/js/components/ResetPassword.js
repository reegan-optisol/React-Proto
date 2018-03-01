

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/session';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Promo from './Promo';

class ResetPassword extends Component {

  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidUpdate() {
    this.refs.password.focus();
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.dispatch(resetPassword(this.props.session.userName,
      this.refs.password.value.trim()));
  }

  _renderReset() {
    return (
      <Form onClick={this._onSubmit}>
        <Header>Reset Password</Header>
          <fieldset>
            <p>You must reset the password from the initial one.</p>
            <FormField htmlFor="password" label="Password">
              <input id="password" ref="password" type="password" />
            </FormField>
          </fieldset>
        <Footer>
          <Button
            primary={true} strong={true} type="submit" label="OK"
            onClick={this._onSubmit} />
        </Footer>
      </Form>
    );
  }

  render() {
    return (
      <Split flex="left" separator={true}>
        <Promo />
        <Sidebar justify="center" align="center" pad="medium" size="large">
          <Form>
            <Header>Reset Password</Header>
              <fieldset>
                <p>You must reset the password from the initial one.</p>
                <FormField htmlFor="password" label="Password">
                  <input id="password" ref="password" type="password" />
                </FormField>
              </fieldset>
            <Footer>
              <Button
                primary={true} strong={true} type="submit" label="OK"
                onClick={this._onSubmit} />
            </Footer>
          </Form>
        </Sidebar>
      </Split>
    );
  }
}

let select = (state) => ({session: state.session});

export default connect(select)(ResetPassword);
