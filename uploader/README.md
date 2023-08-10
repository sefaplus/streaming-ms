Start compose

```bash
docker compose up --build
```

Build shared library

```bash
cd shared

yarn run package

cd <repository to upgrade>

yarn run shared
```

Backend is located at:

http://localhost:80/api/
