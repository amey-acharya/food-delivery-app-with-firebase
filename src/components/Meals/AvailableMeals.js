import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async() => {
      const response = await fetch('https://react-demo-1b690-default-rtdb.firebaseio.com/meals.json')
      if (!response.ok) {
        throw new Error('something went wrong')
      }
      const data = await response.json()
      const meals = []
      for(const key in data) {
        meals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMealsData(meals)
      setIsLoading(false)
    }
    fetchData().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    });

  },[])

    if (isLoading) {
      return(<section className={classes.mealsloading}>Loading</section>)
    }
    if (httpError) {
      return(<section className={classes.mealsloading}>{httpError}</section>)
    }

  const mealsList = mealsData.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
