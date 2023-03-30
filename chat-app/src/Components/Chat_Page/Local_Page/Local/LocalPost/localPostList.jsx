import React from 'react';
import PostItem from './localPostItem';

function PostList({posts, del}) {
    return (
        <section className="post__list">
            {posts.map((post, index) => (
                <PostItem del={del} number={index+1} post={post} key={post.id} />
            ))}
        </section>
    );
}

export default PostList;