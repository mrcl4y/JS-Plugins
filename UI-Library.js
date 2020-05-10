document.head.insertAdjacentHTML('beforeend', `<style type="text/css">
.Library-Main-s6bv9 {
  position: absolute;
  z-index: 9999999999;
  background-color: #666666;
  border: 1px solid #444444;
  text-align: center;
  width: 125px;
}
.Library-Header-2r9nd {
  padding: 5px;
  margin-bottom: 4px;
  cursor: move;
  z-index: 10;
  background-color: #777777;
  color: #ffffff;
}
.Library-Button-7gd0f {
    margin-bottom: 4px;
    padding: 4px;
    border: none;
    background-color: #777777;
    color: #ffffff;
}
.Library-Picker-o7cj1 {
    margin-bottom: 4px;
    background-color: #777777;
    border: none;
}
</style>`);

const library = {}

function EnableDrag(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementsByClassName("Library-Header-2r9nd")[0]) {
        // if present, the header is where you move the DIV from:
        document.getElementsByClassName("Library-Header-2r9nd")[0].onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

library.CreateWindow = function (Title) {
    let Window = {}
    let Main = document.createElement('div')
    Main.classList.add('Library-Main-s6bv9')
    let Top = document.createElement('div')
    Top.classList.add('Library-Header-2r9nd')
    Top.innerHTML = Title
    Main.appendChild(Top)
    document.body.prepend(Main)

    Window.Button = function (Text, Callback, Inline) {
        let Returns = {}
        let Button = document.createElement('button')
        Button.onclick = Callback
        Button.innerHTML = Text
        Button.classList.add('Library-Button-7gd0f')
        Main.appendChild(Button)
        if (!Inline) {
            Main.appendChild(document.createElement('br'))
        }


        Returns.Element = Button
        Returns.Text = Text
        Returns.Remove = function () {
            Button.remove()
        }
        return Returns;
    }

    Window.ColorPicker = function (Inline) {
        let Returns = {}
        let Picker = document.createElement('input')
        Picker.type = 'color'
        Picker.classList.add('Library-Picker-o7cj1')
    
        Main.appendChild(Picker)
        if (!Inline) {
            Main.appendChild(document.createElement('br'))
        }
        Picker.addEventListener('change', function () {
            Returns.Color = Picker.value
        })

        Returns.Color = Picker.value
        Returns.Element = Picker
        Returns.Remove = function () {
            Picker.remove()
        }
        return Returns;
    }

    EnableDrag(Main)
    Window.Element = Main
    Window.Title = Title
    Window.Remove = function () {
        Main.remove()
    }
    return Window;
}
