FROM node:18.12.1
WORKDIR /usr/dist/eventsystem
COPY dist/* ./
EXPOSE 3000
CMD [ "npm", "start" ]