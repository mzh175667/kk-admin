import TimeTable from "../index";
const Internees = ({ checkInNotifications, checkOutNotifications }) => {
  return (
    <>
      <h4>Internees</h4>
      <TimeTable
        developer={false}
        internee={true}
        checkInNotifications={checkInNotifications}
        checkOutNotifications={checkOutNotifications}
      />
    </>
  );
};

export default Internees;
