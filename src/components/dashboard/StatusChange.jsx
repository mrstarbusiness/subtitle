
import { statusToggle } from "@/app/actions";

const StatusChange = ({item}) => {
  const handleSubmit = async (formData) => {
    "use server";
    const data = {
      status: formData.get("status"),
      id: formData.get("id"),
    };

    await statusToggle(data, "all-subtitle");
  };

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="status" value={item.status} />
      <input type="hidden" name="id" value={item.id} />
      <button
        type="submit"
        className={`px-2 py-1  ${
          item.status === 1 ? "bg-red-600" : "bg-cyan-600"
        } rounded-md hover:bg-opacity-70 duration-500 text-white`}
      >
        {item.status == 2 ? "Active" : "Inactive"}
      </button>
    </form>
  );
};

export default StatusChange;
