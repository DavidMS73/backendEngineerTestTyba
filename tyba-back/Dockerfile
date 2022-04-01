# Node version
FROM node:16.14.2-alpine

# Create working directory
RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

#Timezone
ENV TZ=America/Bogota

# Copy package json for use cache efficiently
COPY package.json ./

# Assign user
USER node

# Install app dependencies
RUN npm install

# Copying required files from file system to container file system
COPY --chown=node:node . .

# Expose port
EXPOSE 3000

# Command to run when instantiate an image
CMD [ "npm", "start" ]