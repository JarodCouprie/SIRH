import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import { Card } from "@/components/ui/card.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.js";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";
import { Button } from "@/components/ui/button.js";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { dateOptions } from "@/common/helper/DateHelper.js";

export const Notifications = () => {
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async (pageSize: number, pageNumber: number) => {
    await customFetcher(
      "http://localhost:5000/api/notification?" +
        new URLSearchParams({
          pageSize: pageSize.toString() || "10",
          pageNumber: pageNumber.toString() || "1",
        }),
    ).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setTotalData(response.data.data.totalData);
      setNotifications(response.data.data.list);
    });
  };

  useEffect(() => {
    fetchNotifications(pageSize, pageNumber).then();
  }, [pageSize, pageNumber]);

  const handlePageSize = (pageSize: string) => {
    setPageNumber(1);
    setPageSize(+pageSize);
  };

  const handlePreviousPageNumber = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleNextPageNumber = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <MainRoot title="Notifications">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Libellé</TableHead>
              <TableHead>Date de création</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications?.length ? (
              notifications?.map((notification: any) => (
                <TableRow
                  key={`${notification?.id}`}
                  className="hover:cursor-pointer"
                >
                  <TableCell className="text-wrap font-medium">
                    {notification?.description}
                  </TableCell>
                  <TableCell>
                    {new Date(notification?.created_at).toLocaleDateString(
                      "fr-FR",
                      dateOptions,
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={1} className="h-24 text-center">
                  Aucune Notification
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <div className="flex w-full justify-between py-2">
        <div className="flex items-center gap-2">
          <Label>Notifications par page</Label>
          <Select
            onValueChange={(value) => handlePageSize(value)}
            defaultValue={pageSize.toString()}
          >
            <SelectTrigger
              className="w-fit"
              aria-label="number of notifications per page"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-950 dark:text-gray-100">
            {`${notifications.length === 0 ? 0 : 1 + pageSize * (pageNumber - 1)} - ${notifications.length + pageSize * (pageNumber - 1)} sur ${totalData}`}
          </span>
          <Button
            variant="ghost"
            onClick={handlePreviousPageNumber}
            disabled={pageNumber === 1}
            aria-label="previous notifications page"
          >
            <CaretLeftIcon />
          </Button>
          <Button
            variant="ghost"
            onClick={handleNextPageNumber}
            disabled={pageSize * pageNumber >= totalData}
            aria-label="next notifications page"
          >
            <CaretRightIcon />
          </Button>
        </div>
      </div>
    </MainRoot>
  );
};
