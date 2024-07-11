import { UserService } from "../service/UserService";
import { DemandRepository } from "../repository/DemandRepository";
import {
  calculateNumberOfDays,
  DemandService,
  updateUserDays,
} from "../service/DemandService";
import { EditDemandDTO } from "../dto/demand/EditDemandDTO";
import { ControllerResponse } from "../helper/ControllerResponse";
import { Demand, DemandType } from "../model/Demand";
import { logger } from "../helper/Logger";
import { DemandDTO } from "../dto/demand/DemandDTO";
import { Request } from "express";

jest.mock("../service/UserService");
jest.mock("../repository/DemandRepository");
jest.mock("../service/DemandService", () => ({
  ...jest.requireActual("../service/DemandService"),
  calculateNumberOfDays: jest.fn(),
  updateUserDays: jest.fn(),
}));
jest.mock("../helper/Logger");

describe("getDemand", () => {
  let req: Partial<Request>;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      query: {
        pageSize: "10",
        pageNumber: "1",
        type: "CA",
      },
    };
  });

  test("should return demands with a specific type", async () => {
    const demands = [
      {
        id: 45,
        startDate: new Date("2024-07-22"),
        endDate: new Date("2024-07-25"),
        motivation: "qsdfqsdf",
        createdAt: new Date("2024-07-01"),
        status: "WAITING",
        type: DemandType.CA,
        number_day: 3,
        idOwner: 1,
        idValidator: 1,
      },
    ] as Demand[];
    const demandCount = 1;

    (DemandRepository.getDemandCountWithType as jest.Mock).mockResolvedValue(
      demandCount,
    );
    (DemandRepository.getDemandWithType as jest.Mock).mockResolvedValue(
      demands,
    );

    const response = await DemandService.getDemand(req as Request);

    expect(DemandRepository.getDemandCountWithType).toHaveBeenCalledWith("CA");
    expect(DemandRepository.getDemandWithType).toHaveBeenCalledWith(
      10,
      0,
      "CA",
    );
    expect(response).toEqual(
      new ControllerResponse(200, "", {
        totalData: demandCount,
        list: demands.map((demand) => new DemandDTO(demand)),
      }),
    );
  });

  test("should return demands without type filter", async () => {
    req.query = {
      ...req.query,
      type: undefined,
    };

    const demands = [
      {
        id: 45,
        startDate: new Date("2024-07-22T22:00:00.000Z"),
        endDate: new Date("2024-07-25T22:00:00.000Z"),
        motivation: "qsdfqsdf",
        createdAt: new Date("2024-07-01T04:32:01.000Z"),
        status: "WAITING",
        type: "CA",
        number_day: 3,
        idOwner: 1,
        idValidator: 1,
      },
    ] as Demand[];
    const demandCount = 1;

    (DemandRepository.getDemandCount as jest.Mock).mockResolvedValue(
      demandCount,
    );
    (DemandRepository.getDemand as jest.Mock).mockResolvedValue(demands);

    const response = await DemandService.getDemand(req as Request);

    expect(DemandRepository.getDemandCount).toHaveBeenCalled();
    expect(DemandRepository.getDemand).toHaveBeenCalledWith(10, 0);
    expect(response).toEqual(
      new ControllerResponse(200, "", {
        totalData: demandCount,
        list: demands.map((demand) => new DemandDTO(demand)),
      }),
    );
  });

  test("should handle errors", async () => {
    const error = new Error("Database error");
    (DemandRepository.getDemandCountWithType as jest.Mock).mockRejectedValue(
      error,
    );

    const response = await DemandService.getDemand(req as Request);

    expect(logger.error).toHaveBeenCalledWith(
      `Failed to get demand. Error: ${error}`,
    );
    expect(response).toEqual(
      new ControllerResponse(500, "Failed to get demand"),
    );
  });
});

describe("editDemand", () => {
  const userId = 1;
  const demandId = "1";
  const body = {
    status: "DRAFT",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-07-02"),
    motivation: "Test motivation",
    type: DemandType.CA,
    number_day: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return 400 if status is not DRAFT", async () => {
    const response = await DemandService.editDemand(
      demandId,
      { ...body, status: "ACCEPTED" },
      userId,
    );
    expect(response).toEqual(new ControllerResponse(400, "Not allowed"));
  });

  test("should return 404 if user is not found", async () => {
    (UserService.getUserById as jest.Mock).mockResolvedValue(
      new ControllerResponse(404, "User not found"),
    );

    const response = await DemandService.editDemand(demandId, body, userId);
    expect(response).toEqual(new ControllerResponse(404, "User not found"));
  });

  test("should return 401 if demand doesn't exist", async () => {
    (UserService.getUserById as jest.Mock).mockResolvedValue(
      new ControllerResponse(200, "User found", { id: userId }),
    );
    (DemandRepository.getDemandById as jest.Mock).mockResolvedValue(null);

    const response = await DemandService.editDemand(demandId, body, userId);
    expect(response).toEqual(
      new ControllerResponse(401, "Demand doesn't exist"),
    );
  });

  test("should edit demand and return 200", async () => {
    const user = { id: userId, rtt: 10, ca: 10, tt: 10 };
    const demand = {
      id: +demandId,
      startDate: "2024-07-01",
      endDate: "2024-07-05",
      type: "RTT",
    };

    (UserService.getUserById as jest.Mock).mockResolvedValue(
      new ControllerResponse(200, "User found", user),
    );
    (DemandRepository.getDemandById as jest.Mock).mockResolvedValue(demand);
    (calculateNumberOfDays as jest.Mock).mockReturnValue(1);
    (updateUserDays as jest.Mock).mockReturnValue(null);
    (DemandRepository.editDemand as jest.Mock).mockResolvedValue(null);
    (UserService.updateUserDays as jest.Mock).mockResolvedValue(null);

    const response = await DemandService.editDemand(demandId, body, userId);
    expect(response).toEqual(
      new ControllerResponse(
        200,
        "",
        new EditDemandDTO(
          body.startDate,
          body.endDate,
          body.motivation,
          body.type,
          1,
          body.status,
        ),
      ),
    );
    expect(DemandRepository.editDemand).toHaveBeenCalledWith(
      +demandId,
      expect.any(EditDemandDTO),
    );
    expect(UserService.updateUserDays).toHaveBeenCalledWith(
      userId,
      user.rtt,
      user.ca,
      user.tt,
    );
  });
});
