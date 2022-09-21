import { ChangeEvent, FormEvent, useState } from "react";
import { WithUser } from "../../contexts/UserContext";
import { Button } from "../Button";
import { TextInput } from "../TextInput";

export const SignUpForm = () => {
  const { SignUpUser } = WithUser();
  const initalState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  const [state, setState] = useState(initalState);
  const [error, setError] = useState<string | null>(null);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((currentValue) => ({ ...currentValue, [name]: value }));
  };
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const user = await SignUpUser({
        data: state,
      });
      alert("Sign Up Successfully");
    } catch (error) {
      setError(error as string);
    }
  };
  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="w-full h-full flex flex-col gap-5 bg-white text-black rounded-md p-5 justify-center"
        onSubmit={submitHandler}
      >
        <TextInput
          name="email"
          type="email"
          autoComplete="username"
          placeholder="Email"
          required
          value={state.email}
          onChange={changeHandler}
        />
        <TextInput
          name="password"
          type="password"
          placeholder="Password"
          required
          value={state.password}
          autoComplete="current-password"
          onChange={changeHandler}
        />
        <TextInput
          name="firstName"
          type="text"
          placeholder="First Name"
          required
          value={state.firstName}
          onChange={changeHandler}
        />
        <TextInput
          name="lastName"
          type="text"
          placeholder="Last Name"
          required
          value={state.lastName}
          onChange={changeHandler}
        />
        <Button type="submit">Sign Up</Button>
        {error && `${error}`}
      </form>
    </div>
  );
};
