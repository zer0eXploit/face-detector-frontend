import React from "react";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }
  onNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  };

  onEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  };

  onPasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  };

  onSubmitClick = () => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    if (data.name && data.email && data.password) {
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            this.props.onRouteChange("home");
            this.props.updateUser(data);
          } else {
            alert(data);
            this.props.onRouteChange("register");
          }
        })
        .catch(console.log);
    } else {
      alert("Fill in the values!");
    }
  };
  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 white">Register</legend>
              <div className="mt3 white">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  onChange={this.onNameChange}
                  type="text"
                  name="name"
                  id="name"
                  required
                />
              </div>
              <div className="mt3 white">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  onChange={this.onEmailChange}
                  name="email-address"
                  id="email-address"
                  required
                />
              </div>
              <div className="mv3 white">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  onChange={this.onPasswordChange}
                  name="password"
                  id="password"
                  required
                />
              </div>
            </fieldset>
            <div className="white">
              <input
                onClick={this.onSubmitClick}
                className="b ph3 pv2 input-reset ba b--dark bg-white grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}
