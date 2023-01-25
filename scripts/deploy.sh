REPOSITORY=/home/ubuntu/app
cd $REPOSITORY

echo "Shutting down any running environments"
docker-compose down

echo "docker-compose start"
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build