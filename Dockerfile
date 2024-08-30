# Use the official Node.js image as the base image
FROM node:18

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for npm
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Copy the init script to the container
COPY run.sh ./

# Define the port your app will run on
ENV PORT 3000

# Expose the port that will be used
EXPOSE $PORT

# Give the script execution permission
RUN chmod +x run.sh

# Start your app
CMD ["./run.sh"]