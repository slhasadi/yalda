# build environment
FROM gitlab.keylid.com:5005/tika/infra/base_image/node:10.17 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ayneh/package.json /usr/src/app/package.json
RUN npm install
RUN npm install react-scripts@1.1.1 -g

COPY ayneh /usr/src/app
RUN GENERATE_SOURCEMAP=false npm run build

# production environment
FROM gitlab.keylid.com:5005/tika/infra/base_image/nginx:1.17-alpine as release

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
