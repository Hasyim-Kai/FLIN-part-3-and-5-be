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