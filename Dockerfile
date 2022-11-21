FROM node:18.12.1
WORKDIR /usr/dist/eventsystem
COPY src/* ./src/
COPY tsconfig.json ./tsconfig.json
RUN npm install --prefix src/
RUN tsc
RUN cp -r src/node_modules dist/
RUN cp -r src/view dist/
RUN cp -r src/.env dist/
RUN cp -r src/package*.json dist/
RUN rm -rf src
RUN mv dist/* ./
RUN rm -rf dist
EXPOSE 3000
CMD [ "npm", "start" ]