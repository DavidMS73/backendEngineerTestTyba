# Backend Engineer Test Tyba

## Tecnologías usadas
Express, MongoDB, NodeJS

## Ejecución
Una vez descargado el proyecto ingresar a la carpeta tyba-back

1. Crear .env con las variables: DB_HOST (la URL completa brindada por Mongo como conexión), DB_NAME (nombre de la base de datos), TOKENSECRET (secreto con el que se cifra el token JWT), REFRESHTOKENSECRET (secreto con el que se cifra el token de refresh JWT), PRIVATEKEYTOKENAPI (llave de Google para consumir la API de Mapas), RADIUS (radio a partir del punto asignado con el que se quieren encontrar los restaurantes)

2. El proyecto se ejecuta con el comando `docker-compose up -d`. Este ejecutará el proyecto en el puerto 8000. En caso de que quiera realizar ejecución sin docker ejecutar el comando `npm start`, el cual desplegará el proyecto en el puerto 3000.

3. Se agregan colecciones de Postman, para las cuales debe crear la variable global `host`, donde asigna el valor `localhost:3000` o `localhost:8000` según corresponda.

## Próximos pasos
1. Documentación más elaborada
2. Pruebas unitarias de los servicios.
3. Mejorar respuesta de la base de datos en el historial para no traer todos los registros, sino que vengan paginados. 

## Endpoints