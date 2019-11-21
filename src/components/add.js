import React from 'react';

export class AddTodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    submitForm = e => {
        e.preventDefault();
        
        fetch('https://todo-application-e8038.firebaseio.com/todo.json', {
            method: 'POST',
            body: JSON.stringify({text: this.state.text, active: true})
        });
    }

    render() {
        return (<form onSubmit={this.submitForm}>
            <input type="text" value={this.state.text} onChange={e => this.setState({text: e.target.value})}></input>
            <button type="submit">Add Todo</button>
        </form>)
    }
}