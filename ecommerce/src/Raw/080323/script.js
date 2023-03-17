window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        console.log(fileInput.files[0]);
        var textType = /text.*/;
        var imageType = /image.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            reader.readAsText(file);
        }
        else if (file.type.match(imageType)){
            var reader = new FileReader();
            reader.onload = function(e){
                var img = new Image();
                img.src= reader.result;
                console.log(reader.result);
                fileDisplayArea.appendChild(img);
            }
            reader.readAsDataURL(file);
        }	
         else {
            fileDisplayArea.innerText = "File not supported!"
        }
    });
}