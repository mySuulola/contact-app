import React from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from "escape-string-regexp";
import { Link } from 'react-router-dom'

//import sortBy from 'sort-by'

class ListContacts extends React.Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
    }
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })
    }

    handleReset = () => {
        this.setState({
            query: ''
        })
    }


    render() {
        const { contacts, onClick } = this.props
        const { query } = this.state
        let showingContacts
        if (this.state.query) {
            //create  regexp that matches
            const match = new RegExp(escapeRegExp(query), 'i')
            showingContacts = contacts.filter(contact => match.test(contact.name))
        } else {
            showingContacts = contacts
        }
        //  showingContacts.sort(sortBy("name"))
        return (
            <div className='list-contacts'>
                {/* {JSON.stringify(this.state)} */}
                <div className='list-contacts-top'>
                    <input className='search-contacts'
                        type='text'
                        placeholder='Search Contact'
                        value={query}
                        onChange={(e) => this.updateQuery(e.target.value)}
                    />
                    <Link to='/create' className='add-contact'>Add Contact </Link>
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length} total </span>
                        <button onClick={() => this.handleReset()} >Reset</button>
                    </div>
                )}

                <div className='contact-list'>
                    <ol>
                        {showingContacts.map((contact, index) => (
                            <li key={index} className='contact-list-item'>
                                <div className='contact-avatar' style={{ backgroundImage: `url(${contact.avatarURL})` }}></div>
                                <div className='contact-details'>
                                    <p>{contact.name}</p>
                                    <p>{contact.email}</p>
                                </div>
                                <button onClick={() => onClick(contact)} className='contact-remove'>Remove</button>
                            </li>

                        ))}
                    </ol>
                </div>

            </div>
        )
    }
}



export default ListContacts