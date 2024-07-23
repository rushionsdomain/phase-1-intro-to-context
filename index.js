function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
  let [date, hour] = dateTime.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10),
  });
  return employee;
}

function createTimeOutEvent(employee, dateTime) {
  let [date, hour] = dateTime.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10),
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find((event) => event.date === date);
  let timeOut = employee.timeOutEvents.find((event) => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  let hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
  let eligibleDates = employee.timeInEvents.map((event) => event.date);
  let payable = eligibleDates.reduce(
    (memo, date) => memo + wagesEarnedOnDate(employee, date),
    0
  );
  return payable;
}

function calculatePayroll(employees) {
  return employees.reduce((memo, employee) => memo + allWagesFor(employee), 0);
}

module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  calculatePayroll,
};
