### Getting Started with Docker

### 1. Cloning the Project Repository

First, clone the project repository from GitHub:
```git clone https://github.com/AbdinasirM/MediumArticleCode/tree/main/Docker```

## 2. Making Changes to Files


**Disclaimer:** These changes are intended for local development only, which is why I've hardcoded the IP addresses.

   a. Open the `main.py` file located in the `backend` directory.

   b. Find the placeholder text "YOUR_IP_HERE" in the `main.py` file and replace it with your computer's IP address.

   c. Save the changes to the `main.py` file.

   d. Similarly, navigate to the `frontend` directory.

   e. Open the relevant file `main.js` in the `frontend` directory.

   f. Look for the placeholder text "YOUR_IP_HERE" in the file and replace it with your computer's IP address.

   g. Save the changes to the file in the `frontend` directory.

   These changes ensure that your backend and frontend components can communicate correctly during local development.

## 3. Creating container for the api:
   make sure you are in the backend directory!
   a. run the following command to create a network that all services to share:
   `docker network create my-network`
   b. run the following command to create a docker image(api):
   `docker build -t my-api-image .`
   c. run the following command to build a container(api):
   `docker run --network my-network  -d -p 8000:8000 my-api-image`

## 4. Creating container for the frontend:
   make sure you are in the backend directory!
   a. run the following command to build create an image (frontend):
   `docker build -t my-frontend-image  .`
   b. run the following command to build a container(frontend):
   `docker run --network my-network -d -p 80:80 my-frontend-image`

## 5. Creating container for the database:
   make sure you are in the database directory!
   a. run the following command to build Create a volume(folder that holds data for docker container even if the docker container/image is remove):
   `docker volume create mongodb_data`
   b. run the following command to build the docker image (database):
   `docker build -t my-mongodb-image . `
   c. run the following command to build a container from the my-mongodb-image and mount the volume to the mongodb using the flag -v to specify the volume to mount (database):
   `docker run --network my-network -d -p 27017:27017 -v mongodb_data:/data/db my-mongodb-image`
