# Planning télétravail

Permet à une équipe de s'organiser pour le télétravail. Chaque membre peut modifier le planning sans restrictions.

![alt text](https://github.com/doelia/planning-teletravail/blob/main/_doc/screenshot.png?raw=true)

# Développement
```
mkdir ./var
export USERNAMES="Stéphane,John,Doe"
npm install
node app.js
```

# Production (avec docker)
```
export USERNAMES="Stéphane,John,Doe"
docker pull doelia/planning-teletravail
docker run -p 3000:3000 -d --rm \
    -e USERNAMES=$USERNAMES \
    -v $(pwd)/planning-datas:/usr/src/app/var \
    --name planning-teletravail \
    doelia/planning-teletravail
```
