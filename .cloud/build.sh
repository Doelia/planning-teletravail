set -e

image=planning-teletravail
docker build -f ./.cloud/Dockerfile -t $image .

docker tag $image:latest doelia/$image:latest

docker login
docker push doelia/$image:latest
