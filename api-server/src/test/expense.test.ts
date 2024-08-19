import { Request } from "express";
import { DemandRepository } from "../resources/demand/DemandRepository";
import { DemandService } from "../resources/demand/DemandService";
import { ControllerResponse } from "../common/helper/ControllerResponse";
import { DemandDTO } from "../resources/demand/dto/DemandDTO";
import { Expense, ExpenseType } from "../common/model/Expense";
import { ExpenseService } from "../resources/expense/ExpenseService";
import { ExpenseListDTO } from "../resources/expense/dto/ExpenseListDTO";

jest.mock("../resources/user/UserService.js");
jest.mock("../resources/expense/ExpenseRepository.js");
jest.mock("../resources/expense/ExpenseService.js", () => ({
  ...jest.requireActual("../resources/expense/ExpenseService.js"),
  calculateNumberOfDays: jest.fn(),
  updateUserDays: jest.fn(),
}));
jest.mock("../common/helper/Logger.js");

describe("getAllExpensesByType", () => {
  let req: Partial<Request>;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      query: {
        pageSize: "10",
        pageNumber: "1",
        type: "FOOD",
      },
    };
  });

  test("should return expenses with a specific type", async () => {
    const expense = [
      {
        id: 45,
        startDate: new Date("2024-07-22"),
        endDate: new Date("2024-07-25"),
        motivation: "qsdfqsdf",
        created_at: new Date("2024-07-01"),
        status: "WAITING",
        type: ExpenseType.FOOD,
        number_day: 3,
        idOwner: 1,
        idValidator: 1,
      },
    ] as Expense[];
    const expenseCount = 1;



    //const response = await ExpenseService.getExpensesValuesByUserId().(req as Request);

    expect(response).toEqual(
      new ControllerResponse(200, "", {
        totalData: expenseCount,
        list: expense.map((expense) => new ExpenseListDTO(expense)),
      }),
    );
  });