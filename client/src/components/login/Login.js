import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { isAuthenticated, authenticate } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import { Component } from 'react';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        email: '',
        password: '',
        errors: '',
        showPassword: true,
      },
    };
  }

  handleChange = (name) => (event) => {
    const inputs = { ...this.state.input };
    inputs[name] = event.target.value;
    inputs['errors'] = false;
    this.setState({ input: inputs });
  };

  showHidePasssword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  login = (user) => {
    return axios
      .post('/pb/auth/login', user)
      .then((res) => {
        authenticate(res.data, () => {
          const inputs = { ...this.state.input, redirect: true };
          this.setState({ input: inputs });
        });
      })
      .catch((err) => {
        const inputs = { ...this.state.input, errors: err.response.data };
        this.setState({ input: inputs });
      });
  };

  loginUser = (event) => {
    event.preventDefault();
    const { email, password } = this.state.input;
    this.login({ email, password });
  };

  redirectUser = () => {
    if (isAuthenticated()) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  loginLayout = () => {
    const { errors, showPassword } = this.state.input;
    const eye = <FontAwesomeIcon icon={faEye} />;
    const passwordType = this.state.showPassword ? <i>{eye}</i> : <i>{eye}</i>;

    return (
      <section class="login-card">
        <div class="login-content">
          <div class="login-heading">
            <h3>Login to your Account</h3>
            <p>Use your credentials to access your account</p>
          </div>
          <div class="login-form">
            <form class="form-content" noValidate onSubmit={this.loginUser}>
              <div class="form-group">
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={this.handleChange('email')}
                  className={classnames('form-control')}
                  placeholder="Email"
                  required
                />
                <label for="email" class="form-label">
                  Email
                </label>
                {errors.email && (
                  <div
                    className="invalid_feedback"
                    data-error={errors.email}
                  ></div>
                )}
              </div>

              <div class="form-group">
                <input
                  type={this.state.showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={this.handleChange('password')}
                  className={classnames('form-control', {
                    'is-invalid': errors.password,
                  })}
                  required
                />
                {/* <button onClick={() => this.xyz()}>aaaaa</button> */}
                {/* <i onClick={() => this.showHidePasssword()}>{eye}</i> */}
                <label for="password" class="form-label">
                  Password
                </label>
                {errors.password && (
                  <div
                    class="invalid_feedback"
                    data-error={errors.password}
                  ></div>
                )}
                {/* {this.state.showPassword ? <i>{eye}</i> : <i>{eye}</i>} */}
                <i onClick={() => this.showHidePasssword()}>{passwordType}</i>
              </div>
              <input type="submit" value="Login" class="submit-button" />
            </form>
          </div>
          <div class="register-link">
            <p>
              Dont have an account? <Link to="/register">Register Here</Link>
            </p>
          </div>
        </div>
      </section>
    );
  };
  render() {
    return (
      <>
        {this.loginLayout()}
        {this.redirectUser()}
      </>
    );
  }
}

export default Login;
