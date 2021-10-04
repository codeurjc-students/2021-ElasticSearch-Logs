# 2021-ElasticSearch-Logs
## Introduction
ElasticSearch-Logs is a tool that try to improve the Kibana logs service applied to the OpenVidu platform. It provides several facilities in order to improve the user experience.

I will be posting some entries in my [Blog](https://medium.com/@cris.dgrnu), so as you can follow the process of building a big app like this one 

## Architecture
### Backend
ElasticSearch-Logs uses a backend build via API REST in order to limit the users the requests that he can do. In this way, the application has some security mechanism to prevent some type of attacks. The user is thought to only read from the database (at least by the moment), so there is no need to give the user the ability to write into the database.

### Frontend
As a client, Angular is used in order to build a SPA (Single Page Application). This trending frontend technologie enable us to implement best user interfaces to bring a better experience. Also allow us to delegate more responsabilities in the client side, so we have less logic in the server side. 

