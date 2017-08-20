Good Listens

Find new and exciting podcasts.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. Mongo DB ( https://www.mongodb.com/download-center#enterprise )
2. Node ( https://nodejs.org/en/ )


### Installing

Install package dependencies

Navigate to repo
```
npm install
```

Start locally hosted server

```
npm run dev
```

Get sample data into Mongo:

Using the mongo shell:
```
load("/scripts/initDevDB.js")
```

Open browser, hit localhost:3000 for the stunningly designed login page.
Get podcasts from /api/podcasts

## License

This project is licensed under the MIT License

