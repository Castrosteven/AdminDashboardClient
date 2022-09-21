import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { WithUser } from "../../contexts/UserContext";
import { TextInput } from "../TextInput";
import { GrEdit } from "react-icons/gr";
import { Button } from "../Button";
import { me_me } from "../../gql/__generated__/me";
interface Props {
  user: me_me | null;
}
export const ChangeNameForm = ({ user }: Props) => {
  const { UpdateUser } = WithUser();
  const initialState = {
    firstName: "",
    lastName: "",
  };
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((currentValue) => ({ ...currentValue, [name]: value }));
  };
  const [formState, setState] = useState(initialState);
  const [disabledInputs, setDisabledInputs] = useState({
    firstName: true,
    lastName: true,
  });

  const disableSubmit = (): boolean => {
    if (user) {
      if (
        formState.firstName === user.firstName &&
        formState.lastName === user.lastName
      ) {
        return true;
      }
      return false;
    }
    return false;
  };
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await UpdateUser({
        data: {
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
      alert("Name Changed Successfully");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (user) {
      setState({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, []);
  return (
    <div>
      <form onSubmit={submitHandler} className="w-96 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            className="flex gap-2 items-center justify-between"
            htmlFor="firstName"
          >
            First Name
            <div
              onClick={() => {
                setDisabledInputs((currentValue) => ({
                  ...currentValue,
                  firstName: !currentValue["firstName"],
                }));
              }}
            >
              <GrEdit />
            </div>
          </label>
          <TextInput
            disabled={disabledInputs.firstName}
            name="firstName"
            placeholder="First Name"
            value={formState.firstName}
            required
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="flex gap-2 items-center justify-between"
            htmlFor="lastName"
          >
            Last Name
            <div
              onClick={() => {
                setDisabledInputs((currentValue) => ({
                  ...currentValue,
                  lastName: !currentValue["lastName"],
                }));
              }}
            >
              <GrEdit />
            </div>
          </label>
          <TextInput
            disabled={disabledInputs.lastName}
            name="lastName"
            placeholder="Last Name"
            value={formState.lastName}
            onChange={changeHandler}
            required
          />
        </div>
        <Button disabled={disableSubmit()} type="submit">
          Change Name
        </Button>
      </form>
    </div>
  );
};
