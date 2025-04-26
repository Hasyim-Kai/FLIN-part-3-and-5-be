const router = require("express").Router();
import leadsRoutes from "./user.routes";
import authRoutes from "./auth.routes";

router.use('/auth', authRoutes)
    .use('/leads', leadsRoutes)


export = router;