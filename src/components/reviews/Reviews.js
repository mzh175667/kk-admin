import Rating from "../rating/Rating";

const Reviews = (props) => {
  const reviews = props?.reviews;
  let avg_rating = 0;
  let rating_sum = 0;
  if (reviews?.length > 0) {
    reviews.forEach((review) => {
      rating_sum += review.rating.average_rating;
    });
    avg_rating = (rating_sum / reviews.length).toFixed(1);
  }

  if (reviews?.length > 0) {
    return (
      <ul className="d-flex p-0 my-1" style={{ listStyleType: "none" }}>
        <Rating rating={avg_rating} />
        <li className="ms-1">
          <span>({reviews.length})</span>
        </li>
      </ul>
    );
  } else {
    return <span className="rating-color my-1">N/A</span>;
  }
};

export default Reviews;
