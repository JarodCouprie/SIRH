import { describe, expect, test } from "vitest";
import { Expense } from "../common/model/Expense";
import {
  ExpenseInvalidation,
  ExpenseListDTO,
  ExpenseValidation,
} from "../resources/expense/dto/ExpenseListDTO";
import { ExpenseAmountDateAndStatusDTO } from "../resources/expense/dto/ExpenseAmountDateAndStatusDTO";
import { ExpenseType } from "../common/enum/ExpenseType";
import { ExpenseStatus } from "../common/enum/ExpenseStatus";

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
        new Date("2141"),
        new Date(),
        ExpenseStatus.WAITING,
        0,
        0,
        "justification",
      ),
    );

    expect(expense.facturation_date).toStrictEqual(new Date("2141"));
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

describe("ExpenseValidation", () => {
  test("Test ExpenseValidation  Should Be Instance Of Expense And Values Equals", () => {
    const expenseValidation = new ExpenseValidation(1, 1);
    expenseValidation.validated_at = new Date("2099")
      .toISOString()
      .split("Z")[0]
      .replace("T", " ")
      .split(".")[0];

    const dateToTest = new Date("2099")
      .toISOString()
      .split("Z")[0]
      .replace("T", " ")
      .split(".")[0];

    expect(expenseValidation.id).toBe(1);
    expect(expenseValidation.id_validator).toBe(1);
    expect(expenseValidation.validated_at).toStrictEqual(dateToTest);
    expect(expenseValidation).toBeInstanceOf(ExpenseValidation);
  });

  test("Test Incorrect ExpenseValidation  Should Not Be Instance Of Expense", () => {
    const notExpenseValidation = {
      amount: 500,
      incorrect_attribute: "this is not supposed to be here",
      created_at: new Date(),
    };

    expect(notExpenseValidation).not.toBeInstanceOf(ExpenseValidation);
  });

  test("Test Correct ExpenseValidation  False Value Should Not Be Equal", () => {
    const expenseValidation = new ExpenseValidation(1, 1);
    expenseValidation.validated_at = new Date("2099")
      .toISOString()
      .split("Z")[0]
      .replace("T", " ")
      .split(".")[0];

    expect(expenseValidation.id).not.toBe(2);
    expect(expenseValidation.id_validator).not.toBe(3);
    expect(expenseValidation.validated_at).not.toBe(new Date("1999"));
  });
});

describe("ExpenseInvalidation", () => {
  test("Test ExpenseInvalidation  Should Be Instance Of Expense And Values Equals", () => {
    const expenseInvalidation = new ExpenseInvalidation(1, "justification", 1);
    expenseInvalidation.validated_at = new Date("2099")
      .toISOString()
      .split("Z")[0]
      .replace("T", " ")
      .split(".")[0];

    const dateToTest = new Date("2099")
      .toISOString()
      .split("Z")[0]
      .replace("T", " ")
      .split(".")[0];

    expect(expenseInvalidation.id).toBe(1);
    expect(expenseInvalidation.id_validator).toBe(1);
    expect(expenseInvalidation.validated_at).toStrictEqual(dateToTest);
    expect(expenseInvalidation.justification).toBe("justification");
    expect(expenseInvalidation).toBeInstanceOf(ExpenseInvalidation);
  });

  test("Test Incorrect ExpenseInvalidation Should Not Be Instance Of Expense", () => {
    const notExpenseInvalidation = {
      amount: 500,
      incorrect_attribute: "this is not supposed to be here",
      created_at: new Date(),
    };

    expect(notExpenseInvalidation).not.toBeInstanceOf(ExpenseInvalidation);
  });

  test("Test Correct ExpenseInvalidation False Value Should Not Be Equal", () => {
    const expenseInvalidation = new ExpenseInvalidation(1, "justification", 1);
    expenseInvalidation.validated_at = new Date("2099")
      .toISOString()
      .split("Z")[0]
      .replace("T", " ")
      .split(".")[0];

    expect(expenseInvalidation.id).not.toBe(2);
    expect(expenseInvalidation.id_validator).not.toBe(3);
    expect(expenseInvalidation.validated_at).not.toBe(new Date("1999"));
    expect(expenseInvalidation.justification).not.toBe(new Date("test"));
  });
});
