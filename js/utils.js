'use strict'

var states = new Array(2);
// [resize, drag]
const resize = 0;
const drag = 1;

function makeResizableDiv(div, action="mousedown") {
    const element = document.querySelector(div);
    const resizers = document.querySelectorAll(div + ' .resizer')

    let measures = element.getBoundingClientRect();

    // dict containing methods for resizing
    let resizing = {
        'top': (e) => {
            element.style.height = measures.height - (e.pageY - measures.y) + 'px';
            element.style.top = Math.min(measures.top + (e.pageY - measures.y), measures.bottom) + 'px';
        },
        'right': (e) => {
            element.style.width = measures.width + (e.pageX - measures.x) + 'px';
        },
        'bottom': (e) => {
            element.style.height = measures.height + (e.pageY - measures.y) + 'px';
        },
        'left': (e) => {
            element.style.width = measures.width - (e.pageX - measures.x) + 'px';
            element.style.left = Math.min(measures.left + (e.pageX - measures.x), measures.right) + 'px';
        },
        'top-left': (e) => {
            element.style.width = measures.width - (e.pageX - measures.x) + 'px';
            element.style.height = measures.height - (e.pageY - measures.y) + 'px';
            element.style.top = Math.min(measures.top + (e.pageY - measures.y), measures.bottom) + 'px';
            element.style.left = Math.min(measures.left + (e.pageX - measures.x), measures.right) + 'px';
        },
        'top-right': (e) => {
            element.style.width = measures.width + (e.pageX - measures.x) + 'px';
            element.style.height = measures.height - (e.pageY - measures.y) + 'px';
            element.style.top = Math.min(measures.top + (e.pageY - measures.y), measures.bottom) + 'px';
        },
        'bottom-right': (e) => {
            element.style.width = measures.width + (e.pageX - measures.x) + 'px';
            element.style.height = measures.height + (e.pageY - measures.y) + 'px';
        },
        'bottom-left': (e) => {
            element.style.height = measures.height + (e.pageY - measures.y) + 'px';
            element.style.width = measures.width - (e.pageX - measures.x) + 'px';
            element.style.left = Math.min(measures.left + (e.pageX - measures.x), measures.right) + 'px';
        }
    }

    resizers.forEach(resizer => {

        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();

            measures = element.getBoundingClientRect();
            measures.x = e.pageX; // overwriting what x originately means
            measures.y = e.pageY; // overwriting what y originately means

            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });

        function resize(e) {
            resizing[resizer.id](e);

            states[resize] = true;
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize);
        }
    });
}

function makeDraggableDiv(selector, action="mousedown") {
    let x, y;

    const element = document.querySelector(selector);

    element.addEventListener(action, dragMouseDown);

    function dragMouseDown(e) {
        e.preventDefault();

        x = e.clientX;
        y = e.clientY;

        document.addEventListener("mouseup", closeDragElement);
        document.addEventListener("mousemove", elementDrag);
    }

    function elementDrag(e) {
        e.preventDefault();

        element.style.left = (element.offsetLeft - (x - e.clientX)) + "px";
        element.style.top = (element.offsetTop - (y - e.clientY)) + "px";

        x = e.clientX;
        y = e.clientY;

        states[drag] = true;
    }

    function closeDragElement() {
        document.removeEventListener('mouseup', closeDragElement); 
        document.removeEventListener('mousemove', elementDrag);
    }
}