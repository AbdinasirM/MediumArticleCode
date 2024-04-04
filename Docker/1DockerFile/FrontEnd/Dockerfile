# FrontEnd Docker file

# Use the lightweight nginx web server image from Docker Hub
FROM nginx:alpine

# Copy the HTML and JavaScript files into the container's HTML directory
COPY . /usr/share/nginx/html


# Expose port 80 for the web server to run
EXPOSE 80

# Command to run the nginx web server
CMD ["nginx", "-g", "daemon off;"]
