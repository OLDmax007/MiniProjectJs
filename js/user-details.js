import {toUpperFirstChar} from '../modules/utils.js'
const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    throw new Error("There isn't a post");
}
function createListFromObject(obj) {
    const ul = document.createElement('ul');
    for (const key in obj) {
        const li = document.createElement('li');
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
            if (key === 'geo') {
                li.innerHTML = `<b>${toUpperFirstChar(key)}</b>: lat: ${value.lat}, lng: ${value.lng}`;
            } else {
                li.innerHTML = `<b>${toUpperFirstChar(key)}</b>: `;
                li.appendChild(createListFromObject(value));
            }
        } else {
            li.innerHTML = `<b>${toUpperFirstChar(key)}</b>: ${value}`;
        }
        ul.appendChild(li);
    }
    return ul;
}

const sectionUser = document.createElement('section');
sectionUser.classList.add('user-full');

const userList = createListFromObject(user);
userList.classList.add('list-user-full')
sectionUser.appendChild(userList);
document.body.appendChild(sectionUser)

const btnShowPost = document.createElement('button');
btnShowPost.setAttribute('type', 'button');
btnShowPost.classList.add('btn-show-post')
btnShowPost.innerText = 'Post of current user'
sectionUser.appendChild(btnShowPost);

let containerPosts = document.querySelector('.container-posts');
if (!containerPosts) {
    containerPosts = document.createElement('div');
    containerPosts.classList.add('container-posts');
    sectionUser.appendChild(containerPosts);
}

btnShowPost.onclick = function () {
    containerPosts.innerHTML = ''
    containerPosts.classList.toggle('show-posts');
    const urlPostsOfCurUser = new URL(`https://jsonplaceholder.typicode.com/users/${user['id']}/posts`);
    fetch(urlPostsOfCurUser)
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const blockPost = document.createElement('div');
                blockPost.innerHTML = ` <h3>${post.title}</h3>
                     <a href='../pages/post-details.html' class="link-post" ">View post details</a>`
                containerPosts.appendChild(blockPost);
                const linkPost = blockPost.querySelector('.link-post')
                linkPost.onclick = function () {
                    localStorage.setItem('post', JSON.stringify(post));
                }
            });
        })
        .catch(error => console.error('Fetch error:', error));

}

