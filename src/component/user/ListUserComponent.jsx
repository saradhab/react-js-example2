import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:9090/users';


class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
        //console.log("OM SRI RAM");
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
      /*  ApiService.fetchUsers()
            .then((res) => {
                this.setState({users: res.data.result})
            });*/

        //const API_URL = 'http://jsonplaceholder.typicode.com/users';
        const API_URL = 'http://localhost:9090/users';
    axios.get(API_URL).then(response => response.data)
    .then((data) => {
      this.setState({ users: data.result })
      console.log(this.state.users)
     })
    }

    deleteUser(userId) {
        ApiService.deleteUser(userId)
           .then(res => {
               this.setState({message : 'User deleted successfully.'});
               this.setState({users: this.state.users.filter(user => user.id !== userId)});
           })

    }

    editUser(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-user');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">User Details</h2>
                <button className="btn btn-danger" style={{width:'100px'}} onClick={() => this.addUser()}> Add User</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>USER_ID</th>
                            <th>FIRST_NAME</th>
                            <th>PASSWORD</th>
                            <th>EMAIL</th>
                            <th>MOBILE</th>
                            <th>MIDDLE_NAME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                        user =>
                                    <tr key={user.user_id}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.password}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile_number}</td>
                                        <td>{user.middle_name}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.deleteUser(user.user_id)}> Delete</button>
                                            <button className="btn btn-success" onClick={() => this.editUser(user.user_id)} style={{marginLeft: '20px'}}> Edit</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListUserComponent;