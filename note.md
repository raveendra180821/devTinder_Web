# devTinder API's

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- GET /profile/edit
- GET /profile/password

# AWS deplyoment steps

## frontend

    - cd <frontend project>
    - npm install
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - npm run build (create a "dist" file)
    ==>  [copy code from dist (build files) to /var/www/html]
    - sudo scp -r dist/* /var/www/html
    - allow the port :80 of the aws instance (need to the port in aws security groups)

## backend

    - cd <backend project>
    - npm install
    - npm install pm2 -g [process manager to keep the application (backend server) online 24/7]
    - pm2 start npm --name "devTinder" -- start
    - pm2 logs
    - pm2 list
    ==> other command [pm2 flush "devTinder"  [to clear the logs], pm2 stop "devTinder", pm2 delete "devTinder"]
    ==> Now edit the nginx config file
    - sudo nano /etc/nginx/sites-available/default

        server {
            root /var/www/html;
            index index.html;

            location /api/ {
                proxy_pass http://localhost:3000/;
                proxy_http_version 1.1;

                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
            }

            location / {
                try_files $uri $uri/ /index.html;
            }

        }

    - sudo nginx -t
    - sudo systemctl reload nginx


# craete .env in production (AWS)

    - sudo nano .env 

# config websocket

## Server API

    - install socket.io