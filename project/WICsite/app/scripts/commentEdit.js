import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import { API_URL } from './global';

module.exports = React.createClass({
    getInitialState: function() {
        return {author: '', text: ''};
    },
    componentDidMount: function() {
        this.loadData();
    },
    componentDidUpdate: function(prevProps) {
        if (this.props.params.id != prevProps.params.id) {
            this.loadData();
        }
    },
    loadData: function() {
        $.ajax(API_URL + "/" + this.props.params.id) .done(function(comments) {
            this.setState(comments[0]);
            //setting the state to the comments[0]
            //to access a certain JSON objects of comments[0] simply follow with . and then name of what you are accessing
            //for example, comments[0].id or comments[0].authors
        }.bind(this));
    },
   
    render: function() {
        return (
            <div>
                    <h1>Event details: {this.state.id} <br/>
                     {this.state.text} <br/> {this.state.author}</h1>
                    
            </div>
        );
    }
});