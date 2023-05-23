
class Post {
    constructor(data) {
        this.date = data.date;
        this.creator = data.creator;
    }

    display() {
        console.log(`Post: [Date: ${this.date}, Creator: ${this.creator}]`);
    }
}


class PostFactory {
    constructor() {
        this.posts = {};
    }
    getPost(date, creator) {
        const key = `${date}-${creator}`;

        if (this.posts[key]) {
            return this.posts[key];
        }

        const data = {
            date,
            creator
        };
        const newPost = new Post(data);
        this.posts[key] = newPost;

        return newPost;
    }
}


const postFactory = new PostFactory();

const post1 = postFactory.getPost('2023-05-18', 'John');
const post2 = postFactory.getPost('2023-05-19', 'Alice');
const post3 = postFactory.getPost('2023-05-18', 'John');

post1.display();
post2.display();
post3.display();




