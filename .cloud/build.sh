set -e

image=planning-teletravail
docker build -f ./.cloud/Dockerfile -t $image .

$(aws ecr get-login --no-include-email --region eu-west-3)
docker tag $image:latest 706247672606.dkr.ecr.eu-west-3.amazonaws.com/$image:$sha
docker tag $image:latest 706247672606.dkr.ecr.eu-west-3.amazonaws.com/$image:$branch
docker push 706247672606.dkr.ecr.eu-west-3.amazonaws.com/$image:$sha
docker push 706247672606.dkr.ecr.eu-west-3.amazonaws.com/$image:$branch
