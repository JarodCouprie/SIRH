import { describe, expect, test } from "vitest";
import { Expense, ExpenseStatus, ExpenseType } from "../common/model/Expense";

// https://vitest.dev/api/

describe("Expense Model", () => {
  test("Test Expense Model With Only Mandatory Attributes Should Be Instance Of Expense", () => {
    const expense = new Expense(
      "1",
      ExpenseType.FOOD,
      500,
      "motivation",
      new Date(),
      new Date(),
      ExpenseStatus.WAITING,
      0,
      0,
      "justification",
    );

    expect(expense).toBeInstanceOf(Expense);
  });

  test("Test Expense Model With All Attributes Should Be Instance Of Expense", () => {
    const expense = new Expense(
      "1",
      ExpenseType.FOOD,
      500,
      "motivation",
      new Date(),
      new Date(),
      ExpenseStatus.WAITING,
      0,
      0,
      "justification",
      "firstname",
      "lastname",
      new Date(),
      "randomkey",
    );

    expect(expense).toBeInstanceOf(Expense);
  });

  test("Test Incorrect Expense Model With Only Mandatory Attributes Should Not Be Instance Of Expense", () => {
    const notExpense = {
      amount: 500,
      incorrect_attribute: "this is not supposed to be here",
      created_at: new Date(),
      facturation_date: new Date(),
      id: "1",
      id_owner: 0,
      id_validator: 0,
      motivation: "motivation",
      status: ExpenseStatus.WAITING,
      type: ExpenseType.FOOD,
      incorrect_number: 1,
    };

    expect(notExpense).not.toBeInstanceOf(Expense);
  });
});
