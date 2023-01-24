import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const getMealsHandler = async () => {
    try {
      const response = await fetch(
        "https://react-http-bd5ca-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      setMeals(data);

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMealsHandler();
  }, []);

  const mealsList = [];

  Object.entries(meals).forEach(([key, value]) => {
    // console.log(key);
    mealsList.push(
      <MealItem
        key={key}
        id={value.id}
        name={value.name}
        description={value.description}
        price={+value.price}
      />
    );
  });

  // const mealsList = DUMMY_MEALS.map((meal) => (
  //   <MealItem
  //     key={meal.id}
  //     id={meal.id}
  //     name={meal.name}
  //     description={meal.description}
  //     price={meal.price}
  //   />
  // ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
