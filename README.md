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

### Terraform and Ansible STEP

***You can find the preview the this step in [step3-docker+terraform.mp4](assets/step3-docker+terraform.mp4)*** <br>
This step is worked on in the branch `feat/terraform-ansible`.

to run the terraform and ansible step you need to pull the branch `feat/terraform-ansible` and follow these instructions (for mac and linux users you can run the commands directly, for windows users you need to replace `${PWD}` with `$PWD`) :

```bash
docker container run -it --rm -v ${PWD}:/app -w /app hashicorp/terraform init
````

```bash
docker container run -it --rm -v ${PWD}:/app -w /app hashicorp/terraform plan
```

To run the terraform apply command, you need to have the AWS credentials configured on your machine. You can do this by changing the 3rd and 4th lines of the `main.tf` file with your AWS access key and secret key.
```bash
docker container run -it --rm -v ${PWD}:/app -w /app hashicorp/terraform apply
```

Now that we have the infrastructure up and running, we can proceed with the ansible playbook to deploy the app on the EC2 instance.

Before running the following commend, you need to go to in line to of the file `inventory.ini` and replace the `the first part with your amazon instance` with the path to your private key.
```bash
docker container run --rm -v ${PWD}:/playbooks ansible:2.16 ansible-playbook -i inventory.ini playbook.yml --private-key /path/to/your/private/key.pem
```

