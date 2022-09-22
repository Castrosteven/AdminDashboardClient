import { useMutation } from "@apollo/client";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { CREATE_EMPLOYEE } from "../../gql";
import { createEmployee } from "../../gql/__generated__/createEmployee";
import { Button } from "../Button";
import { TextInput } from "../TextInput";
interface Props {
  setModal: Dispatch<SetStateAction<boolean>>;
}
export const NewEmployeeForm = ({ setModal }: Props) => {
  const initialState = {
    email: "",
    firstName: "",
    lastName: "",
  };
  const [createEmployee] = useMutation<createEmployee>(CREATE_EMPLOYEE);
  const [form, setForm] = useState(initialState);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createEmployee({
        variables: {
          data: form,
        },
      });
      setForm(initialState);
      alert("Employee Created");
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
        name="email"
        type={"email"}
        placeholder="Email"
        required
        value={form.email}
        onChange={changeHandler}
      />
      <TextInput
        type={"text"}
        name="firstName"
        placeholder="First Name"
        required
        value={form.firstName}
        onChange={changeHandler}
      />
      <TextInput
        type={"text"}
        name="lastName"
        placeholder="Last Name"
        required
        value={form.lastName}
        onChange={changeHandler}
      />
      <Button type="submit">Create</Button>
    </form>
  );
};
