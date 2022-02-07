import express, {Request, Response} from 'express';
import feature1 from './feature1';
import feature2 from './feature2';
import feature3 from './feature3';
import feature4 from './feature4';

const app = express();
const port = 9999;

// start the Express server
app.listen(port, () => {
    console.log( `server started at http://localhost:${port}` );
});

// define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
    res.send( "Hello from Vineela!" );
} );

app.get('/cart', async (req: Request, res: Response) => {
    try {
        const myCart = await feature1();
        return res.json({
            success: true,
            data: myCart
        });
    }
    catch(error){
        return res.json({
            success: false,
            error: error
        });
    }
});

feature1();