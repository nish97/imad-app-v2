var button = document.getElementById('counter');
button.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState == XMLHttpRequest.DONE)
        {
            if(request.Status==200){
                var counter = request.responseText;
            }
        }
    };
};