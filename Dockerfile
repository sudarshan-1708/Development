FROM node:14

RUN mkdir -p /aap/src

WORKDIR /app/src

COPY package.json .

RUN npm install -y
RUN npm run build

COPY . .

EXPOSE 3000

CMD ["npm", "start"]