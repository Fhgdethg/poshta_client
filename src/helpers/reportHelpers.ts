export const generateReportBody = (
  eventDescription: string,
  reportID?: number,
) => ({
  eventDescription,
  reportID,
  date: `${new Date().toLocaleDateString()} ${
    new Date().toTimeString().split(' ')[0]
  }`,
});
