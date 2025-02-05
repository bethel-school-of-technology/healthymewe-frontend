

import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class ExerciseEntry extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('https://salty-chamber-93253.herokuapp.com/users')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }

        console.log(exercise);

        axios
            .put("https://salty-chamber-93253.herokuapp.com/exercises/add", exercise)
            .then(res => console.log(res.data));

        window.location = '/exerciseLog';
    }

    render() {
        return (
            <div>
                <h3>Enter New Exercise Log</h3>
                {/* <br></br>
                    <br></br>
                    (You MUST be Logged in to make and Entry, and you MUST create a User to Login!)</h3> */}
                <br></br>

                <form onSubmit={this.onSubmit}>
                    <div className="from-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}> {

                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>
                                        {user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <br></br>

                    <div className="from-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <br></br>

                    <div className="from-group">
                        <label>Duration (Minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <br></br>

                    <div className="from-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <br></br>

                    <div className="form-group">
                        <input type="submit" value="Enter" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}