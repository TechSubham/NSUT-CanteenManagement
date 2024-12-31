const express = require('express');
const cors = require('cors');

const { createBeverage, getAllBeverages, getBeverageById , getMealsById , getAllMeals , createMeal, createSnacks , getAllSnacks , getSnacksById } = require('./queries');
const { error } = require('console');

const app = express();
const port = 5050;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Everyone this is the backend server for the project');
});

app.post('/beverages', async (req, res) => {
  try {
      const newBeverage = await createBeverage(req.body);
      res.status(201).json(newBeverage);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/meals' , async(req,res)=>{
    try{
        const newMeal = await createMeal(req.body);
        res.status(201).json(newMeal);
    }catch(err){
        console.error(err);
        res.status(500).json({error : 'Intenal Server error'})
    }
})

app.post('/snacks', async (req, res) => {
    try{
        const newSnack = await createSnacks(req.body);
        res.status(201).json(newSnack);
    }catch(error){
        console.error(error);
        res.status(500).json({error : 'Internal Server error'})
    }
})

app.get('/beverages', async (req, res) => {
  try {
      const beverages = await getAllBeverages();
      res.json(beverages);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/snacks', async(req,res)=>{
    try{
        const snacks = await getAllSnacks();
        res.json(snacks);
    }catch(error){
        console.error(error);
        res.status(500).json({error : 'Internal Server error'})
    }
})

app.get('/meals',async (req,res)=>{
    try{
        const meals = await getAllMeals();
        res.json(meals);
    }catch(error){
        console.error(error);
        res.status(500).json({error : 'Internal server error'});
    }
})

app.get('/beverages/:id', async (req, res) => {
  try {
      const beverage = await getBeverageById(req.params.id);
      if (beverage) {
          res.json(beverage);
      } else {
          res.status(404).json({ error: 'Beverage not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/snacks/:id', async(req,res)=>{
    try {
        const snack = await getSnacksById(req.params.id);
        if (snack) {
            res.json(snack);
            } else {
                res.status(404).json({ error: 'Snack not found' });
                }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/meals/:id',async(req,res)=>{
    try{
        const meal = await getMealsById(req.params.id);
        if(meal){
            res.json(meal);
            }else{
                res.status(404).json({error : 'Meal not found'})
                }
    }catch(error){
        console.error(error);
        res.status(500).json({error : 'Internal server error'})
    }
})


app.listen(port, () => {
    console.log(`Backend Server Started on port ${port}`);
});