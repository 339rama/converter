import React, {useEffect} from 'react';

const Message = (container, place, message) => {
    let mesCont = document.createElement("div");
    mesCont.classList.add("message");
    mesCont.innerText = message;
    container.insertAdjacentElement(place, mesCont);
    setTimeout(() => mesCont.classList.add('fade'), 500);
    setTimeout(() => mesCont.remove(), 3000);
}
export default Message;