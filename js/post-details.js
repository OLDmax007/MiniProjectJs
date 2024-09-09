import { toUpperFirstChar } from '../modules/utils.js'

const sectionPost = document.createElement('section');
sectionPost.classList.add('content-post')
document.body.appendChild(sectionPost)

const postOfCurUser = JSON.parse(localStorage.getItem('post'));
if (!postOfCurUser) {
    throw new Error("There isn't a post");
}

const post = document.createElement('div');
post.classList.add('post');
post.innerHTML = '<h2>Full information about the post</h2>'
const ul = document.createElement('ul');
for (const postKey in postOfCurUser) {
    const li = document.createElement('li');
    li.innerHTML = `<b>${toUpperFirstChar(postKey)}</b>: ${postOfCurUser[postKey]}`
    ul.appendChild(li);
}
post.appendChild(ul);
sectionPost.appendChild(post)

async function fetchComments() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postOfCurUser['id']}/comments`);
        if (!response.ok) throw new Error('Network response was not ok');
        await response.json().then(comments => {
            const blockComments = document.createElement('div');
            blockComments.classList.add('comments')
            blockComments.innerHTML = '<h2>Comments</h2>'
            const wrapperUl = document.createElement('div');
            wrapperUl.classList.add('wrapper-list');
            comments.forEach((comment, index) => {
                const commentUl = document.createElement('ul');
                commentUl.classList.add(`com-ul-${index+1}`)
                for (const commentKey in comment) {
                    const li = document.createElement('li');
                    li.innerHTML = `<b>${toUpperFirstChar(commentKey)}</b>: ${comment[commentKey]}`;
                    commentUl.appendChild(li);
                }
                wrapperUl.appendChild(commentUl);
            })
            blockComments.appendChild(wrapperUl);
            sectionPost.appendChild(blockComments)
        })
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
fetchComments();