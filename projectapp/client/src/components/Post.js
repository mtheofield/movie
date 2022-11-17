import React, { Component } from 'react';

const Post = props => (

            <div class="card mt-5 border-danger">
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p>{props.description}</p>
                        <footer class="blockquote-footer">Movie: <cite title="Title">{props.movie}</cite></footer>
                    </blockquote>
                </div>
            </div>
        )


export default Post