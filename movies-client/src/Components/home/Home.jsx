import Hero from "../hero/Hero";

function Home({ movies }) {
  console.log(movies);
  return (
    <div>
      <Hero movies={movies} />
    </div>
  );
}

export default Home;
