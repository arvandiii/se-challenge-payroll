FROM node:18-alpine

ARG PORT
ENV PORT=$PORT

COPY package*.json ./
RUN npm install
RUN npm install pm2@latest -g
COPY . .

EXPOSE $PORT

# RUN npm run test

CMD ["pm2-runtime", "start", "./src/app.js"]