Gameolith.tools.link = (path) ->
    if /^https/.test(location)
        a = 'https'
    else
        a = 'http'

    b = "://www.gameolith.com/"
    
    if path.charAt(0) == "/"
        c = path.slice 1
    else
        c = path
    
    a + b + c

Gameolith.tools.strip = (html) ->
    el = document.createElement "div"
    el.innerHTML = html

    el.textContent || el.innerText

Gameolith.tools.createBox = (number, slug) ->
    iframe = document.createElement "iframe"
    src = Gameolith.tools.link "/try/#{escape slug}/?type=widget&utm_source=widgets&utm_medium=demo_box"

    iframe.setAttribute "frameborder", 0
    iframe.setAttribute "style", "overflow:hidden"
    iframe.setAttribute "scrolling", "no"
    iframe.setAttribute "width", 500
    iframe.setAttribute "height", 215
    iframe.setAttribute "name", "__gameolith_box_#{number}"
    iframe.setAttribute "id", "__gameolith_box_#{number}"
    iframe.setAttribute "sandbox", "allow-same-origin allow-scripts"
    iframe.setAttribute "seamless", "seamless"
    iframe.setAttribute "src", src
    
    iframe

Gameolith.tools.createButton = (number, slug, text) ->
    iframe = document.createElement "iframe"

    if text == "undefined"
        text = ""

    src = Gameolith.tools.link "/try/#{escape slug}/?type=button&utm_source=widgets&utm_medium=demo_button&button=#{number}&text=#{Gameolith.tools.strip text}"

    iframe.setAttribute "frameborder", 0
    iframe.setAttribute "style", "overflow:hidden"
    iframe.setAttribute "scrolling", "no"
    iframe.setAttribute "height", 28
    iframe.setAttribute "style", "width:1px"
    iframe.setAttribute "name", "__gameolith_button_#{number}"
    iframe.setAttribute "id", "__gameolith_button_#{number}"
    iframe.setAttribute "src", src

    iframe.style.visibility = "hidden"

    iframe

Gameolith.messageRead = (event) ->
    split_message = event.data.split "="

    button = {}

    button.id = split_message[0].replace "#", ""
    button.request = split_message[1]
    button.dom_object = document.getElementById "__gameolith_button_#{button.id}"
    button.replaced_object = document.querySelector "[data-gameolith-object-id='__gameolith_button_#{button.id}']"
    button.slug = button.replaced_object.getAttribute "data-game"

    if Gameolith.debug
        console.log event.data

    if button.request == "overlay"
        Gameolith.tools.box.show {
            iframe: Gameolith.tools.link "/try/#{button.slug}/?type=widget&utm_source=widgets&utm_medium=demo_overlay"
            width: 500
            height: 215
        }
    else
        button.width = parseInt(button.request, 10) + 10
        button.dom_object.style.visibility = "visible"
        button.dom_object.style.width = "#{button.width}px"

Gameolith.init = ->
    demo_boxes = document.querySelectorAll ".gameolith-demo[data-widget='box']"
    demo_buttons = document.querySelectorAll ".gameolith-demo[data-widget='button']"

    # Create the demo boxes
    for box, num in demo_boxes
        slug = box.getAttribute "data-game"
        boxframe = Gameolith.tools.createBox num, slug
        
        box.parentNode.insertBefore boxframe, box
        box.setAttribute "data-gameolith-object-id", "__gameolith_box_#{num}"
        box.style.display = "none"
    
    # Create the demo buttons
    for button, num in demo_buttons
        text = button.innerHTML
        slug = button.getAttribute "data-game"
        buttonframe = Gameolith.tools.createButton num, slug, text

        button.parentNode.insertBefore buttonframe, button
        button.setAttribute "data-gameolith-object-id", "__gameolith_button_#{num}"
        button.style.display = "none"
    
    # Load the CSS for the overlay
    Gameolith.tools.cssloader "http://736.github.com/gameolith-widgets/js/platform/style.min.css"

    # Enable message passing
    window.addEventListener "message", Gameolith.messageRead, false

    demo_boxes.length + demo_buttons.length

# Run Gameolith.init when page finishes loading
if document.readyState == "complete"
    Gameolith.init()

if window.addEventListener
    window.addEventListener "load", Gameolith.init, false
else if document.attachEvent
    window.attachEvent "load", Gameolith.init
else
    window.onload = Gameolith.init
