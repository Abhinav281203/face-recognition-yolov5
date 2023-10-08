##Face Recognition Web Application with YOLOv5 and MERN Stack

This web application leverages deep learning techniques, specifically the YOLOv5 model, to perform face recognition. It allows users to upload an image, which is then processed by the model to recognize and identify individuals if they have been trained with a set of images. To fully comprehend and use this code, users should have knowledge of data splitting and model training. The resulting model weights should be stored in a "static" folder within the same directory as the YOLOv5 code.

This application is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, enabling the creation of a full-stack solution that integrates deep learning into the backend. To use the application, individuals should replace the necessary credentials in the backend files to connect to their own database. Users need to register in the database to upload images for recognition, and dedicated login and signup pages have been designed for this purpose.

#Important Commands:

Backend Setup (Flask):
  Navigate to the flask directory.
  Run the following command to start the backend server:
  python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000


Frontend Setup:
  Navigate to the frontend directory.
  Start the frontend application using the following command:
  npm start

  
Backend Server (Node.js):
  Navigate to the backend directory.
  Start the backend server by running:
  node index.js
  This well-structured code allows users to easily set up and deploy a face recognition web application using YOLOv5 and the MERN stack.
