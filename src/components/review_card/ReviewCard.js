import Rating from "../rating/Rating";

const ReviewCard = (props) => {
  const review_datetime = new Date(props.review.created_at);
  const review_date = `${review_datetime.getDate()}-${
    review_datetime.getMonth() + 1
  }-${review_datetime.getFullYear()}`;
  return (
    <div className="border rounded px-3 py-2">
      <div className="d-flex">
        <img src={props.review.buyer.image} className="avatar" alt="Buyer" />
        <h6 className="my-auto ms-2">
          {props.review.buyer.firstname} {props.review.buyer.lastname}
        </h6>
      </div>
      <div className="d-flex p-0 m-0">
        <Rating rating={props.review.rating.average_rating} />
        {props.review.rating.average_rating}
      </div>
      {props.review.image ? (
        <div className="row">
          <div className="col-lg-9 col-sm-8">
            <p className="my-2">{props.review.review}</p>
          </div>
          <div className="col-lg-3 col-sm-4">
            <img
              src={props.review.image}
              alt={props.review.image}
              width="100%"
            />
          </div>
        </div>
      ) : (
        <p className="my-2">{props.review.review}</p>
      )}

      <p className="mb-0">
        <small> Published: {review_date}</small>
      </p>
    </div>
  );
};

export default ReviewCard;
