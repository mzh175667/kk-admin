import "./ImageSlider.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const ImageSlider = ({ slides, id }) => {
  if (!id) {
    id = "id";
  }
  const carousel_items = slides.map((slide, i) => {
    if (i === 0) {
      return (
        <div className="carousel-item active" key={i}>
          <img src={slide} alt="Los Angeles" className="d-block w-100" />
        </div>
      );
    } else {
      return (
        <div className="carousel-item" key={i}>
          <img src={slide} alt="Los Angeles" className="d-block w-100" />
        </div>
      );
    }
  });

  return (
    <div id={`slider${id}`} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">{carousel_items}</div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#slider${id}`}
        data-bs-slide="prev"
        style={{ fontSize: "22px" }}
      >
        <ArrowBackIcon className="arrowIcon" />
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#slider${id}`}
        data-bs-slide="next"
      >
        <ArrowForwardIcon className="arrowIcon" />
      </button>
    </div>
  );
};

export default ImageSlider;
