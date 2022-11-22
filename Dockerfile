FROM node:18.12.1
WORKDIR /usr/dist/eventsystem
COPY src ./src/
COPY tsconfig.json ./tsconfig.json
RUN npm install --prefix src/ \
&& npm install -g typescript@4.9.3 \
&& tsc \
&& cp -r src/node_modules dist/ \
&& cp -r src/view dist/ \
&& cp -r src/package*.json dist/ \
&& rm -rf src \
&& mv dist/* ./ \
&& rm -rf dist
COPY .env ./
EXPOSE 3000
CMD ["npm", "start"]