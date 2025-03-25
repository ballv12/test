FROM node:16

RUN apt-get update && apt-get install -y libc6

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]