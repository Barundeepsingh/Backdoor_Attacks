import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Import the CORS module
import tensorflow as tf
from PIL import Image
import numpy as np

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)  # Enable CORS for all routes

# Set the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load the TFLite model
model_filename = 'model/model.tflite'  # Update with your actual TFLite model filename
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), model_filename)
interpreter = tf.lite.Interpreter(model_path=model_path)
interpreter.allocate_tensors()

# Get input and output tensors.
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Define a route for the home page
@app.route('/')
def home():
    return render_template('index.html')

# Define a route for prediction
# ...

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input image from the request
        if 'image' not in request.files:
            raise ValueError("No 'image' file in the request")

        image = request.files['image']

        if image.filename == '':
            raise ValueError("No selected file")

        # Save the uploaded file to the upload folder
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
        image.save(image_path)

        # Preprocess the image
        input_shape = input_details[0]['shape']
        img = Image.open(image_path).convert('RGB').resize((input_shape[1], input_shape[2]))
        input_data = np.expand_dims(img, axis=0)
        input_data = input_data.astype(np.float32) / 255.0

        # Perform inference
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        output_data = interpreter.get_tensor(output_details[0]['index'])

        # Debugging: Print raw output data
        print("Raw Output Data:", output_data)

        # Get the predicted class (modify this based on your model output)
        predicted_class = np.argmax(output_data)

        # Debugging: Print additional information
        print("Predicted Class:", predicted_class)

        # Return the prediction as JSON along with the image path and raw output
        return jsonify({'predicted_class': int(predicted_class), 'image_path': image_path, 'raw_output': output_data.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
