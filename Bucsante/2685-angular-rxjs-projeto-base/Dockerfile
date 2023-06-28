FROM node:14.17.3-alpine as angular 
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/buscante /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# Testar Imagem 
# docker build -t curso-angular .

# Rodando Container
# docker run -p 8081:80 curso-angular

# Rodando Via Docker Compose
# docker compose up -d