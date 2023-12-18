// static/script.js
function predict() {
    var formData = new FormData();
    var fileInput = document.getElementById('imageInput');
    var file = fileInput.files[0];

    if (!file) {
        alert("Please select an image file.");
        return;
    }

    formData.append('image', file);

    $.ajax({
        url: '/predict',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            if (response && response.predicted_class !== undefined) {
                var resultMessage;

                // Check the predicted class and set the result message accordingly
                if (response.predicted_class === 0) {
                    resultMessage = 'The image is safe and doesn\'t contain Backdoor attack.';
                }
                else if (response.predicted_class === 1) {
                    resultMessage = 'This image has Backdoor attack.';
                }
                else if (response.predicted_class === 2) {
                    resultMessage = 'This image has Backdoor attack.';
                } 
                else if (response.predicted_class === 3) {
                    resultMessage = 'This image has Backdoor attack.';
                }
                else if (response.predicted_class === 4) {
                    rresultMessage = 'This image has Backdoor attack.';
                }
                else if (response.predicted_class === 5) {
                    resultMessage = 'This image has Backdoor attack.';
                } 
                else {
                    resultMessage = 'Unexpected prediction result.';
                }

                $('#resultContainer').html('<p>' + resultMessage + '</p>');
            } else {
                $('#resultContainer').html('<p>Unexpected response from the server.</p>');
            }

            if (response && response.image_path !== undefined) {
                $('#uploadedImage').attr('src', response.image_path).show();
            } else {
                $('#uploadedImage').hide();
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

// Handle file input change event
$('#imageInput').change(function() {
    var fileInput = this;
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#uploadedImage').attr('src', e.target.result);
            $('#uploadedImage').show();
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
});
