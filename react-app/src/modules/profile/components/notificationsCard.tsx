import { useEffect, useState } from "react";
import { customFetcher } from "@/common/helper/fetchInstance.ts";
import { Card } from "@/components/ui/card.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { dateOptions } from "@/common/helper/DateHelper.ts";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { GoDotFill } from "react-icons/go";

export const NotificationsCard = () => {
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

  const handleTouchNotification = async (notificationId: number) => {
    const notification: any = notifications.find(
      (notify: any) => notify.id === notificationId,
    );

    if (notification?.touched) {
      return;
    }

    await customFetcher(
      `http://localhost:5000/api/notification/touch/${notificationId}`,
    ).then(async (response) => {
      if (response.response.status !== 200) {
        return;
      }
      await fetchNotifications(pageSize, pageNumber);
    });
  };

  return (
    <>
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
              notifications?.map((notification: any) =>
                notification?.touched ? (
                  <TableRow
                    key={`${notification?.id}`}
                    className="hover:cursor-pointer"
                    onClick={() => handleTouchNotification(notification?.id)}
                  >
                    <TableCell className="flex items-center gap-2 text-wrap font-light">
                      <span>{notification?.description}</span>
                    </TableCell>
                    <TableCell className="font-light">
                      {new Date(notification?.created_at).toLocaleDateString(
                        "fr-FR",
                        dateOptions,
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow
                    key={`${notification?.id}`}
                    className="hover:cursor-pointer"
                    onClick={() => handleTouchNotification(notification?.id)}
                  >
                    <TableCell className="flex items-center gap-2 text-wrap font-medium">
                      <GoDotFill className="text-orange-700 dark:text-orange-400" />
                      <span>{notification?.description}</span>
                    </TableCell>
                    <TableCell>
                      {new Date(notification?.created_at).toLocaleDateString(
                        "fr-FR",
                        dateOptions,
                      )}
                    </TableCell>
                  </TableRow>
                ),
              )
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
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
    </>
  );
};
