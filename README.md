# Planning télétravail

# Développement
```
mkdir ./var
export USERNAMES="Stéphane,Vincent,Patrice"
npm install
node app.js
```

# Docker
```
export USERNAMES="Stéphane,Vincent,Patrice"
docker pull doelia/planning-teletravail
docker run -p 3000:3000 -d --rm \
    -e USERNAMES=$USERNAMES \
    -v $(pwd)/planning-datas:/usr/src/app/var \
    --name planning-teletravail \
    doelia/planning-teletravail
```
