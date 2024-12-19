# Step 1: Set up the base image (Node.js in this case)
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application into the container
COPY . .

# Step 6: Expose the port your app runs on (e.g., port 3000 for Express)
EXPOSE 3000

# Step 7: Run your app
CMD ["npm", "start"]
