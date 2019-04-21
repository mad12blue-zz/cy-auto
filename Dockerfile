FROM cypress/base:8

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app
ADD ./package.json /usr/src/app

RUN cd /usr/src/app && yarn install

ADD . /usr/src/app

CMD ["yarn", "cypress:run:ci"]