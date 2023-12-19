// static/script.js
function predict() {
  var formData = new FormData();
  var fileInput = document.getElementById("imageInput");
  var file = fileInput.files[0];

  if (!file) {
      alert("Please select an image file.");
      return;
  }

  formData.append("image", file);

  $.ajax({
      url: "/predict",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
          let status = "error";

          if (response && response.predicted_class !== undefined) {
              var resultMessage;

              // Check the predicted class and set the result message accordingly
              if (response.predicted_class === 0) {
                  resultMessage =
                      "The image is safe and doesn't contain any Backdoor attack.";

                  status = "success";
              } else {
                  resultMessage = "This image has Backdoor attack.";
              }

              $("#resultContainer").html(`<p class="${status}">${resultMessage} </p>`);
          } else {
              $("#resultContainer").html(
                  `<p class="${status}">Unexpected response from the server.</p>`
              );
          }

          if (response && response.image_path !== undefined) {
              // Display the uploaded image
              $("#uploadedImage").attr("src", response.image_path).show();
          } else {
              $("#uploadedImage").hide();
          }
      },
      error: function (error) {
          console.log(error);
      },
  });
}

/**
* file upload trigger
*/
function triggerFileUpload() {
  $("#imageInput")?.click();
}

// Handle file input change event
$("#imageInput").change(function () {
  var fileInput = this;
  if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          $("#uploadedImage").attr("src", e.target.result);
          $("#uploadedImage").show();
          $("#iconImage").hide();
      };
      reader.readAsDataURL(fileInput.files[0]);
  }
});
