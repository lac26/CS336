import React from 'react';
import $ from 'jquery';

import CommentList from './commentList';
import { API_URL, POLL_INTERVAL } from './global';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    loadCommentsFromServer: function() {
        $.ajax({
            url: API_URL,
            dataType: 'json',
            cache: false,
        })
         .done(function(result){
            //set the data to the result from the database
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(this.props.url, status, errorThrown.toString());
         }.bind(this));
    },

    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, POLL_INTERVAL);
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Upcoming Events</h1>
                <CommentList data={this.state.data} />
            </div>
        );
    }
});
