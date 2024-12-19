# Step 1: Set up the base image (Node.js with build tools)
FROM node:16 as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the React app files
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Serve the app using a simple server (like Nginx or serve)
FROM nginx:alpine

# Step 8: Copy the built React app from the build stage into Nginx's public folder
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 for Nginx
EXPOSE 80

# Step 10: Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
