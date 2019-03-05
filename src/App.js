import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import './index.css'
import CreateContact from './createContact'
import {Route} from 'react-router-dom'

class App extends Component {
  state = {
    contacts : [],
  }

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
        this.setState({ contacts })
    })
  }

  handleDelete = (specificContact) => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== specificContact.id)
    })
    ContactsAPI.remove(specificContact)
  }
  handleContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      const newContact = [...this.state.contacts, contact]
      this.setState({
        contacts: newContact
        // contacts: this.state.contacts.concat([contact])
      })
    })
  }
  render() {
    return (
    <div className="App">
      <Route exact path='/' render={ () => (
        <ListContacts onClick={this.handleDelete} 
        contacts = {this.state.contacts} />
      )} />
      <Route path='/create' render= {({history}) => (
        <CreateContact
        onCreateContact={(contact) => {
          this.handleContact(contact)
          history.push('/')
        }
      }
        />
      )} />
    </div>
    )
  }
}



export default App;
