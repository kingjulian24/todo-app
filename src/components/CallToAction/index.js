import { IoArrowDownOutline } from "react-icons/io5";

const CallToAction = () => {
  return (
    <div className="absolute  text-gray-200 left-1/2 -translate-x-1/2 top-1/5">
      <p className="text-[300%] lg:text-[400%] 2xl:text-[500%] text-center">
        Add New Todo
      </p>
      <span className="text-[2000%] lg:text-[2500%] 2xl:text-[3000%]">
        <IoArrowDownOutline />
      </span>
    </div>
  );
};

export default CallToAction;
