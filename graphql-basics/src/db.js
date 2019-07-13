const users = [
    {
        id: "223",
        email: "johndoe@dsadf.com",
        name: "John Doe",
        age: 28,
        comments
    },
    {
        id: "123",
        email: "sarah@adfa.com",
        name: "Sarah Conor",
        age: 26
    }
]
const posts = [{
    id: '1221',
    title: 'Graphql 101',
    body: "Graphql basics",
    published: true,
    author: "223"
}, {
    id: "1231",
    title: "Hello World",
    body: "Hello earth",
    published: false,
    author: "123"
}]

const comments = [{
    id: '12341231324',
    text: 'COmment',
    author: '223',
    post: '1231'
}, {
    id: '13h1jkefhjkf',
    text: 'asdfljalksd',
    author: '223',
    post: '1221'


},
{
    id: '123412asdfa',
    text: 'COmmentasdfas',
    author: '123',
    post: '1231'


}, {
    id: '13h1jasdfa',
    text: 'Hello world',
    author: '123',
    post: '1221'

},
]

const db = {
    users,
    posts,
    comments
}

export { db as default }