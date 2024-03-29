# Use Node.js as the base image
FROM node:18-alpine
# ENV NODE_VERSION 18.12.1

# Set the working directory to /app
WORKDIR /app

# copy anything in here into app directory above ./ = .
COPY package.json yarn.lock ./
# like npm ci (clean install)
RUN yarn install --frozen-lockfile
COPY . .

RUN yarn build
# RUN yarn db:migrate
# RUN yarn prod

# Expose port 3005 for the NestJS application
EXPOSE 3005

# Start the NestJS application
# CMD ["yarn", "db:migrate"]
CMD ["yarn", "prod"]
