const messageList = document.querySelector('#message-list');
const form = document.querySelector('#add-message-form');


function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let message = document.createElement('span');
    let cross = document.createElement('div')

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    message.textContent = doc.data().message;
    cross.textContent = 'X';

    li.appendChild(name);
    li.appendChild(message);
    li.appendChild(cross)

    messageList.appendChild(li);
    cross.addEventListener('click', (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        console.log(id)
        db.collection('chatMessages').doc(id).delete();
    })
}

db.collection('chatMessages').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc);
        }
        else if(change.type == 'removed'){
            let li = messageList.querySelector('[data-id =' + change.doc.id + ']');
            messageList.removeChild(li);
        }
    })
});
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('chatMessages').add({
        name:form.name.value,
        message:form.message.value
    })
    // form.name.value = '';
    form.message.value = '';
    })
