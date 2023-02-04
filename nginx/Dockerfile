FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

# COPY ./templates/default.conf.template /etc/nginx/templates/default.conf.template

COPY nginx.conf /etc/nginx/conf.d/
