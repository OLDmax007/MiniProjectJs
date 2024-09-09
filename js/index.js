const usersUrl = new URL('https://jsonplaceholder.typicode.com/users');
const sectionUsers = document.createElement('section');
sectionUsers.classList.add('users');
document.body.appendChild(sectionUsers);

fetch(usersUrl)
    .then(response => response.json())
    .then(users => {
        users.forEach((user) => {
            const blockUser = document.createElement('div');
            blockUser.classList.add('user')
            blockUser.innerHTML = `<div class="wrapper">
                                        <h3>${user['id']}.</h3>
                                        <p>${user['name']}</p>
                                    </div>
                                    <button type="button" class="btn-info">
                                    Show info about user</button>
                                    `
            const btnInfo = blockUser.querySelector('.btn-info');
            btnInfo.onclick = () => {
                localStorage.setItem('user', JSON.stringify(user))
                location.href = 'pages/user-details.html';
            }
            sectionUsers.appendChild(blockUser);
        })
    })

