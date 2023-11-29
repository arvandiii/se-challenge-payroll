FROM node:14-alpine

ARG PORT
ENV PORT=$PORT

COPY package*.json ./
RUN npm install
RUN npm install pm2@latest -g
COPY . .

EXPOSE $PORT

CMD ["pm2-runtime", "start", "./src/app.js"]