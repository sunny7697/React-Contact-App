import React from 'react';

class EditContact extends React.Component {

    constructor(props){
        super(props)
        const {id, name, email} = props.location.state.contact;

        this.state = {
            id,
            name,
            email
        }
    }

    update = e => {
        // prevents page to reload after form submit
        e.preventDefault();

        // if any field is empty then give alert
        if(this.state.name === "" || this.state.email === ""){
            alert("All the fields are mandatory");
            return;
        }

        // set contact in app.js using addContactHandler
        this.props.updateContactHandler(this.state);
        
        this.setState({name: "", email: ""});

        // programmatic navigation with history
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="ui main">
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={this.update}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
                    </div>
                    <button className="ui button blue">Update</button>
                </form>
            </div>
        )
    }
}

export default EditContact;