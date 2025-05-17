## 

Project uses a Cloudflared tunnel to expose port 8080 as 80.

```
cloudflared login
cloudflared tunnel create <your-tunnel>
cloudflared tunnel route dns <your-tunnel> app.example.com
```

If you don't want to use it, you can delete cloudflared from docker-compose.yml and open necessary ports for nginx-server. For SSL set below lines to nginx.prod.conf

```
server {
        listen 443 ssl;
        server_name <your-domain.com> <your-domain.com>;

        ssl_certificate /etc/ssl/<your-cert>;
        ssl_certificate_key /etc/ssl/<your-key>;

        location / {
            root /usr/share/nginx/html;
            index index.html;
            try_files $uri $uri/ /index.html;
        }
    }
```