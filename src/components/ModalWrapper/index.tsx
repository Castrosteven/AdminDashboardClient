import { Dispatch, ReactNode, SetStateAction } from "react";
import { Button } from "../Button";

interface Props {
  setModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}
export const ModalWrapper = ({ children, setModal }: Props) => {
  return (
    <div className="flex flex-col item ">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setModal((modal) => !modal);
          }}
        >
          Close
        </Button>
      </div>
      <div className="flex items-center justify-center ">{children}</div>
    </div>
  );
};
