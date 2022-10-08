import "./Packages.scss";

const Packages = ({ packages }) => {
  return (
    <>
      <ul className="nav nav-tabs nav-justified border-0">
        <li className="nav-item">
          <a
            href="#basic"
            className="nav-link active font-w-700"
            data-bs-toggle="tab"
          >
            Basic
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#standard"
            className="nav-link font-w-700"
            data-bs-toggle="tab"
          >
            Standard
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#premium"
            className="nav-link font-w-700"
            data-bs-toggle="tab"
          >
            Premium
          </a>
        </li>
      </ul>
      <div className="tab-content pt-3 border">
        <div className="tab-pane fade show active" id="basic">
          <div className="px-3">
            <h5>{packages.basic.name}</h5>
            <p>
              <small>{packages.basic.description}</small>
            </p>
            <h6>Features</h6>
            <ul className="ps-3">
              {packages.basic.features.map((feature, i) => {
                return <li key={i}>{feature}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className="tab-pane fade" id="standard">
          <div className="px-3">
            <h5>{packages.standard.name}</h5>
            <p>
              <small>{packages.standard.description}</small>
            </p>
            <h6>Features</h6>
            <ul className="ps-3">
              {packages.standard.features.map((feature, i) => {
                return <li key={i}>{feature}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className="tab-pane fade" id="premium">
          <div className="px-3">
            <h5>{packages.premium.name}</h5>
            <p>
              <small>{packages.premium.description}</small>
            </p>
            <h6>Features</h6>
            <ul className="ps-3">
              {packages.premium.features.map((feature, i) => {
                return <li key={i}>{feature}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Packages;
