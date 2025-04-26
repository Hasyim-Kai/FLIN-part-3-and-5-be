### Create .env file with this content
`JWT_SECRET=ini-adalah-rahasia-jwt
PORT=8000
DATABASE_URL="postgresql://postgres:@localhost:5432/flin-tht"`
here i used the postgresql DB with 
- version : 15
- port : 5432
- username : postgres
- no password

#### INSTALLATION

1. run `npm i`
2. ensure postgresql running
3. run `npx prisma generate`
4. run `npx prisma migrate dev --name init`
5. run `npm run dev`
6. then run the FE to test the app


#### API route

```
├── api/v1/             # Base API route for version 1
│   └── auth/           # Authentication-related endpoints
│   │   └── login       # POST: Authenticate user and return a JWT token
│   │   └── register    # POST: Register a new user
│   │   └── me          # GET: Retrieve the authenticated user's details
│   └── leads/          # Lead management endpoints
│       └── /           # GET: Retrieve all leads
│       └── /           # POST: Create a new lead
```