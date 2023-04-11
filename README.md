# Face Recognition using CNN (Web Application)

This code is all about face recognition using deep learning by accepting an image and recognizing the person in it if at all it is trained by the images of the individual. To understand the above code and use the Yolov5 model, one has to have knowledge about splitting the data and training the model, and the resultant weights should be stored in a "static" folder as in the same directory Yolov5 resides.

The code uses MERN stack to create a full stack application and integrate it with the deep learning model in the backend. The necessary credentials of the database of any individual should be replaced by themselves in the backend files. The user needs to be registered in the DB to upload a picture to feed the model. Respective Login and Signup pages have been designed to perform the tasks.

### Few important commands:

cd flask
- python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000 (to run the model in backend)

cd frontend
- npm start (to start frontend)

cd backend
- node index.js (to start backend)
