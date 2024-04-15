import {
  Await,
  useAsyncValue,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { UserModel } from "../../models/UserModel.ts";
import { Suspense, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button.tsx";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/hooks/useAuth.tsx";
import { AuthTokens } from "@/type/context/authTokens.tsx";

export function Users() {
  const { users }: any = useLoaderData();
  return (
    <>
      <div className="pb-4">
        <h1>Utilisateurs</h1>
      </div>
      <Suspense
        fallback={
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        }
      >
        <Await resolve={users}>
          <div className="rounded border border-zinc-800">
            <UserList />
          </div>
        </Await>
      </Suspense>
    </>
  );
}

export const UserList = () => {
  const data: any = useAsyncValue();
  const navigate = useNavigate();

  function handleClick(userId: number) {
    navigate(`/user/${userId}`);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">
            <Button variant="ghost" size="sm">
              Identifiant
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead className="text-right">
            <Button variant="ghost" size="sm">
              Prénom
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead className="text-right">
            <Button variant="ghost" size="sm">
              Nom
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead className="text-right">
            <Button variant="ghost" size="sm">
              Email
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.map((user: UserModel) => (
          <TableRow
            key={`${user.id}`}
            className="hover:cursor-pointer"
            onClick={() => handleClick(user.id)}
          >
            <TableCell className="text-right font-medium">{user.id}</TableCell>
            <TableCell className="text-right">{user.firstname}</TableCell>
            <TableCell className="text-right">{user.lastname}</TableCell>
            <TableCell className="text-right">{user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export function User() {
  const { id } = useParams();
  const { token } = useAuth() as AuthTokens;
  if (!id) {
    return (
      <div>
        <h1>Cet utilisateur n'existe pas</h1>
      </div>
    );
  }
  const [user, setUser] = useState<UserModel>({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    createdAt: new Date(),
    active: true,
  });
  const fetchUser = async () => {
    await fetch(`http://localhost:5000/api/user/${id}`, {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.data);
      });
  };

  useEffect(() => {
    fetchUser().then();
  }, []);

  return (
    <div>
      <h1>Utilisateur n°{user.id}</h1>
      <span>Nom : {user.firstname}</span>
    </div>
  );
}
