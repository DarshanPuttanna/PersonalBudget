import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { authenticate } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: '',
        redirect: false,
        showPassword: true,
      },
    };
  }

  onFieldEdit = (name) => (event) => {
    const inputs = { ...this.state.input };
    inputs[name] = event.target.value;
    inputs['errors'] = false;

    this.setState({ input: inputs });
  };

  submitData = (event) => {
    event.preventDefault();
    const { name, email, password, password2 } = this.state.input;
    this.newRegistration({ name, email, password, password2 });
  };

  newRegistration = (user) => {
    return axios
      .post('/pb/auth/register', user)
      .then((res) => {
        console.log('res ', res);
        authenticate(res.data, () => {
          const inputs = { ...this.state.input, redirect: true };
          this.setState({ input: inputs });
        });
      })
      .catch((err) => {
        console.log('in error catch');
        const inputs = { ...this.state.input, errors: err.response.data };
        this.setState({ input: inputs });
      });
  };

  redirectUser = () => {
    const { redirect } = this.state.input;
    if (redirect) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  showHidePasssword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  registerLayout = () => {
    const { errors, showPassword } = this.state.input;
    const eye = <FontAwesomeIcon icon={faEye} />;
    const passwordType = this.state.showPassword ? <i>{eye}</i> : <i>{eye}</i>;
    return (
      <section class="register-card">
        <div className="register-content">
          <div className="register-logo">
            <img src="./assets/budget.png" alt="" />
          </div>
          <div className="register-heading">
            <h2>Register Here</h2>
          </div>
          <div className="register-form">
            <form
              className="form-content"
              noValidate
              onSubmit={this.submitData}
            >
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={this.onFieldEdit('name')}
                  className={classnames('form-control', {
                    'is-invalid': errors.name,
                  })}
                  placeholder="Name"
                  required
                />
                <label for="name" className="form-label">
                  Name
                </label>
                {errors.name && (
                  <div
                    className="invalid_register"
                    data-error={errors.name}
                  ></div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={this.onFieldEdit('email')}
                  className={classnames('form-control', {
                    'is-invalid': errors.email,
                  })}
                  placeholder="Email"
                  required
                />
                <label for="email" className="form-label">
                  Email-id
                </label>
                {errors.email && (
                  <div
                    className="invalid_register"
                    data-error={errors.email}
                  ></div>
                )}
              </div>

              <div className="form-group">
                <input
                  type={this.state.showPassword ? 'text' : 'password'}
                  onChange={this.onFieldEdit('password')}
                  className={classnames('form-control', {
                    'is-invalid': errors.password,
                  })}
                  placeholder="Password"
                  name="password"
                  id="password"
                  required
                />
                <label for="password" className="form-label">
                  Password
                </label>
                {errors.password && (
                  <div
                    className="invalid_register"
                    data-error={errors.password}
                  ></div>
                )}
                <i onClick={() => this.showHidePasssword()}>{passwordType}</i>
              </div>
              <div class="form-group">
                <input
                  type={this.state.showPassword ? 'text' : 'password'}
                  onChange={this.onFieldEdit('password2')}
                  className={classnames('form-control', {
                    'is-invalid': errors.password2,
                  })}
                  placeholder="Password2"
                  name="password2"
                  id="password2"
                  required
                />
                <label for="password2" className="form-label">
                  Re-type Password
                </label>
                {errors.password2 && (
                  <div
                    className="invalid_register"
                    data-error={errors.password2}
                  ></div>
                )}
                <i onClick={() => this.showHidePasssword()}>{passwordType}</i>
              </div>
              <input type="submit" value="Register" className="submit-button" />
            </form>
          </div>
          <div className="login-link">
            <p>
              Already Registered?{' '}
              <Link to="/login" className="loginText">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    );
  };

  render() {
    return (
      <>
        {this.registerLayout()}
        {this.redirectUser()}
      </>
    );
  }
}
