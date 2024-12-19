# Step 1: Set up the base image (Node.js with build tools)
FROM node:18 as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm cache clean --force
RUN npm install

# Step 4: Copy the rest of the app files and build for production
COPY . .
RUN npm run build

# Step 5: Serve the built React app using Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Step 6: Expose port 80
EXPOSE 80

# Step 7: Run Nginx
CMD ["nginx", "-g", "daemon off;"]
