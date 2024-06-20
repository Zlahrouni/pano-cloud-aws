#!/bin/bash

join_swarm() {
    local node_type=$1
    local instance_name=$2

    # Check if the node_type is valid
    if [[ "$node_type" != "worker" && "$node_type" != "manager" ]]; then
        echo "Invalid node type. Use 'worker' or 'manager'."
        return 1
    fi

    # Get the join token command based on the node type
    if [[ "$node_type" == "manager" ]]; then
        output=$(multipass exec manager1 -- docker swarm join-token manager)
    else
        output=$(multipass exec manager1 -- docker swarm join-token worker)
    fi
    join_command=$(echo "$output" | grep "docker swarm join" | sed -e 's/^[[:space:]]*//')

    # Check if the join command was extracted successfully
    if [[ -n "$join_command" ]]; then
        echo "Executing join command on instance $instance_name..."
#        echo "$join_command"
        # Execute the join command on the specified instance using SSH
        eval "multipass exec $instance_name -- $join_command"
    else
        echo "Error: Unable to extract join command."
        return 1
    fi
}

multipass launch --name manager1 docker
multipass exec manager1 -- bash -c "sudo apt-get update"
multipass exec manager1 -- bash -c "sudo apt-get install -y sshfs"

multipass launch --name manager2 docker
multipass launch --name worker1 docker
multipass launch --name worker2 docker

multipass exec manager1 -- docker swarm init
multipass exec manager1 -- docker pull registry:latest
multipass exec manager1 -- docker service create --name registry -p 5000:5000 registry

# Please, add your <github-token> to clone the current project from github
multipass exec manager1 -- git clone --verbose https://<github-token>@github.com/Zlahrouni/pano-cloud-aws.git

join_swarm "manager" "manager2"
join_swarm "worker" "worker1"
join_swarm "worker" "worker2"

# swarm images need to be built and pushed to the registry before launching the stack
multipass exec manager1 -- bash -c "cd pano-cloud-aws && git checkout feat/swarm"
multipass exec manager1 -- bash -c "cd pano-cloud-aws && chmod +x build_push_images.sh && ./build_push_images.sh"

multipass shell manager1
docker-compose -f ./pano-cloud-aws/docker-compose.yml build

# deployment step
docker stack deploy -c ./pano-cloud-aws/docker-compose.yml mastack
