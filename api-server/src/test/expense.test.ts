import { describe, expect, test } from "vitest";
import { Expense, ExpenseStatus, ExpenseType } from "../common/model/Expense";
import { ExpenseListDTO } from "../resources/expense/dto/ExpenseListDTO";
import { ExpenseAmountDateAndStatusDTO } from "../resources/expense/dto/ExpenseAmountDateAndStatusDTO";

// https://vitest.dev/api/

describe("Expense Model", () => {
  test("Test Expense Model With Only Mandatory Attributes Should Be Instance Of Expense And Values Equals", () => {
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

    expect(expense.id).toBe("1");
    expect(expense.amount).toBe(500);
    expect(expense.status).toBe(ExpenseStatus.WAITING);
    expect(expense).toBeInstanceOf(Expense);
  });

  test("Test Expense Model With All Attributes Should Be Instance Of Expense And Values Equals", () => {
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

    expect(expense.id).toBe("1");
    expect(expense.amount).toBe(500);
    expect(expense.status).toBe(ExpenseStatus.WAITING);
    expect(expense.validator_firstname).toBe("firstname");
    expect(expense.validator_lastname).toBe("lastname");
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

  test("Test Correct Expense Model With Only Mandatory Attributes And Three False Value Should Not Be Equal", () => {
    const expense = new Expense(
      "2",
      ExpenseType.FOOD,
      750,
      "motivation",
      new Date(),
      new Date(),
      ExpenseStatus.REFUNDED,
      0,
      0,
      "justification",
    );

    expect(expense.id).not.toBe("1");
    expect(expense.amount).not.toBe(500);
    expect(expense.status).not.toBe(ExpenseStatus.WAITING);
  });
});

describe("ExpenseListDTO", () => {
  test("Test ExpenseListDTO With Only Mandatory Attributes Should Be Instance Of ExpenseListDTO And Values Equals", () => {
    const expense = new ExpenseListDTO(
      new Expense(
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
      ),
    );

    expect(expense.id).toBe("1");
    expect(expense.amount).toBe(500);
    expect(expense.status).toBe(ExpenseStatus.WAITING);
    expect(expense).toBeInstanceOf(ExpenseListDTO);
  });

  test("Test ExpenseListDTO With All Attributes Should Be Instance Of ExpenseListDTO And Values Equals", () => {
    const expense = new ExpenseListDTO(
      new Expense(
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
      ),
      "url",
    );

    expect(expense.id).toBe("1");
    expect(expense.amount).toBe(500);
    expect(expense.status).toBe(ExpenseStatus.WAITING);
    expect(expense.validator_firstname).toBe("firstname");
    expect(expense.validator_lastname).toBe("lastname");
    expect(expense.fileUrl).toBe("url");
    expect(expense).toBeInstanceOf(ExpenseListDTO);
  });

  test("Test Incorrect ExpenseListDTO With Only Mandatory Attributes Should Not Be Instance Of ExpenseListDTO", () => {
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

    expect(notExpense).not.toBeInstanceOf(ExpenseListDTO);
  });

  test("Test Correct ExpenseListDTO With All Attributes And Three False Value Should Not Be Equal", () => {
    const expense = new ExpenseListDTO(
      new Expense(
        "2",
        ExpenseType.FOOD,
        700,
        "motivation",
        new Date(),
        new Date(),
        ExpenseStatus.REFUNDED,
        0,
        0,
        "justification",
        "firstname",
        "lastname",
        new Date(),
        "randomkey",
      ),
      "url",
    );

    expect(expense.id).not.toBe("1");
    expect(expense.amount).not.toBe(500);
    expect(expense.status).not.toBe(ExpenseStatus.WAITING);
  });
});

describe("ExpenseAmountDateAndStatusDTO", () => {
  test("Test ExpenseAmountDateAndStatusDTO With Only Mandatory Attributes Should Be Instance Of ExpenseAmountDateAndStatusDTO And Values Equals", () => {
    const expense = new ExpenseAmountDateAndStatusDTO(
      new Expense(
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
      ),
    );

    expect(expense.facturation_date).toEqual(new Date());
    expect(expense.amount).toBe(500);
    expect(expense.status).toBe(ExpenseStatus.WAITING);
    expect(expense).toBeInstanceOf(ExpenseAmountDateAndStatusDTO);
  });

  test("Test Incorrect ExpenseAmountDateAndStatusDTO With Only Mandatory Attributes Should Not Be Instance Of ExpenseAmountDateAndStatusDTO", () => {
    const notExpense = {
      test: "supposed to be false",
    };

    expect(notExpense).not.toBeInstanceOf(ExpenseAmountDateAndStatusDTO);
  });

  test("Test Correct ExpenseAmountDateAndStatusDTO With All Attributes And Two False Value Should Not Be Equal", () => {
    const expense = new ExpenseAmountDateAndStatusDTO(
      new Expense(
        "1",
        ExpenseType.FOOD,
        700,
        "motivation",
        new Date(),
        new Date(),
        ExpenseStatus.REFUNDED,
        0,
        0,
        "justification",
      ),
    );

    expect(expense.amount).not.toBe(500);
    expect(expense.status).not.toBe(ExpenseStatus.WAITING);
  });
});
