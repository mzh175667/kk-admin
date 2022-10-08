import Rating from "../rating/Rating";
import ReviewCard from "../review_card/ReviewCard";
import Reviews from "../reviews/Reviews";

const ReviewCardsContainer = (props) => {
  let seller_communication_rating_sum = 0;
  let service_as_described_rating_sum = 0;
  props.reviews.forEach((review) => {
    seller_communication_rating_sum += review.rating.seller_communication_level;
    service_as_described_rating_sum += review.rating.service_as_described;
  });
  const seller_communication_avg_rating = (
    seller_communication_rating_sum / props.reviews.length
  ).toFixed(1);
  const service_as_described_avg_rating = (
    service_as_described_rating_sum / props.reviews.length
  ).toFixed(1);
  return (
    <>
      <div className="d-flex">
        <h5 className="fw-bold me-2">Reviews</h5>
        <Reviews reviews={props.reviews} />
      </div>
      <div className="mt-3">
        <h6 className="fw-bold">Rating Breakdown</h6>
        <div className="row mt-3">
          <div className="col-sm-6 mb-2">
            <h6 className="my-auto">Seller communication level</h6>
          </div>
          <div className="col-sm-6 mb-2">
            <div className="d-flex">
              {props.reviews.length > 0 ? (
                <>
                  <Rating rating={seller_communication_avg_rating} />
                  <span>{seller_communication_avg_rating}</span>
                </>
              ) : (
                <span className="rating-color">N/A</span>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 mb-2">
            <h6 className="my-auto">Service as described</h6>
          </div>
          <div className="col-sm-6 mb-2">
            <div className="d-flex">
              {props.reviews.length > 0 ? (
                <>
                  <Rating rating={service_as_described_avg_rating} />
                  <span>{service_as_described_avg_rating}</span>
                </>
              ) : (
                <span className="rating-color">N/A</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        {props.reviews.map((review, i) => {
          return <ReviewCard review={review} key={i} />;
        })}
      </div>
    </>
  );
};

export default ReviewCardsContainer;
