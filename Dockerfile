# Use an official Node.js runtime as the base image
FROM node:lts-alpine3.19

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false

RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

COPY pnpm-lock.yaml ./

# Install Node.js dependencies
# RUN pnpm install

RUN pnpm install

COPY . .

RUN pnpm prisma generate

# Bundle app source
RUN pnpm build

# Create necessary directories with proper permissions
RUN mkdir -p /app/static/uploads && \
    chmod 755 /app/static/uploads

# Expose the port on which your app runs
EXPOSE 3000

# Command to run your Node.js application
CMD ["node", "build/index.js"]