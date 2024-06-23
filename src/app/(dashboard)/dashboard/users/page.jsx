import { getAllUser } from "@/app/actions";
import UserTable from "@/components/users/UserTable";

const Users = async () => {

    const users = await getAllUser(1);

    return (
        <div className="">
            <UserTable users={users.users} type="Users" />
        </div>
    )
}

export default Users;