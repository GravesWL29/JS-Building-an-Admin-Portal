async function admin(){
    let bookListResponse = await fetch('http://localhost:3001/listBooks');
    let bookList = await bookListResponse.json();

    const ul = document.createElement('ul');

    bookList.array.forEach(book => {
        const li = document.createElement('li')
        li.textContent= book.title;

        const textInput = document.createElement('input');
        textInput.type = "text";
        textInput.value = book.quantity;
        li.append(textInput);

        const button = document.createElement('input');
        button.type = "button";
        button.value = "Save";
        button.addEventListener('click', async () => {
            await fetch('http://localhost:3001/updateBook', {
                method: 'PATCH',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    ...book,
                    quantity: textInput.value,
                });
            });
        });
        li.append(button);
        ul.append(li);
    });

    let root = document.querySelector('#root');
    root.append(ul);
}
admin();

// Your Code Here
