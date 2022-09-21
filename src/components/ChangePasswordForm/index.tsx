import { useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { GrEdit } from "react-icons/gr";
import { CHANGE_PASSWORD } from "../../gql";
import { changePassword } from "../../gql/__generated__/changePassword";
import { Button } from "../Button";
import { TextInput } from "../TextInput";

export const ChangePasswordForm = () => {
  const initialState = {
    currentPassword: "",
    newPassword: "",
  };
  const [formState, setFormState] = useState(initialState);
  const [changePassword] = useMutation<changePassword>(CHANGE_PASSWORD);
  const [disabledInputs, setDisabledInputs] = useState({
    currentPassword: true,
    newPassword: true,
  });
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await changePassword({
        variables: {
          data: formState,
        },
      });
      alert("Password Changed Successfully");
    } catch (error) {
      alert(error);
    }
  };
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((currentValue) => ({ ...currentValue, [name]: value }));
  };
  const disableButton = () => {
    if (formState.currentPassword === "" || formState.newPassword == "") {
      return true;
    }
    return false;
  };
  return (
    <form onSubmit={submitHandler} className="w-96 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          className="flex gap-2 items-center justify-between"
          htmlFor="currentPassword"
        >
          Current Password
          <div
            onClick={() => {
              setDisabledInputs((currentValue) => ({
                ...currentValue,
                currentPassword: !currentValue["currentPassword"],
              }));
            }}
          >
            <GrEdit />
          </div>
        </label>
        <TextInput
          disabled={disabledInputs.currentPassword}
          name="currentPassword"
          placeholder="Current Password"
          value={formState.currentPassword}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="flex gap-2 items-center justify-between"
          htmlFor="newPassword"
        >
          New Password
          <div
            onClick={() => {
              setDisabledInputs((currentValue) => ({
                ...currentValue,
                newPassword: !currentValue["newPassword"],
              }));
            }}
          >
            <GrEdit />
          </div>
        </label>
        <TextInput
          disabled={disabledInputs.newPassword}
          name="newPassword"
          placeholder="New Password"
          value={formState.newPassword}
          onChange={changeHandler}
          required
        />
      </div>
      <Button disabled={disableButton()} type="submit">
        Change Password
      </Button>
    </form>
  );
};
