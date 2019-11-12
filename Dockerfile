FROM node:12-alpine

# Create our app folder
RUN mkdir /api

# Copy our app into the app folder
COPY . /api

# Make /api the default workdir
WORKDIR /api

RUN npm install --only=production
EXPOSE 3000

CMD ["npm", "run", "start"]
