import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchResults } from '../services/ResultService'
import Autocomplete from "react-google-autocomplete";

class App extends Component {

  state = {
    inputStage: 0,
    formStage: 0,
    age: "",
    sex: "",
    location: "",
    underlyingHealthConditions: [],
    conditionVal: "",
    symptoms: [],
    symptomVal: "",
    preferredTimeStart: "",
    preferredTimeEnd: ""
  }

  submit = () => {
    fetchResults(this.state.age, this.state.sex, this.state.location, [this.state.preferredTimeStart, this.state.preferredTimeEnd], this.state.underlyingHealthConditions, this.state.symptoms).then(results => {
      console.log(results);
      sessionStorage.setItem("results", JSON.stringify(results));
      window.location = "/results";
    });
  }

  onChangeForm = (e) => {
      let user = this.state.user
      if (e.target.name === 'firstname') {
          user.firstName = e.target.value;
      } else if (e.target.name === 'lastname') {
          user.lastName = e.target.value;
      } else if (e.target.name === 'email') {
          user.email = e.target.value;
      }
      this.setState({user})
  }

  isNum (x) {
    if (isNaN(x)) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div className="App">
        <nav class="navbar navbar-light bg-light">
          <div style={{width: 800, margin: "auto", display: "block"}}>
            <a class="navbar-brand" href="/">
              <img src="/logo.png" width="28" class="d-inline-block align-top" alt=""/>
              <strong style={{marginLeft: 5}}>VitalWave</strong>
            </a>
          </div>
        </nav>
        {
          this.state.formStage == 0 ?
            <div className='main-wrapper'>
              <h1>Welcome to <span className='text-success'>VitalWave</span></h1>
              <h3>Let us help</h3>
              <div className='inner'>
                {
                  this.state.inputStage == 0 ?
                  <>
                    <p>Get started by giving us your age</p>
                    <span className='text-danger'>{this.state.error}</span>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                      <input autoFocus type="text" onChange={e => this.setState({age: e.target.value})} value={this.state.age} placeholder='Enter age'/>
                      <button className='btn btn-success' onClick={() => {
                        this.state.age != "" && this.state.age > 0 && this.isNum(this.state.age) ? this.setState({inputStage: 1}) : this.setState({error: "Age must be a number"})
                        setTimeout(() => {
                          this.setState({error: ""});
                        }, 3000);
                      }}>Next</button>
                    </div>
                  </>
                  : this.state.inputStage == 1 ?
                  <>
                    <p>Enter your sex</p>
                    <span className='text-danger'>{this.state.error}</span>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                      <input type="text" onChange={e => this.setState({sex: e.target.value})} value={this.state.sex} placeholder='Enter sex (Male/Female/Other)'/>
                      <button className='btn btn-success' onClick={() => {
                        this.setState({sex: this.state.sex.toLowerCase()});
                        this.state.sex == "male" || this.state.sex == "m" || this.state.sex == "female" || this.state.sex == "f" || this.state.sex == "other" ? this.setState({inputStage: 2}) : this.setState({error: "Invalid sex input"})
                        setTimeout(() => {
                          this.setState({error: ""});
                        }, 3000);
                      }}>Next</button>
                    </div>
                    <button className='btn' onClick={() => {
                        this.setState({inputStage: 0});
                      }}>Go Back</button>
                  </>
                  : this.state.inputStage == 2 ?
                  <>
                    <p>Give us your location for optimised results</p>
                    <span className='text-danger'>{this.state.error}</span>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                      <Autocomplete
                        apiKey={"AIzaSyCRnBbhEcVvYOk_eX10BrP2D6ykDAL4bKQ"}
                        onPlaceSelected={(place) => {
                          this.setState({location: place})
                        }}
                      />
                      <button className='btn btn-success' style={{}} onClick={() => {
                        this.state.location != "" ? this.setState({inputStage: 3}) : this.setState({error: "Enter a location"})
                        setTimeout(() => {
                          this.setState({error: ""});
                        }, 3000);
                      }}>Next</button>
                    </div>
                    <button className='btn' onClick={() => {
                        this.setState({inputStage: 1});
                      }}>Go Back</button>
                  </>
                  :
                  <>
                    <p>Preferred time slot</p>
                    <span className='text-danger'>{this.state.error}</span>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                      <div>
                        <input type="text" value={this.state.preferredTimeStart} onChange={e => this.setState({preferredTimeStart: e.target.value})} placeholder='From (0:00-23:59)'/>
                        <input type="text" value={this.state.preferredTimeEnd} onChange={e => this.setState({preferredTimeEnd: e.target.value})}  placeholder='To (0:00-23:59)'/>
                      </div>
                      <button className='btn btn-success' onClick={() => {
                        this.setState({inputStage: 0, formStage: 1});
                      }}>Next</button>
                    </div>
                    <button className='btn' onClick={() => {
                        this.setState({inputStage: 2});
                      }}>Go Back</button>
                    </>
                }
              </div>
          </div>
          :
          <div className='main-wrapper'>
            <h1>Almost there</h1>
            <h3>Give us more details about your condition</h3>
            <div className='inner'>
              {
                this.state.inputStage == 0 ?
                <>
                  <p>Enter any underlying health conditions you have</p>
                  <ul>
                    {
                      this.state.underlyingHealthConditions.map(condition => {
                        return <li>{condition}</li>
                      })
                    }
                  </ul>
                  <form onSubmit={e => {
                    e.preventDefault();
                    var conditions = this.state.underlyingHealthConditions;
                    conditions.push(this.state.conditionVal);
                    this.setState({underlyingHealthConditions: conditions, conditionVal: ""})
                    console.log(this.state.underlyingHealthConditions);
                  }}>
                    <input style={{maxWidth: 500}} value={this.state.conditionVal} onChange={e => this.setState({conditionVal: e.target.value})} type='text' placeholder='Press Enter to add underlying conditions'/>
                  </form>
                  <button className='btn btn-success' style={{width: 200, display: "block", margin: "auto", marginTop: 10}} onClick={() => {
                    this.setState({inputStage: 1});
                  }}>Next</button>
                  <button className='btn' onClick={() => {
                      this.setState({inputStage: 2, formStage: 0});
                    }}>Go Back</button>
                </>
                : this.state.inputStage == 1 ?
                <>
                  <p>Finally, enter all your symptoms or complications</p>
                  <ul>
                    {
                      this.state.symptoms.map(symptom => {
                        return <li>{symptom}</li>
                      })
                    }
                  </ul>
                  <form onSubmit={e => {
                    e.preventDefault();
                    var symptoms = this.state.symptoms;
                    symptoms.push(this.state.symptomVal);
                    this.setState({symptoms, symptomVal: ""})
                  }}>
                    <input style={{maxWidth: 500}} value={this.state.symptomVal} onChange={e => this.setState({symptomVal: e.target.value})} type='text' placeholder='Press Enter to add symptoms'/>
                  </form>
                  <button className='btn btn-success' style={{width: 200, display: "block", margin: "auto", marginTop: 10}} onClick={this.submit}>Find Hospitals</button>
                  <button className='btn' onClick={() => {
                      this.setState({inputStage: 0});
                    }}>Go Back</button>
                </>
                :
                <></>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;