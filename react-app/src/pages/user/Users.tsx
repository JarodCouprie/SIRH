import { useNavigate } from "react-router-dom";
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
  CheckCircledIcon,
  CrossCircledIcon,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge.tsx";
import { UserList } from "@/type/user/user-list.type.ts";

export function Users() {
  const [users, setUsers] = useState<UserList[]>([]);
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
              <TableHead>Collaborateur</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Actif</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.length ? (
              users?.map((user: UserList) => (
                <TableRow
                  key={`${user?.id}`}
                  className="hover:cursor-pointer"
                  onClick={() => handleClick(user?.id)}
                >
                  <TableCell className="flex gap-2 font-medium">
                    <Avatar>
                      <AvatarImage src={user?.avatar_url} />
                      <AvatarFallback>
                        {user.firstname?.charAt(0)}
                        {user.lastname?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div>
                        {user?.firstname} {user?.lastname}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {user?.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.address?.locality}</TableCell>
                  <TableCell>{user?.phone}</TableCell>
                  <TableCell>
                    {user?.active ? (
                      <Badge variant="outline">
                        <CheckCircledIcon className="mr-2 size-4 text-green-600" />
                        Actif
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <CrossCircledIcon className="mr-2 size-4 text-orange-600" />
                        Inactif
                      </Badge>
                    )}
                  </TableCell>
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
