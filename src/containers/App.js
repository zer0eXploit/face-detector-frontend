import React from "react";
import "./App.css";
import Particles from "react-particles-js";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import Rank from "../components/Rank/Ranks";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import ImageDisplay from "../components/ImageDisplay/ImageDisplay";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";

const initialState = {
  input: "",
  imageUrl: "",
  box: "",
  route: "signIn",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: "",
    joined: ""
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  updateUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  onUrlInput = event => {
    this.setState({ imageUrl: event.target.value, box: "" });
  };

  onRouteChange = route => {
    this.setState({ route: route });
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else {
      this.setState(initialState);
    }
  };

  onSubmitClick = () => {
    fetch("http://localhost:3000/imageUrl", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        imageUrl: this.state.imageUrl
      })
    })
      .then(response => response.json())
      .then(response => {
        this.boxData(this.calculateFaceLocation(response));

        // Upon successful face detection, update entries
        const body = {
          id: this.state.user.id
        };

        fetch("http://localhost:3000/image", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then(data => {
            if (data) {
              this.setState(Object.assign(this.state.user, { entries: data }));
            }
          });
      })
      .catch(err => console.log(err));
  };

  calculateFaceLocation = data => {
    const imgToDetect = document.getElementById("imgToDetect");
    const clarifaiData =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const imgHeight = parseInt(imgToDetect.height);
    // Width is constant set in the jsx code
    const imgWidth = parseInt(imgToDetect.width);

    return {
      topBar: imgHeight * clarifaiData.top_row + "px",
      leftBar: imgWidth * clarifaiData.left_col + "px",
      bottomBar: imgHeight - imgHeight * clarifaiData.bottom_row + "px",
      rightBar: imgWidth - imgWidth * clarifaiData.right_col + "px"
    };
  };

  boxData = barPositions => {
    this.setState({ box: barPositions });
  };

  render() {
    return (
      <div className="App">
        <Particles className="Particles" />
        <Navigation
          route={this.state.route}
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onUrlInput={this.onUrlInput}
              onSubmitClick={this.onSubmitClick}
            />
            <ImageDisplay imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>
        ) : this.state.route === "signIn" ? (
          <SignIn
            updateUser={this.updateUser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <Register
            updateUser={this.updateUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
