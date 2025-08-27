import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Review from "../reviewform/Review";
import { useEffect } from "react";
import { useRef } from "react";

function Reviews({ getMovieData, movie, reviews, setReviews }) {
  //   console.log(reviews);
  //   console.log(movie);

  const revText = useRef();
  let params = useParams();
  //   console.log(params.movieId);
  const movieId = params.movieId;
  useEffect(() => {
    getMovieData(movieId);
  }, []);
  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current;

    try {
      const response = await api.post("/api/v1/reviews", {
        reviewBody: rev.value,
        imdbId: movieId,
      });

      const updatedReviews = [...reviews, response];

      setReviews(updatedReviews);
      rev.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster || "fallback.jpg"} alt="poster" />
        </Col>
        <Col>
          {
            <Row>
              <Col>
                <Review
                  handleSubmit={addReview}
                  revText={revText}
                  labelText={"Add Review"}
                />
              </Col>
            </Row>
          }
          {movie?.reviewIds?.map((review) => (
            <div key={crypto.randomUUID()}>
              <Row>
                <Col>{review?.body}</Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </div>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
}

export default Reviews;
