FROM alpine:3.18

ADD . /home/react-app
WORKDIR /home/react-app
RUN apk add --update npm
RUN npm run build