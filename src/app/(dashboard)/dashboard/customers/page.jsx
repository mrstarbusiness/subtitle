import { getAllUser } from "@/app/actions";
import UserTable from "@/components/users/UserTable";

const Customers = async () => {

    const users = await getAllUser(3);

    return (
        <div className="">
            <UserTable users={users.users} type="Customers" />
        </div>
    )
}

export default Customers;