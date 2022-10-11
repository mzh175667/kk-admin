import TimeTable from "../index";
const Developers = ({ checkInNotifications, checkOutNotifications }) => {
  return (
    <>
      <h4>Developers</h4>
      <TimeTable
        developer={true}
        internee={false}
        checkInNotifications={checkInNotifications}
        checkOutNotifications={checkOutNotifications}
      />
    </>
  );
};

export default Developers;
