FROM gitlab.keylid.com:5005/tika/infra/base_image/node:16.13.2

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apt-get update && apt-get install --no-install-recommends -y libc6-dev

WORKDIR /app
COPY landings/package.json ./
COPY landings/.npmrc ./

ENV PATH /app/node_modules/.bin:$PATH
RUN yarn install

ARG PATH_ENVS=production
COPY landings .
RUN echo "NEXT_PUBLIC_PATH_ENVS=${PATH_ENVS}" >> .env.production
RUN echo "NEXT_PUBLIC_APP_VERSION=1" >> .env.production
RUN yarn build
RUN yarn global add pm2

ARG APP_ENV=production
ARG NODE_ENV=production
ARG PORT=3000

ENV APP_ENV=${APP_ENV} \
    NODE_ENV=${NODE_ENV} \
    PORT=${PORT} \
# This allows to access Graphql Playground
    APOLLO_PRODUCTION_INTROSPECTION=false

RUN mkdir -p /app/.next/cache/images

EXPOSE ${PORT}


#CMD ["npm", "start"]
#CMD ["sh", "-c", "pm2-runtime start npm --name landings -- start"]
