# Article App

This is a simple article application built with React, TypeScript, and Docker. The application is containerized into four Docker containers: a database, Nginx, a frontend, and a backend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker
- Docker Compose
- Node.js
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/Zlahrouni/pano-cloud-aws.git
```

2. Navigate to the project directory
```bash
cd pano-cloud-aws
```

3. Build and run the Docker containers and get a coffee ☕️...
```bash
docker-compose up --build
```

### Applying Changes to the Frontend
If you make changes to the frontend, you need to rebuild the frontend Docker image. Navigate to the frontend directory and run:
```bash
npm run build
```
This will create a production-ready build of your frontend application, which will be used by the Docker container. 

### DOCKER SWARM STEP
1. Docker Swarm Network Initialisation
2. Services Deployment

We worked on this step in the branch `feat/swarm`.

Before launching the following commands, open the `./launch.sh` and replace `<github-token>` with your github access token, then run:

```bash
git checkout feat/swarm
```

```bash
chmod +x ./launch.sh`
```

```bash
`./launch.sh`
```

The `launch.sh` script launches both the initialisation and the deployment.

We didn't merge this branch into the main branch due to an issue with deploying the nginx service. Consequently, we decided to proceed with the subsequent steps of the practical work by deploying the app directly from the docker-compose file, bypassing the use of swarm.