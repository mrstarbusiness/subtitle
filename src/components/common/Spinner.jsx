import Image from "next/image";

const Spinner = () => {
    return (
        <div className="flex justify-center p-10">
            <Image src="/loading.gif" height={300} width={400} alt="Loading image of bd sub factory" />
        </div>
    )
}

export default Spinner;