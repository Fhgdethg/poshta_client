export const getReportDate = () =>
  `${new Date().toLocaleDateString()} ${
    new Date().toTimeString().split(' ')[0]
  }`;

export const generateReportBody = (
  eventDescription: string,
  reportID?: number,
) => ({
  eventDescription,
  reportID,
  date: getReportDate(),
});
