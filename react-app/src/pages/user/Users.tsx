import { useNavigate } from "react-router-dom";
import { UserModel } from "@/models/UserModel.ts";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button.tsx";
import {
  CaretLeftIcon,
  CaretRightIcon,
  CaretSortIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

export function Users() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalData, setTotalData] = useState(0);

  function handleClick(userId: number) {
    navigate(`/user/${userId}`);
  }

  const fetchUsers = async (pageSize: number, pageNumber: number) => {
    await customFetcher(
      `http://localhost:5000/api/user/list?` +
        new URLSearchParams({
          pageSize: pageSize.toString() || "10",
          pageNumber: pageNumber.toString() || "1",
        }),
    ).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setTotalData(response.data.data.totalData);
      setUsers(response.data.data.list);
      setUsersLoaded(true);
    });
  };

  useEffect(() => {
    fetchUsers(pageSize, pageNumber).then();
  }, [pageSize, pageNumber]);

  const handleNewUser = () => {
    navigate("/user/new");
  };

  const newUser = (
    <Button variant="callToAction" onClick={handleNewUser}>
      <PlusIcon className="mr-2 size-4" />
      Ajouter un utilisateur
    </Button>
  );

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

  const usersTable = (
    <MainRoot title="Utilisateurs" action={newUser}>
      <div className="rounded border border-slate-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" size="sm">
                  Identifiant
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm">
                  Prénom
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm">
                  Nom
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm">
                  Email
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.length ? (
              users?.map((user: UserModel) => (
                <TableRow
                  key={`${user.id}`}
                  className="hover:cursor-pointer"
                  onClick={() => handleClick(user.id)}
                >
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Aucun utilisateur
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full justify-between py-2">
        <div className="flex items-center gap-2">
          <Label>Utilisateurs par page</Label>
          <Select
            onValueChange={(value) => handlePageSize(value)}
            defaultValue={pageSize.toString()}
          >
            <SelectTrigger className="w-fit">
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
            {`${1 + pageSize * (pageNumber - 1)} - ${users.length + pageSize * (pageNumber - 1)} sur ${totalData}`}
          </span>
          <Button
            variant="ghost"
            onClick={handlePreviousPageNumber}
            disabled={pageNumber === 1}
          >
            <CaretLeftIcon />
          </Button>
          <Button
            variant="ghost"
            onClick={handleNextPageNumber}
            disabled={pageSize * pageNumber >= totalData}
          >
            <CaretRightIcon />
          </Button>
        </div>
      </div>
    </MainRoot>
  );
  return usersLoaded && usersTable;
}
