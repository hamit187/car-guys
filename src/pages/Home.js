import classes from './Home.module.scss';

const Home = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper__img}></div>
      <div className={classes.wrapper__text}>
        <h1>Welcome to CarGuys</h1>
      </div>
    </div>
  );
};

export default Home;
