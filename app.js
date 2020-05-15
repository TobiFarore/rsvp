document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrar');
    const input = form.querySelector('input');
    const mainDiv = document.querySelector('.main');
    const ul = document.getElementById('invitedList');
    const div = document.createElement('div');
    const filterLabel = document.createElement('label');
    const filterCheckBox = document.createElement('input');

    filterLabel.textContent = "Hide those who haven't responded";
    filterCheckBox.type = 'checkbox';
    div.appendChild(filterLabel);
    div.appendChild(filterCheckBox);
    mainDiv.insertBefore(div, ul);

    filterCheckBox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        const lis = ul.children;
       // const li = lis.firstElementChild;
        if (isChecked) {
            
            for(let i = 0; i < lis.length; i++) {
                let li = lis[i];
                if (li.className === 'responded') {
                    li.style.display = '';
                } else {
                    li.style.display = 'none';
                }
            }

        } else {
            for(let i = 0; i < lis.length; i++) {
                let li = lis[i];
                li.style.display = '';
            }

        }
    });
    
    function createLi (text) {

        function createElement(elementName, property, value) {   
            const element = document.createElement(elementName);
            element[property] = value;
            return element;
        }

        function appendToLi (elementName, property, value) {
            const element = createElement(elementName, property, value);
            li.appendChild(element);
            return element;
        }

        //create list item
        const li = document.createElement('li');
        appendToLi('span', 'textContent', text);
        const select = document.createElement('select');
       // appendToLi('select', 'textContent', 'confirm')
        select.appendChild(createElement('option', 'textContent', 'test'));
        select.appendChild(createElement('option', 'textContent', 'test2'));
        li.appendChild(select)
        appendToLi('textarea', 'placeholder', 'Note');
        appendToLi('button', 'textContent', 'edit');
        appendToLi('button', 'textContent', 'remove');
        return li;



       // appendToLi('select', 'textContent', '<option value="confirm')
    }
    

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value; 
        
        input.value = '';
        const lis = ul.children;
        //if input value is not string and remove whitespace 
       if(!text.trim()) {
            alert('Please input a name');
            return false;
        } 
        // for each item in ul element, span text should not be equal to input.value
        for (let i=0; i < lis.length; i++){
                if(text.toLowerCase() === lis[i].firstElementChild.textContent.toLowerCase()){
                    alert('Name already exists, please enter another name');
                    return;
                }           
        }
        //create li element with input.value and append to ul element
        const li = createLi(text);
        ul.appendChild(li);
    });

    ul.addEventListener('change', (e) => {
        const checkbox = e.target;
        const checked = checkbox.checked;
        const listLabel = checkbox.parentNode;
        const listItem = checkbox.parentNode.parentNode;
        
        if (checked) {
            listLabel.childNodes[0].textContent = 'confirmed';
            listItem.className = 'responded';
        } else {
            listLabel.childNodes[0].textContent = 'confirm';
            listItem.className = '';
        }
    });

    ul.addEventListener('click', (e) => {
        if ( e.target.tagName === 'BUTTON') {
            const button = e.target;
            const li = button.parentNode;
            const ul = li.parentNode;
            const action = button.textContent;
            const nameAction = {
                remove: () => {
                ul.removeChild(li);
                },
                edit: () => {
                    const span = li.firstElementChild;
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = span.textContent;
                    li.insertBefore(input, span);
                    li.removeChild(span);
                    button.textContent = 'save';
                },
                save: () => {
                    const input = li.firstElementChild;
                    const span = document.createElement('span');
                    span.textContent = input.value;
                    li.insertBefore(span, input);
                    li.removeChild(input);
                    button.textContent = 'edit';
                }

            }
            //select and run action in button's name
            nameAction[action] ();
        }
    });
});

