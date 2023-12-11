import userRouter from './user-route.js';
import transactionRouter from './transaction-route.js';
import sourceRouter from './source-route.js';
import categoryRouter from './category-route.js';
import queryRouter from './query-route.js';
import authRouter from './auth-router.js';
import { authenticate } from '../services/auth-service.js';
import { errorHandler } from '../services/error-service.js';



export default (app)=>{
    //app.use('/users',userRouter);
    app.use(authRouter);
    app.use("/users", authenticate, userRouter);
    app.use('/transactions', transactionRouter); 
    app.use('/sources', sourceRouter);
    app.use('/categories', categoryRouter);
    app.use('/queries', queryRouter);
    
    
    app.use(errorHandler);
}


