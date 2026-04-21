import express from "express";
import dotenv from "dotenv/config.js";
import authRoutes from './routes/authRoute.js';



const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

try{
    app.listen(process.env.PORT || 4000, () => {
        console.log('listening to port ${process.env.PORT || 4000}...');
    })
}catch(e){
    console.log(e);
}

app.use('/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
