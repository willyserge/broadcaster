const RedFlag = {
  findById(id, userId, incidents) {
    return incidents.find((incident) => incident.id === id && incident.createdBy === userId);
  },
};
export default RedFlag;
