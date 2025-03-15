# Use an official Node.js runtime as a parent image
FROM node:20-buster

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5173

# Serve the application with a fallback to index.html for all routes
CMD ["serve", "-s", "build", "-l", "5173"]