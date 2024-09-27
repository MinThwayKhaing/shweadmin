# Use an official Node.js runtime as the base image
FROM node:21.1.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Build the Vue application
RUN npm run build

# Expose the correct port
EXPOSE 5173

# Command to start the application on port 5173
CMD ["npm", "run", "preview", "--", "--port", "5173", "--host"]
