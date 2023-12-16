FROM node:14
WORKDIR /Proyecto
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]
