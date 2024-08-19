jest.mock("../resources/user/UserService.js");
jest.mock("../resources/expense/ExpenseRepository.js");
jest.mock("../resources/expense/ExpenseService.js", () => ({
  ...jest.requireActual("../resources/expense/ExpenseService.js"),
  calculateNumberOfDays: jest.fn(),
  updateUserDays: jest.fn(),
}));
jest.mock("../common/helper/Logger.js");
