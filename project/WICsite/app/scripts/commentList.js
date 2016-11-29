import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Comment from './comment';

module.exports = React.createClass({
    /* loop through the list and and add each element to comment Nodes */
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment id={comment.id} author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});
