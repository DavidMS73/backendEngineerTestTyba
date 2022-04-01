# Backend Engineer Test Tyba

## Tecnologías usadas
Express, MongoDB, NodeJS

## Ejecución
Una vez descargado el proyecto ingresar a la carpeta tyba-back

1. Crear .env con las variables: DB_HOST (la URL completa brindada por Mongo como conexión), DB_NAME (nombre de la base de datos), TOKENSECRET (secreto con el que se cifra el token JWT), REFRESHTOKENSECRET (secreto con el que se cifra el token de refresh JWT), PRIVATEKEYTOKENAPI (llave de Google para consumir la API de Mapas), RADIUS (radio a partir del punto asignado con el que se quieren encontrar los restaurantes)

2. El proyecto se ejecuta con el comando `docker-compose up -d`. Este ejecutará el proyecto en el puerto 8000. En caso de que quiera realizar ejecución sin docker ejecutar el comando `npm start`, el cual desplegará el proyecto en el puerto 3000.

3. Bajo la carpeta collections se agrega una colección de Postman, para la cual se debe crear la variable global `host`, donde se asigna el valor `localhost:3000` o `localhost:8000` según corresponda.

## Próximos pasos
1. Documentación más elaborada
2. Pruebas unitarias de los servicios.
3. Mejorar respuesta de la base de datos en el historial para no traer todos los registros, sino que vengan paginados. 

## Endpoints

### Crear usuario
#### POST {{host}}/users/register
Body request
```
{
    "username": "",
    "name": "",
    "password": "",
    "repeat_password": ""
}
```

Body Response - uno de los casos
```
{
    "success": false,
    "message": "User already exists"
}
```

#### POST {{host}}/users/login
Body request
```
{
    "username": "",
    "password": ""
}
```

Body Response - uno de los casos
```
{
    "_id": "6247621661d4e46730dc448b",
    "username": "",
    "name": "",
    "role": "",
    "token": "",
    "refreshToken": "",
    "status": "Logged in"
}
```


#### POST {{host}}/users/token - refrescar el token
Body request
```
{
    "refreshToken": ""
}
```

Body Response - uno de los casos
```
{
    "token": ""
}
```

#### GET {{host}}/users - obtener todos los usuarios - solo admin

Body Response - uno de los casos
```
[
    {
        "_id": "",
        "username": "",
        "role": "admin"
    },
    {
        "_id": "",
        "username": "",
        "role": "none"
    }
]
```

#### DELETE {{host}}/users/logout - cerrar sesión
Body request
```
{
    "refreshToken": ""
}
```

Body Response - uno de los casos
```
[
    {
        "_id": "",
        "username": "",
        "role": "admin"
    },
    {
        "_id": "",
        "username": "",
        "role": "none"
    }
]
```


#### GET {{host}}/restaurants/?latitude=26.111809&longitude=-80.135394 - obtener restaurantes cercanos - debe enviar un token de tipo Bearer

Body Response
```
{
    "success": false,
    "message": "..."
}
```


#### GET {{host}}/history - obtener historial - solo admin

Body Response - uno de los casos
```
[
    {
        "_id": "",
        "username": "",
        "name": "",
        "role": "admin",
        "iat": ,
        "exp": ,
        "userid": "",
        "url": "/?latitude=26.111809&longitude=-80.135394",
        "date": "2022-04-01T22:53:20.410Z"
    },
    {
        "_id": "",
        "username": "",
        "name": "",
        "role": "admin",
        "iat": ,
        "exp": ,
        "userid": "",
        "url": "/?latitude=26.111809&longitude=-80.135394",
        "dateRequestAPI": "2022-04-01T23:02:24.528Z"
    }, ...
]
```
