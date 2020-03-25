import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import axios from 'axios';
const USER_API_BASE_URL1 = 'http://localhost:9090/users';

class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            user_id: '',
            first_name: '',
            last_name: '',
            password: '',
            email: '',
            mobile_number: '',
            middle_name: ''
        }
        this.saveUser = this.saveUser.bind(this);
        this.goHome = this.goHome.bind(this);

    }

    goHome = (e) => {
        e.preventDefault();
         this.props.history.push('/users');
    }


    saveUser = (e) => {
        e.preventDefault();
        let user = {user_id: this.state.user_id, first_name: this.state.first_name, last_name: this.state.last_name, password: this.state.password, email: this.state.email, mobile_number: this.state.mobile_number,middle_name: this.state.middle_name};
        let user1 =       {      user_id: '',
                                first_name: '',
                                last_name: '',
                                password: '',
                                email: '',
                                mobile_number: '',
                                middle_name: ''};
   //     ApiService.addUser(user)

           axios.post(USER_API_BASE_URL1, user)
            .then(res => {
                this.setState({user1});
                 alert("USER DATA UPDATED SUCCESSFULLY!");
                this.props.history.push('/users');

            })
            .catch(function (error) {
                   alert("ERROR: "+error);
             });
             //window.location.reload();
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add User</h2>
                <form>
                <div className="form-group">
                    <label>User ID:</label>
                    <input type="number" placeholder="user id" name="user_id" className="form-control" value={this.state.user_id} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>FIRST NAME:</label>
                    <input type="text" placeholder="first name" name="first_name" className="form-control" value={this.state.first_name} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>LAST NAME:</label>
                    <input type="text" placeholder="Last Name" name="last_name" className="form-control" value={this.state.last_name} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>PASSWORD:</label>
                    <input type="password" placeholder="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>EMAIL:</label>
                    <input type="text" placeholder="email" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>MOBILE:</label>
                    <input type="number" placeholder="salary" name="mobile_number" className="form-control" value={this.state.mobile_number} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>MIDDLE NAME:</label>
                    <input type="text" placeholder="middle_name" name="middle_name" className="form-control" value={this.state.middle_name} onChange={this.onChange}/>
                </div>

                 <button className="btn btn-success" onClick={this.saveUser}>Save</button> &nbsp;&nbsp;&nbsp;
                 <button className="btn btn-success" onClick={this.goHome}>BACK</button>

            </form>
    </div>
        );
    }
}

export default AddUserComponent;
