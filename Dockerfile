FROM node:18-alpine

WORKDIR /webapp

# COPY package.json .

# RUN npm install

EXPOSE 5173

# CMD ["npm", "run", "start"]

CMD tail -f /dev/null