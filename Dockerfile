# Define image.
FROM docker.io/node:lts-alpine as deps
# Define app directory.
WORKDIR /apps/api
# Copy dist.
COPY package.json .
# Install dependencies
RUN npm install --production --ignore-scripts

# Define image.
FROM docker.io/node:lts-alpine as runner
WORKDIR /app
# Copy sources.
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY /dist/apps/api ./dist
# Set user.
RUN chown -R node:node .
USER node
# Configure exposed port.
# Define startup command.
CMD [ "node", "./dist/main.js" ]