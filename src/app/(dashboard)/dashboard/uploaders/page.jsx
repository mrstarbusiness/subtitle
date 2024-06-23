import { getAllUser } from "@/app/actions";
import UserTable from "@/components/users/UserTable";

const Uploaders = async () => {

    const users = await getAllUser(2);

    return (
        <div className="">
            <UserTable users={users.users} type="Uploaders" />
        </div>
    )
}

export default Uploaders;