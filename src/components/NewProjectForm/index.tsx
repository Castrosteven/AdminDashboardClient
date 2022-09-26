import { useMutation } from "@apollo/client";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { CREATE_PROJECT } from "../../gql";
import { createEmployee } from "../../gql/__generated__/createEmployee";
import { createProject } from "../../gql/__generated__/createProject";
import { Button } from "../Button";
import { TextInput } from "../TextInput";
interface Props {
  setModal: Dispatch<SetStateAction<boolean>>;
}
export const NewProjectForm = ({ setModal }: Props) => {
  const initialState = {
    name: "",
  };
  const [createProject] = useMutation<createProject>(CREATE_PROJECT);
  const [form, setForm] = useState(initialState);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createProject({
        variables: {
          data: form,
        },
      });
      setForm(initialState);
      alert("Project Created");
      setModal((modal) => !modal);
    } catch (error) {
      alert(error);
    }
  };
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((currentValue) => ({ ...currentValue, [name]: value }));
  };
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-5">
      <TextInput
        type={"text"}
        name="name"
        placeholder="Project Name"
        required
        value={form.name}
        onChange={changeHandler}
      />
      <Button type="submit">Create</Button>
    </form>
  );
};
